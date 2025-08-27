import * as DropDown from "@radix-ui/react-dropdown-menu";
import { ChevronDown, EqualApproximately } from "lucide-react";
import CountDown from "./CountDown";
import { motion, usePresenceData } from "motion/react";
import { CHAINS, CURRENCIES } from "../lib/constants";
import useStore from "../store";
import { useEffect, useState } from "react";

export default function ReviewPayment() {
    const { transaction, setChain, setCurrency } = useStore();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    // const [chainOpen, setChainOpen] = useState(false);
    // const [currencyOpen, setCurrencyOpen] = useState(false);

    const direction = usePresenceData();

    const handleWindowSizeChange = () => {
        console.log(window.innerWidth, window.innerWidth <= 768)
        setIsMobile(window.innerWidth <= 768);
    }

    useEffect(() => {
        handleWindowSizeChange();
    }, [])
    
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
            <div className="bg-secondary p-4 rounded-md mb-8">
                <div className="flex flex-row items-center mb-4">
                    <div className="mr-2 basis-1/2">
                        <span className="text-sm font-medium font-monserrat text-gray-600">Chain</span>
                        <div className="rounded-3xl border-1 border-gray-600 p-2">
                            <div className="flex flex-row items-center justify-between">
                                <div className="m-0 flex">
                                    <p className="border-r-1 border-gray-600 p-2">
                                        <img src={CHAINS.filter((chain) => chain.id === transaction.chain)[0].logo} alt={`${transaction.chain} logo`} className="h-6 w-6" />
                                    </p>
                                    <span className="p-2 font-monserrat font-medium text-md">{isMobile && transaction.chain.length > 4 ? `${transaction.chain.slice(0, 4)}...` : transaction.chain}</span>
                                </div>
                                <div className="m-0">
                                    <DropDown.Root>
                                        <DropDown.Trigger asChild>
                                            <ChevronDown className="cursor-pointer h-4 w-4" />
                                        </DropDown.Trigger>
                                        <DropDown.Portal>
                                            <DropDown.Content className="bg-white rounded-md p-2">
                                                {CHAINS.map((chain, index) => (
                                                    <DropDown.Item key={index}>
                                                        <div className="m-0 flex cursor-pointer" onClick={() => setChain(chain.id)}>
                                                            <p className="p-2">
                                                                <img src={chain.logo} alt={`${chain.name} logo`} className="h-6 w-6" />
                                                            </p>
                                                            <span className="p-2 font-monserrat font-medium text-md">{chain.name}</span>
                                                        </div>
                                                    </DropDown.Item>
                                                ))}
                                            </DropDown.Content>
                                        </DropDown.Portal>
                                    </DropDown.Root>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-2 basis-1/2">
                        <span className="text-sm font-medium font-monserrat text-gray-600">Currency</span>
                        <div className="rounded-3xl border-1 border-gray-600 p-2">
                            <div className="flex flex-row items-center justify-between">
                                <div className="m-0 flex">
                                    <p className="border-r-1 border-gray-600 p-2">
                                        <img src={CURRENCIES.filter((currency) => currency.id === transaction.currency)[0].logo} alt={`${transaction.currency} logo`} className="h-6 w-6" />
                                    </p>
                                    <span className="p-2 font-monserrat font-medium text-md">{transaction.currency.toUpperCase()}</span>
                                </div>
                                <div className="m-0">
                                    <DropDown.Root>
                                        <DropDown.Trigger asChild>
                                            <ChevronDown className="cursor-pointer h-4 w-4" />
                                        </DropDown.Trigger>
                                        <DropDown.Portal>
                                            <DropDown.Content className="bg-white rounded-md p-2">
                                                {CURRENCIES.map((currency, index) => (
                                                    <DropDown.Item key={index}>
                                                        <div className="m-0 flex cursor-pointer" onClick={() => setCurrency(currency.id)}>
                                                            <p className="p-2">
                                                                <img src={currency.logo} alt={`${currency.name} logo`} className="h-6 w-6" />
                                                            </p>
                                                            <span className="p-2 font-monserrat font-medium text-md">{currency.name}</span>
                                                        </div>
                                                    </DropDown.Item>
                                                ))}
                                            </DropDown.Content>
                                        </DropDown.Portal>
                                    </DropDown.Root>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 mt-2 mb-2 rounded-md">
                    <div className="flex flex-row items-center">
                        <div className="basis-1/3 flex items-center justify-center">
                            <div className="m-0">
                                <p className="text-xs md:text-sm font-medium font-monserrat text-gray-600">You will pay</p>
                                <p className="text-lg font-bold font-monserrat text-black">{transaction.amountInCryptoCurrency} {transaction.currency.toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="basis-1/3 flex items-center justify-center">
                            <EqualApproximately />
                        </div>
                        <div className="basis-1/3 flex items-center justify-center">
                            <div className="m-0">
                                <p className="text-xs md:text-sm font-medium font-monserrat text-gray-600">For</p>
                                <p className="text-lg font-bold font-monserrat text-black">&#8358;{transaction.amountInLocalCurrency}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-2.5">
                    <span className="font-medium text-sm font-monserrat text-gray-500">Time Left</span>
                    <CountDown />
                </div>
            </div>
        </motion.div>
    )
}