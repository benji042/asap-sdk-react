import { motion, usePresenceData } from "motion/react";
import OtpInput from "../OtpInput";
import { useState } from "react";

export default function VerifyAccount() {
    const [otp, setOtp] = useState("");
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
                <OtpInput value={otp} onChange={setOtp} length={6} />
                <div className="flex items-center justify-end mt-1">
                    <span className="text-xs font-light font-monserrat text-gray-300 mr-1">Didn't get the code?</span>
                    <span className="text-xs font-medium font-monserrat text-gray-600 underline cursor-pointer">Resend</span>
                </div>
            </div>
        </motion.div>
    )
}