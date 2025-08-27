import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { type AppKitNetwork, base, baseSepolia } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://dashboard.reown.com
const projectId = "e283e02dc6922cf2ea683a1414f04c39"

// 2. Create a metadata object - optional
const metadata = {
  name: "ASAP",
  description: "ASAP is a DeFi platform that lets you spend your crypto with ease.",
  url: "https://example.com", // Replace with your actual URL
  icons: ["https://example.com/icon.png"] // Replace with your actual icon URLs
}

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [base, baseSepolia]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeMode: 'dark',
  themeVariables: {
    "--w3m-z-index": 9999999,
  }
})

export default function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}