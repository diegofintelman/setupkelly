import Image from 'next/image';

/** Official brokerage artwork supplied for this local review. */
export function BrokerageIdentification({compact=false}:{compact?:boolean}){
  return <div className={'brokerage-identification '+(compact?'compact':'')}>
    <Image src="/media/brand/kw-capital.png" alt="Keller Williams Realty Capital" width={268} height={84} sizes={compact?'180px':'268px'} />
    <span className="brokerage-caption">Kelly Belem · Miami Real Estate Advisor</span>
  </div>;
}

export function BrandSignature(){
  return <div className="brand-signature" aria-label="Kelly Belem Real Estate Advisor"><Image src="/media/brand/kelly-stacked-preto.png" alt="Kelly Belem Real Estate Advisor" width={1411} height={965} sizes="180px"/></div>;
}
