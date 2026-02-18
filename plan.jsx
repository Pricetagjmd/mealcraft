import { useCallback, useState } from "react";

const PHASES = [
	{
		id: "phase-1",
		name: "Design System Tokens",
		icon: "🎨",
		description:
			"Set up Tailwind config (web) and Unistyles theme (mobile) with all color, typography, shadow, border, and animation tokens. Validate both produce identical visual output.",
		tasks: [
			{
				id: "1-1",
				title: "Define CSS Custom Properties",
				status: "todo",
				priority: "critical",
				description:
					"Implement the complete :root block from the Design Spec Section 4.4. This includes 10 color tokens (grass, dirt, sky, stone, obsidian, lava, ember, wood, cobble, redstone), 3 font families (VT323, Space Mono, Press Start 2P), border/shadow/radius tokens, and 4 animation tokens (shake, depress, pulse, skeleton-pulse).",
				references: [
					{
						label: "Design Spec §4.4 — Design Tokens",
						detail:
							"Full :root block with --color-grass: #5D8E22, --color-dirt: #8B5E3C, --color-sky: #C4E5F2, --color-stone: #7E7E7E, --color-obsidian: #1A1A1A, --color-lava: #CF5C28, --color-ember: #E8913A, --color-wood: #A07449, --color-cobble: #B0B0B0, --color-redstone: #CC3333",
					},
					{
						label: "Design Spec §4.1 — Color Palette",
						detail:
							"Warning (Lava) and Hot (Ember) are intentionally split into two distinct tokens — using the same color for destructive actions and popular content causes user confusion.",
					},
				],
			},
			{
				id: "1-2",
				title: "Extend Tailwind Config",
				status: "todo",
				priority: "critical",
				description:
					"Extend boxShadow with non-blurred voxel value: '4px 4px 0px 0px rgba(0,0,0,1)'. Disable default border radius; create custom rounded-voxel: 4px. Add shake (0.3s), depress (0.15s), pulse (1.5s infinite), skeleton-pulse (1.5s infinite) animations. Add all design token colors including Ember, Cobble, and Redstone. Configure breakpoints: sm (640px), md (1024px).",
				references: [
					{
						label: "Design Spec §10.3 — Tailwind Config Notes",
						detail:
							"Specific instructions for boxShadow extension, border radius override, custom animations, and responsive breakpoints.",
					},
				],
			},
			{
				id: "1-3",
				title: "Mirror Tokens in Unistyles Theme",
				status: "todo",
				priority: "critical",
				description:
					"Create the Unistyles theme object that mirrors every Tailwind token exactly. Define matching breakpoints for shared layout logic. Define haptic feedback patterns as named constants: hapticLight, hapticMedium. Include sound effect asset paths as theme constants for easy toggle integration.",
				references: [
					{
						label: "Design Spec §10.4 — Unistyles Config Notes",
						detail:
							"Mirror all Tailwind tokens. Breakpoints matching web. Haptic patterns. Sound effect paths as theme constants.",
					},
					{
						label: "Design Spec §7.3 — Shared Unistyles Theme",
						detail:
							"All Tailwind design tokens must have equivalent Unistyles theme definitions ensuring visual consistency across web and mobile.",
					},
				],
			},
			{
				id: "1-4",
				title: "WCAG Contrast Validation",
				status: "todo",
				priority: "high",
				description:
					"Validate all text/background color combinations against WCAG 2.1 AA: 4.5:1 for normal text, 3:1 for large text. Obsidian on Sky passes. Obsidian on Stone FAILS for small text — must use white (#FFFFFF) on Stone surfaces. Grass on Sky FAILS at small sizes — use only for large headings or icons. Document all compliant pairings.",
				references: [
					{
						label: "Design Spec §4.5 — WCAG Compliance Notes",
						detail:
							"Full contrast matrix with pass/fail results for each pairing. Focus indicators: 2px dashed Grass outline. Dark mode deferred to post-MVP.",
					},
				],
			},
			{
				id: "1-5",
				title: "Typography Setup & Accessibility",
				status: "todo",
				priority: "high",
				description:
					"Load VT323 (headings 28-42px, labels 14px min), Space Mono (body 14px), and Press Start 2P (micro-labels 12px min only for decorative badges). Note: original spec used Press Start 2P at 10px for labels which fails WCAG 2.1 minimum text size on mobile — VT323 at 14px min replaces it for all functional labels.",
				references: [
					{
						label: "Design Spec §4.2 — Typography",
						detail:
							"Full font usage table. Accessibility note on Press Start 2P replacement.",
					},
				],
			},
			{
				id: "1-6",
				title: "Style Rules Implementation",
				status: "todo",
				priority: "medium",
				description:
					"Implement global style rules: 3px solid #1A1A1A borders on all interactive elements and cards. Hard-edge non-blurred shadows. Subtle noise overlay on Stone and Wood surfaces (provide tiling noise PNG or CSS noise generation). 4px border-radius (voxel feel, not pill). Disabled state: Cobble background, 60% opacity, no shadow, cursor not-allowed. Focus state: 2px dashed #5D8E22 outline offset 2px. Loading/skeleton: Stone blocks pulsing 0.4-0.7 opacity, 1.5s loop.",
				references: [
					{
						label: "Design Spec §4.3 — Style Rules",
						detail: "Complete style rule definitions with exact values.",
					},
				],
			},
		],
	},
	{
		id: "phase-2",
		name: "Shared Component Library",
		icon: "🧱",
		description:
			"Build reusable components in the shared packages directory consumed by both web and mobile apps.",
		tasks: [
			{
				id: "2-1",
				title: "Stat Bar Component (Health / Hunger)",
				status: "todo",
				priority: "critical",
				description:
					"Flex row container, 24px height. Icons fill left-to-right. Max count: Health = 10 hearts, Hunger = 4 shanks. Filled icons use Grass color at full opacity. Empty icons use Cobble at 40% opacity. If value exceeds max, display +N badge. Tap action expands nutrition detail overlay.",
				references: [
					{
						label: "Design Spec §6.1 — Stat Bar Component",
						detail:
							"Full specification: container dimensions, icon fill direction, color states, overflow handling, tap interaction.",
					},
					{
						label: "Design Spec §5.4 — Workbench Nutrition Overlays",
						detail:
							"Per-Day View: Calories as XP, Protein/Fat/Carbs in grams. Per-Week View: aggregated totals. Hearts/shanks are atmospheric — overlays provide precise data.",
					},
				],
			},
			{
				id: "2-2",
				title: "Hotbar Navigation Component",
				status: "todo",
				priority: "critical",
				description:
					"Fixed bottom bar, 5 equal-width slots on Wood (#A07449) background. Slots: Workbench | Crafting Grid | Adventure Map | Inventory | Recipe Book. Active state: white border highlight, icon shifts up 2px. Inactive: Stone background, no border. Notification badge: small Lava dot (8px) top-right corner.",
				references: [
					{
						label: "Design Spec §6.2 — Hotbar Navigation",
						detail:
							"Container spec, slot mapping, active/inactive/badge states.",
					},
				],
			},
			{
				id: "2-3",
				title: "Grid Slot Component",
				status: "todo",
				priority: "critical",
				description:
					"64x64px squares. Empty state: Stone background with inner shadow. Filled state: ingredient icon centered, Grass border (2px). Invalid state (allergen conflict): Lava border (3px), warning shake animation, tooltip overlay saying 'This ingredient is in your allergen list.'",
				references: [
					{
						label: "Design Spec §6.3 — Grid Slot",
						detail: "Size, empty/filled/invalid states with exact styling.",
					},
					{
						label: "Design Spec §5.6 — Crafting Grid Slot States",
						detail:
							"Detailed interaction: if user places allergen ingredient, slot border turns Lava red with warning shake and tooltip.",
					},
				],
			},
			{
				id: "2-4",
				title: "Craft Button Component",
				status: "todo",
				priority: "high",
				description:
					"Full width of crafting area, 48px height. Disabled: Cobble background, no shadow/glow, dimmed 'CRAFT' text. Active: Grass background, pulsing glow, full hard shadow. Loading: Grass background with progress bar filling left-to-right across button width. Only active when ≥1 grid slot filled.",
				references: [
					{
						label: "Design Spec §6.4 — Craft Button",
						detail: "Size, disabled/active/loading states.",
					},
				],
			},
			{
				id: "2-5",
				title: "Toast / Notification Component",
				status: "todo",
				priority: "high",
				description:
					"Top of screen, slides down, auto-dismisses after 4 seconds. Success: Grass left border, Stone background. Error: Lava left border. Info: Sky left border. Undo variant: includes UNDO button on right side, persists for 5 seconds.",
				references: [
					{
						label: "Design Spec §6.8 — Toast / Notification",
						detail:
							"Position, timing, 4 variants (success/error/info/undo) with exact border colors.",
					},
				],
			},
			{
				id: "2-6",
				title: "Modal Component",
				status: "todo",
				priority: "high",
				description:
					"Overlay: semi-transparent Obsidian at 60% opacity. Container: Stone background, thick Obsidian border, hard shadow. Max width 90% viewport. Header: VT323 heading with close X button top-right. Used for: recipe selection, delete confirmations, OAuth provider picker, allergen search.",
				references: [
					{
						label: "Design Spec §6.9 — Modal",
						detail: "Overlay, container, header specs. Usage contexts listed.",
					},
				],
			},
			{
				id: "2-7",
				title: "Item Cell Component (Grocery)",
				status: "todo",
				priority: "medium",
				description:
					"Icon (32x32 left), Name (VT323 center), Quantity + Unit (bottom-right). Unchecked: full opacity, Wood background. Checked: 50% opacity, checkmark overlaid, moves to list bottom. Manually added items show small 'MANUAL' badge in Ember color.",
				references: [
					{
						label: "Design Spec §6.5 — Item Cell",
						detail: "Layout, unchecked/checked/manual states.",
					},
				],
			},
			{
				id: "2-8",
				title: "Day Node & Meal Slot Bubble Components",
				status: "todo",
				priority: "medium",
				description:
					"Day Node: 80x80px on grass path. Past (70% opacity), Current (full brightness + avatar + glow), Future (full brightness, no avatar). Meal Slot Bubble: 40x40px floating above node. Empty: dashed border. Filled: solid border + meal icon. Snack slot: 36x36px with cookie placeholder.",
				references: [
					{
						label: "Design Spec §6.6 — Day Node",
						detail: "Size and past/current/future/empty states.",
					},
					{
						label: "Design Spec §6.7 — Meal Slot Bubble",
						detail: "Size variants, empty/filled states, snack exception.",
					},
				],
			},
			{
				id: "2-9",
				title: "Button Variants (Block Style)",
				status: "todo",
				priority: "medium",
				description:
					"Standard block button with 3px border, hard shadow, 4px radius. Depress animation on tap: removes shadow, shifts text down 2px. Primary (Grass), Destructive (Lava), Neutral (Stone), Disabled (Cobble at 60% opacity). All buttons need focus state: 2px dashed Grass outline offset 2px for keyboard navigation.",
				references: [
					{
						label: "Design Spec §4.3 — Style Rules",
						detail: "Border, shadow, radius, disabled state definitions.",
					},
					{
						label: "Design Spec §5.1 — Auth Button Interactions",
						detail:
							"Button depresses 4px (removes shadow), text shifts down 2px.",
					},
				],
			},
		],
	},
	{
		id: "phase-3",
		name: "Auth — The Spawn Point",
		icon: "🏰",
		description:
			"OAuth flows with Better Auth. Google and Apple providers. Token persistence and auto-redirect.",
		tasks: [
			{
				id: "3-1",
				title: "Database: accounts Table",
				status: "todo",
				priority: "critical",
				description:
					"Create the accounts table via Drizzle ORM: id (uuid PK), email (varchar 255 UNIQUE NOT NULL), oauth_provider ('google'|'apple'), oauth_provider_id (varchar 255 NOT NULL), created_at, updated_at (auto-trigger), deleted_at (nullable soft delete). This is the core authentication table managed by Better Auth.",
				references: [
					{
						label: "Pre-Build §4.2 — accounts Table",
						detail:
							"Full column definitions with types, constraints, and notes. Soft delete with purge after retention period.",
					},
					{
						label: "Pre-Build §13 Q#2 — Retention Period",
						detail:
							"Recommended 30-day soft-delete retention before full purge (GDPR compliance). Status: Open.",
					},
				],
			},
			{
				id: "3-2",
				title: "tRPC: auth Router",
				status: "todo",
				priority: "critical",
				description:
					"Implement 4 procedures: auth.callback (mutation — handles OAuth callback, creates account if new, returns token + isNewUser flag), auth.session (query — validates token, returns account + activeProfile), auth.logout (mutation — invalidates session token), auth.deleteAccount (mutation — requires confirmation string matching email, soft-deletes).",
				references: [
					{
						label: "Pre-Build §5.1 — auth Router Contract",
						detail:
							"Complete procedure table with input/output shapes for all 4 auth procedures.",
					},
					{
						label: "Pre-Build §11 — Environment Variables",
						detail:
							"Required: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, APPLE_CLIENT_ID, APPLE_CLIENT_SECRET, BETTER_AUTH_SECRET.",
					},
				],
			},
			{
				id: "3-3",
				title: "UI: Spawn Point Screen",
				status: "todo",
				priority: "critical",
				description:
					"Full-screen pixel art forest background. Center-aligned container with MealCraft logo (extruded 3D pixel text, gold/yellow gradient). Google button: Grass top half, Dirt bottom half, Google icon left, text 'RESUME GAME WITH GOOGLE'. Apple button: Obsidian block, white Apple icon, text 'RESUME GAME WITH APPLE'. First-time label: 'NEW WORLD? TAP TO BEGIN' in VT323. No email/password — OAuth only.",
				references: [
					{
						label: "Design Spec §5.1 — The Spawn Point",
						detail:
							"Full layout, key elements, button styling, interactions, and all states (loading, returning session, OAuth error, post-logout read-only).",
					},
				],
			},
			{
				id: "3-4",
				title: "States: Loading, Error, Returning Session",
				status: "todo",
				priority: "high",
				description:
					"Loading: pixel hourglass rotating, text 'Generating Terrain...' (covers initial data sync and recipe cache). Returning session: if valid token exists, auto-redirect to Workbench with brief 'Reconnecting...' animation. OAuth Error: toast with Lava border: 'Could not connect to [provider]. Try again.' Post-Logout: if cached data exists, show 'Explore as Guest' for browse-only with persistent re-login banner.",
				references: [
					{
						label: "Design Spec §5.1 — Spawn Point States",
						detail: "All 4 states with exact copy and behavior specifications.",
					},
					{
						label: "Pre-Build §9.4 — Initial Data Sync",
						detail:
							"The 'Generating Terrain...' screen covers: canonical ingredients (~575 items), top 100 recipes, profiles, current week meal plan, favorites. Estimated 2-5MB. Target < 5 seconds on 4G.",
					},
				],
			},
		],
	},
	{
		id: "phase-4",
		name: "Profiles & Dietary Setup",
		icon: "👤",
		description:
			"Profile CRUD, dietary preference and allergen management. Drizzle schema for profiles.",
		tasks: [
			{
				id: "4-1",
				title: "Database: profiles, dietary_preferences, allergens Tables",
				status: "todo",
				priority: "critical",
				description:
					"profiles: id, account_id (FK), display_name (varchar 30), avatar_key (default 'default_1'), is_active (boolean), missing_ingredient_threshold (smallint default 3), dietary_filter_mode ('deprioritize'|'exclude'), analytics_opt_out (boolean). Max 6 per account (enforced via app logic or trigger). dietary_preferences: profile_id (FK CASCADE), preference enum. Unique on (profile_id, preference). allergens: profile_id (FK CASCADE), ingredient_id (FK to canonical_ingredients). Unique on (profile_id, ingredient_id).",
				references: [
					{
						label: "Pre-Build §4.2 — profiles Table",
						detail:
							"Full column definitions including missing_ingredient_threshold and dietary_filter_mode which control crafting grid behavior.",
					},
					{
						label: "Pre-Build §4.2 — dietary_preferences Table",
						detail:
							"Values: 'vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'keto', 'paleo'. CASCADE on delete.",
					},
					{
						label: "Pre-Build §4.2 — allergens Table",
						detail:
							"References canonical_ingredients.id directly. CASCADE on delete.",
					},
				],
			},
			{
				id: "4-2",
				title: "tRPC: profile Router",
				status: "todo",
				priority: "critical",
				description:
					"8 procedures: profile.list (all profiles for account), profile.create (fails if 6 exist), profile.update (displayName, avatarKey, dietaryFilterMode, missingIngredientThreshold), profile.delete (cascades dietary prefs, allergens, meal plans, favorites, follows), profile.setActive (sets session profile), profile.setDietaryPreferences (replaces all existing), profile.setAllergens (replaces all existing ingredient IDs), profile.toggleAnalytics.",
				references: [
					{
						label: "Pre-Build §5.2 — profile Router Contract",
						detail:
							"Complete procedure table with all input/output shapes for 8 procedures.",
					},
				],
			},
			{
				id: "4-3",
				title: "UI: Character Select Screen",
				status: "todo",
				priority: "high",
				description:
					"Grid of profile slots over Stone background. Profile Card: 64x64 pixel avatar + display name in VT323. Active profile has Grass border glow. Empty slot: dashed border with + icon, text 'NEW ADVENTURER'. Profile count X/6 indicator. Creation flow: tap empty slot → enter name → select avatar → redirect to Buff Selection → return. Tap profile to select and navigate to Workbench. Long press/swipe reveals Edit and Delete. Delete confirmation modal with Lava confirm button.",
				references: [
					{
						label: "Design Spec §5.2 — Character Select",
						detail:
							"Full layout, key elements, profile creation flow (5 steps), and interactions.",
					},
				],
			},
			{
				id: "4-4",
				title: "UI: Buff Selection Screen",
				status: "todo",
				priority: "high",
				description:
					"Two-section scroll view on parchment background. Dietary Preferences: title 'SELECT YOUR BUFFS', grid of toggleable buff cards (Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Paleo) with pixel icons. Active cards get Grass border + glow. Allergen Exclusions: title 'WHAT POISONS YOU?', searchable ingredient list, selected allergens as red-bordered chips (tap to remove). Save button: Grass block 'LOCK IN BUFFS'. Empty state: no selections required, skip option available. Save toast: 'Buffs Updated!' with quest-complete sound.",
				references: [
					{
						label: "Design Spec §5.3 — Buff Selection",
						detail:
							"Full layout, both sections, interaction states, save behavior.",
					},
				],
			},
			{
				id: "4-5",
				title: "First-Run Onboarding Sequence",
				status: "todo",
				priority: "medium",
				description:
					"After first OAuth sign-in: 1) 'Generating Terrain...' loading (initial data sync + recipe cache). 2) Character Select opens with single empty slot — user creates first profile. 3) Buff Selection for dietary prefs and allergens. 4) Workbench loads with all-empty stats and pulsing 'CRAFT MEAL' card.",
				references: [
					{
						label: "Design Spec §8.1 — First-Run / Onboarding",
						detail: "4-step onboarding sequence after first OAuth sign-in.",
					},
				],
			},
		],
	},
	{
		id: "phase-5",
		name: "Dashboard — The Workbench",
		icon: "⚒️",
		description:
			"Layout shell, Hotbar nav, stat bars, action card grid, and nutrition overlays.",
		tasks: [
			{
				id: "5-1",
				title: "Workbench Layout & Profile Indicator",
				status: "todo",
				priority: "critical",
				description:
					"Top: Player Stats header with profile indicator (32x32 avatar + display name top-left, tap to switch via Character Select). Middle: action cards grid. Bottom: persistent Hotbar navigation. Responsive: mobile 2x2 action grid, desktop 4x1 horizontal row.",
				references: [
					{
						label: "Design Spec §5.4 — The Workbench Layout",
						detail:
							"Full layout structure, profile indicator spec, responsive behavior rules.",
					},
				],
			},
			{
				id: "5-2",
				title: "Health Bar & Hunger Bar",
				status: "todo",
				priority: "critical",
				description:
					"Health Bar: row of pixel hearts for weekly calorie adherence. Each heart = percentage of weekly target consumed. Hunger Bar: 4 shanks for daily meals (Breakfast, Lunch, Dinner, Snack). Filled = planned and completed. Both bars tappable to expand nutrition detail overlays. Note: No goal tracking in MVP — Health Bar shows proportion of meals logged vs expected, not calorie target.",
				references: [
					{
						label: "Design Spec §5.4 — Health Bar & Hunger Bar",
						detail:
							"Bar specs, icon meanings, tap-to-expand overlays, MVP limitation note.",
					},
					{
						label: "Design Spec §5.4 — Nutrition Detail Overlays",
						detail:
							"Per-Day: Calories as XP, Protein/Fat/Carbs in grams. Per-Week: aggregated totals. Required because gamified hearts/shanks don't communicate precise data.",
					},
				],
			},
			{
				id: "5-3",
				title: "Action Cards",
				status: "todo",
				priority: "high",
				description:
					"4 action cards: CRAFT MEAL (crafting table icon → Crafting Grid), WEEKLY PLAN (map icon → Adventure Map), RECIPE BOOK (book icon → The Library), OPTIONS (gear/wrench icon → Settings). Each card uses block style with depress animation on tap.",
				references: [
					{
						label: "Design Spec §5.4 — Action Cards",
						detail:
							"Icons, labels, and navigation targets for all 4 action cards.",
					},
				],
			},
			{
				id: "5-4",
				title: "Empty & Error States",
				status: "todo",
				priority: "medium",
				description:
					"Empty: all hearts and shanks empty, text 'Start your adventure! Tap CRAFT MEAL.' Error: backend unreachable → banner + locally queued changes shown.",
				references: [
					{
						label: "Design Spec §8 — Empty/Error States Table",
						detail: "Workbench row with empty and error state descriptions.",
					},
				],
			},
		],
	},
	{
		id: "phase-6",
		name: "Recipe Browser — The Library",
		icon: "📚",
		description:
			"Recipe browse, search, filter. External API integration and caching layer.",
		tasks: [
			{
				id: "6-1",
				title: "Database: recipes, recipe_ingredients, recipe_dietary_tags",
				status: "todo",
				priority: "critical",
				description:
					"recipes: 20+ columns including author_profile_id (NULL for external), title, instructions (JSON array of strings), source_name, external_id (UNIQUE, NULL for user-created), is_external (boolean), is_public, servings, nutrition per serving (nullable), nutrition_source ('auto'|'manual'|'none'), denormalized like_count, rating_avg, rating_count. recipe_ingredients: recipe_id (FK CASCADE), canonical_ingredient_id (FK), quantity, unit, display_text, sort_order. Index on (recipe_id, canonical_ingredient_id) for matching algorithm. recipe_dietary_tags: recipe_id (FK CASCADE), tag (same values as dietary_preferences).",
				references: [
					{
						label: "Pre-Build §4.2 — recipes Table",
						detail:
							"Complete column definitions with all constraints and notes.",
					},
					{
						label: "Pre-Build §4.2 — recipe_ingredients Table",
						detail:
							"Join table with required indexes for matching algorithm and grocery aggregation.",
					},
					{
						label: "Pre-Build §4.2 — recipe_dietary_tags Table",
						detail:
							"Tags auto-derived from ingredients where possible, manually set by author.",
					},
				],
			},
			{
				id: "6-2",
				title: "Database: canonical_ingredients & ingredient_aliases",
				status: "todo",
				priority: "critical",
				description:
					"canonical_ingredients: name (UNIQUE, normalized lowercase singular), category (produce, meat_poultry, dairy_eggs, etc.), image_url, status ('active'|'pending'|'rejected'). Seeded from TheMealDB (~575 ingredients). ingredient_aliases: maps alternative names to canonical ID (e.g., 'boneless skinless chicken breast' → 'chicken breast'). Normalization: all lowercase, trimmed, singular form.",
				references: [
					{
						label: "Pre-Build §2 — Canonical Ingredient System",
						detail:
							"Seed source, normalization rules, alias table, categories (11 groups with examples), pending ingredient promotion.",
					},
					{
						label: "Pre-Build §2.2 — Normalization Rules",
						detail:
							"'chicken breasts' → 'chicken breast'. New user-submitted ingredients go to 'pending' state.",
					},
					{
						label: "Pre-Build §13 Q#1 — Ingredient Approval",
						detail:
							"Recommended: auto-promote after 5 distinct users reference. Admin dashboard deferred.",
					},
				],
			},
			{
				id: "6-3",
				title: "TheMealDB Integration & Seed",
				status: "todo",
				priority: "critical",
				description:
					"Integrate 5 TheMealDB endpoints: search by name, filter by ingredient, lookup by ID, list categories (cache permanently), list ingredients (seeds canonical list, cache permanently). Cache all recipe responses in PostgreSQL with 30-day TTL (permanent for lookups). Note: TheMealDB has NO nutrition data — macros must come from Edamam. Single-ingredient filter only — multi-ingredient matching must be done locally.",
				references: [
					{
						label: "Pre-Build §1.2 — TheMealDB Integration",
						detail:
							"Full endpoint table with URLs, purposes, and caching strategies. Limitations section.",
					},
					{
						label: "Pre-Build §1.4 — Caching Architecture",
						detail:
							"TTL matrix: TheMealDB recipes permanent, ingredients permanent, search results 24hr.",
					},
				],
			},
			{
				id: "6-4",
				title: "tRPC: recipe.search & ingredient Router",
				status: "todo",
				priority: "high",
				description:
					"recipe.search: paginated query with query string, tag filters, source filter (all|user|community|external), cursor pagination. Respects active profile allergens. ingredient.search: autocomplete against canonical names + aliases. ingredient.getRecent: recently-used ingredients for active profile. ingredient.suggest: user submits new ingredient as 'pending'.",
				references: [
					{
						label: "Pre-Build §5.3 — recipe Router (recipe.search)",
						detail:
							"Input: query, tags, source, cursor, limit. Output: RecipeSummary[] + nextCursor.",
					},
					{
						label: "Pre-Build §5.4 — ingredient Router",
						detail:
							"3 procedures: search, getRecent, suggest. All input/output shapes defined.",
					},
				],
			},
			{
				id: "6-5",
				title: "UI: The Library Screen",
				status: "todo",
				priority: "high",
				description:
					"Search bar at top (pixel-styled, placeholder 'SEARCH THE ARCHIVES...'). Filter chips: All, Favorites, Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Paleo (+ Community, Following from social features). Active chip: Grass background. Recipe cards: thumbnail (or pixel-art placeholder), name in VT323, calorie badge (XP value), dietary tag icons, gold star on favorited. Tap → Recipe Scroll. Infinite scroll or pagination with skeleton loading cards. Empty state: empty bookshelf pixel art, text 'THE LIBRARY IS EMPTY.'",
				references: [
					{
						label: "Design Spec §5.5 — The Library",
						detail:
							"Full layout, key elements, interactions, empty state, data behavior (cached first, external API on explicit request).",
					},
					{
						label: "Pre-Build §7.5 — Social UI Implications",
						detail:
							"Library recipe cards get: like count (heart + number), avg rating (star + number), author name + avatar for community recipes. Filter chips add 'Community' and 'Following'.",
					},
				],
			},
		],
	},
	{
		id: "phase-7",
		name: "Crafting Grid — Recipe Builder",
		icon: "🔨",
		description:
			"Core interaction model: ingredient search, grid placement, recipe matching, web drag-and-drop + mobile tap-to-fill.",
		tasks: [
			{
				id: "7-1",
				title: "Recipe Matching Algorithm",
				status: "todo",
				priority: "critical",
				description:
					"matchPercentage = (matchedIngredients / totalRecipeIngredients) × 100. Primary sort: match % descending. Secondary: fewer missing ingredients. Tertiary: like_count tiebreaker. Floor: below 50% excluded entirely. Ceiling: missing count must be ≤ profile.missing_ingredient_threshold (default 3). Allergen exclusion: completely hidden. Dietary deprioritization: shown at bottom dimmed with 'NOT RECOMMENDED' badge (or excluded per profile.dietary_filter_mode). Source priority: user/community rank above external at equal match %. Must complete in <100ms for 10,000+ cached recipes. Requires index on (recipe_id, canonical_ingredient_id) or GIN index on ingredient arrays.",
				references: [
					{
						label: "Pre-Build §3 — Recipe Matching Algorithm",
						detail:
							"Full algorithm spec: match calculation, 5 ranking rules, filtering rules, performance targets, live update debounce (300ms).",
					},
					{
						label: "Pre-Build §3.4 — Performance",
						detail:
							"PostgreSQL query with pre-joined ingredient sets. Target <100ms with proper indexing.",
					},
				],
			},
			{
				id: "7-2",
				title: "tRPC: recipe.match Procedure",
				status: "todo",
				priority: "critical",
				description:
					"Input: { ingredientIds: uuid[] }. Output: { matches: RankedMatch[] }. This is the core crafting grid query returning ranked results per the matching algorithm. Each RankedMatch includes: recipe summary, match percentage, missing ingredient count and names, dietary compatibility status.",
				references: [
					{
						label: "Pre-Build §5.3 — recipe.match",
						detail:
							"Input/output contract. Core crafting grid query returning ranked results per Section 3 algorithm.",
					},
				],
			},
			{
				id: "7-3",
				title: "UI: 3×3 Grid & Ingredient System",
				status: "todo",
				priority: "critical",
				description:
					"Top: 3×3 grid of 64x64px Stone slots with inner shadow. Below grid: Ingredient Inventory Drawer with search input (autocomplete against canonical library), recent ingredients horizontal scroll row, and full alphabetical ingredient library grid (must support hundreds). Web: drag from library to slot OR click library then click slot. Mobile: tap library item then tap target slot with haptic feedback. Ingredient snap: 8-bit thud sound. Remove: tap filled slot to clear. Session-based — navigating away clears slots unless results not yet viewed.",
				references: [
					{
						label: "Design Spec §5.6 — Crafting Grid",
						detail:
							"Full layout, key elements (grid, search, recent, library, craft button, result preview, ranked results panel), all interactions, grid slot states, session behavior.",
					},
					{
						label: "Design Spec §7.1 / 7.2 — Platform Interactions",
						detail:
							"Web: drag-and-drop + click-to-fill fallback. Mobile: tap-to-fill only. Haptic: light on placement, medium on craft trigger.",
					},
				],
			},
			{
				id: "7-4",
				title: "Ranked Results Panel",
				status: "todo",
				priority: "high",
				description:
					"Below the grid, shows top 5-10 matching recipes sorted by match %. Each result: recipe name, match % badge (progress bar or percentage), missing ingredient count in red ('Missing 2 items'), dietary tag icons. Live updates as ingredients change (300ms debounce). Skeleton loading state between updates. Recipes below 50% excluded. Allergen-violating recipes hidden completely. Dietary-incompatible recipes at bottom with dimmed 'NOT RECOMMENDED' badge.",
				references: [
					{
						label: "Design Spec §5.6 — Recipe Matching Display",
						detail:
							"Match percentage display, missing ingredients, 50% minimum floor, allergen exclusion, dietary deprioritization. All configurable per profile.",
					},
					{
						label: "Pre-Build §3.5 — Live Update Behavior",
						detail:
							"Frontend debounces input by 300ms before triggering tRPC call to prevent excessive queries during rapid interaction.",
					},
				],
			},
			{
				id: "7-5",
				title: "Craft Trigger & Output Animation",
				status: "todo",
				priority: "high",
				description:
					"Tap Craft: grid shakes, particle effect triggers, loading bar fills, output slot reveals top recipe icon. Result Preview: silhouetted question mark in Output slot until crafted. After crafting, shows top-ranked recipe icon. Full Recipe Scroll opens for the top result. 8-bit fanfare sound. Medium haptic on mobile.",
				references: [
					{
						label: "Design Spec §5.6 — Craft Button Interactions",
						detail:
							"Shake, particle, loading bar, output reveal sequence. Sound: fanfare.",
					},
					{
						label: "Design Spec §7.2 — Mobile Haptics",
						detail: "Medium haptic on Craft trigger.",
					},
				],
			},
			{
				id: "7-6",
				title: "Empty & Error States",
				status: "todo",
				priority: "medium",
				description:
					"No ingredients: results panel shows 'Add ingredients to discover recipes.' API failure: toast 'Recipe search unavailable. Showing cached results only.' Rate limit hit: toast 'Recipe search is temporarily limited. Try again in a few minutes.' Offline: 'CACHED ONLY' badge on grid and library screens.",
				references: [
					{
						label: "Design Spec §8 — Empty/Error States Table",
						detail: "Crafting Grid row in the error state matrix.",
					},
					{
						label: "Design Spec §8.2 — Rate Limit Feedback",
						detail:
							"Toast copy for rate limit. App continues with cached results.",
					},
				],
			},
		],
	},
	{
		id: "phase-8",
		name: "Recipe Detail — Recipe Scroll",
		icon: "📜",
		description:
			"Detail view with favorite, share, add-to-plan actions. External vs. user-created distinction.",
		tasks: [
			{
				id: "8-1",
				title: "tRPC: recipe.getById & Full Recipe CRUD",
				status: "todo",
				priority: "critical",
				description:
					"recipe.getById: returns RecipeDetail with ingredients, nutrition, tags, author info. recipe.create: full recipe creation with ingredient list, triggers async nutrition auto-calculation via Edamam. recipe.update: only own recipes (is_external: false), changed fields only, recalculates nutrition if ingredients change. recipe.delete: cascades to recipe_ingredients, tags, likes, ratings. recipe.togglePublic: make visible/hidden to community. recipe.overrideNutrition: sets nutrition_source to 'manual'.",
				references: [
					{
						label: "Pre-Build §5.3 — recipe Router Contract",
						detail:
							"All 7 recipe procedures with complete input/output contracts.",
					},
					{
						label: "Pre-Build §6 — Recipe Creation & Editing Flow",
						detail:
							"Entry points, The Forge screen spec, field definitions, save behavior (5-step flow), editing behavior.",
					},
				],
			},
			{
				id: "8-2",
				title: "UI: Recipe Scroll Screen",
				status: "todo",
				priority: "critical",
				description:
					"Parchment scroll unrolling animation. Header image: pixel art of dish (generic plate fallback if null). Source attribution: 'Recipe from [Provider Name]' for external. Stats: XP (calories per serving), Buffs (Protein Boost II, Fat Shield I, Carb Load III per serving). Dietary tags as chip row. Serving size with +/- adjuster. Ingredients as 'Required Loot' with icon/name/quantity/unit. Steps as numbered quest objectives with checkboxes. Tap checkbox → grey + strikethrough + 'Quest Update' sound. All complete → 'Quest Complete!' banner + confetti. Favorite star toggle, 'ADD TO QUEST LOG' button (day + slot picker), share button (native share sheet).",
				references: [
					{
						label: "Design Spec §5.7 — Recipe Scroll",
						detail:
							"Full layout, all key elements, external vs user-created distinction, step states, image missing fallback.",
					},
				],
			},
			{
				id: "8-3",
				title: "UI: The Forge (Recipe Creation Screen)",
				status: "todo",
				priority: "high",
				description:
					"New screen not in original design spec. Vertical scroll form on parchment. Fields: Recipe Name (req, max 200), Description (opt, max 500), Servings (req, stepper 1-20 default 4), Prep Time (opt), Cook Time (opt), Ingredients (req, min 1, repeatable rows with autocomplete + quantity + unit dropdown + display text, reorderable, swipe-to-delete), Instructions (req, min 1, repeatable numbered text rows), Dietary Tags (toggleable chips, auto-suggest if all plant-based), Visibility toggle (Private padlock / Public globe), Recipe Image (optional JPEG/PNG upload). Entry points: '+ NEW RECIPE' in Library, 'EDIT' pencil on own recipes, 'CREATE YOUR OWN' prompt in empty crafting results.",
				references: [
					{
						label: "Pre-Build §6.2 — The Forge",
						detail:
							"Complete field specs (10 fields), save behavior (5-step validation and nutrition pipeline), entry points.",
					},
					{
						label: "Pre-Build §6.1 — Entry Points",
						detail:
							"Library '+ NEW RECIPE', Recipe Scroll 'EDIT', Crafting Grid 'CREATE YOUR OWN'.",
					},
				],
			},
			{
				id: "8-4",
				title: "Nutrition Calculation Pipeline",
				status: "todo",
				priority: "high",
				description:
					"On recipe save: enqueue nutrition job. For each ingredient: check ingredient_nutrition_cache for matching (ingredient_id, quantity, unit) < 90 days old. Cache hit: use cached. Miss: call Edamam Nutrition Analysis API. Fallback: Open Food Facts. Both fail: nutrition_source = 'none'. Sum all ingredient values, divide by servings, write to recipe. Manual override available via recipe.overrideNutrition. 'Recalculate' button re-triggers auto pipeline. TheMealDB recipes: batch calculate during seed + on-demand when viewed with null nutrition.",
				references: [
					{
						label: "Pre-Build §8 — Nutrition Calculation Pipeline",
						detail:
							"Auto-calculation flow (7 steps), manual override, fallback chain (3 tiers), TheMealDB batch calculation.",
					},
					{
						label: "Pre-Build §1.3 — Edamam API",
						detail:
							"POST endpoint, response format, 100 req/min free tier. Cached per ingredient+quantity.",
					},
					{
						label: "Pre-Build §4.2 — ingredient_nutrition_cache Table",
						detail:
							"Schema: canonical_ingredient_id, quantity, unit, calories, protein_g, fat_g, carbs_g, source, fetched_at. 90-day TTL.",
					},
				],
			},
			{
				id: "8-5",
				title: "tRPC: favorite Router",
				status: "todo",
				priority: "medium",
				description:
					"favorite.toggle: adds or removes from favorites, returns { favorited: boolean }. favorite.list: paginated list of all favorited recipes for active profile, returns RecipeSummary[] + nextCursor. Database: favorites table with unique constraint on (profile_id, recipe_id).",
				references: [
					{
						label: "Pre-Build §5.8 — favorite Router",
						detail:
							"2 procedures: toggle and list with input/output contracts.",
					},
					{
						label: "Pre-Build §4.2 — favorites Table",
						detail:
							"profile_id (FK), recipe_id (FK), created_at. Unique on (profile_id, recipe_id).",
					},
				],
			},
		],
	},
	{
		id: "phase-9",
		name: "Weekly Planner — Adventure Map",
		icon: "🗺️",
		description:
			"Horizontal timeline, 4 meal slots per day, copy/replace/remove, week navigation.",
		tasks: [
			{
				id: "9-1",
				title: "Database: meal_plan_entries Table",
				status: "todo",
				priority: "critical",
				description:
					"Columns: id (uuid PK), profile_id (FK), recipe_id (FK), date, slot ('breakfast'|'lunch'|'dinner'|'snack'), created_at, updated_at. Unique constraint on (profile_id, date, slot) — one recipe per slot per day.",
				references: [
					{
						label: "Pre-Build §4.2 — meal_plan_entries Table",
						detail:
							"Full column definitions, unique constraint, slot enum values.",
					},
				],
			},
			{
				id: "9-2",
				title: "tRPC: mealPlan Router",
				status: "todo",
				priority: "critical",
				description:
					"5 procedures: mealPlan.getWeek (input: weekStart date, returns all entries for 7-day range), mealPlan.assign (recipeId + date + slot, replaces if filled), mealPlan.remove (by id), mealPlan.copy (sourceId → targetDate + targetSlot), mealPlan.move (removes from source, assigns to target).",
				references: [
					{
						label: "Pre-Build §5.5 — mealPlan Router Contract",
						detail:
							"All 5 procedures with input/output shapes and behavior notes.",
					},
				],
			},
			{
				id: "9-3",
				title: "UI: Adventure Map Screen",
				status: "todo",
				priority: "critical",
				description:
					"Horizontal scrolling timeline as level-select path. Day nodes (80x80px) on grass path with map background. Current day: character avatar, enlarged with glow. 4 floating meal slot bubbles per day (NOT 3 — product spec requires 4: Breakfast, Lunch, Dinner, Snack). Empty slot: dashed outline, tap to assign. Filled slot: small meal icon. Week navigation: left/right arrows or swipe. Past weeks: navigable but dimmed (70% opacity). Historical plans retained.",
				references: [
					{
						label: "Design Spec §5.8 — Adventure Map",
						detail:
							"Full layout, key elements, all interactions (assign, view, replace, remove, copy, drag-and-drop web, tap-to-assign mobile), day node states, optimistic updates.",
					},
					{
						label: "Design Spec §5.8 Note",
						detail:
							"Original design showed 3 slots; product spec requires 4. Snack slot is 36x36px.",
					},
				],
			},
			{
				id: "9-4",
				title: "Optimistic Updates & Conflict Handling",
				status: "todo",
				priority: "high",
				description:
					"When assigning/removing/copying: UI updates immediately. Subtle sync icon appears briefly. If tRPC mutation fails, UI reverts and Lava-bordered error toast: 'Sync failed. Your change was not saved.' Remove action: slot returns to empty + brief undo toast for 5 seconds.",
				references: [
					{
						label: "Design Spec §5.8 — Optimistic Updates",
						detail:
							"Immediate UI update, sync indicator, revert on failure, undo toast timing.",
					},
					{
						label: "Pre-Build §9.3 — Conflict Resolution",
						detail:
							"Last-write-wins via updated_at timestamp comparison. Meal plan conflicts show 'Sync conflict' notification with review option.",
					},
				],
			},
		],
	},
	{
		id: "phase-10",
		name: "Grocery List — Inventory",
		icon: "🧺",
		description:
			"Aggregation logic, sort toggle, manual add/remove, date range selector.",
		tasks: [
			{
				id: "10-1",
				title: "Database: grocery_list_items Table",
				status: "todo",
				priority: "critical",
				description:
					"Columns: id, profile_id (FK), canonical_ingredient_id (FK, NULL for manual items), name (denormalized), aggregated_quantity, unit, has_mixed_units (boolean), is_manual (boolean), is_checked (boolean), date_range_start, date_range_end. Generated from meal plan entries — quantities summed per canonical ingredient across selected date range.",
				references: [
					{
						label: "Pre-Build §4.2 — grocery_list_items Table",
						detail:
							"Full column definitions. Note: canonical_ingredient_id is NULL for manually added items.",
					},
				],
			},
			{
				id: "10-2",
				title: "tRPC: grocery Router",
				status: "todo",
				priority: "critical",
				description:
					"4 procedures: grocery.generate (startDate + endDate → aggregated GroceryListItem[]), grocery.toggleCheck (id + isChecked), grocery.addManual (name + optional quantity/unit), grocery.removeItem (by id). Aggregation: sum quantities for same canonical ingredient across all recipes in date range. Mixed units flagged with has_mixed_units: true.",
				references: [
					{
						label: "Pre-Build §5.6 — grocery Router Contract",
						detail: "All 4 procedures with input/output shapes.",
					},
					{
						label: "Design Spec §5.9 — Quantity Aggregation",
						detail:
							"Example: two recipes with 200g chicken → displays 'chicken breast: 400g'. Mixed units shown separately with note.",
					},
					{
						label: "Pre-Build §13 Q#4 — Mixed Units",
						detail:
							"MVP: show both quantities separately with 'mixed units' note. Post-MVP: smart conversion.",
					},
				],
			},
			{
				id: "10-3",
				title: "UI: Inventory Screen",
				status: "todo",
				priority: "high",
				description:
					"Container styled as wooden chest GUI, title 'CHEST'. Date range selector at top (dropdown for included meal plan days, default current week). Sort toggle: A-Z (default, alphabetical) and Category (groups by Produce, Meat, Dairy, Grains, Other with sidebar icons). Item cells: icon + name (VT323) + aggregated quantity. Checkbox voxel-styled. Tap checked → 50% opacity, checkmark, moves to bottom. '+ NEW ITEM' at bottom for manual entry. Swipe-to-delete (mobile) / hover X (web). Empty state: open chest pixel art, 'YOUR CHEST IS EMPTY. Plan some meals to fill it up!' with 'GO TO ADVENTURE MAP' button.",
				references: [
					{
						label: "Design Spec §5.9 — Inventory",
						detail:
							"Full layout, key elements, sort toggle, interactions (check/uncheck, add manual, remove), empty state.",
					},
				],
			},
		],
	},
	{
		id: "phase-11",
		name: "Offline Mode & Sync",
		icon: "📡",
		description:
			"Service worker (web), local storage (mobile), sync indicators, degraded state handling.",
		tasks: [
			{
				id: "11-1",
				title: "Offline Sync Queue (Client-Side)",
				status: "todo",
				priority: "critical",
				description:
					"Local table (SQLite/AsyncStorage mobile, IndexedDB web): id, mutation_type ('meal_plan.create', 'favorite.toggle', etc.), payload (full tRPC mutation input), created_at, status ('pending'|'syncing'|'synced'|'failed'), retry_count (max 5). On reconnect: replay pending entries FIFO. Success: mark 'synced', delete after 24hr. Failure: exponential backoff (1s, 2s, 4s, 8s, 16s). After 5 failures: 'failed' + persistent error toast. Failed mutations surfaced in Settings as 'X unsynced changes' with retry button.",
				references: [
					{
						label: "Pre-Build §4.2 — offline_sync_queue",
						detail:
							"Client-side only table schema (NOT in PostgreSQL). Column definitions and status enum.",
					},
					{
						label: "Pre-Build §9.2 — Sync Queue Processing",
						detail:
							"5-step processing flow: reconnect → FIFO replay → success/failure handling → exponential backoff → Settings surfacing.",
					},
				],
			},
			{
				id: "11-2",
				title: "Conflict Resolution Strategy",
				status: "todo",
				priority: "high",
				description:
					"Last-write-wins based on updated_at timestamp. Each offline mutation includes client_timestamp. Server compares: client_timestamp > server updated_at → offline wins. client_timestamp < server updated_at → newer change exists, offline discarded with toast: 'A newer change was found. Your offline edit to [item] was not applied.' Meal plan conflicts: 'Sync conflict' notification with option to review.",
				references: [
					{
						label: "Pre-Build §9.3 — Conflict Resolution",
						detail:
							"Last-write-wins strategy with client_timestamp comparison. Meal plan specific handling.",
					},
				],
			},
			{
				id: "11-3",
				title: "UI: Offline Banner & Sync Indicators",
				status: "todo",
				priority: "high",
				description:
					"Offline Banner: persistent Redstone (#CC3333) bar at top of ALL screens, white text 'YOU ARE OFFLINE — SHOWING CACHED DATA'. Pushes content down, doesn't block. Sync status: Syncing → rotating pixel arrow in Hotbar. Synced → green checkmark flash. Sync Failed → Lava warning icon persists until retry. Tap to retry manually. Degraded states: API failure toast on Crafting Grid/Library, 'CACHED ONLY' badge, backend unreachable → 'Changes saved locally. Will sync when connection restores.'",
				references: [
					{
						label: "Design Spec §5.11 — Offline & Sync States",
						detail:
							"Offline banner spec, sync status indicator (3 states), degraded states (3 scenarios: API failure, backend unreachable, offline recipe search).",
					},
				],
			},
			{
				id: "11-4",
				title: "Service Worker & PWA (Web)",
				status: "todo",
				priority: "high",
				description:
					"Service worker caches assets and tRPC responses for offline. Managed by PWA addon in Better-T-Stack. PWA install prompt after 3rd visit: pixel-styled banner 'Install MealCraft on your device?' with INSTALL and MAYBE LATER buttons. Does not block app usage.",
				references: [
					{
						label: "Design Spec §7.1 — Web PWA",
						detail:
							"PWA install prompt trigger (3rd visit), banner copy, service worker caching scope.",
					},
				],
			},
			{
				id: "11-5",
				title: "Offline Capability Matrix",
				status: "todo",
				priority: "medium",
				description:
					"Verify all offline behaviors: Browse recipes (fully cached), View detail (cached, placeholder images), Crafting grid (local matching, 'CACHED ONLY' badge), Meal planning (full CRUD, changes queued), Grocery list (local generation, checkbox works), Recipe creation (saved locally, nutrition deferred), Social features (read-only, actions queued).",
				references: [
					{
						label: "Pre-Build §9.1 — Offline Capabilities",
						detail:
							"Complete feature-by-feature offline behavior table (7 features).",
					},
					{
						label: "Pre-Build §9.4 — Initial Data Sync",
						detail:
							"First login caches: ~575 ingredients, top 100 recipes, profiles, current week meal plan, favorites. ~2-5MB total. Subsequent syncs incremental.",
					},
				],
			},
		],
	},
	{
		id: "phase-12",
		name: "Settings, Analytics & Social",
		icon: "⚙️",
		description:
			"Options menu, account deletion, analytics event wiring, opt-out toggle, social features.",
		tasks: [
			{
				id: "12-1",
				title: "UI: Options Menu Screen",
				status: "todo",
				priority: "high",
				description:
					"Vertical scroll styled as pixel-art options menu. Account section: signed-in email/provider, Switch Profile button, Log Out button. Sound Effects toggle (default On). Analytics Opt-Out toggle (default On = analytics enabled). Push Notifications toggle. Delete Account: Lava text link at bottom, confirmation modal explaining soft-delete first then full purge. About: version, credits, privacy policy link.",
				references: [
					{
						label: "Design Spec §5.10 — Options Menu",
						detail:
							"Full layout with all key elements and their specifications.",
					},
				],
			},
			{
				id: "12-2",
				title: "Database: analytics_events Table",
				status: "todo",
				priority: "medium",
				description:
					"Columns: id, profile_id (FK, NULL if opted-out), event_name ('recipe_viewed', 'recipe_favorited', 'meal_planned', 'grocery_list_generated'), event_data (jsonb), created_at. Not inserted if profile.analytics_opt_out is true. Partitioned by month for large-scale retention.",
				references: [
					{
						label: "Pre-Build §4.2 — analytics_events Table",
						detail: "Schema with partitioning note. Respects opt-out toggle.",
					},
					{
						label: "Design Spec §9 — Analytics Touchpoints",
						detail:
							"4 events with trigger locations and captured data. All anonymized.",
					},
				],
			},
			{
				id: "12-3",
				title: "tRPC: analytics.track & Opt-Out",
				status: "todo",
				priority: "medium",
				description:
					"analytics.track: mutation with eventName + optional eventData. No-op if profile has analytics_opt_out: true. Opt-out toggle synced to profile backend. Confirmation toast: 'Analytics disabled.'",
				references: [
					{
						label: "Pre-Build §5.9 — analytics Router",
						detail: "Single procedure: track. No-op behavior on opt-out.",
					},
					{
						label: "Design Spec §9.1 — Opt-Out Mechanism",
						detail:
							"Toggle state stored locally and synced. Toast confirmation.",
					},
				],
			},
			{
				id: "12-4",
				title: "Social Features: Follows, Likes, Ratings",
				status: "todo",
				priority: "medium",
				description:
					"Database tables: follows (follower_profile_id, followed_profile_id, unique + self-follow check), recipe_likes (profile_id, recipe_id, unique, triggers like_count update), recipe_ratings (profile_id, recipe_id, rating 1-5, unique, triggers rating_avg/rating_count recalc). tRPC social router: follow, unfollow, getFollowers, getFollowing, toggleLike, rateRecipe, feed (public recipes from followed profiles, newest first, fallback to popular). Community Feed accessible via 'COMMUNITY' chip in Library.",
				references: [
					{
						label: "Pre-Build §7 — Social Features",
						detail:
							"Follows, likes, ratings specs. Community feed behavior. UI implications for Library and Recipe Scroll.",
					},
					{
						label: "Pre-Build §5.7 — social Router Contract",
						detail: "All 7 social procedures with input/output shapes.",
					},
					{
						label:
							"Pre-Build §4.2 — follows, recipe_likes, recipe_ratings Tables",
						detail:
							"Schema definitions with constraints, triggers, and denormalization notes.",
					},
				],
			},
			{
				id: "12-5",
				title: "Push Notifications (MVP)",
				status: "todo",
				priority: "low",
				description:
					"Opt-in prompt after first meal is planned: 'Get reminded before meal time?' Used for meal reminders only. Toggle in Settings links to OS notification settings if disabled at system level.",
				references: [
					{
						label: "Design Spec §7.2 — Push Notifications",
						detail:
							"Opt-in trigger timing, notification purpose, Settings integration.",
					},
					{
						label: "Design Spec §11 — Roadmap (Push Notifications)",
						detail:
							"Marked as MVP scope. Design opt-in flow and reminder timing picker.",
					},
				],
			},
		],
	},
];

const PRIORITY_CONFIG = {
	critical: { label: "Critical", color: "#CF5C28", bg: "#CF5C2818" },
	high: { label: "High", color: "#E8913A", bg: "#E8913A18" },
	medium: { label: "Medium", color: "#5D8E22", bg: "#5D8E2218" },
	low: { label: "Low", color: "#7E7E7E", bg: "#7E7E7E18" },
};

const STATUS_CONFIG = {
	todo: { label: "To Do", color: "#7E7E7E", icon: "○" },
	"in-progress": { label: "In Progress", color: "#E8913A", icon: "◐" },
	review: { label: "Review", color: "#5D8E22", icon: "◑" },
	done: { label: "Done", color: "#5D8E22", icon: "●" },
};

export default function MealCraftTaskboard() {
	const [phases, setPhases] = useState(PHASES);
	const [expandedPhase, setExpandedPhase] = useState(null);
	const [expandedTask, setExpandedTask] = useState(null);
	const [filterStatus, setFilterStatus] = useState("all");
	const [filterPriority, setFilterPriority] = useState("all");

	const updateTaskStatus = useCallback((phaseId, taskId, newStatus) => {
		setPhases((prev) =>
			prev.map((phase) =>
				phase.id === phaseId
					? {
							...phase,
							tasks: phase.tasks.map((task) =>
								task.id === taskId ? { ...task, status: newStatus } : task
							),
						}
					: phase
			)
		);
	}, []);

	const getPhaseStats = useCallback(
		(phase) => {
			const tasks = phase.tasks.filter((t) => {
				if (filterStatus !== "all" && t.status !== filterStatus) {
					return false;
				}
				if (filterPriority !== "all" && t.priority !== filterPriority) {
					return false;
				}
				return true;
			});
			const total = phase.tasks.length;
			const done = phase.tasks.filter((t) => t.status === "done").length;
			const inProgress = phase.tasks.filter(
				(t) => t.status === "in-progress"
			).length;
			return {
				tasks,
				total,
				done,
				inProgress,
				percent: Math.round((done / total) * 100),
			};
		},
		[filterStatus, filterPriority]
	);

	const globalStats = phases.reduce(
		(acc, phase) => {
			const s = getPhaseStats(phase);
			acc.total += s.total;
			acc.done += s.done;
			acc.inProgress += s.inProgress;
			return acc;
		},
		{ total: 0, done: 0, inProgress: 0 }
	);

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#0f1117",
				color: "#e4e4e7",
				fontFamily: "'Space Mono', 'Courier New', monospace",
			}}
		>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Space+Mono:wght@400;700&family=Press+Start+2P&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1a1b23; }
        ::-webkit-scrollbar-thumb { background: #3a3b47; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #5D8E22; }

        .phase-card {
          background: #1a1b23;
          border: 2px solid #2a2b37;
          border-radius: 6px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .phase-card:hover { border-color: #3a3b47; }
        .phase-card.expanded { border-color: #5D8E22; }
        
        .task-card {
          background: #22232e;
          border: 2px solid #2a2b37;
          border-radius: 4px;
          transition: all 0.15s ease;
        }
        .task-card:hover { border-color: #3a3b47; background: #282938; }
        .task-card.expanded { border-color: #5D8E22; }
        
        .status-btn {
          padding: 4px 10px;
          border-radius: 4px;
          border: 2px solid transparent;
          cursor: pointer;
          font-family: 'VT323', monospace;
          font-size: 14px;
          transition: all 0.15s ease;
          background: #2a2b37;
          color: #a1a1aa;
        }
        .status-btn:hover { border-color: #5D8E22; color: #e4e4e7; }
        .status-btn.active { border-color: #5D8E22; color: #5D8E22; background: #5D8E2220; }
        
        .filter-chip {
          padding: 4px 12px;
          border-radius: 4px;
          border: 2px solid #2a2b37;
          background: #1a1b23;
          color: #a1a1aa;
          cursor: pointer;
          font-family: 'VT323', monospace;
          font-size: 15px;
          transition: all 0.15s ease;
        }
        .filter-chip:hover { border-color: #3a3b47; color: #e4e4e7; }
        .filter-chip.active { border-color: #5D8E22; color: #5D8E22; background: #5D8E2215; }
        
        .ref-card {
          background: #1a1b23;
          border: 1px solid #2a2b37;
          border-left: 3px solid #E8913A;
          border-radius: 4px;
          padding: 10px 12px;
          margin-top: 6px;
        }
        
        .progress-bar-bg {
          height: 6px;
          background: #2a2b37;
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.4s ease;
        }

        .pixel-border {
          box-shadow: 3px 3px 0px rgba(0,0,0,0.6);
        }
      `}</style>

			{/* Header */}
			<div
				style={{
					borderBottom: "2px solid #2a2b37",
					padding: "20px 24px",
					position: "sticky",
					top: 0,
					background: "#0f1117ee",
					backdropFilter: "blur(12px)",
					zIndex: 100,
				}}
			>
				<div
					style={{
						maxWidth: 960,
						margin: "0 auto",
						display: "flex",
						flexDirection: "column",
						gap: 16,
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							flexWrap: "wrap",
							gap: 12,
						}}
					>
						<div>
							<h1
								style={{
									fontFamily: "'VT323', monospace",
									fontSize: 32,
									color: "#5D8E22",
									letterSpacing: "1px",
									lineHeight: 1,
								}}
							>
								⛏ MEALCRAFT BUILD BOARD
							</h1>
							<p
								style={{
									fontSize: 12,
									color: "#71717a",
									marginTop: 4,
								}}
							>
								{globalStats.total} tasks across {phases.length} phases
							</p>
						</div>
						<div
							style={{
								display: "flex",
								gap: 16,
								alignItems: "center",
								fontFamily: "'VT323', monospace",
								fontSize: 18,
							}}
						>
							<span style={{ color: "#5D8E22" }}>
								● {globalStats.done} done
							</span>
							<span style={{ color: "#E8913A" }}>
								◐ {globalStats.inProgress} active
							</span>
							<span style={{ color: "#7E7E7E" }}>
								○{" "}
								{globalStats.total - globalStats.done - globalStats.inProgress}{" "}
								todo
							</span>
						</div>
					</div>

					{/* Global Progress */}
					<div className="progress-bar-bg">
						<div
							className="progress-bar-fill"
							style={{
								width: `${(globalStats.done / globalStats.total) * 100}%`,
								background: "linear-gradient(90deg, #5D8E22, #7ab82e)",
							}}
						/>
					</div>

					{/* Filters */}
					<div
						style={{
							display: "flex",
							gap: 8,
							flexWrap: "wrap",
							alignItems: "center",
						}}
					>
						<span
							style={{
								fontSize: 12,
								color: "#71717a",
								fontFamily: "'VT323', monospace",
								fontSize: 15,
							}}
						>
							FILTER:
						</span>
						{["all", "todo", "in-progress", "review", "done"].map((s) => (
							<button
								className={`filter-chip ${filterStatus === s ? "active" : ""}`}
								key={s}
								onClick={() => setFilterStatus(s)}
							>
								{s === "all"
									? "All"
									: s === "in-progress"
										? "◐ Active"
										: s === "todo"
											? "○ To Do"
											: s === "review"
												? "◑ Review"
												: "● Done"}
							</button>
						))}
						<span
							style={{
								width: 1,
								height: 20,
								background: "#2a2b37",
								margin: "0 4px",
							}}
						/>
						{["all", "critical", "high", "medium", "low"].map((p) => (
							<button
								className={`filter-chip ${filterPriority === p ? "active" : ""}`}
								key={p}
								onClick={() => setFilterPriority(p)}
								style={
									p !== "all" && filterPriority === p
										? {
												borderColor: PRIORITY_CONFIG[p].color,
												color: PRIORITY_CONFIG[p].color,
												background: PRIORITY_CONFIG[p].bg,
											}
										: {}
								}
							>
								{p === "all" ? "All Priority" : PRIORITY_CONFIG[p].label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Phases */}
			<div
				style={{
					maxWidth: 960,
					margin: "0 auto",
					padding: "20px 24px 60px",
					display: "flex",
					flexDirection: "column",
					gap: 12,
				}}
			>
				{phases.map((phase, phaseIdx) => {
					const stats = getPhaseStats(phase);
					const isExpanded = expandedPhase === phase.id;

					return (
						<div
							className={`phase-card pixel-border ${isExpanded ? "expanded" : ""}`}
							key={phase.id}
						>
							{/* Phase Header */}
							<div
								onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
								style={{
									padding: "16px 20px",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									gap: 12,
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: 12,
										flex: 1,
										minWidth: 0,
									}}
								>
									<span
										style={{
											fontFamily: "'VT323', monospace",
											fontSize: 14,
											color: "#5D8E22",
											background: "#5D8E2218",
											padding: "2px 8px",
											borderRadius: 3,
											whiteSpace: "nowrap",
										}}
									>
										PHASE {phaseIdx + 1}
									</span>
									<span style={{ fontSize: 20 }}>{phase.icon}</span>
									<h2
										style={{
											fontFamily: "'VT323', monospace",
											fontSize: 22,
											color: "#e4e4e7",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{phase.name}
									</h2>
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: 12,
										flexShrink: 0,
									}}
								>
									<span
										style={{
											fontFamily: "'VT323', monospace",
											fontSize: 16,
											color:
												stats.percent === 100
													? "#5D8E22"
													: stats.percent > 0
														? "#E8913A"
														: "#71717a",
										}}
									>
										{stats.done}/{stats.total}
									</span>
									<div className="progress-bar-bg" style={{ width: 80 }}>
										<div
											className="progress-bar-fill"
											style={{
												width: `${stats.percent}%`,
												background:
													stats.percent === 100 ? "#5D8E22" : "#E8913A",
											}}
										/>
									</div>
									<span
										style={{
											fontSize: 18,
											transition: "transform 0.2s",
											transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
											color: "#71717a",
										}}
									>
										▼
									</span>
								</div>
							</div>

							{/* Phase Body */}
							{isExpanded && (
								<div
									style={{
										padding: "0 20px 16px",
										display: "flex",
										flexDirection: "column",
										gap: 10,
									}}
								>
									<p
										style={{
											fontSize: 13,
											color: "#a1a1aa",
											lineHeight: 1.5,
											paddingBottom: 8,
											borderBottom: "1px solid #2a2b37",
										}}
									>
										{phase.description}
									</p>

									{stats.tasks.map((task) => {
										const isTaskExpanded = expandedTask === task.id;
										const pCfg = PRIORITY_CONFIG[task.priority];
										const sCfg = STATUS_CONFIG[task.status];

										return (
											<div
												className={`task-card ${isTaskExpanded ? "expanded" : ""}`}
												key={task.id}
											>
												{/* Task Header */}
												<div
													onClick={() =>
														setExpandedTask(isTaskExpanded ? null : task.id)
													}
													style={{
														padding: "12px 14px",
														display: "flex",
														justifyContent: "space-between",
														alignItems: "flex-start",
														gap: 10,
														cursor: "pointer",
													}}
												>
													<div
														style={{
															display: "flex",
															alignItems: "flex-start",
															gap: 10,
															flex: 1,
															minWidth: 0,
														}}
													>
														<span
															style={{
																color: sCfg.color,
																fontSize: 16,
																marginTop: 1,
																flexShrink: 0,
															}}
														>
															{sCfg.icon}
														</span>
														<div style={{ minWidth: 0 }}>
															<h3
																style={{
																	fontFamily: "'VT323', monospace",
																	fontSize: 18,
																	color:
																		task.status === "done"
																			? "#71717a"
																			: "#e4e4e7",
																	textDecoration:
																		task.status === "done"
																			? "line-through"
																			: "none",
																}}
															>
																{task.title}
															</h3>
														</div>
													</div>
													<div
														style={{
															display: "flex",
															gap: 6,
															alignItems: "center",
															flexShrink: 0,
														}}
													>
														<span
															style={{
																fontSize: 11,
																fontFamily: "'VT323', monospace",
																padding: "2px 8px",
																borderRadius: 3,
																color: pCfg.color,
																background: pCfg.bg,
																border: `1px solid ${pCfg.color}30`,
															}}
														>
															{pCfg.label}
														</span>
														<span
															style={{
																fontSize: 14,
																color: "#71717a",
																transition: "transform 0.2s",
																transform: isTaskExpanded
																	? "rotate(180deg)"
																	: "rotate(0deg)",
															}}
														>
															▾
														</span>
													</div>
												</div>

												{/* Task Body */}
												{isTaskExpanded && (
													<div
														style={{
															padding: "0 14px 14px",
															borderTop: "1px solid #2a2b37",
															paddingTop: 12,
														}}
													>
														<p
															style={{
																fontSize: 13,
																color: "#a1a1aa",
																lineHeight: 1.6,
															}}
														>
															{task.description}
														</p>

														{/* Status Toggle */}
														<div
															style={{
																display: "flex",
																gap: 6,
																marginTop: 14,
																flexWrap: "wrap",
															}}
														>
															{Object.entries(STATUS_CONFIG).map(
																([key, cfg]) => (
																	<button
																		className={`status-btn ${task.status === key ? "active" : ""}`}
																		key={key}
																		onClick={(e) => {
																			e.stopPropagation();
																			updateTaskStatus(phase.id, task.id, key);
																		}}
																	>
																		{cfg.icon} {cfg.label}
																	</button>
																)
															)}
														</div>

														{/* References */}
														{task.references && task.references.length > 0 && (
															<div style={{ marginTop: 14 }}>
																<span
																	style={{
																		fontFamily: "'VT323', monospace",
																		fontSize: 14,
																		color: "#E8913A",
																		letterSpacing: "0.5px",
																	}}
																>
																	📎 SPEC REFERENCES
																</span>
																{task.references.map((ref, i) => (
																	<div className="ref-card" key={i}>
																		<div
																			style={{
																				fontFamily: "'VT323', monospace",
																				fontSize: 15,
																				color: "#E8913A",
																				marginBottom: 4,
																			}}
																		>
																			{ref.label}
																		</div>
																		<div
																			style={{
																				fontSize: 12,
																				color: "#8b8b96",
																				lineHeight: 1.5,
																			}}
																		>
																			{ref.detail}
																		</div>
																	</div>
																))}
															</div>
														)}
													</div>
												)}
											</div>
										);
									})}

									{stats.tasks.length === 0 && (
										<div
											style={{
												textAlign: "center",
												padding: 20,
												color: "#71717a",
												fontFamily: "'VT323', monospace",
												fontSize: 16,
											}}
										>
											No tasks match current filters
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
