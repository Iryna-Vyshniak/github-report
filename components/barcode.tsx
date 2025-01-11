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
      try {
        if (value) {
          // Generate barcode if value is valid
          JsBarcode(barcodeRef.current, value, { format: 'CODE39', width: 1, height: 45 });
        } else {
          // If the value is empty, clear the barcode
          barcodeRef.current.innerHTML = '';
          console.warn('Empty value provided to Barcode component.');
        }
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  }, [value]);
  return <svg ref={barcodeRef} className='w-full'></svg>;
};

export default Barcode;
