# Source review notes — Kingsley Obot portfolio

These notes record what was confirmed from the three project ZIP archives supplied on 15 November 2026. They are maintainer notes for accurate portfolio updates and interview preparation. They distinguish package/source evidence from deployment claims.

## 1. Again Market

**Archive:** `declutteringzipdfolder.zip`  
**Public project link supplied:** https://again-marketplace.vercel.app/  
**Repository README title:** Again Market

### Verified package stack

- Runtime: React 18.3.1, React DOM 18.3.1, TypeScript ~5.8.3, Vite ^6.3.5.
- Routing/data: `@tanstack/react-router` ^1.132.0, `@tanstack/react-query` ^5.90.2.
- Backend client: `@supabase/supabase-js` ^2.57.4.
- Styling: Tailwind CSS ^3.4.17, PostCSS, Autoprefixer.
- Forms/validation: `react-hook-form` ^7.62.0, `zod` ^4.1.5, `@hookform/resolvers` ^5.2.2.
- Mobile bridge: Capacitor Android/iOS/Core/App/Share/Push Notifications ^7.x and Capacitor CLI ^7.4.3.
- UI/icons: `lucide-react` ^0.468.0.

### Confirmed product/engineering work

- Listing creation, public browsing/search, listing detail pages and seller dashboards.
- Supabase email/password auth, vendor profile creation, public listing media and moderation status.
- Admin listing moderation, pause/reject/approve, pricing, featured placement and category administration.
- Realtime conversations, unread/read state, archive, reporting/blocking and private message attachments.
- Buyer offers, alternating counteroffers, accept/reject/withdraw, offer history, 48-hour expiry, and transaction-level row-locking intended to prevent concurrent reservation of the same listing.
- Two messaging models: direct buyer/vendor conversations and admin-mediated conversations.
- Listing images resized and converted to WebP in-browser; private listing evidence and vendor verification media stored separately and previewed using short-lived signed URLs.
- Manual seller/item review, role permissions, MFA/TOTP, AAL2 requirements for staff admin access, and server-side Edge Function for account suspension.
- In-app notifications; optional Resend email, VAPID web push, native FCM/APNs delivery adapters.
- Nigerian state/LGA data sync; active-listing pre-render; metadata, canonical/Open Graph/Twitter tags, Product JSON-LD, sitemap generation, PWA shell/offline fallback and Capacitor configuration.

### Important release boundaries from the supplied README

The archive's README states the source release had not been connected to the live Supabase project, deployed, or production-verified. The README also lists payment processing/capture, escrow, refunds, courier booking/tracking, settlements, fraud scoring and external identity/authenticity checks as not active. The offer acceptance flow creates a deal/order record and reserves the listing; it is not a card charge or delivery booking. Native project folders/signing and external push provider credentials are separate setup steps.

## 2. Zitso Energy

**Archive:** `zitsoenergyfile.zip`  
**Public project link supplied:** https://zitsoenergy.com/  
**Package name:** `zitso-energy`

### Verified package stack

- Runtime: React ^19.2.0, React DOM ^19.2.0, TypeScript ^5.8.3, Vite 8.1.5.
- Routing/rendering: TanStack Router 1.170.18, TanStack Start 1.168.32, Router plugin 1.168.23, `@lovable.dev/vite-tanstack-config` ^2.20.0.
- Data/cache: TanStack Query ^5.101.1.
- Backend client: `@supabase/supabase-js` ^2.116.0.
- Styling: Tailwind CSS ^4.2.1, `@tailwindcss/vite` ^4.2.1, `tw-animate-css` ^1.3.4.
- Forms/validation: React Hook Form ^7.71.2, Zod ^3.25.76, `@hookform/resolvers` ^5.2.2.
- UI/icons/data display: Radix UI React primitives, `lucide-react` ^0.575.0, Recharts ^2.15.4, Embla Carousel, Sonner, Vaul, cmdk, date-fns, react-day-picker, input-otp, react-resizable-panels, class-variance-authority, clsx, tailwind-merge.
- Database tooling listed in package: Drizzle Kit ^0.31.10, Drizzle ORM ^0.45.2 and `postgres` ^3.4.9. The checked-in `drizzle/schema.ts` is intentionally blank; the database definitions reviewed are SQL migrations and application data access is through Supabase client calls.

### Confirmed source architecture and product work

- TanStack Start application with server entry and SSR error normalization; file-based route tree.
- Public service, project, location, about, FAQ, contact, request-quote, terms/privacy and blog routes.
- Admin routes for dashboard, activity logs, service areas, blog, content/site settings, FAQs, media, messages, navigation, projects, quote requests, services, testimonials, users and settings.
- SQL migration model includes profiles, user roles, company settings, business hours, office locations, service categories, services, projects, testimonials, FAQs, service areas, quote requests, quote-request file records, contact messages, navigation items, footer links, social links, site content, media library and admin activity logs.
- Roles include super admin, admin and editor; SQL functions/policies and Row Level Security separate public content reads from staff writes and restrict quote/message access.
- Quote flow includes a selected service context and file uploads; contact form writes submissions to Supabase.
- Office distance checker asks for browser geolocation only after the user action and compares against the configured service radius.
- Admin content editor, CRUD tooling, media upload, before/after slider, configurable hero content, dynamic blog and WhatsApp contact component.

### Security note

The uploaded Zitso ZIP contains a file named `.env.backup`. It was not opened or copied into the portfolio. Before pushing or sharing that project source, remove `.env.backup` from the repository/archive, ensure real credentials are not committed, and rotate/revoke any credential that may have been exposed. Keep secrets in deployment/server-side secret storage, never in client-exposed `VITE_` variables.

## 3. Mavir Leaders College Reunion Hub

**Archive:** `reunion-glow-hub.zip`  
**Public project link supplied:** https://reunion-glow-hub.vercel.app/  
**Repository README title:** Alumni Connect Hub

### Verified package stack

- Runtime: React ^19.2.0, React DOM ^19.2.0, TypeScript ^5.8.3, Vite 8.1.5.
- Routing/rendering: TanStack Router 1.170.18, TanStack Start 1.168.32, Router plugin 1.168.23, `@lovable.dev/vite-tanstack-config` ^2.24.0.
- Data/cache: TanStack Query ^5.101.1.
- Backend client/auth: `@supabase/supabase-js` ^2.116.0 and `@lovable.dev/cloud-auth-js` ^1.1.2.
- Styling: Tailwind CSS ^4.2.1, `@tailwindcss/vite` ^4.2.1, `tw-animate-css` ^1.3.4.
- Forms/validation: React Hook Form ^7.71.2, Zod ^3.25.76, `@hookform/resolvers` ^5.2.2.
- UI/icons/charts: Radix UI React primitives, `lucide-react` ^0.575.0, Recharts ^2.15.4, Sonner, Embla Carousel, Vaul, cmdk, date-fns, react-day-picker, input-otp, react-resizable-panels, class-variance-authority, clsx, tailwind-merge.

### Confirmed application work

- Authenticated app shell, member profiles/approval, admin/member roles, profile updates and account settings.
- Supabase SQL migrations define profiles, user_roles, app_settings, messages, gallery_photos, transactions, events and event_rsvps, with RLS policies.
- Class room and direct messages use Supabase Realtime; voice notes are captured using the browser MediaRecorder API, stored in Supabase Storage and played back with a custom audio player.
- Financial ledger shows funds collected, expenses and net balance, with transaction categories, dates, proof attachments and admin-only write operations under RLS.
- Gallery uploads include a client-side image conversion pipeline using `createImageBitmap`, canvas resize and WebP encoding before Supabase Storage upload.
- Events include agenda/venue information and RSVP records; bank details card includes copy-to-clipboard interaction.
- PWA manifest and install icons are included. The supplied archive does not evidence a complete signed native Android/iOS build.

## Portfolio accuracy rules

- Use “4 years of hands-on product-building experience” as the user's requested positioning; do not invent employer names, payroll roles or client outcomes.
- Keep the University of the People, Computer Science, 2021–2024 education detail as supplied by Kingsley.
- The public site may show principal libraries and platform services, not every UI/transitive package. Full dependency detail is recorded above for interview preparation.
- Do not claim an integration is production-active merely because an adapter, configuration file or source implementation exists. State whether a provider credential, live database, native build or production deployment has actually been configured and verified.
