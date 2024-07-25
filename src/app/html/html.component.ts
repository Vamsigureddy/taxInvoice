import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { TaxDataservieService } from '../services/tax-dataservie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../services/templateservices';
import { InvoiceService } from '../services/invoice.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit {
  showSecondDiv = false;
  newInvoiceNumber: string;
  formData = {
    fullName: '',
    dateOfBirth: '',
    addressLine2: '',
    cityTown: '',
    stateProvinceRegion: '',
    zipPostalCode: '',
    grandTotalTaxAmount: '',
    grandTotalAmount: '',
    grandTotalAmountInWords: '',
    items: [
      { item: '', qty: 0, price: '', taxRate: '', taxAmount: '', totalAmount: '' }
    ],
    invoiceNumber: 'INV-000000' 
    };
  alertMessage: string = '';

  invoiceForm: FormGroup;
  // formData: any = {};
  customerRecord: any;

  constructor(private dataService: TaxDataservieService, private router: Router,
    private route: ActivatedRoute, private sharedService:TemplateService,
    private invoiceService: InvoiceService, private http: HttpClient
   ) {
    
  }

  ngOnInit(): void {
    this.dataService.currentFormData.subscribe(data => {
      this.formData = data;
      
    });
    this.formData = this.sharedService.getFormData();
    console.log('Received form data:', this.formData);

    this.route.params.subscribe(params => {
      const invoiceId = params['id'];
      this.fetchInvoiceDetails(invoiceId);
    });
  }
   
  onSubmit() {
    const formData = {
      invoiceNo: this.invoiceForm?.get('invoiceNo')?.value ?? '',
      date: this.invoiceForm?.get('date')?.value ?? '',
      // Add other form fields as needed
    };

}

revarce() {
  this.router.navigate(['/tax-form']);
}
userHistory(){
  this.router.navigate(['/tax-history'])
}

onSave(): void {
  this.invoiceService.checkInvoiceNumber(this.formData.invoiceNumber).subscribe(
    exists => {
      if (exists) {
        // If the invoice number exists, generate a new one
        this.invoiceService.generateNewInvoiceNumber().subscribe(
          (newInvoiceNumber: string) => { // Explicitly type the response
            this.formData.invoiceNumber = newInvoiceNumber;
            this.showSecondDiv = true;
          },
          error => {
            console.error('Error generating new invoice number:', error);
          }
        );
      } else {
        // If the invoice number does not exist, proceed
        this.showSecondDiv = true;
      }
    },
    error => {
      console.error('Error checking invoice number:', error);
    }
  );
}
saveData() {
  const invoiceData = {
    full_name: this.formData.fullName,
    date_of_birth: this.formData.dateOfBirth,
    address_line2: this.formData.addressLine2,
    city_town: this.formData.cityTown,
    state_province_region: this.formData.stateProvinceRegion,
    zip_postal_code: this.formData.zipPostalCode,
    grand_total_tax_amount: this.formData.grandTotalTaxAmount,
    grand_total_amount: this.formData.grandTotalAmount,
    grand_total_amount_in_words: this.formData.grandTotalAmountInWords,
    items: this.formData.items.map(item => ({
      item: item.item,
      qty: item.qty,
      price: item.price,
      tax_rate: item.taxRate,
      tax_amount: item.taxAmount,
      total_amount: item.totalAmount
    })),
    invoiceNumber: this.formData.invoiceNumber // Make sure this is correctly assigned
  };

  this.invoiceService.saveInvoice(invoiceData).subscribe(
    response => {
      this.alertMessage = 'Invoice saved successfully!';
      console.log('Invoice saved successfully!', response);
      this.router.navigate(['/tax-history']); // Redirect on success
    },
    error => {
      this.alertMessage = 'Failed to save invoice. Please try again.';
      console.error('Failed to save invoice', error);
    }
  );
}

fetchInvoiceDetails(id: number): void {
  this.http.get<any>(`http://127.0.0.1:8000/api/invoices/${id}/`).subscribe(
    (data) => {
      this.customerRecord = data;
      console.log(this.customerRecord); // Optional: Log to verify data in console
    },
    (error) => {
      console.error('Error fetching invoice details:', error);
    }
  );
}
// file download 
downLoad() {
  const invoiceElement = document.getElementById('invoice-box');
  if (invoiceElement) {
    // Set the background color to white before capturing
    invoiceElement.style.backgroundColor = 'white';
    
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');

      // Reset the background color after capturing
      invoiceElement.style.backgroundColor = '';
    });
  }
}
private baseUrl = 'http://127.0.0.1:8000/api/invoices/';

// invoice number check
checkInvoiceNumber(invoiceNumber: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}check-invoice-number/${invoiceNumber}/`);
}

// generate New InvoiceNumber check

generateNewInvoiceNumber(): void {
  const latestInvoiceNumber = 'INV-000000'; // Start with the initial number
  let newInvoiceNumber = this.incrementInvoiceNumber(latestInvoiceNumber);

  this.invoiceService.checkInvoiceNumber(newInvoiceNumber).subscribe(exists => {
    while (exists) {
      newInvoiceNumber = this.incrementInvoiceNumber(newInvoiceNumber);
      this.invoiceService.checkInvoiceNumber(newInvoiceNumber).subscribe(innerExists => exists = innerExists);
    }
    this.newInvoiceNumber = newInvoiceNumber;
    console.log('New invoice number:', this.newInvoiceNumber);
  });
}
// increment Invoice Number check

incrementInvoiceNumber(invoiceNumber: string): string {
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

