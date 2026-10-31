import { z } from 'zod';
export const dayPattern = /^(?:(?:(?:next|this)\s+)?(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|week|month|weekday)|today|tomorrow|flexible|any day|any weekday|\d{1,4}[\/.-]\d{1,2}(?:[\/.-]\d{1,4})?)$/i;
const trimmed = (max:number) => z.string().trim().min(1).max(max);
export const requestSchema = z.object({
 full_name: trimmed(80).regex(/^[\p{L}][\p{L} .'-]*$/u),
 phone: trimmed(20).regex(/^[+\d ()-]{7,20}$/),
 email: z.union([z.literal(''), z.string().trim().email().max(120)]),
 patient_type: z.enum(['new','existing','unsure']),
 appointment_type: z.enum(['Check-up','Cleaning','Pain or urgent consultation','Braces consultation','Implant consultation','Children’s appointment','Other']),
 preferred_day: trimmed(40).regex(dayPattern),
 preferred_time_window: z.enum(['Weekday morning','Weekday afternoon','Saturday morning','Flexible']),
 consent: z.literal(true),
 website: z.literal(''),
}).strict().refine((data) => !/\b(pain|ache|hurt|symptom|swoll\w*|bleed\w*|injur\w*|trauma|breath\w*|swallow\w*|diagnos\w*|medication|medical history|allerg\w*|pregnan\w*|infection)\b/i.test([data.full_name, data.preferred_day, data.email].join(' '))); 
