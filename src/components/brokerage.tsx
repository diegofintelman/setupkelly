import Image from 'next/image';
import {brokerage} from '@/lib/site';

/** Official brokerage artwork. Shown with the same visual weight as Kelly's logo. */
export function BrokerageLogo({className=''}:{className?:string}){
  return <span className={'brokerage-logo '+className}>
    <Image className="brokerage-logo-dark" src="/media/brand/kw-capital.png" alt="Keller Williams Capital Realty" width={1072} height={335} sizes="170px"/>
    <Image className="brokerage-logo-light" src="/media/brand/kw-capital-ivory.png" alt="" aria-hidden width={1072} height={335} sizes="170px"/>
  </span>;
}

export function BrokerageIdentification({compact=false}:{compact?:boolean}){
  return <div className={'brokerage-identification '+(compact?'compact':'')}>
    <BrokerageLogo/>
    {!compact&&<span className="brokerage-caption">{brokerage.name} · {brokerage.address}, {brokerage.city}</span>}
  </div>;
}

export function BrandSignature(){
  return <div className="brand-signature" aria-label="Kelly Belem Real Estate Advisor"><Image src="/media/brand/kelly-stacked-preto.png" alt="Kelly Belem Real Estate Advisor" width={1411} height={965} sizes="180px"/></div>;
}
