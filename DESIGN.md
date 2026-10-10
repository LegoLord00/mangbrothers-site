---
name: Mangiapane Brothers Lawn and Snow
description: One neighborhood street that turns through the seasons, with sign-painted type and paper-and-ink cards.
colors:
  ink: "#1C2620"
  ink-soft: "#3E4A41"
  brand-green: "#1B4D2E"
  brand-green-deep: "#143B23"
  fall-rust: "#8A3A16"
  frost-blue: "#2D5B7A"
  lights-red: "#A3302F"
  gold: "#D9A441"
  paper: "#F6F1E6"
  card: "#FCF9F2"
  page-white: "#FFFDF8"
  rule-line: "#E2DACB"
  green-soft: "#E3EEDF"
  rust-soft: "#F8E2D0"
  frost-soft: "#DCE8F1"
  lights-soft: "#F6DFDB"
  footer-night: "#13201A"
  white: "#FFFFFF"
  label-muted: "#6B6354"
  leader-dot: "#C9BFAC"
  on-green-text: "#D7E3D9"
  footer-text: "#C9D2CB"
  chip-paper: "#F1EBDD"
  sky-summer: "#CFE6F0"
typography:
  display:
    fontFamily: "Bitter, Georgia, 'Times New Roman', serif"
    fontSize: "min(54px, 9.9cqi)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Bitter, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(32px, 3.6vw, 48px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  tagline:
    fontFamily: "Bitter, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(19px, 1.6vw, 22px)"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Bitter, Georgia, 'Times New Roman', serif"
    fontSize: "21px"
    fontWeight: 800
    lineHeight: 1.15
  body:
    fontFamily: "'Public Sans', 'Helvetica Neue', Arial, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Public Sans', 'Helvetica Neue', Arial, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.12em"
  price:
    fontFamily: "Bitter, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(44px, 4.6vw, 58px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
rounded:
  button: "12px"
  chip: "999px"
  ticket: "18px"
  card: "20px"
  photo: "4px"
  icon-tile: "12px"
spacing:
  gutter-mobile: "14px"
  card-pad: "26px"
  section: "clamp(64px, 9vw, 108px)"
  container: "1180px"
components:
  button-call:
    backgroundColor: "{colors.brand-green}"
    textColor: "#FFFFFF"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "48px"
  button-call-hover:
    backgroundColor: "{colors.brand-green-deep}"
  button-see:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.brand-green}"
    rounded: "{rounded.button}"
    height: "52px"
  season-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px 26px 22px"
  price-ticket:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ticket}"
  chip:
    backgroundColor: "#F1EBDD"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "8px 12px"
---

# Design System: Mangiapane Brothers Lawn and Snow

## Overview

**Creative North Star: "The Neighborhood Almanac"**

The site is a year on one street. A single illustrated neighborhood (a Livonia brick ranch, an oak, a utility pole, the company truck at the curb, one of the brothers at work) turns from summer to fall to winter as you scroll, and every part of the page knows which season it belongs to. Like an almanac, it is practical first: what gets done this season, what it costs, when it happens, and who to call.

Everything printed on top of that street looks like it was made for the neighborhood rather than downloaded: Bitter slab headlines with the weight of a painted shop sign, cream paper cards with a firm ink border and a hard offset shadow, dotted price leaders like a menu board, taped-up photos, grass edges between sections. The feel is sturdy, warm, and neighborly: confident enough to read as a real operation, hand-made enough to read as local.

The illustration is flat (solid fills, no outlines, no glossy gradients) and must stay specific: real Livonia architecture, real equipment, the real truck, the crew doing the actual season's job. Generic stock-suburb tropes are the failure mode this system exists to avoid.

**Key Characteristics:**
- One continuous illustrated street, three seasons, scroll-driven.
- Each season owns a color (green, rust, frost, with holiday red for lights) across cards, prices, links, and pages.
- Paper-and-ink surfaces: cream cards, 2px ink borders, hard offset shadows.
- Slab-serif display type for names, promises, and prices; quiet sans for everything else.
- The phone number is always one tap away.

## Colors

Warm paper neutrals and near-black green ink, with one season accent active at a time.

### Primary
- **Mangiapane Green** (brand-green): the logo color. Call buttons, summer accent, the iron-and-shutter details in the scene, the green call band. Never decorative filler.

### Secondary (season accents)
- **Leaf-Pile Rust** (fall-rust): fall prices, links, taglines, and the fall page.
- **Storm-Window Frost** (frost-blue): snow removal and the winter page.
- **Holiday Bulb Red** (lights-red): Christmas lights sections and tickets only.
- **Porch-Light Gold** (gold): eyebrow text on green, the "Our pick" flag, the lit-window glow. Small doses only.

### Neutral
- **Almanac Ink** (ink): all text, borders, and offset shadows (shadows use ink at 14 to 20 percent).
- **Weathered Ink** (ink-soft): body copy and secondary text.
- **Newsprint Paper** (paper): page background and alternate sections.
- **Card Stock** (card): every card, ticket, and the header bar.
- **Clean Sheet** (page-white): alternating section background.
- **Pencil Rule** (rule-line): dashed dividers, chip borders, ticket perforations.
- **Night Lot** (footer-night): footer only, with Footer Text (footer-text) on it.
- **Label Muted** (label-muted): small uppercase labels and fine print on paper; the lightest text allowed on cream (5:1).
- **Leader Dots** (leader-dot): the dotted line between a service and its price.
- **On-Green Text** (on-green-text): body text on the green band.
- Each season accent has a soft tint (green-soft, rust-soft, frost-soft, lights-soft) for badges, icon tiles, and the "See all prices" button.

### Named Rules
**The One Season Rule.** A card, page, or section speaks in one season's accent. Never mix rust and frost in the same component; winter splits lights (red) and snow (blue) into separate, equal sections.
**The Ink Not Black Rule.** Text, borders, and shadows use Almanac Ink, never pure #000.

## Typography

**Display Font:** Bitter 700/800 (with Georgia)
**Body Font:** Public Sans 400 to 700 (with Helvetica Neue, Arial)

**Character:** Bitter is the painted sign over the shop door; Public Sans is the clear handwriting on the invoice. Two families only.

### Hierarchy
- **Display** (800, fit to card width, line-height 1): the service name on each season card (Lawn & landscaping, Fall cleanup, Lights & snow). Always one line; all three render at the same size.
- **Tagline** (700, 19 to 22px, 1.25): the promise under the service name, in the season accent.
- **Headline** (800, 32 to 48px, 1.05): section titles. Short, declarative, ends with a period.
- **Title** (800, about 21px): card and ticket titles, FAQ questions.
- **Price** (800, 44 to 58px, tabular figures): the number on a price ticket.
- **Body** (400, 17px, 1.65, max about 58ch): explanations.
- **Label** (700, 12px, 0.12em tracking, uppercase): eyebrows, ticket "where" lines, table heads.

### Named Rules
**The Name Leads Rule.** The service name is the biggest thing on a season card; the promise sits under it as a tagline, never the other way around.
**The Ampersand Rule.** Two-part service names use "&" so they hold one line.

## Layout

A pinned, full-bleed scene (400svh scroll track) carries the three seasons, with a peek strip at the bottom announcing the next one. Below it, sections stack in a 1180px container with generous vertical rhythm (64 to 108px), alternating Newsprint and Clean Sheet backgrounds separated by a torn grass edge in the next section's color. Season pages open with that season's scene as a banner, a sticky "On this page" strip, then included / prices / schedule / questions.

On phones (under 820px) the card docks to the top of the scene with 14px gutters, the scene ends above a fixed two-button bar (season prices, Call now), and the floating booking pill is replaced by that bar.

## Elevation & Depth

Depth comes from print, not light. Cards, tickets, tables, maps, and stamps sit on a hard offset shadow with no blur, as if a printed sign were pinned slightly off the wall. Photos are the one exception: they get a soft paper drop shadow and a slight tilt, like prints taped to a board.

### Shadow Vocabulary
- **Pinned sign** (`box-shadow: 7px 7px 0 rgba(28,38,32,.14)`): cards, tickets, price tables, the "next season" card. Up to .2 on the scene card.
- **Accent pin** (`box-shadow: 7px 7px 0 <season accent>`): the recommended ticket only.
- **Pressed key** (`box-shadow: 0 3px 0 #0E2A18`): the Call button; drops to 1px on press.
- **Taped print** (`box-shadow: 0 18px 40px rgba(60,48,30,.18)`): photos only.

### Named Rules
**The No-Blur Rule.** Interface surfaces never use blurred shadows or glows. Blur belongs only to photographs.

## Shapes

Soft but sturdy: 20px corners on cards, 18px on tickets, 12px on buttons, full pills on chips and the booking button, 4px on photo prints. Borders are a confident 2px ink line. Signature forms: ticket stubs with a dashed perforation and half-circle notches, the torn grass edge between sections, dotted leaders between a service and its price.

## Components

### Buttons
- **Call (primary):** Mangiapane Green, white text, 12px corners, 48px tall, pressed-key shadow; darker green on hover, drops 2px on press.
- **See all prices and details:** full-width, season-soft background, season-colored text, 2px ink outline, arrow that slides right on hover.
- **Light / ghost:** on the green call band only.

### Season card (signature)
Card Stock, 2px ink border, 20px corners, pinned-sign shadow. Order: service name (Display), tagline (season accent), one-line description, dotted-leader price list, Call button, See-prices button. Sized to roughly 470px on desktop; its width sets the Display size.

### Price ticket (signature)
Card Stock with a "where" label, title, big Price figure, then a dashed perforation with notches and a short bullet list. The recommended option gets an Accent pin shadow and a gold "Our pick" flag.

### Chips
Pills on Paper tint with a Pencil Rule border; core neighborhoods use green-soft with green text.

### Navigation
Card Stock header with a 2px ink bottom rule; season links are pills that fill with ink when active; the Call button sits at the right. On phones: logo plus a green call icon, and the fixed bottom bar.

### Booking pill
Floating bottom-right on desktop after about one second: a live green dot, "Now booking" line that follows the calendar, the phone number in Bitter, and a green call disc. Hides at the call section.

## Do's and Don'ts

### Do:
- **Do** tie every component to one season's accent and keep that accent consistent from the scene to the season page.
- **Do** draw the scene with specific, local detail: brick ranch, utility pole, street sign, the white pickup and trailer, a brother doing that season's job.
- **Do** keep the phone number visible on every screen (header, card, booking pill or phone bar).
- **Do** use hard offset shadows and 2px ink borders for interface surfaces.
- **Do** write headlines short and declarative, ending in a period.

### Don't:
- **Don't** use stock-vector tropes in the illustration: gradient skies, glowing sun blobs, oval clouds, lollipop trees, a symmetric front-on house row.
- **Don't** use blurred shadows, glows, or glassmorphism on interface surfaces.
- **Don't** add a third typeface or set long text in Bitter.
- **Don't** add forms, chat widgets, or a texting option; the call is the only action.
- **Don't** show invented reviews, star ratings, customer counts, or awards.
