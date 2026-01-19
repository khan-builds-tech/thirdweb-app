"use client";
import thirdwebIcon from "@public/thirdweb.svg";
import Image from "next/image";
import { ConnectButton, CheckoutWidget, ConnectEmbed } from "thirdweb/react";
import { base, ethereum } from "thirdweb/chains";
import { client } from "./client";
import { Account, createWallet, inAppWallet, Wallet, linkProfile } from "thirdweb/wallets";
import { useState } from "react";


export default function Home() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    inAppWallet(
      // built-in auth methods
      // or bring your own auth endpoint
      {
        auth: {
          options: [
            "x",
            // "google",
            // "apple",
            // "discord",
            // "facebook",
            // "farcaster",
            // "telegram",
            // "coinbase",
            // "line",
            // "email",
            // "phone",
            // "passkey",
            // "guest",
          ],
        }
      },
    ),
  ];

  const handleXAuth = async () => {
    setLoading(true);
    const wallet = inAppWallet();
    const account = await wallet.connect({
      client,
      chain: ethereum,
      strategy: "x",

    });
    setWallet(wallet);
    setAccount(account);
    setLoading(false);
  }

  const disconnectWallet = async () => {
    setLoading(true);
    await wallet?.disconnect();
    setWallet(null);
    setAccount(null);
    setLoading(false);
  }

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        {/* <Header /> */}
        {/* <div className="flex justify-center mb-20">
          <ConnectEmbed chain={base} client={client} wallets={wallets} />
        </div> */}
        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            wallets={wallets}
          />
          {/* <div className="flex flex-col items-center">
            <SocialIcon provider="x" height={100} width={100} />
            {!wallet && <button className="mb-20" onClick={() => { handleXAuth() }}>Connect with X</button>}
            {wallet && <button onClick={() => { disconnectWallet() }}>Disconnect</button>}
          </div> */}
        </div>
        {account && <div className="flex justify-center mb-20">Account: {account.address}</div>}
        <div className="flex justify-center mb-20 flex-col gap-10">
          <CheckoutWidget
            chain={base}
            amount="35"
            seller="0x..."
            name="Drip Teddy"
            description="A cute teddy bear"
            image="/drip-teddy.avif"
            client={client}
            theme={"dark"}
            paymentMethods={["crypto", "card"]}
            connectOptions={{
              connectModal: {
                size: "compact",
                title: "lol",
              },
              wallets: [
                createWallet("io.metamask"),
                createWallet("com.coinbase.wallet"),
                createWallet("me.rainbow"),
                inAppWallet({
                  auth: {
                    options: ["x"],
                  },
                }),
              ]
            }}
          // payOptions={{
          //   mode: "direct_payment",
          //   paymentInfo: {
          //     amount: "35",
          //     chain: ethereum,
          //     token: getDefaultToken(ethereum, "USDC"),
          //     sellerAddress: "0x...", // the wallet address of the seller
          //   },
          //   metadata: {
          //     name: "Drip Teddy",
          //     image: "/drip-teddy.avif",
          //     description: "A cute teddy bear",

          //   },
          // }}
          />
          <CheckoutWidget
            chain={base}
            amount="35"
            seller="0x..."
            name="Drip Teddy"
            description="A cute teddy bear"
            image="/drip-teddy.avif"
            client={client}
            theme={"dark"}
            paymentMethods={["crypto", "card"]}
            connectOptions={{
              connectModal: {
                size: "compact",
                title: "lol",
              },
              wallets: [
                createWallet("io.metamask"),
                createWallet("com.coinbase.wallet"),
                createWallet("me.rainbow"),
                inAppWallet({
                  auth: {
                    options: ["x"],
                  },
                }),
              ]
            }}
          />
        </div>
        {/* <ThirdwebResources /> */}
      </div>
    </main >
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb SDK
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
      </h1>

      <p className="text-zinc-300 text-base">
        Read the{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          README.md
        </code>{" "}
        file to get started.
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
