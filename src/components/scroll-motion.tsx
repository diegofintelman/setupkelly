'use client';
import {useEffect} from 'react';

export function ScrollMotion(){
  useEffect(()=>{
    document.documentElement.classList.add('js-ready');
    const revealItems=[...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
    revealItems.forEach(item=>revealObserver.observe(item));
    let frame=0;
    const update=()=>{frame=0;document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(item=>{const speed=Number(item.dataset.parallax||0);const box=item.getBoundingClientRect();const offset=Math.max(-24,Math.min(24,(window.innerHeight/2-(box.top+box.height/2))*speed));item.style.setProperty('--parallax-y',`${offset.toFixed(2)}px`)})};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    return()=>{revealObserver.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(frame)cancelAnimationFrame(frame)};
  },[]);
  return null;
}
