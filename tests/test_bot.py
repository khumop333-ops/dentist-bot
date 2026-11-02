import json
import unittest
from bot import KB, ROOT, respond


class BotTests(unittest.TestCase):
    def test_fixtures(self):
        for case in json.loads((ROOT / 'data/mock_conversations.json').read_text()):
            with self.subTest(case=case['id']):
                result = respond(case['message'], safety=case['safety'])
                self.assertEqual(result['route'], case['expected_route'])
                if 'expected_faq_id' in case:
                    self.assertEqual(result['faq_id'], case['expected_faq_id'])

    def test_all_questions_resolve_and_have_sources(self):
        ids = {s['id'] for s in KB['sources']}
        self.assertEqual(len({f['id'] for f in KB['faqs']}), len(KB['faqs']))
        for faq in KB['faqs']:
            self.assertTrue(faq['source_ids'])
            self.assertTrue(set(faq['source_ids']) <= ids)
            # Keywords, rather than question wording, define this demo's coverage.
            result = respond(faq['keywords'][0], safety='clear')
            self.assertEqual(result['faq_id'], faq['id'])
            self.assertTrue(result['source_urls'])

    def test_safety_precedes_matching(self):
        for safety, route in [(None, 'safety_screen'), ('urgent', 'urgent_dentist'), ('emergency', 'emergency')]:
            self.assertEqual(respond('brushing', safety=safety)['route'], route)

    def test_invalid_safety_rejected(self):
        with self.assertRaises(ValueError):
            respond('hello', safety='fine')

    def test_empty_and_unknown(self):
        for text in ['', 'xyz', 'book me tomorrow']:
            self.assertEqual(respond(text, safety='clear')['route'], 'handoff')


if __name__ == '__main__':
    unittest.main()
