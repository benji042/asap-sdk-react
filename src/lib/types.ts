import type { ReactNode } from "react";

export interface Data {
    id: number;
    title: string;
    description: string;
    component: ReactNode;
}

export enum PaymentOption {
    ASAP = "asap",
    WALLET = "wallet",
    CUSTOM = "custom",
}

export enum WalletOption {
    METAMASK = "metamask",
    TRUST_WALLET = "trust",
    COINBASE = "coinbase",
    ZERION = "zerion",
}

export interface Wallet {
    id: WalletOption;
    name: string;
    logo: string;
}

export enum Chain {
    BASE = "Base",
    OPTIMISM ="Optimism",
    AVALANCHE = "Avalanche",
}

export enum Currency {
    USDC = "usdc",
    ETH = "eth",
    USDT = "usdt",
}

export interface Transaction {
    amountInLocalCurrency: string;
    amountInCryptoCurrency: string;
    currency: Currency;
    chain: Chain;
    walletOption?: WalletOption;
    paymentOption: PaymentOption;
    status: TransactionStatus;
}

export enum TransactionStatus {
    PROCESSING = "processing",
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
}