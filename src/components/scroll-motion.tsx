'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

// Lives in the root layout, so it must re-run on every client-side navigation:
// otherwise [data-reveal] blocks of the new page are never observed and stay invisible.
export function ScrollMotion(){
  const pathname=usePathname();
  useEffect(()=>{
    document.documentElement.classList.add('js-ready');
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
    const observe=()=>document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach(item=>revealObserver.observe(item));
    observe();
    // Content streamed or swapped in after the effect ran (suspense, route transitions).
    const mutations=new MutationObserver(observe);
    mutations.observe(document.body,{childList:true,subtree:true});
    let frame=0;
    // Fast scrolls (End key, anchor jumps) can skip the observer; reveal anything already above the fold line.
    const update=()=>{frame=0;document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach(item=>{if(item.getBoundingClientRect().top<window.innerHeight*.92){item.classList.add('is-visible');revealObserver.unobserve(item)}});document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(item=>{const speed=Number(item.dataset.parallax||0);const box=item.getBoundingClientRect();const offset=Math.max(-24,Math.min(24,(window.innerHeight/2-(box.top+box.height/2))*speed));item.style.setProperty('--parallax-y',`${offset.toFixed(2)}px`)})};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    return()=>{revealObserver.disconnect();mutations.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(frame)cancelAnimationFrame(frame)};
  },[pathname]);
  return null;
}
