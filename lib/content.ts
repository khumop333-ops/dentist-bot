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
export function answerFor(text: string): string | null {
 const t=text.toLowerCase();
 if (/\b(ignore|override|bypass|system prompt|instructions|reveal|jailbreak|other users|database|developer message)\b/.test(t)) return 'I can only help with the approved front-desk demo. Please choose an option below.';
 if (/\b(diagnos|treat|medicine|medication|antibiotic|painkiller|prescri|should i|what can i take|cure|medical advice)\w*/.test(t) && !/what (should|do) i bring/.test(t)) return 'I can’t provide dental or medical advice. Please call the practice on 012 000 0000; this number is fictional.';
 const patterns: [RegExp,string][] = [
  [/\b(hour|open|close|sunday|saturday|holiday|time do)\w*/,'hours'], [/\b(park|location|address|where|directions|menlyn)\w*/,'location'], [/\b(medical aid|medical-aid|scheme|cover|insurance)\b/,'medical'], [/\b(price|cost|fee|quote|charge|rand|zar|expensive)\w*/,'fees'], [/\b(child|children|kid|paediatric|pediatric)\w*/,'children'], [/\b(new patients?|first (visit|time)|accepting patients)\b/,'new'], [/\b(bring|documents|what.*need)\w*/,'bring'], [/\b(language|afrikaans|english)\w*/,'languages'], [/\b(reschedul|cancel|change.*appointment)\w*/,'change'], [/\b(service|cleaning|check.?up|filling|crown|extraction)\w*/,'services'], [/\b(real|fictional|who are you|practice)\b/,'about'], [/\b(request.*work|booking.*work)\b/,'requests']
 ];
 const id=patterns.find(([pattern])=>pattern.test(t))?.[1]; return faqs.find(f=>f.id===id)?.answer ?? null;
}
export const isEmergency = (text:string) => /\b(emergency|urgent|swelling|swollen|trauma|injur\w*|bleed\w*|breath\w*|swallow\w*|severe pain|face.*pain|jaw.*pain)\b/i.test(text);
export const hasMedicalDetails = (text:string) => /\b(pain|ache|hurt|symptom|swoll\w*|bleed\w*|injur\w*|trauma|breath\w*|swallow\w*|diagnos\w*|medication|medical history|allerg\w*|pregnan\w*|infection)\b/i.test(text);
