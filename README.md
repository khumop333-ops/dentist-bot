# Dentist bot — web demo and knowledge base

The original Next.js dental front-desk app has been recovered from commit
`b4bf33ca6be1d441abc25704faa5bf8f62881e3d` on
`arena/9d3d27fd-dentist-bot`. That app had been deployed successfully to Vercel
but was not merged into main before the separate Python knowledge-base work.
The restored chat now answers basic general-education questions using the shared
source-linked JSON knowledge base. This is still a fictional demo, not a
clinical triage system or live internet-research integration.

## Web app / Vercel

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

Vercel: Next.js preset, repository root, default build/output settings. The
restored `app/` directory and package lock make the app buildable from a clean
checkout without relying on cached files. Open chat and choose **Dental basics**,
or ask “How often should I brush?” or “What is root canal treatment?”.
The appointment-request flow still asks entry-level questions and only accepts
fictional details. It needs the Supabase configuration in `.env.example` and
the included migration to persist demo requests. Without configuration it fails
closed with a 503; FAQ answers do not require secrets or external services.
Do not expose a Supabase service-role key to browser code.

The recovered dependency tree reports npm audit findings; upgrading dependency
major versions is separate from the deployment restoration and must be tested
before real-world use.

## Try it

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
