import type {PropertySearchAdapter,SearchFilters} from '../types';
import {listings} from '../mock/listings';
export const defaultFilters:SearchFilters={query:'',transaction:'sale',minPrice:0,maxPrice:0,beds:0,baths:0,type:'',pool:false,sort:'price-asc'};
export const mockPropertyAdapter:PropertySearchAdapter={async search(f){
 const q=f.query.trim().toLowerCase();
 const found=listings.filter(p=>p.transaction===f.transaction&&(!q||`${p.location} ${p.address} ${p.mlsNumber} ${p.title}`.toLowerCase().includes(q))&&p.price>=f.minPrice&&(!f.maxPrice||p.price<=f.maxPrice)&&p.beds>=f.beds&&p.baths>=f.baths&&(!f.type||p.type===f.type)&&(!f.pool||p.pool));
 found.sort((a,b)=>f.sort==='price-desc'?b.price-a.price:a.price-b.price);
 return {listings:found,total:found.length,source:'mock'};
}};