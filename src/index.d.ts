declare module '@asap-button/sdk' {
  import * as React from 'react';

  export interface AsapButtonProps {
    amount: number;
    currency: 'ETH' | 'USDC';
    chain: 'ethereum' | 'base';
    onPaymentSuccess?: (txHash: string) => void;
    onPaymentError?: (error: Error) => void;
    buttonColor?: string;
    textColor?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
    [key: string]: any; // Allows for additional custom props
  }

  const AsapButton: React.FC<AsapButtonProps>;

  export default AsapButton;
}