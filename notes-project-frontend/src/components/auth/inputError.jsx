import React from "react";
import { Box } from "@chakra-ui/react";

function InputError({ children }) {
  return (
    <Box padding={3} color="red.500" fontWeight={800} fontSize="md">
      {children}
    </Box>
  );
}
export default InputError;
