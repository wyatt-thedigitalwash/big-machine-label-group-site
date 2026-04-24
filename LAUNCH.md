# big-machine-label-group Final Launch Checklist

Run this AFTER all pre-launch audits pass (Branding, SEO, ADA, Security, Performance, and URL Redirects if a rebuild). Walk through phase by phase, confirming each before moving to the next. Do not skip phases.

## Phase 1 — Content Completeness

Before anything technical, confirm the site is not shipping with placeholder content that was supposed to be replaced.

- [ ] All placeholder copy replaced with real content (check SITE.md Content Status)
- [ ] All placeholder images replaced with real client photos
- [ ] Bio, testimonials, and service descriptions are final versions
- [ ] Every instance of "Lorem ipsum," "placeholder," or draft-marker comments removed from the codebase
- [ ] Client has signed off on final copy and images
- [ ] No em dashes anywhere in copy

If any item here is unchecked, stop. Do not launch.

## Phase 2 — Domain and Hosting

- [ ] Domain purchased and DNS accessible
- [ ] Domain pointed to Vercel (A record or CNAME, check Vercel dashboard for exact values)
- [ ] Vercel shows domain as "Valid Configuration"
- [ ] www to non-www redirect (or vice versa) set up based on preferred primary
- [ ] HTTPS working, SSL certificate issued by Vercel
- [ ] Test the live domain in a browser, confirm it loads the production build

## Phase 3 — Environment Variables

- [ ] RESEND_API_KEY set in Vercel production
- [ ] CONTACT_TO_EMAIL set to the client's actual receiving email
- [ ] CONTACT_FROM_EMAIL set to a verified domain sender
- [ ] Any other env vars (analytics IDs, API keys) set in Vercel production
- [ ] No env vars accidentally left in client-side code

## Phase 4 — Email Deliverability (Resend)

- [ ] Client's domain verified in Resend dashboard
- [ ] DNS records for Resend (SPF, DKIM) added to domain and verified
- [ ] Test submission of the contact form end-to-end
- [ ] Confirm notification email arrives at client's inbox (not spam)
- [ ] Confirm auto-reply email arrives at submitter's inbox (not spam)
- [ ] Sender address matches a verified domain, not onboarding@resend.dev

## Phase 5 — Redirects (Rebuilds Only)

Skip this phase if the site is brand new with no prior web presence.

- [ ] 301 redirects live in next.config.ts from all old URLs to new URLs
- [ ] Test at least 10 high-traffic old URLs, confirm they land on the correct new pages
- [ ] Test old URLs with and without trailing slashes
- [ ] Check Google Search Console for the old site's top URLs, make sure they're all mapped
- [ ] If domain is changing, Change of Address submitted in Google Search Console

## Phase 6 — Search Engine Setup

- [ ] Google Search Console verified (add site property, verify via DNS or HTML tag)
- [ ] Sitemap submitted in Search Console (https://domain.com/sitemap.xml)
- [ ] robots.txt accessible at https://domain.com/robots.txt
- [ ] Request indexing for homepage and 2-3 key pages via Search Console
- [ ] Bing Webmaster Tools verified and sitemap submitted (optional)

## Phase 7 — Google Business Profile

- [ ] Business Profile claimed and verified by the client
- [ ] Website URL on Business Profile updated to new domain
- [ ] Business Profile linked to the site
- [ ] Business hours on Profile match the site
- [ ] Address on Profile matches the site exactly
- [ ] Phone number on Profile matches the site exactly

## Phase 8 — External Listings Update

- [ ] Instagram link in bio
- [ ] Facebook page Website field
- [ ] LinkedIn company page
- [ ] TikTok bio link
- [ ] Twitter/X profile link
- [ ] Yelp business listing
- [ ] Industry-specific directories (Zocdoc, Houzz, Vitals, Angi, etc.)
- [ ] Any printed materials flagged for reprint if needed

## Phase 9 — Analytics (If Installed)

- [ ] Google Analytics 4 tag firing on every page (check Real-Time report)
- [ ] GA4 property linked to Search Console
- [ ] Goals/conversions set up for form submissions and phone clicks
- [ ] If using Plausible/Fathom/Umami, verify it is firing

## Phase 10 — Functional Testing

Walk the site manually, top to bottom, every page, every link.

- [ ] Every page loads on desktop
- [ ] Every page loads on mobile (real device, not just DevTools)
- [ ] Every navigation link works (header, footer, inline)
- [ ] Every CTA button works and routes correctly
- [ ] Contact form submits successfully
- [ ] Contact form validation works (test empty fields, invalid email)
- [ ] Contact form shows success state after submission
- [ ] Phone numbers are tappable on mobile (tel: links work)
- [ ] Email addresses are tappable (mailto: links work)
- [ ] Address links open Google Maps
- [ ] Social links go to the correct profiles
- [ ] 404 page works (visit a nonexistent URL, confirm branded 404)
- [ ] Gallery lightbox opens, navigates, closes (if applicable)
- [ ] Keyboard navigation works (Tab through the entire site)

## Phase 11 — Cross-Browser and Device Testing

- [ ] Safari on iPhone
- [ ] Chrome on Android
- [ ] Safari on Mac
- [ ] Chrome on desktop
- [ ] Firefox on desktop
- [ ] Edge on desktop

## Phase 12 — Performance Verification

- [ ] Lighthouse mobile score 90+ for Performance
- [ ] Lighthouse mobile score 95+ for Accessibility
- [ ] Lighthouse mobile score 100 for Best Practices
- [ ] Lighthouse mobile score 100 for SEO
- [ ] Core Web Vitals all green (LCP under 2.5s, CLS under 0.1, INP under 200ms)
- [ ] Homepage under 2MB total page weight (ideally under 1MB)

## Phase 13 — Social Preview Check

- [ ] Test OG image by pasting the homepage URL into iMessage, Slack, and Facebook
- [ ] Preview renders with correct image, title, and description
- [ ] Use Facebook Sharing Debugger to verify
- [ ] Use Twitter Card Validator if client uses Twitter/X

## Phase 14 — Hand-Off to Client

- [ ] Send client the live URL with a "go live" email
- [ ] Send client login info for any tools they need access to (Analytics, Search Console, etc.)
- [ ] Send short "how to update your site" doc if applicable
- [ ] Remind client of any remaining action items
- [ ] Schedule 30-day check-in to review performance and address anything

## Phase 15 — Internal Follow-Ups (The Digital Wash)

- [ ] Add client to CRM / client portal with launch date logged
- [ ] Add recurring tasks for monthly SEO/management if on retainer
- [ ] Archive a copy of the final SITE.md in reference folder
- [ ] Save screenshots of the final site for portfolio
- [ ] Update portfolio/case studies page with the new client
