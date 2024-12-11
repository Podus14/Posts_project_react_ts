import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = rootElement ? rootElement : document.createElement("div");

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <main>
        <App />
      </main>
    </QueryClientProvider>
  </StrictMode>
);
