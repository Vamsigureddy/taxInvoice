import { Component, OnInit } from '@angular/core';
import { TaxDataservieService } from '../services/tax-dataservie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../services/templateservices';
import { InvoiceService } from '../services/invoice.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface Item {
  item: string;
  qty: number | null; // Allow null for qty
  price: number | null; // Allow null for price
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
}
export interface CallbackRequest {
  created_at: Date;
  full_name: string;
  email: string;
  phone: string;
  requirement: string;
  location: string;
}
@Component({
  selector: 'app-homealert',
  templateUrl: './homealert.component.html',
  styleUrls: ['./homealert.component.css'],
  providers: [DatePipe]

})
export class HomealertComponent implements OnInit{
  callbackRequests: CallbackRequest[] = [];
  isLoading: boolean = false;
  searchForm: FormGroup;
  showNotificationModal: boolean = false;
  sortedCallbackRequests: any[] = [];
  filteredCallbackRequests: CallbackRequest[] = [];

  fullName: string = '';
  dateOfBirth: string = '';
  addressLine2: string = '';
  cityTown: string = '';
  stateProvinceRegion: string = '';
  zipPostalCode: string = '';
  items: Item[] = [
    { item: '', qty: null, price: null, taxRate: 18, taxAmount: 0, totalAmount: 0 }
  ];
  grandTotalTaxAmount: number = 0;
  grandTotalAmount: number = 0;
  grandTotalAmountInWords: string = '';
  invoiceNumber: string = '';
  sortDirection = {
    created_at: true,
    full_name: true,
    email: true,
    phone: true,
    requirement: true,
    location: true
  };
  constructor(private dataService: TaxDataservieService, private router: Router,private sharedService:TemplateService,
    private callbackService:InvoiceService,private route: ActivatedRoute,    private fb: FormBuilder,

   ) { }


   ngOnInit() {
    // Initialize the search form
    this.searchForm = this.fb.group({
      searchTerm: [''],
      date: ['']
    });
  
    // Fetch callback requests from the service
    this.callbackService.getCallbackRequests().subscribe(
      (data) => {
        this.callbackRequests = data;
        this.filteredCallbackRequests = [...this.callbackRequests]; // Initialize filtered data
        this.filterInvoices(); // Apply initial filtering
      },
      (error) => {
        console.error('Error fetching callback requests:', error);
      }
    );
  
    // Apply filtering based on form value changes
    this.searchForm.valueChanges.subscribe(() => {
      this.filterInvoices();
    });
  
    // Fetch invoice details based on route params
    this.route.params.subscribe((params: any) => {
      const invoiceId = params['id'];
      this.fetchInvoiceDetails(invoiceId);
    });
  }
  
calculateItemAmounts(item: Item) {
  if (item.price !== null && item.qty !== null) {
    // Calculate taxAmount and totalAmount based on item price, quantity, and tax rate
    item.taxAmount = (item.price * item.qty * item.taxRate) / 100;
    item.totalAmount = (item.price * item.qty) + item.taxAmount;

    // Update grand totals
    this.updateGrandTotals();
  }
}

  updateGrandTotals() {
    // Calculate grand total amounts
    this.grandTotalTaxAmount = this.items.reduce((acc, item) => acc + item.taxAmount, 0);
    this.grandTotalAmount = this.items.reduce((acc, item) => acc + item.totalAmount, 0);
    this.grandTotalAmountInWords = HomealertComponent.convertNumberToWords(this.grandTotalAmount) + ' Rupees Only';
  }
  convertNumberToWords(amount: number) {
    // Convert number to words (you can implement this function or use a library)
    return ''; // Placeholder
  }
// display in word totall
private static readonly UNITS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
private static readonly TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
private static readonly TEENS = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

private static convertNumberToWords(num: number): string {
  if (num === 0) {
    return HomealertComponent.UNITS[0];
  }

  const words = [];
  if (Math.floor(num / 10000000) > 0) {
    words.push(HomealertComponent.convertNumberToWords(Math.floor(num / 10000000)));
    words.push('Crore');
    num %= 10000000;
  }

  if (Math.floor(num / 100000) > 0) {
    words.push(HomealertComponent.convertNumberToWords(Math.floor(num / 100000)));
    words.push('Lakh');
    num %= 100000;
  }

  if (Math.floor(num / 1000) > 0) {
    words.push(HomealertComponent.convertNumberToWords(Math.floor(num / 1000)));
    words.push('Thousand');
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    words.push(HomealertComponent.convertNumberToWords(Math.floor(num / 100)));
    words.push('Hundred');
    num %= 100;
  }

  if (num > 0) {
    if (num < 20) {
      words.push(num < 10 ? HomealertComponent.UNITS[num] : HomealertComponent.TEENS[num - 10]);
    } else {
      words.push(HomealertComponent.TENS[Math.floor(num / 10)]);
      if ((num % 10) > 0) {
        words.push(HomealertComponent.UNITS[num % 10]);
      }
    }
  }

  return words.join(' ');
}
addItem() {
  this.items.push({ item: '', qty: 0, price: 0, taxRate: 18, taxAmount: 0, totalAmount: 0 });
}
removeItem() {
  if (this.items.length > 1) {
    this.items.pop();
    this.updateGrandTotals();
  }
}
generateInvoiceNumber(): string {
  return this.dataService.getNextInvoiceNumber();
}
fetchInvoiceDetails(invoiceId: string): void {
  // Fetch the invoice details using the invoiceId
  // Implement the logic to fetch invoice details
  console.log(`Fetching invoice details for ID: ${invoiceId}`);
}
saveData() {
  this.invoiceNumber = this.generateInvoiceNumber();
  const formData = {
    fullName: this.fullName,
    dateOfBirth: this.dateOfBirth,
    addressLine2: this.addressLine2,
    cityTown: this.cityTown,
    stateProvinceRegion: this.stateProvinceRegion,
    zipPostalCode: this.zipPostalCode,
    items: this.items,
    grandTotalTaxAmount: this.grandTotalTaxAmount,
    grandTotalAmount: this.grandTotalAmount,
    grandTotalAmountInWords: this.grandTotalAmountInWords,
    invoiceNumber: this.invoiceNumber
  };

  this.sharedService.setFormData(formData);
  this.router.navigate(['/user-invoice']);
}
revarce() {
  this.router.navigate(['/not-found']);
}
userHistory(){
  this.router.navigate(['/tax-history'])
}

toggleNotificationModal() {
  this.showNotificationModal = !this.showNotificationModal;
  this.callbackService.getCallbackRequests()
    .subscribe(
      (data) => {
        this.callbackRequests = data;
        console.log('Callback Requests:', data);
      },
      (error) => {
        console.error('Error fetching callback requests:', error);
      }
    );
}
backtopage(){
  this.showNotificationModal = false;

}
filterInvoices() {
  const searchTerm = this.searchForm.get('searchTerm')?.value.toLowerCase();
  const selectedDate = this.searchForm.get('date')?.value;

  this.filteredCallbackRequests = this.callbackRequests.filter(request => {
    const matchesSearch = searchTerm ? (
      request.full_name.toLowerCase().includes(searchTerm) ||
      request.email.toLowerCase().includes(searchTerm) ||
      request.phone.includes(searchTerm) ||
      request.requirement.toLowerCase().includes(searchTerm) ||
      request.location.toLowerCase().includes(searchTerm)
    ) : true;

    const matchesDate = selectedDate ? (
      new Date(request.created_at).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
    ) : true;

    return matchesSearch && matchesDate;
  });
}
}
