export const phone = '012 000 0000';
export const emergency = 'This demo cannot assess emergencies. Call the practice on 012 000 0000. In South Africa, call 10177 for an ambulance or 112 from a mobile. If it is life-threatening, go to the nearest emergency unit.';
export const intro = 'Hi 👋 I’m the demo front-desk assistant. I can answer approved questions and show how an appointment request works. I can’t give dental advice. This is a fictional demo—please don’t enter real personal or medical information.';
export const faqs = [
 {id:'services', question:'What services are available?', answer:'This fictional practice lists check-ups, cleanings, fillings, crowns, extractions, children’s appointments and emergency consultations.'},
 {id:'hours', question:'What are your opening hours?', answer:'Monday–Friday 08:00–17:00; Saturday 08:00–12:00. Closed Sundays and public holidays.'},
 {id:'location', question:'Where are you located, and is there parking?', answer:'The fictional address is 123 Demo Lane, Menlyn, Pretoria, 0181. Parking is shown as available for this demo only.'},
 {id:'new', question:'Are new patients welcome?', answer:'Yes, new patients are welcome in this fictional demo.'},
 {id:'children', question:'Do you offer children’s appointments?', answer:'Yes, children’s appointments are included in the fictional service list.'},
 {id:'languages', question:'What languages are spoken?', answer:'English; Afrikaans on request.'},
 {id:'medical', question:'Do you accept medical aid?', answer:'Cover depends on the scheme and plan. A real practice would confirm before your visit. This demo does not verify medical aid.'},
 {id:'fees', question:'How much does an appointment cost?', answer:'This demo cannot provide exact quotes. The practice would confirm after an assessment.'},
 {id:'requests', question:'How does an appointment request work?', answer:'You can submit a fictional request through the demo assistant. No real appointment is booked; a live practice would confirm separately.'},
 {id:'bring', question:'What should I bring to a first visit?', answer:'A real practice may ask you to bring your ID, medical-aid card if applicable, and a medication list. Please do not share these in this demo.'},
 {id:'change', question:'How do I reschedule or cancel?', answer:'In a live practice, contact the front desk to discuss changes. This demo cannot reschedule or cancel an appointment.'},
 {id:'emergency', question:'What if it is an emergency?', answer:emergency},
 {id:'about', question:'Is this a real practice?', answer:'No. Demo Dental Studio is a fictional practice created to demonstrate a front-desk assistant.'},
] as const;
// Intent matching is deliberately limited to approved front-desk information.
// Free text is untrusted and never becomes an instruction or an answer.
export const isEmergency = (text:string) => /\b(emergency|urgent|swelling|swollen|trauma|injur\w*|bleed\w*|breath\w*|swallow\w*|severe pain|face.*pain|jaw.*pain)\b/i.test(text);
export const hasMedicalDetails = (text:string) => /\b(pain|ache|hurt|symptom|swoll\w*|bleed\w*|injur\w*|trauma|breath\w*|swallow\w*|diagnos\w*|medication|medical history|allerg\w*|pregnan\w*|infection)\b/i.test(text);
export const isInstructionAttack = (text:string) => /\b(ignore|override|bypass|system prompt|instructions|reveal|jailbreak|other users|database|developer message)\b/i.test(text);

const clinicalQuestion = /\b(diagnos\w*|treatments?|treating|medicine|medications?|antibiotics?|painkillers?|prescri\w*|cure|medical advice|dental advice|brush(?:ing)?|floss(?:ing)?|abscess\w*|root canals?|tooth decay|cavit(?:y|ies)|gums?|toothache|teeth hurt|tooth hurts?|first aid)\b/i;
export const isClinicalQuestion = (text:string) => clinicalQuestion.test(text) || /\b(should i|what can i take|what should i do)\b/i.test(text);
const faqsById = Object.fromEntries(faqs.map(f => [f.id, f.answer]));

/** Return a fixed approved answer, or null when the intent isn't recognised. */
export function answerFor(text: string): string | null {
 const t = text.toLowerCase().replace(/[’‘]/g, "'").trim();
 if (isEmergency(t)) return emergency;
 if (isInstructionAttack(t)) return 'I can only help with the approved front-desk demo. Please choose an option below.';
 // A general "what to bring" question is administrative, not a request to share medication details.
 const bring = /\b(bring|documents?|paperwork)\b/.test(t) && /\b(visit|appointment|first|need|bring)\b/.test(t);
 if (bring && !/\b(i (?:take|use|have)|symptoms?|pain|allerg\w*|my (?:medication|medicine|condition|history))\b/.test(t)) return faqsById.bring;
 if (hasMedicalDetails(t) || isClinicalQuestion(t)) {
  return 'I can’t provide dental or medical advice. Please don’t share medical information in this demo; call the fictional practice on 012 000 0000.';
 }
 const hours = /\b(hours?|opening|open|clos(?:e|ed|ing)|business hours|sunday|saturday|public holidays?)\b/.test(t) || /\bwhat time\b/.test(t);
 const location = /\b(park(?:ing)?|location|address|directions|located|find you|where are you|where is (?:the |your )?(?:practice|studio)|menlyn)\b/.test(t);
 const medicalAid = /\b(medical[ -]?aids?|schemes?|cover(?:age)?|insurance)\b/.test(t);
 const fees = /\b(prices?|pricing|costs?|fees?|quotes?|charges?|rand|zar|expensive|how much|rates?)\b/.test(t);
 if (/\b(phone|telephone|contact number|call you)\b/.test(t)) return 'The fictional phone number is 012 000 0000.';
 if (/\b(email|e-mail)\b/.test(t)) return 'The fictional email address is hello@demo-dental.example.';
 if (hours && location) return `${faqsById.hours} ${faqsById.location}`;
 if (medicalAid && fees) return `${faqsById.medical} ${faqsById.fees}`;
 if (hours) return faqsById.hours;
 if (location) return faqsById.location;
 if (medicalAid) return faqsById.medical;
 if (fees) return faqsById.fees;
 const patterns: [RegExp,string][] = [
  [/\b(children|child(?:ren's)?|kids?|paediatric|pediatric)\b/,'children'],
  [/\b(new patients?|first (?:visit|time)|accepting patients|first appointment)\b/,'new'],
  [/\b(languages?|afrikaans|english|speak)\b/,'languages'],
  [/\b(reschedul\w*|cancel\w*|change (?:my |an? )?appointment)\b/,'change'],
  [/\b(services?|clean(?:ing|ings)?|check[ -]?ups?|fillings?|crowns?|extractions?|what do you offer)\b/,'services'],
  [/\b(how (?:does|do|would).*(?:appointment requests?|request.*work|booking.*work)|appointment requests? work)\b/,'requests'],
  [/\b(real|fictional|who are you|who (?:is|are) (?:the |this )?(?:practice|studio)|what is demo dental)\b/,'about']
 ];
 const id=patterns.find(([pattern])=>pattern.test(t))?.[1];
 if (id) return faqsById[id];
 if (/^(hi|hello|hey|good (morning|afternoon|evening))[!.? ]*$/.test(t)) return 'Hello! I can help with fictional practice FAQs or show you how to make a demo appointment request.';
 return null;
}

export function wantsAppointmentRequest(text: string): boolean {
 const t = text.toLowerCase();
 // Questions about how the demo works receive the approved FAQ instead.
 if (/\bhow\b.*\b(work|works)\b/.test(t)) return false;
 return /\b(book(?:ing)?|make an appointment|request an appointment|appointment requests?|schedule an appointment)\b/.test(t);
}
