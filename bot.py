"""Dependency-free dental FAQ prototype. Not a diagnostic or triage system."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
KB = json.loads((ROOT / 'data/dental_knowledge.json').read_text())
DISCLAIMER = 'General dental information only, not a diagnosis. A dentist must assess symptoms.'


def respond(message, *, safety=None):
    """Safety is an explicit answer to the safety screen, not inferred from prose.

    None: not answered; emergency/urgent: positive screen; clear: negative screen.
    The caller must never silently default a patient's safety screen to clear.
    """
    if safety not in (None, 'clear', 'urgent', 'emergency'):
        raise ValueError('Invalid safety screen result')
    base = {'disclaimer': DISCLAIMER, 'source_urls': [], 'mock': True}
    if safety is None:
        return {**base, 'route': 'safety_screen', 'answer': KB['intake_questions'][0]['question'],
                'follow_up': 'If yes, seek emergency care now. If unsure, get urgent professional help rather than continuing this demo.'}
    if safety == 'emergency':
        return {**base, 'route': 'emergency', 'answer': 'Seek emergency medical care now or call your local emergency number. Do not wait for this chat or a routine dental appointment.', 'follow_up': None}
    if safety == 'urgent':
        return {**base, 'route': 'urgent_dentist', 'answer': 'Contact a dentist urgently today for assessment. If breathing or swallowing becomes difficult, or swelling reaches the eye or neck, seek emergency care immediately.', 'follow_up': None}
    text = ' '.join(re.findall(r"[\w-]+", message.lower()))
    matches = [(max((len(k.split()) for k in faq['keywords'] if re.search(r'(?<!\w)' + re.escape(k) + r'(?!\w)', text)), default=0), faq) for faq in KB['faqs']]
    score, faq = max(matches, key=lambda pair: pair[0])
    if not score:
        return {**base, 'route': 'handoff', 'answer': 'I do not have a reviewed answer for that yet. Please ask the dental team. I cannot confirm prices, medical-aid cover or appointment availability.', 'follow_up': 'What would you like the dental team to help with?'}
    urls = {s['id']: s['url'] for s in KB['sources']}
    return {**base, 'route': 'faq', 'faq_id': faq['id'], 'answer': faq['answer'],
            'source_urls': [urls[i] for i in faq['source_ids']],
            'follow_up': 'Is this a general question, or are you experiencing symptoms?'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('message', nargs='?', default='')
    parser.add_argument('--safety', choices=['clear', 'urgent', 'emergency'], help='Explicit safety screen result; see README. Do not infer from keyword matching.')
    parser.add_argument('--intake', action='store_true')
    args = parser.parse_args()
    print(json.dumps(KB['intake_questions'] if args.intake else respond(args.message, safety=args.safety), indent=2))
