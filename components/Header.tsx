"use client";

import { Wallet2 } from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";

export function Header() {
  const { account, isConnected, connectWallet, disconnectWallet, switchAccount } = useWeb3();

  const handleWalletClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Wallet2 className="h-6 w-6" />
          <span className="text-xl font-bold">Web3 Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          {isConnected && (
            <button
              onClick={switchAccount}
              className="px-4 py-2 rounded-md font-medium transition-colors border border-gray-300 hover:bg-gray-100"
            >
              Switch Wallet
            </button>
          )}
          <button
            onClick={handleWalletClick}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isConnected
                ? "border border-gray-300 hover:bg-gray-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isConnected
              ? `${account?.slice(0, 6)}...${account?.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}