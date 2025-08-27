import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowRight, ArrowLeft, OctagonAlert, BadgeCheck, BadgeX, Headset, Share, RefreshCcw, RefreshCw } from "lucide-react";
import { useAppKitWallet } from "@reown/appkit-wallet-button/react";
import ReviewPayment from "./ReviewPayment";
import PaymentChoice from "./PaymentChoice";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import LoginWithASAP from "./LoginWithASAP";
import DirectPayment from "./DirectPayment";
import useStore from "../store";
import ConnectWallet from "./ConnectWallet";
import { PaymentOption, TransactionStatus, type Data } from "../lib/types";
import Transaction from "./Transaction";
import VerifyAccount from "./VerifyAccount";
import CountDown from "./CountDown";

const flows = [
    {
        id: 0,
        title: "Review your payment",
        description: "Confirm the details of your payment",
        component: <ReviewPayment />
    },
    {
        id: 1,
        title: "Choose how to pay",
        description: "Select your preferred payment option",
        component: <PaymentChoice />
    },
    {
        id: 2,
        title: "Login with ASAP",
        description: "Sign in to your ASAP account",
        component: <LoginWithASAP />
    },
    {
        id: 3,
        title: "Verify your Account",
        description: "Please enter the otp sent to your phone number to complete payment",
        component: <VerifyAccount />
    },
    {
        id: 4,
        title: "Connect your Wallet",
        description: "Choose an available wallet and complete payment securely",
        component: <ConnectWallet />
    },
    {
        id: 5,
        title: "Send directly to wallet address",
        description: "Copy the recipient address below and send the payment directly to the wallet address",
        component: <DirectPayment />
    },
    {
        id: 6,
        title: "Transaction In Progress",
        description: "Your transaction is in progress. Please wait for it to be confirmed",
        component: <Transaction />
    },
]

export default function PaymentModal () {
    const { paymentOption, walletOption, transaction, seconds, setTransactionStatus, reset } = useStore();

    const [selectedFlow, setSelectedFlow] = useState<Data>(flows[0]);
    const [direction, setDirection] = useState<1 | -1>(1);

    useEffect(() => {
        if(seconds === 0) {
            setTransactionStatus(TransactionStatus.SUCCESS);
        }
    }, [seconds])

    function handleReset() {
        setSelectedFlow(flows[0]);

        reset();
    }

    const { connect } = useAppKitWallet({
        namespace: "eip155",
        onSuccess: (address) => {
            console.log(address);
            alert(`Connected: ${address}`)
        },
        onError: (error) => {
            console.log(error)
        }
    });

    function setFlow(newDirection: 1 | -1) {
        if(newDirection === 1) {
            let next = newDirection + selectedFlow.id;

            if(selectedFlow.id === 1 && paymentOption === PaymentOption.ASAP) {
                next = 2;
            }
            if(selectedFlow.id === 1 && paymentOption === PaymentOption.WALLET) {
                next = 4;
            }
            if(selectedFlow.id === 1 && paymentOption === PaymentOption.CUSTOM) {
                next = 5;
            }
            if(selectedFlow.id > 2) {
                next = 6;
            }

            if(next < 0 || next >= flows.length) return;
            setSelectedFlow(flows[next]);
            setDirection(newDirection);
        } else {
            let next = newDirection + selectedFlow.id;

            if(selectedFlow.id === 4 || selectedFlow.id === 5) {
                next = 1;
            }

            if(selectedFlow.id === 6) {
                return;
            }

            if(next < 0 || next >= flows.length) return;
            setSelectedFlow(flows[next]);
            setDirection(newDirection);
        }
    }

    function proceed() {
        if(selectedFlow.id === 4) {
            console.log(walletOption);
            connect(walletOption);

            setFlow(1);
        } else {
            setFlow(1);
        }
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <div 
                        onClick={handleReset}
                        className="bg-primary flex flex-row items-center justify-between p-4 rounded-xl cursor-pointer leading-none outline-none outline-offset-1 hover:bg-primary-2 focus-visible:outline-2 focus-visible:outline-primary-2 select-none"
                    >
                        <img src="/asap.png" alt="ASAP logo" className="h-8 w-8 mx-1" />
                        <span className="text-black font-monserrat font-bold text-xl mx-1">Pay with ASAP</span>
                    </div>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-dark data-[state=open]:animate-overlay" />
                    <Dialog.Content
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        className="fixed left-1/2 top-1/2 max-h-[100vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[24px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-content"
                    >
                        <div className="hidden">
                            <CountDown />
                        </div>
                        <Dialog.Title className="m-0 flex flex-col items-center justify-center">
                            {selectedFlow.id !== 6 && <img src="/asap.png" alt="ASAP logo" className="h-8 w-8 mb-1" />}
                            {selectedFlow.id === 6 && transaction.status === "pending" && <OctagonAlert className="h-8 w-8 mb-1 text-primary" />}
                            {selectedFlow.id === 6 && transaction.status === "failed" && <BadgeX className="h-8 w-8 mb-1 text-red-500" />}
                            {selectedFlow.id === 6 && transaction.status === "success" && <BadgeCheck className="h-8 w-8 mb-1 text-green-500" />}
                            {selectedFlow.id === 6 && transaction.status === "processing" && 
                                <div className="flex flex-row items-center justify-center mb-1 w-3/4">
                                    <BadgeCheck className="h-8 w-8 mb-1 text-primary basis-3xs" />
                                    <div className="basis-sm">
                                        <div className="border-solid border-primary border-1"></div>
                                    </div>
                                    <BadgeCheck className="h-8 w-8 mb-1 text-primary basis-3xs" />
                                    <div className="basis-sm">
                                        <div className="border-dashed border-primary border-1 animate-pulse"></div>
                                    </div>
                                    <div className="basis-3xs px-4">
                                        <img src="/asap.png" alt="ASAP logo" className="h-6 w-6" />
                                    </div>
                                </div>
                            }
                            <span className="text-black font-monserrat font-bold text-lg md:text-xl mt-1">
                                {selectedFlow.id !== 6 && selectedFlow.title}
                                {selectedFlow.id === 6 && transaction.status === "pending" && "Transaction Pending"}
                                {selectedFlow.id === 6 && transaction.status === "failed" && "Transaction Failed"}
                                {selectedFlow.id === 6 && transaction.status === "success" && "Transaction Successful"}
                                {selectedFlow.id === 6 && transaction.status === "processing" && selectedFlow.title}
                            </span>
                        </Dialog.Title>
                        <Dialog.Description className="mb-4 mt-1 text-sm md:text-sm leading-normal text-center text-gray-600 font-monserrat font-medium">
                            {selectedFlow.id !== 6 && selectedFlow.description}
                            {selectedFlow.id === 6 && transaction.status === "pending" && "Your transaction have been initiated and waiting for confirmation"}
                            {selectedFlow.id === 6 && transaction.status === "failed" && "Something went wrong. Your transacion couldn't be completed"}
                            {selectedFlow.id === 6 && transaction.status === "success" && "Your transaction was completed successfully"}
                            {selectedFlow.id === 6 && transaction.status === "processing" && selectedFlow.description}
                        </Dialog.Description>

                        <AnimatePresence
                            custom={direction}
                            mode="sync"
                        >
                            {selectedFlow.component}
                        </AnimatePresence>

                        <div className="flex flex-row items-center mt-8 mb-8">
                            <div className="basis-1/2 mr-2">
                                {selectedFlow.id === 0 &&
                                    <Dialog.Close asChild>
                                        <button 
                                            onClick={handleReset}
                                            className="flex items-center justify-center w-full h-12 cursor-pointer rounded-3xl border-1 border-black bg-white text-black font-monserrat font-medium text-lg"
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="ml-2">Cancel</span>
                                        </button>
                                    </Dialog.Close>
                                }
                                {selectedFlow.id === 6  && (transaction.status === "processing") &&
                                    <Dialog.Close asChild>
                                        <button 
                                            onClick={handleReset}
                                            className="flex items-center justify-center w-full h-12 cursor-pointer rounded-3xl border-1 border-black bg-white text-black font-monserrat font-medium text-lg"
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="ml-2">Cancel</span>
                                        </button>
                                    </Dialog.Close>
                                }
                                {selectedFlow.id !== 0 && selectedFlow.id !== 6 &&
                                    <button
                                        onClick={() => setFlow(-1)}
                                        className="flex items-center justify-center w-full h-12 cursor-pointer rounded-3xl border-1 border-black bg-white text-black font-monserrat font-medium text-lg"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        <span className="ml-2">Go Back</span>
                                    </button>
                                }
                                {selectedFlow.id === 6 && (transaction.status === "pending" || transaction.status === "failed") &&
                                    <button
                                        onClick={() => setFlow(1)}
                                        className="flex items-center justify-center w-full h-12 cursor-pointer rounded-3xl border-1 border-black bg-white text-black font-monserrat font-medium text-lg"
                                    >
                                        <Headset className="h-4 w-4" />
                                        <span className="ml-2">Contact Support</span>
                                    </button>
                                }
                                {selectedFlow.id === 6 && (transaction.status === "success") &&
                                    <button
                                        onClick={() => setFlow(1)}
                                        className="flex items-center justify-center w-full h-12 cursor-pointer rounded-3xl border-1 border-black bg-white text-black font-monserrat font-medium text-lg"
                                    >
                                        <Share className="h-4 w-4" />
                                        <span className="ml-2">Share Reciept</span>
                                    </button>
                                }
                            </div>
                            <div className="basis-1/2 ml-2">
                                {selectedFlow.id < 6 &&
                                    <button
                                        className="flex items-center justify-center shadow-lg w-full h-12 cursor-pointer rounded-3xl bg-primary text-black font-monserrat font-medium text-lg"
                                        onClick={proceed}
                                    >
                                        <span className="mr-2">Proceed</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                }
                                {(selectedFlow.id === 6 && transaction.status === "processing") &&
                                    <button
                                        className="flex items-center justify-center shadow-lg w-full h-12 rounded-3xl bg-primary text-black font-monserrat font-medium text-lg"
                                        disabled={true}
                                    >
                                        <span className="mr-2 animate-pulse">Waiting...</span>
                                    </button>
                                }
                                {(selectedFlow.id === 6 && transaction.status === "success") &&
                                    <Dialog.Close asChild>
                                        <button
                                            className="flex items-center justify-center shadow-lg w-full h-12 cursor-pointer rounded-3xl bg-primary text-black font-monserrat font-medium text-lg"
                                            onClick={handleReset}
                                        >
                                            <span className="mr-2">Done</span>
                                        </button>
                                    </Dialog.Close>
                                }
                                {(selectedFlow.id === 6 && transaction.status === "failed") &&
                                    <button
                                        className="flex items-center justify-center shadow-lg w-full h-12 cursor-pointer rounded-3xl bg-primary text-black font-monserrat font-medium text-lg"
                                        onClick={() => setFlow(1)}
                                    >
                                        <span className="mr-2">Try Again</span>
                                        <RefreshCcw className="h-4 w-4" />
                                    </button>
                                }
                                {(selectedFlow.id === 6 && transaction.status === "pending") &&
                                    <button
                                        className="flex items-center justify-center shadow-lg w-full h-12 cursor-pointer rounded-3xl bg-primary text-black font-monserrat font-medium text-lg"
                                        onClick={() => setFlow(1)}
                                    >
                                        <span className="mr-2">Refresh</span>
                                        <RefreshCw className="h-4 w-4" />
                                    </button>
                                }
                            </div>
                        </div>
                        <div className="bg-gray-100 mt-8 p-2 rounded-3xl">
                            <div className="flex flex-row items-center justify-center">
                                <img src="/asap.png" alt="ASAP logo" className="h-4 w-4 mr-2" />
                                <span className="font-medium text-md font-monserrat ml-2">Protected by ASAP</span>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="absolute right-2.5 top-2.5 inline-flex size-[25px] cursor-pointer appearance-none items-center justify-center rounded-full text-white hover:text-black bg-gray-600 hover:bg-primary focus:outline-none"
                                aria-label="Close"
                                onClick={handleReset}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}