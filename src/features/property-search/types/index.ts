export type Listing={id:string;mlsNumber:string;title:string;location:string;address:string;transaction:'sale'|'rent';price:number;beds:number;baths:number;area:number;type:'house'|'condo'|'townhouse';pool:boolean;fictional:true};
export type SearchFilters={query:string;transaction:'sale'|'rent';minPrice:number;maxPrice:number;beds:number;baths:number;type:string;pool:boolean;sort:'price-asc'|'price-desc'};
export type SearchResult={listings:Listing[];total:number;source:'mock'|'idx'};
export interface PropertySearchAdapter{search(filters:SearchFilters):Promise<SearchResult>}