# Big Machine Records -- Website Reference

## Business Info
- Business Name: Big Machine Records
- Industry: Independent music label
- Location: Nashville, Tennessee
- Phone: (pending from client)
- Email: (pending from client)
- Website URL: (pending)
- Google Business Profile: (pending)

## Roster
Riley Green, Rascal Flatts, Aaron Lewis, Motley Crue, Mackenzie Carpenter, Greyland James, Cole Goodwin, Caroline Jones, The Jack Wharff Band, Shaylen, Marfa, Savana Santos

## Positioning
A cinematic, dark editorial label site that carries real attitude underneath a premium surface. Not a polished Nashville establishment -- something with speed, power, and edge. The logo is a hot rod with flames. The site should feel like it was art directed by someone who grew up on great music and ignored every label site template that came before it.

## Brand Voice
- Terse and confident. Never breathless or promotional.
- Short sentences. No exclamation points.
- Artist names stand alone. They don't need adjectives.
- Industry-facing sections are factual and direct.
- Fan-facing sections are visceral and immediate.

## Visual Direction
- Black canvas throughout. No light backgrounds except the sync and contact pages which use #0D0D0D.
- Red (#CA2125) is the only accent. Used for hover states, active indicators, one UI moment per section, and the single horizontal rule between major sections.
- No rounded corners anywhere.
- No cards with drop shadows.
- No icon libraries. Custom SVG only if icons are needed.
- No gradients except the dark overlay on artist photography (black to transparent, bottom 30%, 60% opacity).
- Typography does the heavy lifting. Bebas Neue at large scale is the primary design element.
- Images bleed edge to edge. Never contained in a box.
- Motion is slow and intentional. Minimum 400ms on all transitions. Ease-out only.

## Colors
- --color-bg: #000000
- --color-red: #CA2125
- --color-white: #FFFFFF
- --color-gray-light: #C8C7C8
- --color-gray-dark: #717171

## Typography
- Display Font: 'Bebas Neue' (headlines, artist names, section titles, all caps)
- Body Font: 'Syne' (body copy, UI text, navigation, captions)
- Import both via next/font/google. Bebas Neue at weight 400. Syne at weights 400 and 600.

## Logo
Hot rod with flames. SVG or PNG stored in /public. Wordmark used in footer.

## Pages
- [ ] / -- Homepage
- [ ] /artists -- Roster overview
- [ ] /artists/[slug] -- Individual artist pages (dynamic route)
- [ ] /news -- News and editorial
- [ ] /about -- Label story
- [ ] /sync -- Sync and licensing
- [ ] /contact -- Contact and inquiries

## Artist Roster Slugs
- riley-green
- rascal-flatts
- aaron-lewis
- motley-crue
- mackenzie-carpenter
- greyland-james
- cole-goodwin
- caroline-jones
- jack-wharff-band
- shaylen
- marfa
- savana-santos

## Navigation
Fixed header. Big Machine logo (SVG or PNG from public directory) left-aligned. Hamburger right. Full-screen overlay nav on open -- artist names large down the left, standard nav links small beneath. Closes on ESC or click outside.

## Footer
Near-full-width. One red horizontal rule at top. Wordmark left. Copyright center. Social icon links right (custom SVG). Background #000000.

## Show Dates
Artist show dates pull from Bandsintown API on individual artist pages.

## CTAs
- Primary: (pending -- determined per page context)
- Secondary: (pending)

## Content Status

### Text Content
- [ ] Artist bios (all 12): placeholder
- [ ] News articles: placeholder until AI content pipeline is connected
- [ ] About page copy: pending from client
- [ ] Sync page catalog description: pending from client
- [ ] Contact form auto-reply: placeholder

### Visual Content
- [ ] Logo files (final version in /public): pending from client
- [ ] Artist photography (all 12): pending from client
- [ ] OG image: pending

### Business Info Confirmed
- [ ] Address confirmed: pending
- [ ] Phone number confirmed: pending
- [ ] Email confirmed: pending
- [ ] Social profiles confirmed: pending

### Integrations
- [ ] Resend domain verified: pending
- [ ] Bandsintown API: pending integration
- [ ] Google Analytics installed: pending
- [ ] Google Search Console verified: pending

### Blocking Items for Launch
- Artist bios for all 12 roster members
- Artist photography for all 12 roster members
- About page copy from client
- Sync page catalog description from client
- Logo files from client
- Bandsintown API integration for show dates
- Resend domain verification for contact form

### Nice-to-Have (Post-Launch)
- AI content pipeline for news articles
- Google Business Profile linking

## Notes
- All forms wired via Resend
- Sync and contact pages use #0D0D0D background instead of pure black
- No em dashes in any user-facing copy (use commas, periods, or two hyphens instead)
