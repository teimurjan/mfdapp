import { css, Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";

import { GlobalStyles } from "twin.macro";

import App from "./App";
import { TransactorProvider, WalletProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <TransactorProvider>
        <GlobalStyles />
        <Global
          styles={css`
            body {
              font-family: "Space Mono";
            }
          `}
        />
        <App />
      </TransactorProvider>
    </WalletProvider>
  </React.StrictMode>
);
