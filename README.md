# Demo Dental Studio

A fictional, non-production front-desk demonstration for a dental practice in Menlyn. It answers a local set of approved administrative FAQs, shows an appointment **request** flow, routes urgent messages to fictional contact information and offers a handoff. It does not provide medical advice, check availability or make appointments. No AI key is required. Do not use this demo for real patient data or dental advice without legal, privacy and compliance review.

## Local setup

1. Install Node.js 20 or newer, then `npm install`.
2. Copy `.env.example` to `.env.local`. Set the values below only if you want to persist fictional requests; the website and chat work without them.
3. Run `npm run dev`, then visit `http://localhost:3000`. Use fictional details only.
4. Run `npm run lint` and `npm run build` to check the project.

## Supabase

Create or choose a project specifically for this demo. Run `supabase/migrations/20261031000000_demo_appointment_requests.sql` in its SQL editor or apply it using the Supabase CLI. It creates `public.demo_appointment_requests`, enables RLS, revokes anonymous/authenticated access and creates no public policies. Inserts are performed only by the server using the service role. Inspect fictional rows using the Supabase dashboard Table Editor; there is deliberately no public admin page. Establish an appropriate deletion/retention policy before any real-world deployment. Do not use an unrelated project without permission.

## Vercel environment variables

Set these in the Vercel project for the appropriate environment and redeploy:

- `NEXT_PUBLIC_SUPABASE_URL`: the demo project's URL.
- `SUPABASE_SERVICE_ROLE_KEY`: the project's server-only service-role key. Never expose this as a `NEXT_PUBLIC_` variable or commit it.

Without either variable, submissions return a friendly unavailable message; no request is stored or represented as successful. Deploy the Next.js project using the default Vercel framework settings. Both pages and robots.txt instruct search engines not to index; this is not access control.

## Customisation and boundaries

Practice details and approved FAQ answers live in `lib/content.ts`; site copy appears in `app/page.tsx`, `components/site.tsx` and the informational pages. Review all copy, fictional contact details, `tel:` links, safety routing and emergency text together before changing anything. The chat is a deterministic state machine, not an LLM; free-text matching is deliberately limited. The sample image is AI-generated. No calendar, PMS, messaging, payments, patient records, medical-aid verification or clinical advice are included. Strict validation and a honeypot reduce accidental submissions but are not production-grade abuse protection or a substitute for compliance review.
