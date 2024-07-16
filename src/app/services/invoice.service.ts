// invoice.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface InvoiceItem {
  item: string;
  qty: number;
  price: string;
  tax_rate: string;
  tax_amount: string;
  total_amount: string;
}

interface Invoice {
  full_name: string;
  date_of_birth: string;
  address_line2: string;
  city_town: string;
  state_province_region: string;
  zip_postal_code: string;
  grand_total_tax_amount: string;
  grand_total_amount: string;
  grand_total_amount_in_words: string;
  items: InvoiceItem[];
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


private baseUrl = 'http://127.0.0.1:8000/api/invoices/';

constructor(private http: HttpClient) { }

getAllInvoices(): Observable<Invoice[]> {
  return this.http.get<Invoice[]>(this.baseUrl);
}

saveInvoice(invoiceData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(this.baseUrl, invoiceData, { headers });
}
}
