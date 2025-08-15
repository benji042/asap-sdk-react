# ASAP React SDK - Web3 Payment Integration SDK

The ASAP React SDK is a React component library designed to simplify Web3 payment integrations for your applications. It provides a customizable payment button with built-in confirmation modals, supporting multiple cryptocurrencies and blockchain networks.

## Why Use ASAP Button?

1. **Simplified Integration** - Add Web3 payments to your app with just a few lines of code
2. **Customizable UI** - Fully style the button and modal to match your brand
3. **Multi-Chain Support** - Works with Ethereum, Base, and other EVM-compatible chains
4. **Secure by Design** - Built with security best practices in mind
5. **Responsive** - Works seamlessly across all device sizes

## Installation

Install the package via npm:

```bash
npm install @benji042/asap-sdk-react
# or
yarn add @benji042/asap-sdk-react
```

## Basic Usage

```tsx
import { AsapButton } from '@benji042/asap-sdk-react';

function App() {
  return (
    <AsapButton 
      amount={0.1}
      currency="ETH"
      chain="ethereum"
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | number | Yes | The payment amount |
| `currency` | 'ETH' \| 'USDC' \| 'AVAX' | Yes | The payment currency |
| `chain` | 'ethereum' \| 'base' \| 'avalanche' | Yes | The blockchain network |
| `buttonColor` | string | No | Custom button background color |
| `textColor` | string | No | Custom button text color |
| `fontSize` | string | No | Custom button font size |
| `className` | string | No | Additional CSS classes |

## Advanced Usage

### Custom Styling

You can fully customize the button appearance:

```tsx
<AsapButton
  amount={0.1}
  currency="ETH"
  chain="ethereum"
  buttonColor="#4f46e5"
  textColor="white"
  fontSize="1.2rem"
  className="my-custom-class"
/>
```

### Handling Payments

The component provides callbacks for payment events:

```tsx
<AsapButton
  amount={10}
  currency="AVAX"
  chain="avalanche"
/>
```

## Development

To run the project locally:

```bash
npm install
npm run dev
```

## Building for Production

To build the SDK for production:

```bash
npm run build
```

This will generate optimized production-ready files in the `dist` folder.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

MIT
