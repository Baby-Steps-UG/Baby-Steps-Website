
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.achievement_definitions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  key character varying NOT NULL UNIQUE,
  title character varying NOT NULL,
  description text,
  icon_url text,
  category character varying CHECK (category::text = ANY (ARRAY['game'::character varying, 'story'::character varying, 'bible'::character varying, 'quiz'::character varying, 'streak'::character varying, 'milestone'::character varying, 'language'::character varying]::text[])),
  trigger_type character varying NOT NULL CHECK (trigger_type::text = ANY (ARRAY['score'::character varying, 'completion'::character varying, 'streak'::character varying, 'manual'::character varying]::text[])),
  trigger_value integer,
  tier_required character varying NOT NULL DEFAULT 'free'::character varying,
  language_specific boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  content_type character varying CHECK (content_type::text = ANY (ARRAY['game'::character varying, 'story'::character varying, 'bible'::character varying, 'quiz'::character varying, 'any'::character varying]::text[])),
  CONSTRAINT achievement_definitions_pkey PRIMARY KEY (id),
  CONSTRAINT achievement_definitions_tier_required_fkey FOREIGN KEY (tier_required) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.activity_log (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  session_type character varying NOT NULL CHECK (session_type::text = ANY (ARRAY['game'::character varying, 'story'::character varying, 'bible'::character varying, 'quiz'::character varying, 'coloring'::character varying]::text[])),
  session_id uuid NOT NULL,
  device_id character varying,
  synced_to_cloud boolean NOT NULL DEFAULT false,
  offline_created_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT activity_log_pkey PRIMARY KEY (id),
  CONSTRAINT activity_log_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id)
);
CREATE TABLE public.animation_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  language_id uuid NOT NULL,
  video_url text NOT NULL,
  thumbnail_url text,
  subtitles_url text,
  file_size_mb numeric,
  quality character varying,
  status character varying NOT NULL DEFAULT 'draft'::character varying CHECK (status::text = ANY (ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying]::text[])),
  published_at timestamp with time zone,
  published_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT animation_content_pkey PRIMARY KEY (id),
  CONSTRAINT animation_content_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.animation_templates(id),
  CONSTRAINT animation_content_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.content_languages(id),
  CONSTRAINT animation_content_published_by_fkey FOREIGN KEY (published_by) REFERENCES auth.users(id)
);
CREATE TABLE public.animation_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  animation_key character varying NOT NULL UNIQUE,
  title character varying NOT NULL,
  description text,
  category character varying CHECK (category::text = ANY (ARRAY['science'::character varying, 'math'::character varying, 'culture'::character varying, 'art'::character varying]::text[])),
  duration_seconds integer,
  age_range_min integer NOT NULL DEFAULT 3,
  age_range_max integer NOT NULL DEFAULT 12,
  tier_required character varying NOT NULL DEFAULT 'premium'::character varying,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT animation_templates_pkey PRIMARY KEY (id),
  CONSTRAINT animation_templates_tier_required_fkey FOREIGN KEY (tier_required) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.bible_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  language_id uuid NOT NULL,
  chapter_number integer NOT NULL,
  pages_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  version character varying NOT NULL DEFAULT '1.0.0'::character varying,
  status character varying NOT NULL DEFAULT 'draft'::character varying CHECK (status::text = ANY (ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying]::text[])),
  published_at timestamp with time zone,
  published_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT bible_content_pkey PRIMARY KEY (id),
  CONSTRAINT bible_content_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.bible_templates(id),
  CONSTRAINT bible_content_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.content_languages(id),
  CONSTRAINT bible_content_published_by_fkey FOREIGN KEY (published_by) REFERENCES auth.users(id)
);
CREATE TABLE public.bible_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  bible_content_id uuid NOT NULL,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  duration_seconds integer,
  pages_read integer NOT NULL DEFAULT 0,
  total_pages integer,
  completed boolean NOT NULL DEFAULT false,
  device_id character varying,
  synced_to_cloud boolean NOT NULL DEFAULT false,
  offline_created_at timestamp with time zone,
  CONSTRAINT bible_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT bible_sessions_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT bible_sessions_bible_content_id_fkey FOREIGN KEY (bible_content_id) REFERENCES public.bible_content(id)
);
CREATE TABLE public.bible_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  bible_key character varying NOT NULL UNIQUE,
  book_name character varying NOT NULL,
  testament character varying NOT NULL CHECK (testament::text = ANY (ARRAY['old'::character varying, 'new'::character varying]::text[])),
  total_chapters integer NOT NULL DEFAULT 1,
  translation character varying,
  age_range_min integer NOT NULL DEFAULT 3,
  age_range_max integer NOT NULL DEFAULT 12,
  tier_required character varying NOT NULL DEFAULT 'free'::character varying,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT bible_templates_pkey PRIMARY KEY (id),
  CONSTRAINT bible_templates_tier_required_fkey FOREIGN KEY (tier_required) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.child_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  achievement_id uuid NOT NULL,
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  context_session_type character varying CHECK (context_session_type::text = ANY (ARRAY['game'::character varying, 'story'::character varying, 'bible'::character varying, 'quiz'::character varying, 'coloring'::character varying]::text[])),
  context_session_id uuid,
  synced_to_cloud boolean NOT NULL DEFAULT false,
  CONSTRAINT child_achievements_pkey PRIMARY KEY (id),
  CONSTRAINT child_achievements_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT child_achievements_achievement_id_fkey FOREIGN KEY (achievement_id) REFERENCES public.achievement_definitions(id)
);
CREATE TABLE public.child_game_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  game_template_id uuid NOT NULL,
  total_xp integer NOT NULL DEFAULT 0,
  current_unit_id uuid,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT child_game_progress_pkey PRIMARY KEY (id),
  CONSTRAINT child_game_progress_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT child_game_progress_game_template_id_fkey FOREIGN KEY (game_template_id) REFERENCES public.game_templates(id),
  CONSTRAINT child_game_progress_current_unit_id_fkey FOREIGN KEY (current_unit_id) REFERENCES public.game_units(id)
);
CREATE TABLE public.child_streaks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL UNIQUE,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_activity_date date,
  streak_updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT child_streaks_pkey PRIMARY KEY (id),
  CONSTRAINT child_streaks_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id)
);
CREATE TABLE public.child_unit_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  unit_id uuid NOT NULL,
  status character varying NOT NULL DEFAULT 'locked'::character varying CHECK (status::text = ANY (ARRAY['locked'::character varying, 'unlocked'::character varying, 'in_progress'::character varying, 'completed'::character varying]::text[])),
  xp_earned integer NOT NULL DEFAULT 0,
  completed_at timestamp with time zone,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT child_unit_progress_pkey PRIMARY KEY (id),
  CONSTRAINT child_unit_progress_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT child_unit_progress_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.game_units(id)
);
CREATE TABLE public.children (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  parent_id uuid,
  school_id uuid,
  preferred_language uuid NOT NULL,
  display_name character varying NOT NULL,
  age_range character varying NOT NULL CHECK (age_range::text = ANY (ARRAY['3-5'::character varying, '6-8'::character varying, '9-11'::character varying]::text[])),
  difficulty_level character varying NOT NULL DEFAULT 'adaptive'::character varying,
  avatar_url text,
  is_active boolean NOT NULL DEFAULT true,
  last_sync_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT children_pkey PRIMARY KEY (id),
  CONSTRAINT children_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES auth.users(id),
  CONSTRAINT children_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.organizations(id),
  CONSTRAINT children_preferred_language_fkey FOREIGN KEY (preferred_language) REFERENCES public.content_languages(id)
);
CREATE TABLE public.class_enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL,
  child_id uuid NOT NULL,
  enrolled_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT class_enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT class_enrollments_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id),
  CONSTRAINT class_enrollments_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id)
);
CREATE TABLE public.classes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  name character varying NOT NULL,
  grade_level character varying,
  teacher_id uuid,
  max_students integer NOT NULL DEFAULT 50,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT classes_pkey PRIMARY KEY (id),
  CONSTRAINT classes_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT classes_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES auth.users(id)
);
CREATE TABLE public.cms_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  role character varying NOT NULL CHECK (role::text = ANY (ARRAY['admin'::character varying, 'editor'::character varying, 'translator'::character varying]::text[])),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT cms_users_pkey PRIMARY KEY (id),
  CONSTRAINT cms_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.coloring_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  template_name character varying,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  duration_seconds integer,
  save_url text,
  device_id character varying,
  synced_to_cloud boolean NOT NULL DEFAULT false,
  offline_created_at timestamp with time zone,
  CONSTRAINT coloring_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT coloring_sessions_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id)
);
CREATE TABLE public.content_languages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code character varying NOT NULL UNIQUE,
  name character varying NOT NULL,
  native_name character varying,
  rtl_flag boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT content_languages_pkey PRIMARY KEY (id)
);
CREATE TABLE public.content_versions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  content_type character varying NOT NULL CHECK (content_type::text = ANY (ARRAY['game'::character varying, 'story'::character varying, 'bible'::character varying, 'quiz'::character varying, 'animation'::character varying]::text[])),
  content_id uuid NOT NULL,
  version_number character varying NOT NULL,
  changelog text,
  is_critical_update boolean NOT NULL DEFAULT false,
  min_app_version character varying,
  published_at timestamp with time zone NOT NULL DEFAULT now(),
  published_by uuid,
  CONSTRAINT content_versions_pkey PRIMARY KEY (id),
  CONSTRAINT content_versions_published_by_fkey FOREIGN KEY (published_by) REFERENCES auth.users(id)
);
CREATE TABLE public.content_view_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  content_type character varying NOT NULL CHECK (content_type::text = ANY (ARRAY['game'::character varying, 'story'::character varying, 'bible'::character varying, 'quiz'::character varying, 'animation'::character varying]::text[])),
  content_id uuid NOT NULL,
  child_id uuid,
  user_id uuid,
  viewed_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT content_view_events_pkey PRIMARY KEY (id),
  CONSTRAINT content_view_events_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT content_view_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.game_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  language_id uuid NOT NULL,
  content_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  version character varying NOT NULL DEFAULT '1.0.0'::character varying,
  status character varying NOT NULL DEFAULT 'draft'::character varying CHECK (status::text = ANY (ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying]::text[])),
  published_at timestamp with time zone,
  published_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT game_content_pkey PRIMARY KEY (id),
  CONSTRAINT game_content_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.game_templates(id),
  CONSTRAINT game_content_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.content_languages(id),
  CONSTRAINT game_content_published_by_fkey FOREIGN KEY (published_by) REFERENCES auth.users(id)
);
CREATE TABLE public.game_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  game_content_id uuid,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  duration_seconds integer,
  score integer,
  max_score integer,
  level_reached integer,
  completed boolean NOT NULL DEFAULT false,
  accuracy_pct numeric,
  attempts integer NOT NULL DEFAULT 1,
  device_id character varying,
  synced_to_cloud boolean NOT NULL DEFAULT false,
  offline_created_at timestamp with time zone,
  xp_earned integer NOT NULL DEFAULT 0,
  unit_id uuid,
  CONSTRAINT game_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT game_sessions_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT game_sessions_game_content_id_fkey FOREIGN KEY (game_content_id) REFERENCES public.game_content(id),
  CONSTRAINT game_sessions_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.game_units(id)
);
CREATE TABLE public.game_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  game_key character varying NOT NULL UNIQUE,
  display_name character varying NOT NULL,
  description text,
  game_type character varying NOT NULL CHECK (game_type::text = ANY (ARRAY['tap_to_learn'::character varying, 'word_match'::character varying, 'listen_and_choose'::character varying, 'simple_quiz'::character varying, 'counting'::character varying, 'fill_letters'::character varying, 'puzzle'::character varying, 'story_minigame'::character varying]::text[])),
  mechanics_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  age_range_min integer NOT NULL DEFAULT 3,
  age_range_max integer NOT NULL DEFAULT 12,
  tier_required character varying NOT NULL DEFAULT 'free'::character varying,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  game_category character varying NOT NULL CHECK (game_category::text = ANY (ARRAY['core_learning'::character varying, 'language_building'::character varying, 'numbers_logic'::character varying, 'creativity'::character varying]::text[])),
  CONSTRAINT game_templates_pkey PRIMARY KEY (id),
  CONSTRAINT game_templates_tier_required_fkey FOREIGN KEY (tier_required) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.game_unit_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  unit_id uuid NOT NULL,
  language_id uuid NOT NULL,
  content_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  version character varying NOT NULL DEFAULT '1.0.0'::character varying,
  status character varying NOT NULL DEFAULT 'draft'::character varying CHECK (status::text = ANY (ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying]::text[])),
  published_at timestamp with time zone,
  published_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT game_unit_content_pkey PRIMARY KEY (id),
  CONSTRAINT game_unit_content_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.game_units(id),
  CONSTRAINT game_unit_content_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.content_languages(id),
  CONSTRAINT game_unit_content_published_by_fkey FOREIGN KEY (published_by) REFERENCES auth.users(id)
);
CREATE TABLE public.game_units (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  unit_number integer NOT NULL,
  title character varying NOT NULL,
  description text,
  tier_required character varying NOT NULL DEFAULT 'free'::character varying,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT game_units_pkey PRIMARY KEY (id),
  CONSTRAINT game_units_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.game_templates(id),
  CONSTRAINT game_units_tier_required_fkey FOREIGN KEY (tier_required) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.individual_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  display_name character varying NOT NULL,
  date_of_birth date,
  preferred_language uuid,
  difficulty_level character varying NOT NULL DEFAULT 'adaptive'::character varying,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  account_type character varying NOT NULL DEFAULT 'parent'::character varying CHECK (account_type::text = ANY (ARRAY['parent'::character varying, 'individual'::character varying, 'school_admin'::character varying, 'teacher'::character varying]::text[])),
  CONSTRAINT individual_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT individual_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT individual_profiles_preferred_language_fkey FOREIGN KEY (preferred_language) REFERENCES public.content_languages(id)
);
CREATE TABLE public.organization_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  organization_id uuid NOT NULL,
  role character varying NOT NULL CHECK (role::text = ANY (ARRAY['admin'::character varying, 'teacher'::character varying, 'staff'::character varying]::text[])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT organization_users_pkey PRIMARY KEY (id),
  CONSTRAINT organization_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT organization_users_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);
CREATE TABLE public.organizations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  type character varying NOT NULL CHECK (type::text = ANY (ARRAY['school'::character varying, 'enterprise'::character varying, 'ngo'::character varying]::text[])),
  domain character varying,
  contact_email character varying,
  contact_phone character varying,
  address text,
  theme_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  subscription_tier character varying,
  max_children integer NOT NULL DEFAULT 100,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT organizations_pkey PRIMARY KEY (id),
  CONSTRAINT organizations_subscription_tier_fkey FOREIGN KEY (subscription_tier) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.payment_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL,
  amount numeric NOT NULL,
  currency character varying NOT NULL DEFAULT 'UGX'::character varying,
  provider character varying NOT NULL CHECK (provider::text = ANY (ARRAY['apple'::character varying, 'google'::character varying, 'flutterwave_mtn'::character varying, 'flutterwave_airtel'::character varying, 'manual'::character varying]::text[])),
  provider_transaction_id character varying,
  status character varying NOT NULL CHECK (status::text = ANY (ARRAY['pending'::character varying, 'completed'::character varying, 'failed'::character varying, 'refunded'::character varying]::text[])),
  payment_method character varying CHECK (payment_method::text = ANY (ARRAY['mobile_money'::character varying, 'card'::character varying, 'iap'::character varying, 'invoice'::character varying]::text[])),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT payment_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT payment_transactions_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id)
);
CREATE TABLE public.push_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  token text NOT NULL,
  platform character varying NOT NULL CHECK (platform::text = ANY (ARRAY['ios'::character varying, 'android'::character varying]::text[])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT push_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT push_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.quiz_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  language_id uuid NOT NULL,
  questions_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  version character varying NOT NULL DEFAULT '1.0.0'::character varying,
  status character varying NOT NULL DEFAULT 'draft'::character varying CHECK (status::text = ANY (ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying]::text[])),
  published_at timestamp with time zone,
  published_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT quiz_content_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_content_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.quiz_templates(id),
  CONSTRAINT quiz_content_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.content_languages(id),
  CONSTRAINT quiz_content_published_by_fkey FOREIGN KEY (published_by) REFERENCES auth.users(id)
);
CREATE TABLE public.quiz_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  quiz_content_id uuid NOT NULL,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  duration_seconds integer,
  score integer,
  max_score integer,
  correct_answers integer,
  total_questions integer,
  completed boolean NOT NULL DEFAULT false,
  device_id character varying,
  synced_to_cloud boolean NOT NULL DEFAULT false,
  offline_created_at timestamp with time zone,
  CONSTRAINT quiz_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_sessions_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT quiz_sessions_quiz_content_id_fkey FOREIGN KEY (quiz_content_id) REFERENCES public.quiz_content(id)
);
CREATE TABLE public.quiz_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_key character varying NOT NULL UNIQUE,
  title character varying NOT NULL,
  description text,
  category character varying CHECK (category::text = ANY (ARRAY['bible'::character varying, 'general_knowledge'::character varying, 'language'::character varying, 'math'::character varying]::text[])),
  age_range_min integer NOT NULL DEFAULT 3,
  age_range_max integer NOT NULL DEFAULT 12,
  tier_required character varying NOT NULL DEFAULT 'free'::character varying,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT quiz_templates_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_templates_tier_required_fkey FOREIGN KEY (tier_required) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.school_invoices (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  invoice_number character varying NOT NULL UNIQUE,
  amount numeric NOT NULL,
  currency character varying NOT NULL DEFAULT 'UGX'::character varying,
  status character varying NOT NULL DEFAULT 'draft'::character varying CHECK (status::text = ANY (ARRAY['draft'::character varying, 'sent'::character varying, 'paid'::character varying, 'overdue'::character varying, 'cancelled'::character varying]::text[])),
  due_date date NOT NULL,
  paid_date date,
  payment_transaction_id uuid,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT school_invoices_pkey PRIMARY KEY (id),
  CONSTRAINT school_invoices_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT school_invoices_payment_transaction_id_fkey FOREIGN KEY (payment_transaction_id) REFERENCES public.payment_transactions(id)
);
CREATE TABLE public.story_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  language_id uuid NOT NULL,
  pages_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  questions_json jsonb,
  version character varying NOT NULL DEFAULT '1.0.0'::character varying,
  status character varying NOT NULL DEFAULT 'draft'::character varying CHECK (status::text = ANY (ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying]::text[])),
  published_at timestamp with time zone,
  published_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT story_content_pkey PRIMARY KEY (id),
  CONSTRAINT story_content_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.story_templates(id),
  CONSTRAINT story_content_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.content_languages(id),
  CONSTRAINT story_content_published_by_fkey FOREIGN KEY (published_by) REFERENCES auth.users(id)
);
CREATE TABLE public.story_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  story_content_id uuid NOT NULL,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  duration_seconds integer,
  pages_read integer NOT NULL DEFAULT 0,
  total_pages integer,
  completed boolean NOT NULL DEFAULT false,
  quiz_score integer,
  quiz_max_score integer,
  device_id character varying,
  synced_to_cloud boolean NOT NULL DEFAULT false,
  offline_created_at timestamp with time zone,
  CONSTRAINT story_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT story_sessions_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
  CONSTRAINT story_sessions_story_content_id_fkey FOREIGN KEY (story_content_id) REFERENCES public.story_content(id)
);
CREATE TABLE public.story_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  story_key character varying NOT NULL UNIQUE,
  title character varying NOT NULL,
  category character varying CHECK (category::text = ANY (ARRAY['folklore'::character varying, 'moral'::character varying, 'educational'::character varying]::text[])),
  estimated_duration_minutes integer,
  age_range_min integer NOT NULL DEFAULT 3,
  age_range_max integer NOT NULL DEFAULT 12,
  has_comprehension_questions boolean NOT NULL DEFAULT false,
  tier_required character varying NOT NULL DEFAULT 'free'::character varying,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT story_templates_pkey PRIMARY KEY (id),
  CONSTRAINT story_templates_tier_required_fkey FOREIGN KEY (tier_required) REFERENCES public.subscription_tier_order(tier)
);
CREATE TABLE public.subscription_tier_order (
  tier character varying NOT NULL,
  rank integer NOT NULL UNIQUE,
  CONSTRAINT subscription_tier_order_pkey PRIMARY KEY (tier)
);
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  organization_id uuid,
  plan_tier character varying NOT NULL,
  status character varying NOT NULL CHECK (status::text = ANY (ARRAY['active'::character varying, 'past_due'::character varying, 'cancelled'::character varying, 'expired'::character varying, 'trial'::character varying]::text[])),
  platform character varying CHECK (platform::text = ANY (ARRAY['apple'::character varying, 'google'::character varying, 'flutterwave'::character varying, 'manual'::character varying]::text[])),
  start_date date NOT NULL,
  end_date date,
  auto_renew boolean NOT NULL DEFAULT true,
  store_transaction_id character varying,
  store_original_transaction_id character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT subscriptions_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT subscriptions_plan_tier_fkey FOREIGN KEY (plan_tier) REFERENCES public.subscription_tier_order(tier)
);
