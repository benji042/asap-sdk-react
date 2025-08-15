import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import React, { useState } from 'react';
import '../index.css';
import { FastForward, Wallet, WalletCards, X } from "lucide-react";
import Logo from "./Logo.tsx";
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export interface AsapButtonProps {
  amount: number;
  currency: 'ETH' | 'USDC' | 'AVAX';
  chain: 'ethereum' | 'base' | 'avalanche';
  // Customizable button styles
  buttonColor?: string;
  textColor?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  // Any other custom styles you want to expose
  [key: string]: any; // Allows for additional custom props
}

const AsapButton: React.FC<AsapButtonProps> = ({
  amount,
  currency,
  chain,    
  buttonColor,
  textColor,
  fontSize,
  padding,
  borderRadius,
  width,
  height,
  ...rest
}) => {
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);

  const { open, close } = useAppKit();
  
  const { address, isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction()

  const handlePaymentClick = () => {
    setShowModal(true);
    console.log(`Payment button clicked for ${amount} ${currency} - ${chain}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmPayment = () => {
    console.log('Confirming payment...');
    setPaying(true);

    if(!isConnected) {
      open({view: 'Connect'});
    }

    if(currency === 'ETH') {
      sendTransaction(
        {
          to: "0x7E03D2BAd90F41fAD2eB9b13dBF0d7Bd4E785dEC",
          value: parseEther(amount.toString()),
        },
        {
          onSuccess: () => {
            alert("Payment completed")
            setPaying(false)
            setShowModal(false)
          }
        }
      )
    }
  };

  const buttonStyle = {
    backgroundColor: buttonColor,
    color: textColor,
    fontSize: fontSize,
    padding: padding,
    borderRadius: borderRadius,
    width: width,
    height: height,
    ...rest.style,
  };

  return (
    <>
      <button
        className="asap-button"
        onClick={handlePaymentClick}
        style={buttonStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonColor || '#5469d4')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonColor || '#6772e5')}
      >
        <span>Pay with ASAP</span>
      </button>

      {showModal && (
        <div className="asap-modal-overlay">
          <div className="asap-modal-content">
            <div className="asap-modal-header">
              <div className="asap-modal-header-title">
                <Logo />
                <h2>Pay with ASAP</h2>
              </div>
              <div className='close'>
                <X size={24} onClick={handleCloseModal} color='#333'/>
              </div>
            </div>
            <div className="asap-modal-body">
              <p>Pay {amount} {currency} to continue</p>
            </div>
            <div className="asap-modal-buttons">
              <button
                className="asap-modal-button wallet"
                // onClick={() => window.location.href = "https://asapcrypto.xyz/"}
              >
                <a href="https://asapcrypto.xyz/" target='_blank'>Pay with your ASAP wallet</a>
                <Wallet size={24} color='#333'/>
              </button>
            </div>
            <div className="asap-modal-buttons">
              <button
                className="asap-modal-button w3m"
                onClick={(handleConfirmPayment)}
              >
                <span>{isConnected ? `Pay with ${address?.slice(0, 5)}...${address?.slice(-4)}` : "Pay with your wallet"}</span>
                {paying ? <Logo /> : <WalletCards size={24} color='#333'/>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AsapButton;