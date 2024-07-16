import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TemplateService } from 'src/app/services/templateservices';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent implements OnInit {
  @Input() template: TemplateRef<any>; // Define an Input property to receive the template reference

  selectedTemplateId: string;

  selectedTemplate: TemplateRef<any> | null;

  constructor(private templateService: TemplateService) {}

  @ViewChild('customer') customerTemplate: TemplateRef<any>;
  @ViewChild('customerdetailsform')
  customerDetailsFormTemplate: TemplateRef<any>;
  @ViewChild('customerform') customerform: TemplateRef<any>;
  @ViewChild('customerloginform') customerloginform: TemplateRef<any>;
  @ViewChild('customerloginform(sidebyside)')
  customerloginformsidebyside: TemplateRef<any>;
  @ViewChild('customerhistory') customerhistory: TemplateRef<any>;
  @ViewChild('customerlist') customerlist: TemplateRef<any>;
  @ViewChild('menuitems') menuitems: TemplateRef<any>;
  @ViewChild('navigationmenu') navigationmenu: TemplateRef<any>;

  selectTemplate(templateRefId: string) {
    switch (templateRefId) {
      case 'customer':
        this.selectedTemplate = this.customerTemplate;
        break;
      case 'customerdetailsform':
        this.selectedTemplate = this.customerDetailsFormTemplate;
        break;
      case 'customerform':
        this.selectedTemplate = this.customerform;
        break;
      case 'customerloginform':
        this.selectedTemplate = this.customerloginform;
        break;
      case 'customerloginform(sidebyside)':
        this.selectedTemplate = this.customerloginformsidebyside;
        break;
      case 'customerhistory':
        this.selectedTemplate = this.customerhistory;
        break;
      case 'customerlist':
        this.selectedTemplate = this.customerlist;
        break;
      case 'menuitems':
        this.selectedTemplate = this.menuitems;
        break;
      case 'customer':
        this.selectedTemplate = this.customerTemplate;
        break;
      case 'navigationmenu':
        this.selectedTemplate = this.navigationmenu;
        break;
      default:
        this.selectedTemplate = null;
        break;
    }
  }

  ngOnInit(): void {
    this.templateService.selectedTemplateId$.subscribe((id) => {
      this.selectTemplate(id.toLowerCase());
    });
  }

  backBootstrapMainPage() {
    this.selectedTemplate = null;
    this.templateService.backButtonFired();
  }
}
