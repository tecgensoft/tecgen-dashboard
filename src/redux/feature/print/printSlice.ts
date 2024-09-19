/* eslint-disable @typescript-eslint/ban-ts-comment */
 // @ts-nocheck 

import { createSlice } from "@reduxjs/toolkit";

const invoicePrinter = JSON.parse(localStorage.getItem("invoicePrinter"));
const labelPrinter = JSON.parse(localStorage.getItem("labelPrinter"));

const initialState = {
  isPrinterModalOpen: false,
  isConnected: false,
  labelPrinter: labelPrinter || "",
  invoicePrinter: invoicePrinter || "",
};

const printSlice = createSlice({
  name: "print",
  initialState,

  reducers: {
    printerModalOpen: (state) => {
    
      state.isPrinterModalOpen = true;
    },
    printerModalClose: (state) => {
      state.isPrinterModalOpen = false;
    },
    updateConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setInvoicePrinter: (state, action) => {
      state.invoicePrinter = action.payload;
      localStorage.setItem("invoicePrinter", JSON.stringify(action.payload));
    },
    setLabelPrinter: (state, action) => {
      state.labelPrinter = action.payload;
      localStorage.setItem("labelPrinter", JSON.stringify(action.payload));
    },
  },
});

export const { printerModalOpen, printerModalClose, updateConnectionStatus, setInvoicePrinter, setLabelPrinter } =
  printSlice.actions;

export default printSlice.reducer;
