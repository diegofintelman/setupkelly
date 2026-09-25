'use client';

import {useEffect, useRef} from 'react';
import {analytics} from '@/lib/analytics';

export function MatrixSearch() {
  const frame = useRef<HTMLIFrameElement>(null);
  const engaged = useRef(false);

  useEffect(() => {
    // Focus is only an engagement heuristic. No access to Matrix content or conversions.
    let pending: ReturnType<typeof setTimeout> | undefined;
    const checkFocus = () => {
      if (!engaged.current && document.activeElement === frame.current) {
        engaged.current = true;
        analytics.track('idx_engagement', {page_type: 'property-search'});
      }
    };
    const onBlur = () => { pending = setTimeout(checkFocus, 0); };
    const element = frame.current;
    element?.addEventListener('focus', checkFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      clearTimeout(pending);
      element?.removeEventListener('focus', checkFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return <iframe ref={frame}
    src="https://sef.mlsmatrix.com/Matrix/public/IDX.aspx?idx=c9622024"
    title="South Florida MLS Property Search" loading="lazy" className="idx-frame" />;
}
