import { Header } from "@/components/Header";
import { Web3Info } from "@/components/Web3Info";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Wallet Dashboard</h1>
        <Web3Info />
      </div>
    </main>
  );
}