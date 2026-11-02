import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader, SiteFooter } from '@/components/site';
import Chat from '@/components/chat';
export const metadata: Metadata = { title: 'Demo Dental Studio | A little more to smile about', description:'A fictional dental practice and front-desk assistant demo.', robots:{index:false,follow:false} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en-ZA"><body><div className="demo-banner">Interactive demo — fictional dental practice. No real appointments. Do not enter real personal or medical information.</div><SiteHeader/>{children}<SiteFooter/><Chat/></body></html>; }
