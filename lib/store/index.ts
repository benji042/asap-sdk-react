import { create } from "zustand";
import { Chain, Currency, PaymentOption, TransactionStatus, WalletOption, type Transaction } from "../utils/types";

interface Store {
    seconds: number;
    setSeconds: (seconds: number) => void;
    countDown: () => void;

    paymentOption: PaymentOption;
    setPaymentOption: (option: PaymentOption) => void;

    walletOption: WalletOption;
    setWalletOption: (option: WalletOption) => void;

    transaction: Transaction;
    setTransaction: (transaction: Transaction) => void;

    setChain: (chain: Chain) => void;
    setCurrency: (currency: Currency) => void;
    setTransactionStatus: (status: TransactionStatus) => void;

    reset: () => void;
}

const initialState = {
    seconds: 120,
    paymentOption: PaymentOption.ASAP,
    walletOption: WalletOption.METAMASK,
    transaction: {
        amountInLocalCurrency: "15,000",
        amountInCryptoCurrency: "10",
        currency: Currency.USDC,
        chain: Chain.BASE,
        walletOption: WalletOption.METAMASK,
        paymentOption: PaymentOption.ASAP,
        status: TransactionStatus.PROCESSING,
    },
}

const useStore = create<Store>((set) => ({
    ...initialState,

    setSeconds: (seconds: number) => set((state) => ({...state, seconds })),
    countDown: () => set((state) => ({...state, seconds: state.seconds - 1 })),

    setPaymentOption: (option: PaymentOption) => set((state) => ({...state, paymentOption: option })),

    setWalletOption: (option: WalletOption) => set((state) => ({...state, walletOption: option })),

    
    setTransaction: (transaction: Transaction) => set((state) => ({...state, transaction })),

    setChain: (chain: Chain) =>
        set((state) => ({
            transaction: { ...state.transaction, chain },
        })),

    setCurrency: (currency: Currency) =>
        set((state) => ({
            transaction: { ...state.transaction, currency },
        })),

    setTransactionStatus: (status: TransactionStatus) =>
        set((state) => ({
            transaction: { ...state.transaction, status },
        })),

    reset: () => set(initialState),
}));

export default useStore;