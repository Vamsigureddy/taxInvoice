export class InvoiceItem {
  item: string;
  qty: number | null; // Allow null for qty
  price: number | null; // Allow null for price
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
}

export class Invoice {
  fullName: string;
  dateOfBirth: string;
  addressLine2: string;
  cityTown: string;
  stateProvinceRegion: string;
  zipPostalCode: string;
  items: InvoiceItem[];
  grandTotalTaxAmount: number;
  grandTotalAmount: number;
  grandTotalAmountInWords: string;
}
