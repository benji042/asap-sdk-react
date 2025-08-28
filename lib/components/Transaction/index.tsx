import { motion, usePresenceData } from "motion/react";
import CountDown from "../CountDown";
import { EqualApproximately } from "lucide-react";
import useStore from "../../store";
import { CHAINS, CURRENCIES, WALLET_OPTIONS } from "../../utils/constants";
import { PaymentOption } from "../../utils/types";

export default function Transaction() {
    const { transaction, paymentOption, walletOption } = useStore();
    const { chain, currency, amountInCryptoCurrency, amountInLocalCurrency } = transaction;

    const direction = usePresenceData();
    
    return (
        <motion.div
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    delay: 0.2,
                    type: "spring",
                    visualDuration: 0.3,
                    bounce: 0.4,
                },
            }}
            exit={{ opacity: 0, x: direction * -50 }}
        >
            <div className="flex flex-row justify-center items-center gap-2.5">
                <span className="font-medium text-sm font-monserrat text-gray-500">Time Left</span>
                <CountDown />
            </div>
            <div className="bg-secondary p-4 mt-4 mb-2 rounded-md">
                <div className="flex flex-row items-center">
                    <div className="basis-1/3 flex items-center justify-center">
                        <div className="m-0">
                            <p className="text-sm font-medium font-monserrat text-gray-500">You will pay</p>
                            <p className="text-lg font-bold font-monserrat text-black">{amountInCryptoCurrency} {currency.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="basis-1/3 flex items-center justify-center">
                        <EqualApproximately />
                    </div>
                    <div className="basis-1/3 flex items-center justify-center">
                        <div className="m-0">
                            <p className="text-sm font-medium font-monserrat text-gray-500">For</p>
                            <p className="text-lg font-bold font-monserrat text-black">&#8358;{amountInLocalCurrency}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2.5 py-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-monserrat text-gray-500">Chain</span>
                    <div className="flex item-center justify-center">
                        <img src={CHAINS.filter((_chain) => _chain.id === chain)[0].logo} alt={`${chain} Logo`} className="h-4 w-4 mr-1"/>
                        <span className="text-sm font-medium font-monserrat text-gray-500 ml-1">{chain}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-monserrat text-gray-500">Currency</span>
                    <div className="flex item-center justify-center">
                        <img src={CURRENCIES.filter((_currency) => _currency.id === currency)[0].logo} alt={`${currency} Logo`} className="h-4 w-4 mr-1"/>
                        <span className="text-sm font-medium font-monserrat text-gray-500 ml-1">{currency.toUpperCase()}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-monserrat text-gray-500">Paid with</span>
                    <div className="flex item-center justify-center">
                        {paymentOption === PaymentOption.ASAP &&
                            <>
                                <img src="/asap.png" alt="ASAP Logo" className="h-4 w-4 mr-1"/>
                                <span className="text-sm font-medium font-monserrat text-gray-500 ml-1">ASAP</span>
                            </>
                        }
                        {paymentOption === PaymentOption.WALLET &&
                            <>
                                <img src={WALLET_OPTIONS.filter((wallet) => wallet.id === walletOption)[0].logo} alt={`${walletOption} Logo`} className="h-4 w-4 mr-1"/>
                                <span className="text-sm font-medium font-monserrat text-gray-500 ml-1">{WALLET_OPTIONS.filter((wallet) => wallet.id === walletOption)[0].name}</span>
                            </>
                        }
                        {paymentOption === PaymentOption.CUSTOM &&
                            <>
                                <img src="/asap.png" alt="ASAP Logo" className="h-4 w-4 mr-1"/>
                                {/* <span className="text-sm font-medium font-monserrat text-gray-500 ml-1">-</span> */}
                            </>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )
}