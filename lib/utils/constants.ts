import { Chain, Currency, WalletOption } from "./types";

export const WALLET_OPTIONS = [
    {
        id: WalletOption.METAMASK,
        name: "Metamask",
        logo: "/metamask.png",
    },
    {
        id: WalletOption.TRUST_WALLET,
        name: "Trust Wallet",
        logo: "/trustwallet.png",
    },
    {
        id: WalletOption.COINBASE,
        name: "Coinbase Wallet",
        logo: "/coinbase.svg",
    },
    {
        id: WalletOption.ZERION,
        name: "Zerion",
        logo: "/zerion.png",
    },
]

export const CURRENCIES = [
    {
        id: Currency.USDC,
        name: "USDC",
        logo: "/usdc.png",
    },
    {
        id: Currency.ETH,
        name: "ETH",
        logo: "/eth.png",
    },
    {
        id: Currency.USDT,
        name: "USDT",
        logo: "/usdt.png",
    },
]

export const CHAINS = [
    {
        id: Chain.BASE,
        name: "Base",
        logo: "/base.jpeg",
    },
    {
        id: Chain.AVALANCHE,
        name: "Avalanche",
        logo: "/avalanche.png",
    },
    {
        id: Chain.OPTIMISM,
        name: "Optimism",
        logo: "/optimism.png",
    },
]
