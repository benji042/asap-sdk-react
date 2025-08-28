import { motion, usePresenceData } from "motion/react";
import useStore from "../../store";
import { WALLET_OPTIONS } from "../../utils/constants";
import { useAppKit } from "@reown/appkit/react";

export default function ConnectWallet() {
    const { walletOption, setWalletOption } = useStore();
    const direction = usePresenceData();

    const { open } = useAppKit();

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
                <span className="font-bold text-lg font-monserrat">Available Wallets</span>
                <span
                    onClick={() => open({view: "Account"})}
                    className="font-medium text-gray-500 text-md font-monserrat cursor-pointer"
                >
                    See All
                </span>
            </div>
            <div className="p-4 rounded-md bg-secondary">
                <div className="flex flex-col gap-2.5">
                    {WALLET_OPTIONS.map((wallet, index) => (
                        <div
                            key={index}
                            className={`${walletOption === wallet.id ? "border-[1.5px]" : "border-[1px] border-gray-300"} cursor-pointer flex items-center py-2 px-4 rounded-3xl`}
                            onClick={() => setWalletOption(wallet.id)}>
                            <img src={wallet.logo} alt={`${wallet.name} Logo`} className="h-6 w-6 mr-2" />
                            <span className="font-medium text-black text-md font-monserrat ml-2">{wallet.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}