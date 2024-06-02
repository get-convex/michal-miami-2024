import anime from "animejs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <h1>
        Simple Counter
        <br />
        Convex
      </h1>
      <Wrapper>
        <App />
      </Wrapper>
    </ConvexProvider>
  </React.StrictMode>
);

// eslint-disable-next-line react-refresh/only-export-components
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
