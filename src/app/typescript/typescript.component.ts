import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TemplateService } from '../services/templateservices';
import { Router } from '@angular/router';  // Import Router
import { Invoice } from '../models/invoice.model';
import { InvoiceService } from '../services/invoice.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})
export class TypescriptComponent implements OnInit, OnChanges {
  searchForm: FormGroup;
  filteredInvoices: any[] = [];

  invoices: any[] = [];
  @Input('historyCustomerRecord') ihistoryRecord: any;

  CustomerRecords: any = [];
  constructor(private invoiceService: InvoiceService, private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      date: ['']
    });
  }  // Inject the SharedService

  ngOnInit(): void {
    // this.CustomerRecords = this.sharedService.getData();  
    this.loadInvoices();
    // Subscribe to form changes and filter the invoices
    this.searchForm.valueChanges.subscribe(() => {
      this.filterInvoices();
    });
  }

  //Monitor the input changes(if parent change input automatically it will trigger.)
  ngOnChanges() {
    //console.log(this.ihistoryRecord);
    this.CustomerRecords.push(this.ihistoryRecord);
    console.log(this.CustomerRecords);
  }
  viewRecord(invoice: any) {
    const invoiceId = invoice.id; // Replace with your actual invoice ID or index
    this.router.navigate(['/user-invoice', invoiceId]);
  }
  deleteRecord(index: any) {

  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe(
      data => {
        this.invoices = data;
        this.filteredInvoices = this.invoices; // Initialize filteredInvoices with all invoices
      },
      error => {
        console.error('Error fetching invoices:', error);
      }
    );
  }

  filterInvoices(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value.toLowerCase() || '';
    const date = this.searchForm.get('date')?.value || '';

    this.filteredInvoices = this.invoices.filter(invoice =>
      (searchTerm ? invoice.full_name.toLowerCase().includes(searchTerm) : true) &&
      (date ? invoice.date_of_birth === date : true)
    );
  }
}
