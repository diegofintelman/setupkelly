'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {analytics} from '@/lib/analytics';
export function PageEvent(){const path=usePathname();useEffect(()=>{analytics.track('page_view',{page_type:path});if(path==='/coralrock')analytics.track('view_development',{development_id:'coralrock'});if(path.startsWith('/blog/'))analytics.track('view_article',{article_id:path.split('/').pop()})},[path]);return null;}