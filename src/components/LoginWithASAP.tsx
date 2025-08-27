import { motion, usePresenceData } from "motion/react";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import PinInput from "./PinInput";

export default function LoginWithASAP() {
    const [phone, setPhone] = useState<string | undefined>("");
    const [pin, setPin] = useState<string>("");
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
                <div className="flex flex-col gap-6">
                    <div className="m-0">
                        <PhoneInput
                            placeholder="Enter intl format or select country first."
                            value={phone}
                            onChange={setPhone}
                            className="h-10 rounded-md overflow-hidden border border-gray-300 focus-within:border-black font-monserrat placeholder:text-gray-500 phone-contaner px-2 text-sm"
                            // className="h-10 rounded-rounded overflow-hidden border bg-grey-5 inter-base-regular placeholder:text-grey-40 focus-within:border-blue-500 phone-contaner px-small focus-visible:outline-none px-2 rounded-md text-sm"
                        />
                    </div>
                    <div className="m-0">
                        <div className="mb-1.5 ml-1 md:ml-2">
                            <p className="text-gray-500 text-sm font-monserrat">Enter your 6-digit pin</p>
                        </div>
                        <PinInput
                            value={pin}
                            onChange={setPin}
                            length={6}
                            secret={true}
                            // disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}