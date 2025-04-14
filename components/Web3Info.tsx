"use client";

import { Coins, Network, CircleDollarSign, Activity } from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";

export function Web3Info() {
  const { balance, network, gasPrice, isConnected, chainId } = useWeb3();

  const getNativeCurrency = (chainId: number | null, network: string): string => {
    if (!chainId) return "N/A";
    switch (chainId) {
      case 1:
        return "ETH";
      case 56:
        return "BNB";
      case 137:
        return "MATIC";
      default:
        return "Unknown";
    }
  };

  const getDisplayBalance = (): string => {
    if (!isConnected) return "N/A";
    return `${parseFloat(balance).toFixed(4)} ${getNativeCurrency(chainId, network)}`;
  };

  const CardWrapper = ({
                         icon: Icon,
                         title,
                         value,
                         color,
                       }: {
    icon: typeof Coins;
    title: string;
    value: string;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardWrapper
        icon={Coins}
        title="Balance"
        value={getDisplayBalance()}
        color="text-blue-500"
      />
      <CardWrapper
        icon={Network}
        title="Network"
        value={network || "Not Connected"}
        color="text-green-500"
      />
      <CardWrapper
        icon={CircleDollarSign}
        title="Gas Price"
        value={
          isConnected
            ? `${parseFloat(gasPrice).toFixed(2)} Gwei`
            : "N/A"
        }
        color="text-yellow-500"
      />
      <CardWrapper
        icon={Activity}
        title="Status"
        value={isConnected ? "Connected" : "No Wallet"}
        color="text-red-500"
      />
    </div>
  );
}