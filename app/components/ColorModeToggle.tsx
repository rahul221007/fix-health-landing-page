// components/ColorModeToggle.tsx

"use client"; // Ensure you have this at the top

import { Button, useColorMode } from "@chakra-ui/react";

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};
