'use client';

import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string;
}

const Barcode = ({ value }: BarcodeProps) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, { format: 'code39', width: 1, height: 45 });
    }
  }, [value]);
  return <svg ref={barcodeRef} className='w-full'></svg>;
};

export default Barcode;
