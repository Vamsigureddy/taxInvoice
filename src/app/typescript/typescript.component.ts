import { Component,Input, OnInit } from '@angular/core';
import { TemplateService } from '../services/templateservices';
import { Router } from '@angular/router';  // Import Router
import { Invoice } from '../models/invoice.model';
import { InvoiceService } from '../services/invoice.service';


@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})
export class TypescriptComponent implements OnInit{

  invoices: any[] =[];
  @Input('historyCustomerRecord') ihistoryRecord: any;

  CustomerRecords: any = [];
  constructor(private invoiceService: InvoiceService, private router: Router) {}  // Inject the SharedService

  ngOnInit(): void {
    // this.CustomerRecords = this.sharedService.getData();  
    this.loadInvoices();

  }

  //Monitor the input changes(if parent change input automatically it will trigger.)
  ngOnChanges() {
    //console.log(this.ihistoryRecord);

    //setTimeout(() => {
      this.CustomerRecords.push(this.ihistoryRecord);

      console.log(this.CustomerRecords);
    //}, 1000);


  }
  viewRecord(invoice: any) {
    const invoiceId = invoice.id; // Replace with your actual invoice ID or index
    this.router.navigate(['/html-training', invoiceId]);
  }
  deleteRecord(index:any){

    
  }
  
  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe(
      data => {
        this.invoices = data;
      },
      error => {
        console.error('Error fetching invoices:', error);
      }
    );
  }
  
}
