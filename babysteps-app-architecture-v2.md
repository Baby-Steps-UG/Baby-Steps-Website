# Baby-Steps App — Architecture Reference

> **Purpose:** Authoritative architectural reference for the Baby-Steps rebuild. All code, schema, and design decisions must align with this document. When Copilot suggests implementations, they must be consistent with these patterns, technology choices, and data models.
>
> **Status:** In active development. Stories pipeline is live end-to-end. Games system is being designed — hardcoded mechanics will be built before CMS integration, one game type at a time. See Build Timeline for current progress.

---

## Project Overview

**What we're building:**
Baby-Steps is a React Native educational app for Ugandan children (ages 3–11) with two distinct account types and two distinct UI modes.

**Account types (MVP):**
- **Parent accounts** — individual families, 3 subscription tiers (Free / Basic / Premium) via Apple/Google IAP
- **School accounts** — institutions licensed for full content access, paid via Flutterwave or invoice; branded per school
- **General user accounts** — post-MVP only

**Two UI modes:**
- **Parent / School view** — vertical portrait layout, dashboard-style
- **Child view** — horizontal landscape layout. Bottom nav: **Home**, **Games**, **Stories**, **Bible**, **Quiz**

**Content model:**
- Game mechanics are hardcoded in the app. The CMS manages the content within those mechanics.
- No content is hardcoded in the app — everything is CMS-driven via Supabase.

**Infrastructure:**
- Supabase: database, auth, storage, edge functions
- Next.js CMS (`babysteps-cms` repo): content management — fully operational for stories
- WatermelonDB: offline caching — Stage 9, not yet implemented
- Multi-language: Luganda (Phase 1), Runyankole (Phase 2)
- COPPA-compliant AdMob ads on free parent tier

---

## Technology Stack

### Mobile App

| Layer | Technology |
|---|---|
| Framework | React Native CLI 0.76+ |
| Language | TypeScript 5.x |
| Navigation | React Navigation v6 |
| Styling | NativeWind |
| State Management | Zustand + React Query |
| Local Database | WatermelonDB (Stage 9 — not yet implemented) |
| Authentication | Supabase Auth |
| Forms | React Hook Form |
| Payments (iOS) | react-native-iap (StoreKit 2) |
| Payments (Android) | react-native-iap (Play Billing) |
| Payments (Schools) | Flutterwave React Native SDK |
| Ads | react-native-google-mobile-ads (AdMob) |
| Push Notifications | Firebase Cloud Messaging (Stage 10) |
| Analytics | Firebase Analytics (COPPA-compliant) |
| TTS | @react-native-tts + Sunbird API |
| Media | react-native-video (installed — story audio) |
| Animations | lottie-react-native (planned — Shana mascot, Stage TBD) |
| Orientation | react-native-orientation-locker |
| Testing | Jest + React Native Testing Library + Detox |

### Backend & CMS

| Layer | Technology |
|---|---|
| Platform | Supabase (PostgreSQL 15+, Auth, Storage, Edge Functions) |
| CMS | Next.js 15 (App Router) + Shadcn/ui, deployed on Vercel |

### DevOps

| Function | Technology |
|---|---|
| CI/CD | GitHub Actions |
| iOS builds | Fastlane + Match |
| Android builds | Fastlane |
| Beta | TestFlight + Google Internal Testing |
| Crash reporting | Sentry |

---

## UI Architecture

### Child View — Landscape (Horizontal)

| Tab | Status |
|---|---|
| 🏠 Home — streak, quick-nav, recommended rail | ✅ Built (streak hardcoded, wiring Stage 5b) |
| 🎮 Games | Stage 5 |
| 📖 Stories | ✅ Live |
| ✝️ Bible | Stage 6 |
| ❓ Quiz | Stage 6 |

**Shana mascot:** A recurring animated character using Lottie `.lottie` files bundled with the app. The CMS does not manage Shana animations — they are hardcoded assets. Shana will appear on the child home screen, game completion screens, and achievement unlocks. Planned for a future stage after core game mechanics are built.

---

## Navigation Architecture

```
App.tsx
  └── RootNavigator
        ├── AuthNavigator        ← session === null
        │     ├── WelcomeScreen
        │     ├── AccountTypeScreen
        │     ├── SignUpScreen
        │     ├── SignInScreen
        │     ├── VerifyEmailScreen     { email }
        │     ├── ForgotPasswordScreen
        │     └── SchoolContactScreen
        ├── AppNavigator         ← session !== null AND child mode inactive
        │     ├── HomeScreen
        │     ├── ChildDetailScreen    { childId }
        │     ├── AddChildScreen       { onChildAdded? }
        │     ├── AllChildrenScreen
        │     ├── SettingsScreen
        │     ├── AchievementsScreen
        │     ├── ActivitiesScreen
        │     └── ExitPinScreen        { onExitConfirmed }
        └── ChildModeNavigator   ← child mode active
              └── ChildStack (native stack)
                    ├── ChildTabs (bottom tab navigator)
                    │     ├── ChildHomeTab
                    │     ├── GamesTab
                    │     ├── StoriesTab
                    │     ├── BibleTab
                    │     └── QuizTab
                    ├── StoryReader   { storyContentId, quizOnlyMode?, skipQuizMode?, initialPageIndex? }
                    └── GamePlayer    { gameContentId, gameType, unitId? }
```

**Key navigation rules:**
- No screen calls `navigation.navigate()` after sign-in — `onAuthStateChange` handles the stack swap declaratively
- `StoryReader` and `GamePlayer` are stack screens above tabs — tab bar hidden while in use
- `ChildHeader` injected by navigator via `WithHeader` — no screen renders its own header
- Child data always from `useChildMode()` — never via route params

---

## Game System Architecture

This section defines the full game system. Read this before writing any game-related code.

### Game Categories and Types

Games are organised into **categories** (feature modules) and **types** (individual mechanics). These are different things.

| Category | Game Types |
|---|---|
| `core_learning` | `tap_to_learn`, `listen_and_choose`, `word_match`, `simple_quiz` |
| `language_building` | `fill_letters`, `word_match` (advanced), `simple_quiz` (advanced) |
| `numbers_logic` | `counting`, `simple_quiz` (numeric) |
| `creativity` | `puzzle`, `story_minigame` |

**Category** is metadata on `game_templates` and is `NOT NULL` — every template must have a category assigned. The games screen category tabs depend on this. **Type** is what determines which hardcoded React Native screen handles the game.

Each `game_type` has:
- One hardcoded React Native mechanic screen in the app
- One dedicated CMS editor tab under `/games/[id]/edit`
- Its own `content_json` shape (documented below)

### Progression Model — Units and Levels

The progression system is **Duolingo-style**: games are organised into units, units into levels. Unlocking is **both progress-gated and subscription-gated**.

```
game_template
  └── game_units  (thematic blocks, e.g. "Unit 1: Animals", "Unit 2: Food")
        └── levels[]  (individual interactions, stored in game_unit_content.content_json)
```

**Unlock rules (both must pass):**
1. **Progress gate:** child must have `child_unit_progress.status = 'completed'` for the previous unit
2. **Subscription gate:** child's parent subscription rank must be >= `game_units.tier_required` rank

Example:
- Unit 1: `tier_required = 'free'`, no previous unit → always accessible
- Unit 2: `tier_required = 'free'`, requires unit 1 complete → free users can access after finishing unit 1
- Unit 5: `tier_required = 'basic'` → Basic and Premium subscribers only, AND must have completed unit 4

**This means a free user who completes unit 4 still cannot access unit 5 — they see it locked with an upgrade prompt.**

### XP System

XP is earned per level completion. XP amounts are defined per level in `content_json`. XP feeds:
- `child_game_progress.total_xp` — running XP total per game per child
- Streak achievements (`xp_100`, `xp_500`, `xp_1000`)
- Parent dashboard engagement metrics

### Game Types — Content Shapes

Each game type has a distinct `content_json` shape. The CMS editor for each type is built to match its shape.

#### `tap_to_learn`
Tap an image to hear its name. No wrong answers. Pure vocabulary exposure.
```json
{
  "items": [
    { "id": "item_1", "label": "Ente", "image_url": "...", "audio_url": "...", "xp": 5 }
  ]
}
```

#### `word_match`
A word/text is shown. Child picks the matching image from a grid of options.
```json
{
  "items": [
    {
      "id": "item_1",
      "text": "Ente",
      "audio_url": "...",
      "correct_image_url": "...",
      "distractor_image_urls": ["...", "...", "..."],
      "xp": 10
    }
  ]
}
```

#### `listen_and_choose`
An audio clip plays. Child picks the matching image from options.
```json
{
  "items": [
    {
      "id": "item_1",
      "audio_url": "...",
      "options": [
        { "id": "a", "image_url": "...", "correct": true },
        { "id": "b", "image_url": "...", "correct": false },
        { "id": "c", "image_url": "...", "correct": false },
        { "id": "d", "image_url": "...", "correct": false }
      ],
      "xp": 10
    }
  ]
}
```

#### `simple_quiz`
Text question with text or image answer options. Same shape as story `questions_json` with added `xp` field.
```json
{
  "items": [
    {
      "id": "item_1",
      "question_text": "Ente means...",
      "question_audio_url": null,
      "options": [
        { "id": "a", "text": "Cow", "correct": true },
        { "id": "b", "text": "Dog", "correct": false }
      ],
      "explanation": "Ente is the Luganda word for cow.",
      "xp": 10
    }
  ]
}
```

#### `counting`
A number is shown with a quantity of objects. Child taps the correct number from options.
```json
{
  "items": [
    {
      "id": "item_1",
      "number": 3,
      "label_audio_url": "...",
      "quantity_image_url": "...",
      "options": [1, 2, 3, 4],
      "xp": 10
    }
  ]
}
```

#### `fill_letters`
A word with missing letters. Child taps letters to fill the blanks.
```json
{
  "items": [
    {
      "id": "item_1",
      "word": "ENTE",
      "image_url": "...",
      "audio_url": "...",
      "blanks": [1, 3],
      "available_letters": ["E", "N", "T", "E", "A", "O"],
      "xp": 15
    }
  ]
}
```

#### `puzzle`
An image is split into pieces. Child taps or drags pieces into place.
```json
{
  "items": [
    {
      "id": "item_1",
      "full_image_url": "...",
      "grid_size": 3,
      "audio_url": null,
      "xp": 20
    }
  ]
}
```

### Game Build Order

Build game mechanics in this order — each one is a prerequisite for the next:

```
1. tap_to_learn     — simplest, no wrong answers, establishes game session pattern
2. word_match       — adds correct/incorrect feedback loop
3. listen_and_choose — adds audio-driven interaction
4. simple_quiz      — adds text-based questions, reuses story question UI
5. counting         — adds number logic
6. fill_letters     — adds keyboard/letter interaction
7. puzzle           — most complex, adds spatial interaction
8. story_minigame   — last, depends on story system
```

For each game type:
1. Build the hardcoded React Native mechanic screen
2. Wire to real `game_unit_content` data from Supabase
3. Build the CMS editor tab for that game type
4. Wire session tracking and XP

**Do not build all game types at once.** One at a time, fully integrated, before moving to the next.

### Language Filtering

Game content is language-scoped at the `game_unit_content` level. Every `game_unit_content` row has a `language_id` that matches one row in `content_languages`. The app always filters content by the active child's `preferred_language`.

**The rule:** a unit only exists for a child if there is a published `game_unit_content` row for that unit **in the child's language**. If no published row exists for the child's language, the unit is not shown at all — it does not appear as locked, it simply does not exist from that child's perspective.

This is different from subscription locking, which shows a locked tile with an upgrade prompt. Language absence means the content has not been authored yet — the unit is invisible.

```
Example:
  Unit 1 — Luganda content: published ✅ → visible to Luganda children
  Unit 1 — Runyankole content: draft ⚠️  → invisible to Runyankole children
  Unit 2 — Luganda content: published ✅ → visible to Luganda children
  Unit 2 — Runyankole content: (none)    → invisible to Runyankole children
```

**Hook query pattern — `useGameUnitContent`:**
```typescript
// Always filter by child's preferred_language and published status
const { data } = useQuery({
  queryKey: ['game-unit-content', unitId, child.preferredLanguage],
  queryFn: () =>
    supabase
      .from('game_unit_content')
      .select('*')
      .eq('unit_id', unitId)
      .eq('language_id', child.preferredLanguage)  // child.preferredLanguage is a UUID
      .eq('status', 'published')
      .single(),
  staleTime: 3 * 60 * 1000,
});
```

**`useGames` hook pattern:**
```typescript
// Only return units that have published content for the child's language
// Join game_unit_content filtered by language_id = child.preferred_language AND status = 'published'
// Units without a matching published game_unit_content row are excluded entirely
```

`language_id` is always a UUID. Never filter by language code string (e.g. `'lg'`). Always use the UUID from `child.preferred_language`.

> **TODO Stage 8:** add subscription tier filtering to `useGames`. Currently returns all units regardless of tier.

---



```
Free   → max 1 child
Basic  → max 3 children
Premium → unlimited
```

Enforced in the `addChild` Server Action / Edge Function. Check child count against subscription rank before inserting. Current `addChild` implementation has a `// TODO Stage 8: enforce child account limits` comment.

---

## Activity, Progress, Streaks and Achievements

### The Full Flow

```
child does anything (story, game, bible, quiz, coloring)
  ↓
session row written (typed session table)
  ↓
activity_log row written (always — the cross-cutting feed and streak source)
  ↓
update-streak Edge Function (async, fire and forget)
  ↓ updates child_streaks
check-achievements Edge Function (async, fire and forget)
  ↓ evaluates thresholds, inserts into child_achievements if earned
  ↓ returns awarded achievement keys to app
app shows achievement toast if any were awarded
parent dashboard reads activity_log for activity feed
parent dashboard reads child_daily_stats view for learning time
parent dashboard reads child_achievements for display
child home screen reads child_streaks for 7-day pill row
```

### Daily Learning Time

Computed from `duration_seconds` across all session tables per child per calendar day. Surfaced on the **parent dashboard only**. Computed at query time — no separate aggregation table needed at current scale.

```sql
-- Parent dashboard query for today's learning time per child
SELECT
  child_id,
  SUM(duration_seconds) as total_seconds_today
FROM (
  SELECT child_id, duration_seconds FROM game_sessions
    WHERE child_id = :childId AND DATE(started_at) = CURRENT_DATE AND completed = true
  UNION ALL
  SELECT child_id, duration_seconds FROM story_sessions
    WHERE child_id = :childId AND DATE(started_at) = CURRENT_DATE AND completed = true
  UNION ALL
  SELECT child_id, duration_seconds FROM bible_sessions
    WHERE child_id = :childId AND DATE(started_at) = CURRENT_DATE AND completed = true
  UNION ALL
  SELECT child_id, duration_seconds FROM quiz_sessions
    WHERE child_id = :childId AND DATE(started_at) = CURRENT_DATE AND completed = true
) all_sessions
GROUP BY child_id;
```

### Achievements — Full Catalogue

```sql
INSERT INTO achievement_definitions
  (key, title, description, category, trigger_type, trigger_value, content_type, is_active)
VALUES
  -- Story achievements
  ('first_story',        'First Story',          'Complete your first story',              'story',     'completion', 1,   'story', true),
  ('story_reader_5',     'Bookworm',             'Complete 5 stories',                     'story',     'completion', 5,   'story', true),
  ('story_reader_10',    'Story Master',         'Complete 10 stories',                    'story',     'completion', 10,  'story', true),
  -- Game achievements
  ('first_game',         'Player One',           'Complete your first game level',         'game',      'completion', 1,   'game',  true),
  ('game_levels_10',     'Level Up',             'Complete 10 game levels',                'game',      'completion', 10,  'game',  true),
  ('game_levels_50',     'Game Champion',        'Complete 50 game levels',                'game',      'completion', 50,  'game',  true),
  ('first_tap_game',     'Curious Learner',      'Complete your first Tap to Learn session','game',     'completion', 1,   'game',  true),
  ('word_matcher',       'Word Wizard',          'Match 10 words correctly',               'game',      'completion', 10,  'game',  true),
  ('perfect_listener',   'Eagle Ears',           'Get 100% on a Listen and Choose game',   'game',      'score',      100, 'game',  true),
  ('first_puzzle',       'Puzzle Solver',        'Complete your first puzzle',             'game',      'completion', 1,   'game',  true),
  ('unit_complete',      'Unit Graduate',        'Complete your first unit',               'milestone', 'completion', 1,   'any',   true),
  ('five_units',         'Unit Master',          'Complete 5 units',                       'milestone', 'completion', 5,   'any',   true),
  -- Bible achievements
  ('first_bible',        'Scripture Explorer',   'Read your first Bible passage',          'bible',     'completion', 1,   'bible', true),
  ('bible_reader_5',     'Scripture Reader',     'Read 5 Bible passages',                  'bible',     'completion', 5,   'bible', true),
  -- Quiz achievements
  ('first_quiz',         'Quiz Starter',         'Complete your first quiz',               'quiz',      'completion', 1,   'quiz',  true),
  ('quiz_perfect',       'Perfect Score',        'Get 100% on a quiz',                     'quiz',      'score',      100, 'quiz',  true),
  -- Streak achievements
  ('streak_3',           '3 Day Streak',         'Learn 3 days in a row',                  'streak',    'streak',     3,   'any',   true),
  ('streak_7',           'Week Warrior',         'Learn 7 days in a row',                  'streak',    'streak',     7,   'any',   true),
  ('streak_14',          'Fortnight Champion',   'Learn 14 days in a row',                 'streak',    'streak',     14,  'any',   true),
  ('streak_30',          'Monthly Champion',     'Learn 30 days in a row',                 'streak',    'streak',     30,  'any',   true),
  -- XP achievements
  ('xp_100',             'XP Collector',         'Earn 100 XP',                            'milestone', 'score',      100, 'any',   true),
  ('xp_500',             'XP Hunter',            'Earn 500 XP',                            'milestone', 'score',      500, 'any',   true),
  ('xp_1000',            'XP Legend',            'Earn 1000 XP',                           'milestone', 'score',      1000,'any',   true);
```

---

## Stories Pipeline (Live)

See `docs/stories.md` for full detail.

- Hard delete with verified cascade chain: `story_templates → story_content → story_sessions`
- `story_sessions.story_content_id` FK is `ON DELETE CASCADE` — verified present in DB
- `staleTime = 3 minutes` — CMS changes propagate within minutes
- Story progress cards: not_started / in_progress (progress bar) / completed (checkmark) / failed quiz (retry button)
- Session tracking requires `FOR UPDATE` RLS policy — verified present on all session tables

---

## Security Architecture

### The Seven Rules

1. The client is untrusted — every access rule lives in DB RLS or Edge Function guard
2. Service role key never leaves the server — Edge Function env vars only
3. Webhook endpoints verify signatures before doing anything else
4. User-facing Edge Functions verify JWT first
5. All URLs in JSONB fields validated before publish
6. All queries use parameterised queries — never string-interpolate user input
7. Never commit secrets — `.env*` in `.gitignore`

### Session Fetching Pattern

Always `supabase.auth.getSession()` in hooks on mount — never `supabase.auth.getUser()`.

### Environment Variables

```
SUPABASE_URL / SUPABASE_ANON_KEY          ✅ safe in app bundle
SUPABASE_SERVICE_ROLE_KEY                 ❌ Edge Functions / CMS server only
FLUTTERWAVE_SECRET_KEY / WEBHOOK_SECRET   ❌ server only
APPLE_SHARED_SECRET                       ❌ server only
```

---

## Database Schema

This section is the **authoritative schema reference**. Do not use migration files for column definitions — use this section.

### Applied Migrations

| Migration | Purpose |
|---|---|
| `20260306165924_initial_schema.sql` | Full initial schema |
| Migration 2 | Language fix — removed English, seeded Luganda + Runyankole |
| Migration 3 | SECURITY DEFINER RLS helpers |
| `20260401074429_undo_soft_delete.sql` | Reverted soft-delete columns |
| `20260401113000_story_sessions_update_policy.sql` | FOR UPDATE on story_sessions |
| Manual SQL | FOR UPDATE on all other session tables |
| Manual SQL | story_sessions FK corrected SET NULL → CASCADE (verified in DB) |
| Manual SQL | `game_sessions.game_content_id` made nullable for unit-based session path |
| Manual SQL | `game_templates.game_category` enforced NOT NULL |
| Manual SQL | `child_achievements` UNIQUE(child_id, achievement_id) confirmed present |
| Manual SQL | `game_sessions` CHECK constraint — `game_content_id` or `unit_id` must be non-null |

---

### RLS Helper Functions

```sql
CREATE OR REPLACE FUNCTION public.get_user_org_ids()
RETURNS SETOF UUID LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT organization_id FROM organization_users WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_user_admin_org_ids()
RETURNS SETOF UUID LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT organization_id FROM organization_users WHERE user_id = auth.uid() AND role = 'admin';
$$;

CREATE OR REPLACE FUNCTION public.get_user_staff_org_ids()
RETURNS SETOF UUID LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT organization_id FROM organization_users WHERE user_id = auth.uid() AND role IN ('admin', 'teacher');
$$;

CREATE OR REPLACE FUNCTION public.get_staff_child_ids()
RETURNS SETOF UUID LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT c.id FROM children c
  JOIN organization_users ou ON c.school_id = ou.organization_id
  WHERE ou.user_id = auth.uid() AND ou.role IN ('admin', 'teacher');
$$;
```

**Rule:** Never write `SELECT ... FROM organization_users` inside an RLS policy directly.

---

### 1. subscription_tier_order

```sql
CREATE TABLE subscription_tier_order (
  tier VARCHAR(50) PRIMARY KEY,
  rank INTEGER NOT NULL UNIQUE
);
INSERT INTO subscription_tier_order (tier, rank) VALUES
  ('free', 1), ('basic', 2), ('premium', 3), ('school', 4), ('enterprise', 5);
```

Never compare tier names as strings. Always join and compare `rank` integers.

---

### 2. content_languages

```sql
CREATE TABLE content_languages (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  code          VARCHAR(10)  NOT NULL UNIQUE,
  name          VARCHAR(100) NOT NULL,
  native_name   VARCHAR(100),
  rtl_flag      BOOLEAN      NOT NULL DEFAULT false,
  is_active     BOOLEAN      NOT NULL DEFAULT true,
  display_order INTEGER      NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
INSERT INTO content_languages (code, name, native_name, display_order, is_active) VALUES
  ('lg', 'Luganda', 'Luganda', 1, true),
  ('rk', 'Runyankole', 'Runyankole', 2, false);

ALTER TABLE content_languages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active languages"
  ON content_languages FOR SELECT USING (is_active = true);
```

---

### 3–5. organizations / organization_users / classes

*(Full SQL unchanged from previous version — see initial schema migration)*

---

### 6. individual_profiles

```sql
CREATE TABLE individual_profiles (
  id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID         NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name       VARCHAR(255) NOT NULL,
  account_type       VARCHAR(20)  NOT NULL DEFAULT 'parent'
                       CHECK (account_type IN ('parent', 'individual', 'school_admin', 'teacher')),
  date_of_birth      DATE,
  preferred_language UUID         REFERENCES content_languages(id),
  difficulty_level   VARCHAR(50)  NOT NULL DEFAULT 'adaptive',
  avatar_url         TEXT,
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
ALTER TABLE individual_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile"
  ON individual_profiles FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER set_updated_at BEFORE UPDATE ON individual_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### 7–9. subscriptions / payment_transactions / school_invoices

*(Full SQL unchanged — see initial schema migration)*

---

### 10. children

```sql
CREATE TABLE children (
  id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id          UUID         REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id          UUID         REFERENCES organizations(id) ON DELETE SET NULL,
  preferred_language UUID         NOT NULL REFERENCES content_languages(id),
  display_name       VARCHAR(100) NOT NULL,
  age_range          VARCHAR(10)  NOT NULL CHECK (age_range IN ('3-5', '6-8', '9-11')),
  difficulty_level   VARCHAR(50)  NOT NULL DEFAULT 'adaptive',
  avatar_url         TEXT,
  is_active          BOOLEAN      NOT NULL DEFAULT true,
  last_sync_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  CONSTRAINT parent_or_school CHECK (
    (parent_id IS NOT NULL AND school_id IS NULL) OR
    (parent_id IS NULL AND school_id IS NOT NULL)
  )
);
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents select own children"
  ON children FOR SELECT USING (parent_id IS NOT NULL AND auth.uid() = parent_id);
CREATE POLICY "Parents insert own children"
  ON children FOR INSERT WITH CHECK (auth.uid() = parent_id AND school_id IS NULL);
CREATE POLICY "Parents update own children"
  ON children FOR UPDATE USING (parent_id IS NOT NULL AND auth.uid() = parent_id);
CREATE POLICY "Parents delete own children"
  ON children FOR DELETE USING (parent_id IS NOT NULL AND auth.uid() = parent_id);
CREATE POLICY "School staff select school children"
  ON children FOR SELECT USING (school_id IN (SELECT get_user_staff_org_ids()));
CREATE INDEX idx_children_parent_school ON children(parent_id, school_id);
CREATE TRIGGER set_updated_at BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### 11. class_enrollments

*(Unchanged — see initial schema)*

---

### 12. game_templates

> `game_category` is `NOT NULL` — every template must have a category before saving. The games screen category tabs depend on this. The CMS `/games/new` form must require this field.

```sql
CREATE TABLE game_templates (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  game_key       VARCHAR(100) NOT NULL UNIQUE,
  display_name   VARCHAR(255) NOT NULL,
  description    TEXT,
  game_type      VARCHAR(50)  NOT NULL
                   CHECK (game_type IN ('tap_to_learn','word_match','listen_and_choose',
                                        'simple_quiz','counting','fill_letters','puzzle','story_minigame')),
  game_category  VARCHAR(50)  NOT NULL
                   CHECK (game_category IN ('core_learning','language_building','numbers_logic','creativity')),
  mechanics_json JSONB        NOT NULL DEFAULT '{}',
  age_range_min  INTEGER      NOT NULL DEFAULT 3,
  age_range_max  INTEGER      NOT NULL DEFAULT 12,
  tier_required  VARCHAR(50)  NOT NULL DEFAULT 'free' REFERENCES subscription_tier_order(tier),
  is_active      BOOLEAN      NOT NULL DEFAULT true,
  display_order  INTEGER      NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
ALTER TABLE game_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users read active game templates"
  ON game_templates FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);
CREATE TRIGGER set_updated_at BEFORE UPDATE ON game_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### 13. game_content

> Still exists for backward compatibility. The active content path for progression games is `game_units → game_unit_content`. Simple one-off games without progression may still use `game_content` directly.

*(Full SQL unchanged — see initial schema migration)*

---

### 14–15. story_templates / story_content

*(Unchanged — fully implemented, see docs/stories.md)*

---

### 16–19. bible / quiz templates and content

*(Unchanged — Stage 6)*

---

### 20–23. animation / content_versions / content_view_events

*(Unchanged)*

---

### 24. achievement_definitions

```sql
CREATE TABLE achievement_definitions (
  id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  key               VARCHAR(100) NOT NULL UNIQUE,
  title             VARCHAR(255) NOT NULL,
  description       TEXT,
  icon_url          TEXT,
  category          VARCHAR(50)  CHECK (category IN ('game','story','bible','quiz','streak','milestone','language')),
  trigger_type      VARCHAR(50)  NOT NULL CHECK (trigger_type IN ('score','completion','streak','manual')),
  trigger_value     INTEGER,
  content_type      VARCHAR(50)  CHECK (content_type IN ('game','story','bible','quiz','any')),
  tier_required     VARCHAR(50)  NOT NULL DEFAULT 'free' REFERENCES subscription_tier_order(tier),
  language_specific BOOLEAN      NOT NULL DEFAULT false,
  is_active         BOOLEAN      NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
ALTER TABLE achievement_definitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users read active achievement definitions"
  ON achievement_definitions FOR SELECT
  USING (auth.role() = 'authenticated' AND is_active = true);
```

---

### 25. child_achievements

> The `UNIQUE(child_id, achievement_id)` constraint is **load-bearing**. The `check-achievements` Edge Function relies on it for idempotency — if it is ever dropped, the same achievement can be awarded multiple times to the same child. Verified present in DB.
>
> **MVP write policy:** App-client INSERT is permitted for own children (see RLS below). The intended write path is via the `check-achievements` Edge Function, but the client INSERT policy is kept for MVP simplicity and as a resilience fallback if the Edge Function call fails. The UNIQUE constraint is the idempotency guarantee regardless of write path.
>
> **Post-MVP hardening (future):** Two options — (a) remove the client INSERT policy and make writes service-role only, matching the `child_streaks` pattern; or (b) replace the Edge Function entirely with a PostgreSQL trigger on `activity_log INSERT` that evaluates achievement thresholds server-side automatically — no client call required, achievements awarded atomically when activity is recorded.

```sql
CREATE TABLE child_achievements (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id             UUID        NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  achievement_id       UUID        NOT NULL REFERENCES achievement_definitions(id),
  earned_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  context_session_type VARCHAR(50),
  context_session_id   UUID,
  synced_to_cloud      BOOLEAN     NOT NULL DEFAULT false,
  UNIQUE(child_id, achievement_id)
);
CREATE INDEX idx_child_achievements_child ON child_achievements(child_id);
ALTER TABLE child_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents read own children achievements"
  ON child_achievements FOR SELECT
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "App inserts achievements for own children"
  ON child_achievements FOR INSERT
  WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "School staff read org children achievements"
  ON child_achievements FOR SELECT
  USING (child_id IN (SELECT get_staff_child_ids()));
```

---

### 26. child_streaks

> No client-facing INSERT or UPDATE RLS policy by design. All writes go through the `update-streak` Edge Function using `SUPABASE_SERVICE_ROLE_KEY`. If that Edge Function ever uses the anon key instead, streak writes will silently fail with no error surfaced to the user. Verify the key in your Supabase Edge Function environment variables before Stage 5b.

```sql
CREATE TABLE child_streaks (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id            UUID        NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
  current_streak      INTEGER     NOT NULL DEFAULT 0,
  longest_streak      INTEGER     NOT NULL DEFAULT 0,
  last_activity_date  DATE,
  streak_updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE child_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents read own children streaks"
  ON child_streaks FOR SELECT
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "School staff read org children streaks"
  ON child_streaks FOR SELECT
  USING (child_id IN (SELECT get_staff_child_ids()));
CREATE INDEX idx_child_streaks_child       ON child_streaks(child_id);
CREATE INDEX idx_child_streaks_last_active ON child_streaks(last_activity_date);
```

---

### 27. push_tokens

*(Stage 10 — table created, not yet wired)*

---

### 28. game_units

```sql
CREATE TABLE game_units (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id    UUID         NOT NULL REFERENCES game_templates(id) ON DELETE CASCADE,
  unit_number    INTEGER      NOT NULL,
  title          VARCHAR(255) NOT NULL,
  description    TEXT,
  tier_required  VARCHAR(50)  NOT NULL DEFAULT 'free' REFERENCES subscription_tier_order(tier),
  display_order  INTEGER      NOT NULL DEFAULT 0,
  is_active      BOOLEAN      NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  UNIQUE(template_id, unit_number)
);

ALTER TABLE game_units ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users read active game units"
  ON game_units FOR SELECT
  USING (auth.role() = 'authenticated' AND is_active = true);

CREATE INDEX idx_game_units_template ON game_units(template_id, display_order);
```

---

### 29. game_unit_content

```sql
CREATE TABLE game_unit_content (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id      UUID        NOT NULL REFERENCES game_units(id) ON DELETE CASCADE,
  language_id  UUID        NOT NULL REFERENCES content_languages(id),
  content_json JSONB       NOT NULL DEFAULT '{}',
  version      VARCHAR(20) NOT NULL DEFAULT '1.0.0',
  status       VARCHAR(20) NOT NULL DEFAULT 'draft'
                 CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  published_by UUID        REFERENCES auth.users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_game_unit_content_one_published
  ON game_unit_content(unit_id, language_id) WHERE status = 'published';

ALTER TABLE game_unit_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users read published game unit content"
  ON game_unit_content FOR SELECT
  USING (auth.role() = 'authenticated' AND status = 'published');

CREATE INDEX idx_game_unit_content_unit ON game_unit_content(unit_id, language_id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON game_unit_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### 30. child_unit_progress

```sql
CREATE TABLE child_unit_progress (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id     UUID        NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  unit_id      UUID        NOT NULL REFERENCES game_units(id) ON DELETE CASCADE,
  status       VARCHAR(20) NOT NULL DEFAULT 'locked'
                 CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
  xp_earned    INTEGER     NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(child_id, unit_id)
);

ALTER TABLE child_unit_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents read own children unit progress"
  ON child_unit_progress FOR SELECT
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "App inserts unit progress for own children"
  ON child_unit_progress FOR INSERT
  WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "App updates unit progress for own children"
  ON child_unit_progress FOR UPDATE
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()))
  WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "School staff read org children unit progress"
  ON child_unit_progress FOR SELECT
  USING (child_id IN (SELECT get_staff_child_ids()));

CREATE INDEX idx_child_unit_progress_child ON child_unit_progress(child_id);
CREATE INDEX idx_child_unit_progress_unit  ON child_unit_progress(unit_id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON child_unit_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### 31. child_game_progress

```sql
CREATE TABLE child_game_progress (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id         UUID        NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  game_template_id UUID        NOT NULL REFERENCES game_templates(id) ON DELETE CASCADE,
  total_xp         INTEGER     NOT NULL DEFAULT 0,
  current_unit_id  UUID        REFERENCES game_units(id) ON DELETE SET NULL,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(child_id, game_template_id)
);

ALTER TABLE child_game_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents read own children game progress"
  ON child_game_progress FOR SELECT
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "App inserts game progress for own children"
  ON child_game_progress FOR INSERT
  WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "App updates game progress for own children"
  ON child_game_progress FOR UPDATE
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()))
  WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "School staff read org children game progress"
  ON child_game_progress FOR SELECT
  USING (child_id IN (SELECT get_staff_child_ids()));

CREATE INDEX idx_child_game_progress_child ON child_game_progress(child_id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON child_game_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### 32. game_sessions

> `game_content_id` is **nullable**. Rows using the unit-based progression path (`game_units → game_unit_content`) set `game_content_id = NULL` and populate `unit_id` instead. Rows using the legacy flat-content path populate `game_content_id`. Never make `game_content_id` NOT NULL — doing so blocks all unit-based game session writes.
>
> A `CHECK` constraint enforces that at least one reference is always populated: `CHECK ((game_content_id IS NOT NULL) OR (unit_id IS NOT NULL))`. Never remove this constraint — a session row with both fields NULL is invalid.

```sql
CREATE TABLE game_sessions (
  id                 UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id           UUID          NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  game_content_id    UUID          REFERENCES game_content(id) ON DELETE SET NULL,  -- nullable: unit-based sessions use unit_id instead
  unit_id            UUID          REFERENCES game_units(id) ON DELETE SET NULL,
  CONSTRAINT game_session_has_content CHECK (
    (game_content_id IS NOT NULL) OR (unit_id IS NOT NULL)
  ),
  started_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  completed_at       TIMESTAMPTZ,
  duration_seconds   INTEGER,
  score              INTEGER,
  max_score          INTEGER,
  xp_earned          INTEGER       NOT NULL DEFAULT 0,
  level_reached      INTEGER,
  completed          BOOLEAN       NOT NULL DEFAULT false,
  accuracy_pct       DECIMAL(5,2),
  attempts           INTEGER       NOT NULL DEFAULT 1,
  device_id          VARCHAR(255),
  synced_to_cloud    BOOLEAN       NOT NULL DEFAULT false,
  offline_created_at TIMESTAMPTZ
);
CREATE INDEX idx_game_sessions_child_sync ON game_sessions(child_id, synced_to_cloud);
CREATE INDEX idx_game_sessions_child_date ON game_sessions(child_id, started_at DESC);
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents read own children game sessions"
  ON game_sessions FOR SELECT USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "App inserts game sessions for own children"
  ON game_sessions FOR INSERT WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "App updates game sessions for own children"
  ON game_sessions FOR UPDATE
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()))
  WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));
CREATE POLICY "School staff read org children game sessions"
  ON game_sessions FOR SELECT USING (child_id IN (SELECT get_staff_child_ids()));
```

---

### 33. story_sessions

> `story_content_id` FK is `ON DELETE CASCADE` — verified present in DB. Deleting a `story_content` row automatically removes all associated sessions.

```sql
CREATE TABLE story_sessions (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id           UUID        NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  story_content_id   UUID        NOT NULL REFERENCES story_content(id) ON DELETE CASCADE,
  started_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at       TIMESTAMPTZ,
  duration_seconds   INTEGER,
  pages_read         INTEGER     NOT NULL DEFAULT 0,
  total_pages        INTEGER,
  completed          BOOLEAN     NOT NULL DEFAULT false,
  quiz_score         INTEGER,
  quiz_max_score     INTEGER,
  device_id          VARCHAR(255),
  synced_to_cloud    BOOLEAN     NOT NULL DEFAULT false,
  offline_created_at TIMESTAMPTZ
);
-- SELECT, INSERT, UPDATE, School staff SELECT policies all applied
-- UPDATE policy added via migration 20260401113000
```

---

### 34–37. bible_sessions / quiz_sessions / coloring_sessions / activity_log

*(All have SELECT, INSERT, UPDATE RLS policies — see initial schema and manual migrations)*

---

### Database Triggers

```sql
-- update_updated_at (applied to all tables with updated_at column)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

-- handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.individual_profiles (user_id, display_name, account_type)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name','User'),
          COALESCE(NEW.raw_user_meta_data->>'account_type','parent'));
  RETURN NEW;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

### RLS Summary

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `children` | Parent + school staff | Parent | Parent | Parent |
| `individual_profiles` | Own | Own | Own | Own |
| `organization_users` | Own org | Org admin | Org admin (not self) | Org admin |
| `subscriptions` | Own / org admin | Service role | Service role | — |
| `game_templates` | Authenticated (active) | Service role | Service role | — |
| `game_content` | Authenticated (published) | Service role | Service role | — |
| `game_units` | Authenticated (active) | Service role | Service role | — |
| `game_unit_content` | Authenticated (published) | Service role | Service role | — |
| `story_templates` | Authenticated (active) | Service role | Service role | — |
| `story_content` | Authenticated (published) | Service role | Service role | — |
| `game_sessions` | Parent + school staff | Parent (own children) | Parent (own children) | — |
| `story_sessions` | Parent + school staff | Parent (own children) | Parent (own children) | — |
| `bible_sessions` | Parent + school staff | Parent (own children) | Parent (own children) | — |
| `quiz_sessions` | Parent + school staff | Parent (own children) | Parent (own children) | — |
| `coloring_sessions` | Parent | Parent (own children) | Parent (own children) | — |
| `activity_log` | Parent | Parent (own children) | Parent (own children) | — |
| `child_unit_progress` | Parent + school staff | Parent (own children) | Parent (own children) | — |
| `child_game_progress` | Parent + school staff | Parent (own children) | Parent (own children) | — |
| `child_achievements` | Parent + school staff | Parent (own children) — MVP; service role only post-MVP | — | — |
| `child_streaks` | Parent + school staff | Service role only (Edge Fn) | Service role only (Edge Fn) | — |
| `achievement_definitions` | Authenticated (active) | Service role | Service role | — |
| `push_tokens` | Own | Own | Own | Own |

> **`child_streaks` write note:** No client INSERT/UPDATE policy exists by design. The `update-streak` Edge Function must use `SUPABASE_SERVICE_ROLE_KEY`. Verify this before Stage 5b.

> **`child_achievements` post-MVP note:** Client INSERT policy is retained for MVP simplicity. Post-MVP, harden to service-role only or replace the Edge Function with a PostgreSQL trigger on `activity_log INSERT`. See the child_achievements schema section for full detail.

---

## Content Data Structures

### Game content_json shapes — see Game System Architecture section above

### Story / Bible pages_json — flat array

```json
[{ "page_number": 1, "text": "...", "image_url": "...", "audio_url": null, "narration_speed": "normal" }]
```

Bible adds `"verse_reference": "Genesis 1:1"`. Always flat array — never `{ pages: [...] }`.

### Story / Quiz questions_json — flat array

```json
[{ "question_id": "q1", "question_text": "...", "question_audio_url": null,
   "options": [{ "id": "a", "text": "...", "correct": true }],
   "explanation": "...", "points": 10 }]
```

Always flat array — never `{ questions: [...] }`.

---

## Account Types and Subscription Gating

### Parent Tiers

| Tier | Price | Max Children | Unit Access |
|---|---|---|---|
| Free | — | 1 | Units with `tier_required = 'free'` only |
| Basic | ~5,000 UGX/mo | 3 | Units with rank ≤ 2 |
| Premium | ~20,000 UGX/mo | Unlimited | All units |

Child account limits enforced in `addChild` at Stage 8. Comment `// TODO Stage 8: enforce child account limits` is in `addChild` now.

### Unit Unlock Logic (both conditions required)

```typescript
function canAccessUnit(unit: GameUnit, childProgress: ChildUnitProgress[], userSubscriptionRank: number): boolean {
  // 1. Subscription gate
  if (unit.tierRequiredRank > userSubscriptionRank) return false;

  // 2. Progress gate — first unit is always unlocked
  if (unit.unitNumber === 1) return true;

  // 3. Previous unit must be completed
  const previousUnit = getPreviousUnit(unit);
  const previousProgress = childProgress.find(p => p.unitId === previousUnit.id);
  return previousProgress?.status === 'completed';
}
```

**Never compare tier name strings directly.** Always use rank integers.

Subscription tier filtering in content hooks is **deferred to Stage 8**. All hooks have `// TODO Stage 8: add subscription tier filtering`.

---

## Build Timeline

### ✅ Stage 1 — Working Shell (Complete)
### ✅ Stage 2 — Auth Flow + Parent Dashboard (Complete)
### ✅ Stage 3 — Children (Complete)
### ✅ Stage 4 — Child Mode Navigator (Complete)
### ✅ Stage 4b — Stories Pipeline (Complete)

### ⬜ Stage 5 — Games System

**Phase A — Foundation (tap_to_learn first)**
- ✅ `achievement_definitions` seeded with full catalogue (migration applied)
- `useGames` hook — queries `game_templates` + `game_units` for child language/age
- `useGameProgress` hook — queries `child_game_progress` + `child_unit_progress`
- `GamesScreen` — category tabs, unit path display, locked/unlocked state
- `GamePlayerScreen` — receives `unitContentId` and `gameType`
- `tap_to_learn` mechanic — simplest, establishes session + XP pattern
- Session tracking: `game_sessions` (with `unit_id` set, `game_content_id` NULL) + `activity_log` write + `child_unit_progress` update
- `child_game_progress` upsert on unit completion

**Phase B — Additional mechanics (one at a time)**
- `word_match` mechanic
- `listen_and_choose` mechanic
- `simple_quiz` mechanic
- `counting` mechanic
- `fill_letters` mechanic
- `puzzle` mechanic

**CMS integration after each mechanic:**
- CMS game authoring UI (`/games`, `/games/new`, `/games/[id]/edit`) with type-specific editor per game type
- Each game type gets its own editor tab in the CMS

### ⬜ Stage 5b — Streaks and Achievements
- `update-streak` Edge Function
- `check-achievements` Edge Function (achievement_definitions already seeded)
- `useStreaks` hook — wire ChildHomeScreen streak widget
- `useAchievements` hook — wire AchievementsScreen
- Achievement toast on session completion
- Daily learning time on parent dashboard

### ⬜ Stage 6 — Bible + Quiz Tabs
- Same template+content pattern as stories
- `bible_sessions` and `quiz_sessions` tracking
- CMS authoring UI for both

### ⬜ Stage 7 — School Accounts
- Organisation creation, school email domain detection
- Org admin + teacher dashboards, class management
- School analytics (activity summary per class, per child)
- ThemeContext and school branding
- Invitation code flow

### ⬜ Stage 8 — Payments
- App Store + Play Console product setup first
- iOS StoreKit 2 + Android Play Billing via react-native-iap
- Flutterwave school payment with webhook verification
- **Enforce child account limits in addChild (Free=1, Basic=3, Premium=unlimited)**
- **Add subscription tier + unit access filtering to all content hooks**
- Subscription management screen

### ⬜ Stage 9 — WatermelonDB Offline Caching
- Local schema mirroring content + progress tables
- Sync Edge Function with JWT verification
- Swap direct Supabase queries in all hooks for WatermelonDB reads
- UI unchanged — data source layer only

### ⬜ Stage 10 — Ads, Push Notifications, Polish, Submit
- AdMob COPPA configuration
- Parental gate component
- Push notifications: register token, streak reminders, achievement notifications, weekly summary
- Shana mascot animations via lottie-react-native
- COPPA audit, privacy policy
- App Store + Play Store submission

### Time Estimates

| Stage | Solo Weeks |
|---|---|
| 5 — Games system (all mechanics + CMS) | 8–10 |
| 5b — Streaks + Achievements | 2–3 |
| 6 — Bible + Quiz | 3–4 |
| 7 — School accounts | 4–5 |
| 8 — Payments | 5–6 |
| 9 — WatermelonDB | 3–4 |
| 10 — Ads + Push + Submit | 4–5 |
| **Remaining total** | **29–37 weeks** |

### What to Cut if Behind

Cut: Animations tab, push notifications, School Enterprise tier, Runyankole, class leaderboards, WatermelonDB, puzzle game type, fill_letters game type, story_minigame.

Do NOT cut: RLS policies, UPDATE policies on all session tables, webhook verification, COPPA compliance, receipt validation, streak Edge Functions.

---

## Key Architectural Decisions

1. **No Expo** — full native access required
2. **WatermelonDB deferred to Stage 9** — direct Supabase queries until then
3. **CMS is single source of truth** — no hardcoded content
4. **Tier comparisons use rank integers** — never string comparison
5. **Webhook endpoints verify signatures first** — no exceptions
6. **Service role key is server-only**
7. **Storage buckets have explicit RLS policies**
8. **Hard delete for all content** — cascade handles cleanup, no deleted_at columns
9. **Short staleTime for content hooks** — 3 minutes, CMS changes propagate within minutes
10. **All session tables require SELECT, INSERT, and UPDATE RLS policies** — missing UPDATE causes silent write failures
11. **story_sessions.story_content_id FK is ON DELETE CASCADE** — verified in DB
12. **Subscription tier filtering deferred to Stage 8** — TODO comments in all content hooks
13. **StoryReader and GamePlayer are stack screens above child tabs** — tab bar hidden while in use
14. **Streak calculation is server-side only** — update-streak Edge Function, never on device
15. **Achievement evaluation is server-side only** — check-achievements Edge Function, idempotent via UNIQUE constraint on child_achievements; client INSERT policy retained for MVP, to be hardened post-MVP
16. **activity_log is the single source of truth for daily activity** — used for streak calculation and parent feed
17. **Push notifications are Stage 10** — FCM tokens in push_tokens table
18. **Game progression uses units** — game_units + game_unit_content, not flat levels in game_content
19. **Unit unlocking is dual-gated** — both subscription rank AND previous unit completion required
20. **game_type and game_category are separate concepts** — category is the feature module, type is the mechanic
21. **Each game_type has its own CMS editor tab** — content shapes differ per type
22. **Build game mechanics one at a time** — tap_to_learn first, fully integrated with CMS before moving to next
23. **XP is per-level** — defined in content_json, accumulated in child_game_progress.total_xp
24. **Daily learning time computed from session duration_seconds** — no separate aggregation table at current scale
25. **Shared game asset library deferred** — direct URLs in content_json for now, refactor before launch if needed
26. **Shana mascot uses Lottie** — lottie-react-native, bundled assets, CMS has no role
27. **Child account limits enforced at Stage 8** — addChild has TODO comment, not enforced during development
28. **getSession() not getUser() in all hooks** — getUser() makes network call that returns null before mount
29. **ChildHeader injected by navigator** — all child screens including GamePlayer are header-unaware
30. **Child data always from useChildMode()** — never via route params
31. **game_category is NOT NULL on game_templates** — games screen category tabs depend on every template having a category; CMS must require it on the /games/new form
32. **game_sessions.game_content_id is nullable** — unit-based sessions set unit_id and leave game_content_id NULL; never make this NOT NULL or all unit-based game session writes will fail
33. **child_achievements UNIQUE(child_id, achievement_id) is load-bearing** — never drop this constraint; the check-achievements Edge Function depends on it for idempotency; client INSERT policy retained for MVP simplicity (post-MVP: lock to service role only or replace with activity_log trigger)
34. **child_streaks has no client write policies by design** — all writes via update-streak Edge Function using service role key; verify SUPABASE_SERVICE_ROLE_KEY is set in Edge Function env before Stage 5b
35. **game_sessions must always reference either game_content_id or unit_id** — CHECK constraint enforces this; a session row with both fields NULL is invalid
36. **Game content is language-scoped at game_unit_content level** — a unit is only visible to a child if a published game_unit_content row exists for that unit in the child's preferred_language; no published row = unit is invisible (not locked, not shown)
37. **language_id is always a UUID in all hooks and queries** — never filter by language code string; use child.preferred_language UUID directly

---

## Deliberately Excluded

| Excluded | Reason |
|---|---|
| `assigned_classes UUID[]` | No FK on arrays |
| `subscription_id` on individual_profiles | Circular FK |
| `class_id` on children | Use class_enrollments |
| `subscription_access` on children | Goes stale, derive at query time |
| `view_count` on content tables | Lock contention, use content_view_events |
| `device_content_cache` table | Client-side in WatermelonDB |
| String tier comparison | Alphabetically wrong, use rank |
| `deleted_at` columns | Hard delete with cascade is the strategy |
| `game_sessions.game_content_id NOT NULL` | Unit-based sessions don't reference game_content; nullable with unit_id populated instead |
| `child_achievements` without UNIQUE constraint | Constraint is load-bearing for Edge Function idempotency — never drop it |
| Session tables without UPDATE RLS policy | Causes silent write failures |
| Client-side streak calculation | Must be server-side via Edge Function |
| Client-side achievement evaluation | Must be server-side, idempotent via UNIQUE |
| Flat levels in game_content for progression games | Use game_units + game_unit_content |
| Speech/microphone games | Separate native permission track, post-MVP |
| Language code strings in content queries | Always use language UUID from child.preferred_language — never filter by 'lg' or 'rk' string |
| Showing locked state for missing language content | Units with no published content in child's language are hidden entirely, not shown as locked |
| Free trial premium level per day | Post-launch feature |
| Shared game asset library now | Direct URLs in content_json for now — refactor before launch if needed |

---

## Success Metrics

**Technical:** Launch < 2s | Content load < 1s | 60 FPS | Crash-free > 99.5%

**Business (Year 1):** 20,000 users | 5% free→paid | Day 1 retention > 60% | Day 7 > 40% | Day 30 > 25% | 10–15 min avg session

**Revenue (Year 1):** ~84M UGX subs + ~9M UGX school + ~$22,800 ads = **~$47,910**

---

*Save as `.github/copilot-instructions.md` in the `babysteps-app` repo root.*
