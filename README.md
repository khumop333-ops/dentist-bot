# Dentist bot — web demo and knowledge base

The Next.js app is a fictional, non-production front-desk demo. It answers
approved administrative FAQs and captures demo appointment requests; it does not
give dental or medical advice or make real appointments. Do not enter real personal
or medical information. The separate experimental Python knowledge-base files are
retained for research; they are not connected to the website chat and are not
approved for patient use.

## Web app / Vercel

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

Vercel: Next.js preset, repository root, default build/output settings. The
chat recognises a range of phrasings for the approved practice FAQs, but it is a
deterministic matcher rather than a general-purpose AI. It cannot answer clinical
questions; unknown questions are handed off. It does not collect chat transcripts.
The request flow accepts fictional details only. Apply the SQL migration in
`supabase/migrations/` to a dedicated Supabase demo project, then configure
`NEXT_PUBLIC_SUPABASE_URL` and the server-only `SUPABASE_SERVICE_ROLE_KEY` as in
`.env.example`. Without them, submissions fail closed with a friendly message.
Inspect demo rows in the Supabase dashboard; no anonymous read policy exists.
Never expose the service-role key to browser code. No AI key is required.

The website is marked noindex/nofollow and robots.txt disallows indexing, but
these are not access controls. Change fictional practice information consistently
in `lib/content.ts`, `app/page.tsx` and `components/site.tsx`. A real deployment
would require verified practice details, approved content, consent, integration,
and legal, privacy and compliance review.

The recovered dependency tree reports npm audit findings; upgrading dependency
major versions is separate from the deployment restoration and must be tested
before real-world use.

## Separate experimental Python prototype (not the web chat)

These research examples are separate from the no-advice website demo. Do not use
them for patient data or advice.

```sh
python bot.py --intake
python bot.py "How often should I brush?"
# Only after a negative safety screen, explicitly supplied by the caller:
python bot.py "How often should I brush?" --safety clear
python bot.py "Jaw swelling and fever" --safety urgent
python -m unittest discover -s tests -v
```

Without a safety result the demo asks the safety screen rather than answering.
`--safety` simulates an explicit screening result; it is NOT inferred from text.
Do not default it to `clear` in an integration. This CLI cannot reliably interpret
symptoms, negation or emergencies in free text and must not be used for clinical
triage. Keyword matching supports only a small demonstration vocabulary.

## Contents

- `data/dental_knowledge.json`: 12 paraphrased FAQs, source registry and nine
  entry-level intake questions. Covers brushing, interdental cleaning, check-ups,
  toothache, sensitivity, gums, bad breath, abscesses, root canals, decay prevention,
  temporary comfort and antibiotics.
- `data/mock_conversations.json`: six entirely synthetic scenarios, including
  urgent, emergency, unknown and unscreened cases. No real patient records.
- `prompts/dental_assistant.md`: grounding, handoff, privacy and safety policy for
  a future conversational integration. The CLI does not execute this prompt.
- `bot.py`: curated-answer retrieval with citations and explicit safety routing.
- `tests/test_bot.py`: fixture, provenance and routing checks.

## Research and limitations

Research date: **2026-11-02**. Sources were NHS web-search extracts, not full-page
clinical review; exact URLs and provenance are recorded per FAQ in the JSON.
The wording is educational paraphrase. Mock conversations are invented separately
from the sourced medical content. Sources:

- [Oral hygiene](https://www.nhs.uk/live-well/healthy-teeth-and-gums/take-care-of-your-teeth-and-gums/)
- [Toothache](https://www.nhs.uk/symptoms/toothache/)
- [Gum disease](https://www.nhs.uk/conditions/gum-disease/)
- [Dental abscess](https://www.nhs.uk/conditions/dental-abscess/)
- [Root canal treatment](https://www.nhs.uk/tests-and-treatments/root-canal-treatment/)

These are UK educational sources, not South African practice policy. UK service
numbers, costs and eligibility rules are intentionally not imported. Prices,
medical-aid cover, appointments and practice details are unknown, not fabricated.

Before patient use: obtain local clinician review (including red flags, children
and medication wording), validate a real screening/human-handoff workflow, add
POPIA-appropriate consent/security/retention controls and configure verified
practice details and local emergency information. Review sources periodically.
Tests validate software behavior, not clinical safety or accuracy.
