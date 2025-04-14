<img width="1000" alt="image" src="https://github.com/user-attachments/assets/6eab290f-b376-4b2e-b326-7c645e35624a" />


# Web3 Dashboard

This project is a simple Web3 dashboard that allows users to connect their Ethereum wallet (e.g., MetaMask) and view their account balance, network, gas price, and connection status. It leverages modern Web3 libraries to facilitate wallet connections and blockchain interactions.

## Features

- **Wallet Connection**: Connect your Ethereum wallet (e.g., MetaMask) to the app with a single click.
- **Account Information**: View your wallet's address, balance, and the current network.
- **Network Detection**: Automatically detects and displays the connected network (e.g., Ethereum Mainnet, BSC, Polygon).
- **Gas Price**: Displays the current gas price in Gwei.
- **Switch Wallet**: Easily switch between different wallets or accounts.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **TypeScript**: Ensures type-safe JavaScript development.
- **ethers.js**: Handles interactions with the Ethereum blockchain.
- **@web3-onboard/react**: Manages wallet connections and state.
- **Tailwind CSS**: Provides utility-first styling for a clean and responsive design.

## Demo

[Webapp link](https://azorzini-web3-dashboard.netlify.app/)

## Project Structure

`src/context/Web3Context.tsx`: Manages the wallet connection state and provides Web3 data across the app.

`src/components/Header.tsx`: Renders the header with wallet connection controls.

`src/components/Web3Info.tsx`: Displays account balance, network, gas price, and connection status.

`src/app/page.tsx`: The main page component that ties the dashboard together.

