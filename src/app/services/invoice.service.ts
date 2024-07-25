// invoice.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError , of  } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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


checkInvoiceNumber(invoiceNumber: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}check-invoice-number/${invoiceNumber}/`).pipe(
    map(() => true),
    catchError(() => of(false))
  );
}

generateNewInvoiceNumber(): Observable<string> {
  return this.getNextInvoiceNumber('INV-000000');
}

private getNextInvoiceNumber(currentNumber: string): Observable<string> {
  return this.checkInvoiceNumber(currentNumber).pipe(
    switchMap(exists => {
      if (!exists) {
        return of(currentNumber);
      } else {
        const newNumber = this.incrementInvoiceNumber(currentNumber);
        return this.getNextInvoiceNumber(newNumber);
      }
    }),
    catchError(() => of('INV-000001')) // Fallback
  );
}

private incrementInvoiceNumber(invoiceNumber: string): string {
  const match = invoiceNumber.match(/(\d+)/);
  if (match) {
    const numberPart = match[1];
    const incrementedNumber = (parseInt(numberPart, 10) + 1).toString().padStart(6, '0');
    return `INV-${incrementedNumber}`;
  } else {
    return 'INV-000001';
  }
}
}
