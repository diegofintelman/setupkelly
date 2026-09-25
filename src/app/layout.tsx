import type {Metadata,Viewport} from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './phase3b.css';
import './motion.css';
import './property-search.css';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';
import {PageEvent} from '@/components/page-event';
import {ScrollMotion} from '@/components/scroll-motion';
import {siteUrl} from '@/lib/seo';
const serif=localFont({src:'../fonts/playfair-latin.woff2',variable:'--font-editorial',display:'swap',weight:'400 900'});
const sans=localFont({src:'../fonts/inter-latin.woff2',variable:'--font-body',display:'swap',weight:'100 900'});
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Kelly Belem | Miami Real Estate Advisor',template:'%s | Kelly Belem'},description:'Thoughtful real estate guidance in Coral Gables, Pinecrest and South Florida.',robots:{index:false,follow:false}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#F5EFE6'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={serif.variable+' '+sans.variable}><body><a href="#main" className="skip-link">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><PageEvent/><ScrollMotion/></body></html>}
