import React from "react";
import { Box } from "@mui/material";
import TransactionModal from "./TransactionModal";
import Linechart from "./Linechart";

export default function TransactionDetails() {
  return (
    <Box id="transactionDetailsBox">
      <TransactionModal />
      <Linechart />
    </Box>
  );
}
