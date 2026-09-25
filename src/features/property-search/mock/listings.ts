import type {Listing} from '../types';
// Fictional interface fixtures, not MLS data or available properties.
export const listings:Listing[]=[
{id:'demo-1',mlsNumber:'DEMO001',title:'The Courtyard House',location:'Coral Gables',address:'100 Example Court',transaction:'sale',price:2450000,beds:4,baths:3,area:3100,type:'house',pool:true,fictional:true},
{id:'demo-2',mlsNumber:'DEMO002',title:'A Garden Residence',location:'Pinecrest',address:'200 Sample Lane',transaction:'sale',price:3200000,beds:5,baths:4,area:4200,type:'house',pool:true,fictional:true},
{id:'demo-3',mlsNumber:'DEMO003',title:'The Terrace Apartment',location:'Coral Gables',address:'300 Preview Avenue',transaction:'sale',price:895000,beds:2,baths:2,area:1500,type:'condo',pool:false,fictional:true},
{id:'demo-4',mlsNumber:'DEMO004',title:'The Parkside Townhouse',location:'South Miami',address:'400 Mock Street',transaction:'sale',price:1250000,beds:3,baths:3,area:2200,type:'townhouse',pool:false,fictional:true},
{id:'demo-5',mlsNumber:'DEMO005',title:'The Garden Rental',location:'Pinecrest',address:'500 Fictional Way',transaction:'rent',price:8500,beds:4,baths:3,area:2800,type:'house',pool:true,fictional:true},
{id:'demo-6',mlsNumber:'DEMO006',title:'The City Apartment',location:'Coral Gables',address:'600 Demo Place',transaction:'rent',price:3900,beds:2,baths:2,area:1300,type:'condo',pool:false,fictional:true}
];