# DESIGN.md

## Design intent
Create a premium, cinematic, highly polished product experience for a modular personal operating system focused on study, work, focus, habits, planning, and lightweight recreation.

The interface should feel:
- immersive
- premium
- layered
- futuristic but usable
- emotionally motivating
- visually memorable

This product should not look like a generic admin dashboard.
It should feel like the fusion of a high-end productivity suite, a game-inspired reward system, and a refined 3D digital workspace.

## Core visual direction
Use a dark-first visual system with luminous depth, soft glass surfaces, layered shadows, restrained glow, and selective 3D elements.

Primary inspirations:
- cinematic product interfaces
- premium gaming dashboards
- spatial computing interfaces
- motion-rich but disciplined SaaS design
- elegant sci-fi control rooms

Avoid childish game UI.
Avoid noisy neon overload.
Avoid generic startup landing page gradients.
Avoid random 3D objects with no product purpose.

## Product character
The app should feel like a personal command center.
Every screen should communicate clarity, progress, motion, and meaningful control.
The user should feel that they are entering a focused environment, not opening a messy utility app.

## Design principles

### 1. Depth with discipline
Use depth as a structural tool, not as decoration.
Depth can come from:
- layered surfaces
- soft perspective transforms
- glassmorphism used sparingly
- shadow hierarchy
- subtle parallax
- hover elevation
- cards floating over rich backgrounds

3D is encouraged, but only when it supports hierarchy, focus, status, or delight.

### 2. High contrast hierarchy
The interface must stay readable and fast to scan.
Use strong contrast between:
- page background
- panels
- elevated cards
- active states
- critical calls to action
- data visualizations

Text clarity always wins over aesthetics.

### 3. Rewarding motion
Motion should make the app feel alive.
Use motion for:
- hover response
- state transitions
- milestone completion
- streak celebrations
- pomodoro completion
- card expansion
- navigation changes
- analytics reveal

Motion should feel smooth, premium, and physically plausible.
Avoid bouncy toy-like motion.

### 4. One hero per screen
Each screen should have one visual anchor.
Examples:
- a 3D focus orb on the pomodoro page
- a habit progress constellation on the streak page
- a dramatic metrics hero on the dashboard home
- a floating notebook workspace on the notes page

Do not make every component fight for attention.

## Color system
Dark mode is the default.
Light mode may be added later, but dark mode must be designed first.

### Base palette
- Background: near-black with slight cool tint
- Surface 1: charcoal / graphite
- Surface 2: lifted obsidian
- Surface 3: glass-dark panel
- Primary accent: electric cyan or blue-teal
- Secondary accent: violet-indigo for rare emphasis
- Success: vivid emerald
- Warning: amber
- Danger: magenta-red

### Rules
- Use one dominant accent at a time.
- Use secondary accent sparingly for analytics, highlights, or premium moments.
- Avoid rainbow dashboards.
- Keep most of the UI neutral so the accents feel powerful.

## Material treatment
Preferred surface stack:
- deep matte background
- elevated semi-glass cards
- faint inner highlights
- thin soft borders
- selective glow on interactive states

Use blur carefully.
The interface should feel premium, not foggy.

## Typography
Use a clean modern sans-serif for most UI.
Pair it with either:
- a futuristic display sans for hero moments, or
- a subtly elegant serif for rare premium highlights.

Typography should feel intentional and expensive.
Avoid default web-safe typography.
Avoid overly playful fonts.

Recommended behavior:
- compact labels
- strong dashboard headings
- large metric numerals
- controlled tracking for uppercase labels
- excellent tabular alignment for stats

## Layout language
The product should use modular composition.
Preferred patterns:
- asymmetrical dashboard hero sections
- bento-grid analytics layouts
- floating side panels
- command-center headers
- expandable workspace cards
- layered modal sheets
- dock-like quick actions

Do not rely on plain CRUD admin layouts.
Avoid long stacks of identical cards.

## 3D usage
3D is highly encouraged, but must be meaningful.

Allowed 3D patterns:
- floating dashboard cards with subtle perspective
- interactive focus orb or productivity crystal
- depth-based scene backgrounds
- habit/streak trophies or progress monuments
- 3D analytics objects for milestone moments
- reward chest / growth tree / focus forest visualizations

Avoid:
- spinning random cubes
- decorative 3D without UX value
- heavy scenes that slow the app
- constant motion in productivity-critical screens

If using WebGL, use it only in hero zones or special modules.
Core app navigation and dense workflow surfaces should remain lightweight.

## Motion system
Motion should feel premium and calm.
Use:
- short hover transitions
- medium navigation transitions
- celebratory milestone animations
- spring motion only when subtle
- opacity + transform for most reveals
- scale + glow for reward feedback

Avoid over-animating data-heavy screens.
Prioritize responsiveness.

## Page-level art direction

### Dashboard home
Must feel like entering a mission control center.
Use a high-impact hero zone with key metrics, focus status, streak status, and quick actions.
This page should create immediate emotional pull.

### Notes
Should feel like a premium thinking workspace.
Use layered paper/editor panels with clean reading comfort and elegant focus states.

### Todo / tasks
Should feel sharp, clear, and highly actionable.
Use stronger contrast and tighter density than the notes section.

### Pomodoro / focus
This is a signature page.
It should include the strongest immersive visual identity in the app.
A central 3D focus object or environmental progress visualization is encouraged.

### Streaks / habits
Should feel rewarding and game-adjacent.
Use progression visuals, milestones, tier states, and subtle celebration cues.

### Mini games / recreation
Keep visually connected to the product brand.
Even playful modules should feel premium and integrated, not like a random embedded arcade site.

## Component style guidance

### Cards
- layered
- softly rounded
- premium shadow depth
- faint border
- hover lift
- clear active state

### Buttons
- strong primary CTA glow or illuminated edge
- secondary buttons should feel sleek, not dull
- ghost buttons should still feel intentional

### Inputs
- high clarity
- refined focus ring
- dark-glass or dark-solid surfaces
- excellent placeholder contrast

### Charts
- should look cinematic and polished
- use restrained palette
- emphasize readability first
- animate reveals gracefully

### Navigation
- should feel like a command center rail or dock
- active state should feel vivid and satisfying
- icons should be clean and sharp

## Anti-patterns
Do not generate:
- generic pastel SaaS dashboards
- flat bootstrap-style admin panels
- noisy rainbow gradients everywhere
- random AI-slop glassmorphism with no hierarchy
- childish mobile-game UI
- poor contrast dark mode
- giant glow blobs behind every card
- excessive 3D that hurts usability
- cluttered homepage with too many competing widgets

## UX priorities
1. Clarity
2. Emotional motivation
3. Flow state support
4. Delight in the right moments
5. Long-session comfort
6. Strong visual identity

## Build behavior
When building UI for this project:
- consult this DESIGN.md first
- preserve visual consistency across modules
- prefer premium restraint over novelty spam
- make dense screens usable before making them flashy
- use 3D selectively to create signature moments
- keep the product cohesive even as features expand
