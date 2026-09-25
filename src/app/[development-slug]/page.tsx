import {notFound} from 'next/navigation';
import {cms} from '@/lib/cms';
import {metadataFor} from '@/lib/seo';
import {CoralRock} from '@/features/developments/CoralRock';
import {EditorialHero,ContactCTA,Breadcrumbs} from '@/components/editorial';
import {MediaGallery} from '@/components/media-gallery';
type Props={params:Promise<{'development-slug':string}>};
export const dynamicParams=false;
export async function generateStaticParams(){return (await cms.developments()).map(d=>({'development-slug':d.slug}))}
export async function generateMetadata({params}:Props){const d=await cms.development((await params)['development-slug']);return d?metadataFor({...d.seo,image:d.hero},'/'+d.slug):{}}
export default async function Page({params}:Props){const d=await cms.development((await params)['development-slug']);if(!d)notFound();if(d.template==='coralrock')return <CoralRock development={d}/>;return <><div className="container"><Breadcrumbs items={[{label:d.title,href:'/'+d.slug}]}/></div><EditorialHero eyebrow={d.location.city} title={d.title} description={d.overview} image={d.hero}/><section className="section container"><p>{d.architecture}</p>{d.gallery.length>0&&<MediaGallery images={d.gallery.map(m=>m.src)} label={d.title}/>}<ul>{d.amenities.map(a=><li key={a}>{a}</li>)}</ul>{d.floorPlans.map(f=><a key={f.file} href={f.file}>{f.title}</a>)}</section><ContactCTA/></>}
