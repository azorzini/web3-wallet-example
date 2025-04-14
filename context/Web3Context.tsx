"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { init, useConnectWallet, useSetChain } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

interface Web3ContextType {
  account: string | null;
  balance: string;
  network: string;
  gasPrice: string;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchAccount: () => Promise<void>;
  provider: ethers.BrowserProvider | null;
  chainId: number | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Initialize Onboard with wallet modules and supported chains
const onboard = init({
  wallets: [injectedModule()],
  chains: [
    { id: "0x1", token: "ETH", label: "Ethereum Mainnet" },
    { id: "0x38", token: "BNB", label: "Binance Smart Chain" },
    { id: "0x89", token: "MATIC", label: "Polygon" },
  ],
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }] = useSetChain();
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [network, setNetwork] = useState<string>("");
  const [gasPrice, setGasPrice] = useState<string>("0");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  // Update state when wallet connects or disconnects
  useEffect(() => {
    if (wallet) {
      const ethersProvider = new ethers.BrowserProvider(wallet.provider);
      setProvider(ethersProvider);
      setAccount(wallet.accounts[0].address);
      setIsConnected(true);
      updateWeb3Data(ethersProvider, wallet.accounts[0].address);
    } else {
      setAccount(null);
      setIsConnected(false);
      setProvider(null);
      setBalance("0");
      setNetwork("");
      setGasPrice("0");
      setChainId(null);
    }
  }, [wallet]);

  // Update chain-specific data when the connected chain changes
  useEffect(() => {
    if (connectedChain) {
      console.log('connectedChain', connectedChain);
      setChainId(parseInt(connectedChain.id, 16));
      setNetwork(connectedChain.namespace || '');
    }
  }, [connectedChain]);

  // Fetch balance and gas price
  const updateWeb3Data = async (provider: ethers.BrowserProvider, account: string) => {
    try {
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));

      const feeData = await provider.getFeeData();
      const gasPriceValue = feeData.gasPrice;
      setGasPrice(gasPriceValue ? ethers.formatUnits(gasPriceValue, "gwei") : "0");
    } catch (error) {
      console.error("Error updating Web3 data:", error);
    }
  };

  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    if (wallet) {
      disconnect(wallet);
    }
  };

  const switchAccount = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Error switching wallet:", error);
      alert("Failed to switch wallet. Please try again.");
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        balance,
        network,
        gasPrice,
        isConnected,
        connectWallet,
        disconnectWallet,
        switchAccount,
        provider,
        chainId,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}