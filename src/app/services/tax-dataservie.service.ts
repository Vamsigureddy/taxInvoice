import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxDataservieService {
  private formData = new BehaviorSubject<any>({});
  currentFormData = this.formData.asObservable();
  private currentInvoiceNumber: number = 1;

  constructor() { }

  updateFormData(data: any) {
    this.formData.next(data);
  }
  getNextInvoiceNumber(): string {
    const invoiceNumber = 'INV-' + this.currentInvoiceNumber.toString().padStart(6, '0');
    this.currentInvoiceNumber++;
    return invoiceNumber;
  }

  resetInvoiceNumber(): void {
    this.currentInvoiceNumber = 1;
  }
}
