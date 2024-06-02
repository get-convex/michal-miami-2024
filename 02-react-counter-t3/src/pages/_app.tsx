import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ReactNode, useEffect } from "react";
import anime from "animejs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <h1>
        Simple Counter
        <br />
        TRPC + Drizzle + SQLite
      </h1>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </main>
  );
};

function Wrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "BUTTON") {
        anime({
          targets: target,
          scale: [1, 0.8],
          duration: 300,
          direction: "alternate",
          easing: "easeOutCubic",
          autoplay: false,
        }).restart();
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  });
  return children;
}

export default api.withTRPC(MyApp);
