# big-machine-label-group Website

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Resend (transactional emails)
- Vercel (hosting)

## Project Structure
src/app/          pages and layouts
src/app/api/      API routes
src/components/   reusable components
src/lib/          utilities, constants, types
public/           static assets (images, fonts, favicon)

## Design System
- Colors: defined in SITE.md
- Font: defined in SITE.md
- All pages must be mobile responsive (breakpoint: 768px)
- Use semantic HTML (nav, main, section, footer, article)
- Every image needs alt text
- Every page needs unique meta title and description

## Section Spacing Rule
Each section should define its own vertical padding. When two consecutive sections share the same visual background color, remove the top padding from the second section to prevent double-stacked gaps. When two consecutive sections have different background colors, both sections keep their full padding so the transition has proper breathing room. Use data attributes or class checks to determine whether backgrounds match. If any specific spot looks too tight or too loose, fix it with an explicit padding class on that individual section.

## Code Rules
- No "use client" unless the component needs interactivity (state, effects, event handlers)
- API keys only in /api/ routes or server components, never in client code
- Use Next.js Image component for optimized images
- All forms need server-side validation
- No console.log in production code
- Keep components under 300 lines, split if larger
- No em dashes in any user-facing copy. Use commas, periods, or two hyphens (--) instead

## Git Rules
- NEVER push to GitHub or deploy to Vercel automatically after the initial setup
- NEVER run git push, vercel, or vercel --prod unless explicitly asked
- All changes stay local until tested and pushed manually

## Permissions
Run Claude Code with: claude --dangerously-skip-permissions

## Pre-Launch Audit Prompts
The following audits should run in this order before launch:
1. Branding Assets
2. SEO
3. ADA Compliance
4. Security
5. Performance
6. (Rebuilds only) URL Redirects

Each audit is a separate prompt that will be pasted in when ready. After all audits pass, the Final Launch Checklist in LAUNCH.md is walked through phase by phase.
