"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "@app/contexts/AuthProvider";
import ModalProvider from "@app/contexts/ModalProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default Providers;
