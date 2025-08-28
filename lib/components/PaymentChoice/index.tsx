import { motion, usePresenceData } from "motion/react";
import useStore from "../../store";
import { PaymentOption } from "../../utils/types";

export default function PaymentChoice() {
    const { paymentOption, setPaymentOption } = useStore();
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
            <div className="p-4 rounded-md bg-secondary">
                <div className="flex flex-col gap-2.5">
                    <div className={`${paymentOption === "asap" ? "border-[1.5px]" : "border-[1px] border-gray-300"} cursor-pointer flex items-center rounded-md p-2`} onClick={() => setPaymentOption(PaymentOption.ASAP)}>
                        <div className={`${paymentOption === "asap" ? "border-black" : "border-gray-300"} rounded-full border-[1px] p-1 bg-white mr-2`}>
                            <div className={`${paymentOption === "asap" ? "bg-black" : "bg-white"} rounded-full size-[8px]`}></div>
                        </div>
                        <span className="font-medium text-black text-md font-monserrat ml-2">Pay with ASAP</span>
                    </div>
                    <div className={`${paymentOption === "wallet" ? "border-[1.5px]" : "border-[1px] border-gray-300"} cursor-pointer flex items-center rounded-md p-2`} onClick={() => setPaymentOption(PaymentOption.WALLET)}>
                        <div className={`${paymentOption === "wallet" ? "border-black" : "border-gray-300"} rounded-full border-[1px] p-1 bg-white mr-2`}>
                            <div className={`${paymentOption === "wallet" ? "bg-black" : "bg-white"} rounded-full size-[8px]`}></div>
                        </div>
                        <span className="font-medium text-black text-md font-monserrat ml-2">Pay with external wallet</span>
                    </div>
                    <div className={`${paymentOption === "custom" ? "border-[1.5px]" : "border-[1px] border-gray-300"} cursor-pointer flex items-center rounded-md p-2`} onClick={() => setPaymentOption(PaymentOption.CUSTOM)}>
                        <div className={`${paymentOption === "custom" ? "border-black" : "border-gray-300"} rounded-full border-[1px] p-1 bg-white mr-2`}>
                            <div className={`${paymentOption === "custom" ? "bg-black" : "bg-white"} rounded-full size-[8px]`}></div>
                        </div>
                        <span className="font-medium text-black text-md font-monserrat ml-2">Send directly to wallet</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}