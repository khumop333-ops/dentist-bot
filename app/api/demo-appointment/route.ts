import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';
import { requestSchema } from '@/lib/schema';
export const runtime = 'nodejs';
const fail = (message:string, status:number) => NextResponse.json({error:message},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request: Request) {
 try {
  const length=Number(request.headers.get('content-length') || 0);
  if (length > 4096) return fail('Please check the demo request and try again.',400);
  const raw=await request.text();
  if (raw.length > 4096) return fail('Please check the demo request and try again.',400);
  const parsed=requestSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) return fail('Please check the demo details and consent, then try again.',400);
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return fail('Demo requests are not available right now. No appointment has been booked.',503);
  const {website, ...data}=parsed.data;
  void website;
  const reference=`DEMO-${randomBytes(3).toString('hex').toUpperCase()}`;
  const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {error}=await supabase.from('demo_appointment_requests').insert({...data,email:data.email || null,reference});
  if (error) return fail('Demo requests are not available right now. No appointment has been booked.',503);
  return NextResponse.json({reference},{headers:{'Cache-Control':'no-store'}});
 } catch { return fail('Demo requests are not available right now. No appointment has been booked.',503); }
}
