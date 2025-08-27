import { useAppKitWallet } from "@reown/appkit-wallet-button/react";
import { Copy, CopyCheck, QrCode } from "lucide-react";
import { motion, usePresenceData } from "motion/react";
import { useState } from "react";

export default function DirectPayment() {
    const direction = usePresenceData();

    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        navigator.clipboard.writeText("0x03640D168B2C5F35c9C7ef296f0F064a90E5FA62");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
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
            <div className="flex flex-row items-center justify-between mb-2">
                <span className="font-bold text-lg font-monserrat">Reciepient Address</span>
                <div
                    className="rounded-full bg-primary p-2 cursor-pointer"
                    onClick={() => connect("walletConnect")}
                >
                    <QrCode className="h-4 w-4" />
                </div>
            </div>
            <div className="bg-secondary flex flex-row items-center mt-2 p-2 rounded-md">
                <span className="font-medium text-md font-monserrat break-all basis-3/4">
                    0x03640D168B2C5F35c9C7ef296f0F064a90E5FA62
                </span>
                <div className="flex items-center justify-end basis-1/4">
                    <div className="rounded-full bg-primary p-2 cursor-pointer" onClick={copyAddress}>
                        {copied ? <CopyCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}