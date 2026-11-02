# Dentist bot — knowledge starter

A dependency-free Python 3 prototype with researched dental education, basic
intake questions, a conversational policy and synthetic fixtures. No existing
bot/backend was present in this repository; this is a starter, not a deployed
chat service or a live internet-research integration.

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
