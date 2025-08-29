# ASAP React SDK

The ASAP React SDK provides a streamlined way to integrate the ASAP crypto payment gateway into your React application. It offers a single, easy-to-use component (`<ASAPModal />`) that handles the entire payment flow within a self-contained modal, from transaction review to wallet connection and status tracking.

## Features

-   **Simple Integration**: Drop the `<ASAPModal />` component into your app to get started.
-   **Complete Payment Flow**: A multi-step modal guides users through reviewing their payment, choosing a payment method, connecting their wallet, and viewing the transaction status.
-   **Multiple Payment Options**:
    -   Pay with an ASAP account (Phone & PIN).
    -   Pay with an external wallet (integrates with MetaMask, Trust Wallet, Coinbase Wallet, etc., via AppKit).
    -   Pay by sending funds directly to a recipient's address.
-   **Configurable and Flexible**: Users can select from various supported chains (e.g., Base, Avalanche, Optimism) and currencies (e.g., USDC, ETH, USDT) directly within the modal.
-   **Robust Wallet Connectivity**: Built on top of `wagmi` and `@reown/appkit` for reliable wallet interactions.
-   **Customizable Styling**: Styled with Tailwind CSS for easy customization.

## Installation

To install the SDK, run the following command in your project directory:

```bash
npm install @asap-crypto/react-sdk
```

or with yarn:

```bash
yarn add @asap-crypto/react-sdk
```

## Peer Dependencies

This library requires `react` and `react-dom` as peer dependencies. Please ensure they are installed in your project.

```json
"peerDependencies": {
  "react": "^19.1.1",
  "react-dom": "^19.1.1"
}
```

## Usage

The SDK exports a single component, `ASAPModal`. It includes all necessary context providers and handles its own state. The component's CSS is automatically injected, so no separate CSS import is required.

Here's a basic example of how to use it in your application:

```jsx
import React from 'react';
import { ASAP } from '@asap-crypto/react-sdk';

function MyPaymentPage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      {/* The ASAPModal component renders a button that triggers the payment flow */}
      <ASAP />
    </div>
  );
}

export default MyPaymentPage;
```

## The Payment Flow

Clicking the "Pay with ASAP" button opens a modal that guides the user through the following steps:

1.  **Review Payment**: Users can review the payment amount in both crypto and local currency. They can also select their desired blockchain network and currency from a dropdown menu. A countdown timer shows how long the quoted rate is valid.

2.  **Choose Payment Method**: Users select how they want to pay:
    -   **Pay with ASAP**: Prompts the user to log in with their phone number and PIN.
    -   **Pay with external wallet**: Allows the user to connect a Web3 wallet.
    -   **Send directly to wallet**: Displays the recipient's wallet address for a manual transfer.

3.  **Connect & Authorize**: Based on the choice above, the user will:
    -   Enter their credentials for an ASAP account.
    -   Connect their wallet using the integrated AppKit modal.
    -   Copy the wallet address and QR code for a direct transfer.

4.  **Transaction Status**: The modal displays the real-time status of the transaction, including `Processing`, `Pending`, `Successful`, or `Failed` states, providing clear feedback to the user.

## Local Development

To contribute to the development of the ASAP React SDK:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/benji042/asap-sdk-react.git
    cd asap-sdk-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start a Vite development server and open a preview page (`src/App.tsx`) where you can test your changes to the SDK components in real-time.

4.  **Build the library:**
    To build the distributable files for the package, run:
    ```bash
    npm run build
    ```
    This command compiles the TypeScript code from the `lib` directory and outputs the final JavaScript and type definition files to the `dist` directory.