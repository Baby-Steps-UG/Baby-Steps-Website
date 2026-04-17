# Baby-Steps CMS — Copilot Context

> **Purpose:** Authoritative reference for the Baby-Steps CMS (`babysteps-cms` repository).
>
> **What this is:** A Next.js 15 content management web app for internal team members to create and publish educational content for the Baby-Steps mobile app.
>
> **Repository:** `babysteps-cms` (separate from `babysteps-app`)
> **Deployment:** Vercel subdomain → `cms.babystepslearn.com` when DNS configured
>
> **Current state:** Stories pipeline fully operational. Games, Bible, Quiz authoring not yet built.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | Supabase Auth (`@supabase/ssr`) |
| Database | Supabase (PostgreSQL 15+) |
| Storage | Supabase Storage |
| Deployment | Vercel |

---

## What the CMS Currently Does

| Feature | Status |
|---|---|
| Auth + middleware | ✅ Done |
| Dashboard shell | ✅ Done |
| Story list, create, edit, delete | ✅ Done |
| Multi-page editor, questions editor | ✅ Done |
| Draft / publish / convert-to-draft | ✅ Done |
| Version history + restore | ✅ Done |
| Games authoring | ⬜ Stage 5 |
| Bible authoring | ⬜ Stage 6 |
| Quiz authoring | ⬜ Stage 6 |
| Admin user management | ⬜ Future |

---

## CMS vs Supabase — Responsibilities

| | Supabase | Next.js CMS |
|---|---|---|
| **What it is** | Backend infrastructure | Content management web app |
| **Auth** | Manages all accounts | Login backed by Supabase Auth |
| **Database** | Hosts all tables, RLS | Reads/writes via Supabase client |
| **Storage** | Hosts all media | Uploads to Supabase Storage |
| **Use for** | Schema, RLS, Edge Functions, secrets | Adding content, publishing |
| **Do NOT use for** | Day-to-day content editing | Schema changes, RLS, secrets |

---

## Security Architecture

### The Seven Rules

1. The client is untrusted — every rule is in DB RLS or server guard
2. Service role key never leaves the server — Server Actions and Route Handlers only
3. Webhook endpoints verify signatures before anything else
4. User-facing server functions verify session first
5. All URLs in JSONB fields validated before publish
6. All queries use parameterised queries
7. Never commit secrets

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL       ✅ browser safe
NEXT_PUBLIC_SUPABASE_ANON_KEY  ✅ browser safe
SUPABASE_SERVICE_ROLE_KEY      ❌ server only — never in 'use client'
```

### Supabase Client Pattern

```typescript
// src/lib/supabase/server.ts — Server Components, Server Actions, Route Handlers
export async function createSupabaseServerClient() { /* uses anon key + cookies */ }
export async function createSupabaseServiceClient() { /* uses service role key — server only */ }

// src/lib/supabase/client.ts — Client Components only
export function createSupabaseBrowserClient() { /* uses anon key */ }
```

Never mix these up. Never use `createSupabaseServiceClient()` in a `'use client'` component.

### URL Validation

```typescript
function validateStorageUrl(url: string): boolean {
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL!
    .replace('https://','').replace('.supabase.co','');
  return url.startsWith(`https://${projectId}.supabase.co/storage/v1/object/`);
}
```

Call before setting `status = 'published'` on any content row.

### CMS Auth Middleware

Two gates on every request:
1. No session → `/login`
2. Valid session but no `cms_users` row → `/unauthorized`
3. `/admin/*` routes require `role = 'admin'`

---

## CMS Users

Completely separate from app parent/school accounts. Created manually — no sign-up flow.

```sql
CREATE TABLE cms_users (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role       VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'editor', 'translator')),
  is_active  BOOLEAN     NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Creating an account:**
```sql
-- 1. Create user in Supabase Auth dashboard
-- 2. Delete the auto-created individual_profiles row
DELETE FROM individual_profiles WHERE user_id = '<uuid>';
-- 3. Insert cms_users row
INSERT INTO cms_users (user_id, role) VALUES ('<uuid>', 'admin');
```

---

## Content Deletion Strategy

**Hard delete only.** No soft delete. No `deleted_at` columns.

Cascade chain:
```
DELETE story_templates → story_content → story_sessions (all automatic via FK CASCADE)
DELETE game_templates  → game_units → game_unit_content (automatic)
                       → game_sessions (unit_id SET NULL — sessions are preserved)
```

CMS never manually deletes child rows — one delete on the template, cascade handles everything.

Delete is **admin-only** — enforced in the Server Action, not just the UI.

---

## Relevant Database Tables

### content_languages

| code | name | is_active |
|---|---|---|
| `lg` | Luganda | ✅ true |
| `rk` | Runyankole | ❌ false |

English is not in this table. Never add it.

### story_templates / story_content

Fully implemented. `language_id` is always a UUID — never the string `'lg'`. `story_key` always derived from title. Multiple `story_content` rows per template are expected (version history). See stories doc for full detail.

### game_templates

```sql
game_templates (
  id, game_key, display_name, description,
  game_type VARCHAR(50) CHECK (game_type IN (
    'tap_to_learn','word_match','listen_and_choose','simple_quiz',
    'counting','fill_letters','puzzle','story_minigame'
  )),
  game_category VARCHAR(50) NOT NULL CHECK (game_category IN (
    'core_learning','language_building','numbers_logic','creativity'
  )),
  mechanics_json JSONB,
  age_range_min, age_range_max,
  tier_required VARCHAR(50) DEFAULT 'free',
  is_active, display_order,
  created_at, updated_at
)
```

> `game_category` is `NOT NULL`. The `/games/new` form must always require this field before saving — the games screen category tabs in the app depend on every template having a category. Never insert a `game_templates` row without a `game_category`.

`game_key` always derived from `display_name` using `generateGameKey()` — never a free-text field.

### game_units

```sql
game_units (
  id, template_id,
  unit_number INTEGER NOT NULL,
  title, description,
  tier_required VARCHAR(50) DEFAULT 'free',
  display_order, is_active,
  created_at
)
-- UNIQUE(template_id, unit_number)
```

Units belong to a game template. Each unit has its own `tier_required` — this is what controls subscription gating per unit, not just per game.

### game_unit_content

```sql
game_unit_content (
  id, unit_id, language_id,
  content_json JSONB,
  version, status CHECK (status IN ('draft','published','archived')),
  published_at, published_by,
  created_at, updated_at
)
-- UNIQUE INDEX: (unit_id, language_id) WHERE status = 'published'
```

This is where the actual game items live. **One published row per unit per language.** A unit has separate content for each language — a CMS user authors Luganda content and Runyankole content independently. Publishing the Luganda row for a unit makes that unit visible to Luganda children only. Runyankole children will not see the unit until a Runyankole content row is also published for it.

A unit with no published content for a given language is **invisible** to children of that language — it does not appear as locked, it does not appear at all.

### game_sessions

> `game_content_id` is **nullable** in `game_sessions`. For all CMS-authored unit-based content, sessions written by the app reference `unit_id` only and leave `game_content_id` as NULL. Do not treat `game_content_id` as required when building the games pipeline — doing so would block all unit-based game session writes.

---

## Game Content Shapes (Per Game Type)

The CMS editor for each game type must produce `content_json` in the exact shape the app expects. Each game type has a different editor.

### tap_to_learn
```json
{ "items": [{ "id": "item_1", "label": "Ente", "image_url": "...", "audio_url": "...", "xp": 5 }] }
```
CMS editor: list of items, each with label text, image upload, audio upload, XP value.

### word_match
```json
{
  "items": [{
    "id": "item_1", "text": "Ente", "audio_url": "...",
    "correct_image_url": "...",
    "distractor_image_urls": ["...", "...", "..."],
    "xp": 10
  }]
}
```
CMS editor: text field, audio upload, one correct image upload, three distractor image uploads, XP.

### listen_and_choose
```json
{
  "items": [{
    "id": "item_1", "audio_url": "...",
    "options": [
      { "id": "a", "image_url": "...", "correct": true },
      { "id": "b", "image_url": "...", "correct": false },
      { "id": "c", "image_url": "...", "correct": false },
      { "id": "d", "image_url": "...", "correct": false }
    ],
    "xp": 10
  }]
}
```
CMS editor: audio upload, four image option uploads with correct toggle (exactly one correct).

### simple_quiz
```json
{
  "items": [{
    "id": "item_1", "question_text": "Ente means...",
    "question_audio_url": null,
    "options": [{ "id": "a", "text": "Cow", "correct": true }, { "id": "b", "text": "Dog", "correct": false }],
    "explanation": "...", "xp": 10
  }]
}
```
CMS editor: same shape as story questions_json with added XP field.

### counting
```json
{
  "items": [{
    "id": "item_1", "number": 3, "label_audio_url": "...",
    "quantity_image_url": "...", "options": [1, 2, 3, 4], "xp": 10
  }]
}
```
CMS editor: number input, audio upload, quantity image upload, auto-generated distractor options.

### fill_letters
```json
{
  "items": [{
    "id": "item_1", "word": "ENTE", "image_url": "...", "audio_url": "...",
    "blanks": [1, 3],
    "available_letters": ["E", "N", "T", "E", "A", "O"],
    "xp": 15
  }]
}
```
CMS editor: word input, image upload, audio upload, blank position selector, available letters input.

### puzzle
```json
{
  "items": [{ "id": "item_1", "full_image_url": "...", "grid_size": 3, "audio_url": null, "xp": 20 }]
}
```
CMS editor: image upload, grid size selector (2, 3, or 4), optional audio upload.

---

## Storage Buckets

| Bucket | Visibility | Write |
|---|---|---|
| `story-assets` | Public | CMS service role only |
| `game-assets` | Public | CMS service role only |
| `animation-videos` | Private | CMS service role only |
| `school-branding` | Private | CMS service role only |

No bucket has a client INSERT policy. All uploads via Server Actions.

### Upload Path Conventions

```
story-assets/stories/{story_key}/cover.{ext}
story-assets/stories/{story_key}/page-{n}.{ext}
story-assets/stories/{story_key}/audio-{n}.mp3

game-assets/games/{game_key}/units/{unit_number}/{lang_code}/item-{n}-image.{ext}
game-assets/games/{game_key}/units/{unit_number}/{lang_code}/item-{n}-audio.mp3
game-assets/games/{game_key}/units/{unit_number}/{lang_code}/item-{n}-correct.{ext}
game-assets/games/{game_key}/units/{unit_number}/{lang_code}/distractor-{n}.{ext}
```

`{lang_code}` is the `content_languages.code` value (e.g. `lg` for Luganda, `rk` for Runyankole). Including language in the path prevents audio and language-specific assets from overwriting each other when the same unit is authored in multiple languages. Images that are genuinely language-agnostic (e.g. a photo of a cow) can share a URL across language tabs — the CMS editor may reuse an existing URL rather than re-uploading.

---

## Game CMS Route Structure (Stage 5)

```
/games              — list all game_templates, status badges, edit/delete
/games/new          — create new game_template + initial unit
/games/[id]/edit    — game editor with tabs per unit, type-specific content editor
```

### /games list page

- Shows all `game_templates`
- Status badge derived from `game_unit_content` status across all units
- Columns: name, game_type, game_category, unit count, status, actions
- Edit → `/games/[id]/edit`
- Delete → admin only, hard delete via `deleteGame()` Server Action

### /games/new page

- Requires: display_name, game_type, game_category (NOT NULL — do not allow save without it), tier_required, age_range
- `game_key` derived from `display_name` automatically — never a user input field
- On save: inserts `game_templates` row + first `game_units` row

### /games/[id]/edit page

The edit page has three levels:
1. **Game metadata panel** — display_name, description, game_type (read-only after creation), game_category, tier_required, age_range, is_active
2. **Units panel** — list of units, add unit, each unit expands to show unit metadata + language tabs
3. **Language content tabs** — within each unit, one tab per active language (currently: Luganda | Runyankole)

Each unit panel shows:
- Unit metadata: title, description, unit_number (auto), tier_required, is_active
- **Language tabs** — one tab per active `content_languages` row. Each tab is independent:
  - Content editor: type-specific editor based on `game_type` of the parent template
  - Status controls: Save draft / Publish / Convert to draft
  - Status badge on the tab itself (Draft / Published / Not started)
  - Version history for that language

**Language tab status summary** — the unit header should show a per-language status summary so a CMS editor can see at a glance which languages are ready:

```
Unit 1: Animals
  Luganda      ✅ Published
  Runyankole   ⚠️  Draft
Unit 2: Food
  Luganda      ✅ Published
  Runyankole   — Not started
```

**Publishing one language tab does not publish the other.** Each `game_unit_content` row is independent. A CMS editor must author and publish content for each language separately.

**The content editor changes based on `game_type`.** The parent template's `game_type` determines which editor component renders for all units and all language tabs of that game. You cannot mix game types within one game template.

### Server Actions for Games

```typescript
// app/actions/games.ts
createGame(input)              → inserts game_templates row (game_category required) + first game_units row
createGameUnit(input)          → inserts game_units row
saveGameUnitContent(input)     → upserts game_unit_content draft for a specific unit + language_id
publishGameUnitContent(input)  → validates URLs, archives old published for that unit+language, inserts new published row
convertUnitToDraft(input)      → archives published row for that unit+language, status becomes draft
deleteGame(templateId)         → hard delete game_templates (cascades to units, content; game_sessions.unit_id SET NULL)
uploadGameAsset(input)         → uploads to game-assets/{game_key}/units/{unit_number}/{lang_code}/...
```

> **Language parameter:** `saveGameUnitContent`, `publishGameUnitContent`, and `convertUnitToDraft` all require a `language_id` (UUID). The UNIQUE INDEX on `(unit_id, language_id) WHERE status = 'published'` enforces one published row per unit per language. Never pass a language code string — always pass the UUID from `content_languages`.

> **Session write note:** When the app writes `game_sessions` rows for unit-based games, `game_content_id` is NULL and `unit_id` is populated. The CMS does not write session rows — this note is here so CMS developers understand why `game_content_id` is nullable and do not attempt to make it required.

All Server Actions follow the same pattern as stories Server Actions.

---

## Story Pipeline Summary

Full detail in CMS Skeleton Overview doc. Key points:
- `story_key` always derived from title — never user input
- `language_id` always UUID — never code string
- `pages_json` and `questions_json` always flat arrays
- Delete is admin-only, hard delete cascades: `story_templates → story_content → story_sessions` (ON DELETE CASCADE verified in DB)
- Publish archives old published row, inserts new — one click
- Version history shows all `story_content` rows for the template

---

## Server Actions Pattern

```typescript
'use server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function someAction(input: {...}): Promise<{ success: true } | { error: string }> {
  const supabase = await createSupabaseServiceClient();
  // Verify session and role if needed
  // Validate URLs with validateStorageUrl() before any JSONB write
  // Execute operation
  if (error) return { error: 'Something went wrong. Please try again.' };
  return { success: true };
}
```

Rules:
- Always `createSupabaseServiceClient()` — never anon client for writes
- Always typed result — never throw
- Always `validateStorageUrl()` before JSONB field with URLs
- Never raw Supabase error strings to user
- Admin-only actions verify `cms_users.role = 'admin'` in the Server Action

---

## Key Architectural Decisions

1. Service role key server-only
2. All uploads via Server Actions
3. `cms_users` is the access gate
4. No sign-up flow
5. `language_id` always UUID
6. `*_key` fields always derived from name/title
7. Partial unique index, not table-level UNIQUE
8. URL validation before every publish
9. English is not a content language
10. Tier comparisons use rank integers
11. Hard delete with cascade
12. `pages_json` and `questions_json` always flat arrays
13. Delete is admin-only, enforced in Server Action
14. **Each game_type has its own CMS editor component** — the editor is determined by `game_templates.game_type` and never changes for that template after creation
15. **game_type is immutable after template creation** — changing the game type would invalidate all existing content_json shapes
16. **Units are the content unit for games, not the template** — one game template has many units, each unit has its own content_json per language
17. **game_category is NOT NULL** — the `/games/new` form must always require it; never insert a game_templates row without a category
18. **game_sessions.game_content_id is nullable** — unit-based game sessions set unit_id and leave game_content_id NULL; this is by design and must never be changed to NOT NULL
19. **story_sessions.story_content_id FK is ON DELETE CASCADE** — verified in DB; deleting story_content automatically removes associated sessions
20. **Each unit has one game_unit_content row per language** — language tabs in the unit editor are independent; publishing Luganda content does not publish Runyankole content
21. **A unit with no published content for a language is invisible to children of that language** — it does not appear as locked; it does not appear at all
22. **language_id is always a UUID** — never pass a language code string to any Server Action or query; always use the UUID from content_languages
23. **Upload paths include lang_code** — game assets are stored under `{unit_number}/{lang_code}/` to prevent cross-language asset collisions; language-agnostic images may share a URL across language tabs

---

## What the CMS Does NOT Do

- Schema changes
- RLS policy changes
- User-facing content delivery
- Payment processing
- Push notifications
- Session tracking — written by the mobile app only
- Shana mascot animations — bundled in app, not CMS-managed

---

## Extending to Games (Stage 5)

When building the games CMS:

1. Create `app/actions/games.ts` following the exact same Server Action pattern as `app/actions/stories.ts`
2. Create `/games`, `/games/new`, `/games/[id]/edit` routes following story route patterns
3. The `/games/new` form must require `game_category` (NOT NULL in DB) — do not allow save without it
4. The edit page renders a different content editor component based on `game_templates.game_type`
5. Each unit panel must show **language tabs** — one tab per active `content_languages` row. Each tab manages one `game_unit_content` row (identified by `unit_id` + `language_id`). Draft/publish/version controls are per language tab, not per unit
6. The unit header must show a per-language status summary (Published / Draft / Not started) so editors can see which languages are ready at a glance
7. Each game type editor produces `content_json` in the exact shape documented in this file
8. `game_key` derived from `display_name` using same `generateKey()` utility as `story_key`
9. Upload paths follow `game-assets/games/{game_key}/units/{unit_number}/{lang_code}/...` — always include language code to prevent cross-language asset collisions
10. Publish/draft/version logic is identical to stories — same status lifecycle, same partial unique index behaviour; the unique index is `(unit_id, language_id) WHERE status = 'published'`
11. Hard delete on `game_templates` cascades through `game_units → game_unit_content` automatically; `game_sessions.unit_id` is SET NULL (sessions are preserved)
12. **Build one game type editor at a time** — tap_to_learn first, then word_match, etc. Match the order the app builds its mechanics

---

*Save as `.github/copilot-instructions.md` in the `babysteps-cms` repo root.*
