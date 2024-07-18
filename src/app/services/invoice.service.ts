// invoice.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError  } from 'rxjs';

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
private apiUrl = 'http://127.0.0.1:8000/api/callback-requests/';

constructor(private http: HttpClient) { }

getAllInvoices(): Observable<Invoice[]> {
  return this.http.get<Invoice[]>(this.baseUrl);
}

saveInvoice(invoiceData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(this.baseUrl, invoiceData, { headers });
}
createCallbackRequest(data: any): Observable<any> {
  return this.http.post(this.apiUrl, data);
}

getCallbackRequests(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl)
    .pipe(
      catchError(this.handleError)
    );
}
private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('An error occurred:', error);
  return throwError('Something went wrong. Please try again later.'); // Adjust error handling as per your application's needs
}
}
