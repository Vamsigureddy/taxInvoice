import {
  Component,
  ContentChild,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TemplateService } from '../services/templateservices';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css'],
})
export class BootstrapComponent implements OnInit {
  // @ContentChild('customer') customer: TemplateRef<any>;
  // @ContentChild('customerdetailsform') customerdetailsform: TemplateRef<any>;
  // @ContentChild('customerform') customerform: TemplateRef<any>;
  // @ContentChild('customerloginform') customerloginform: TemplateRef<any>;
  // @ContentChild('customerloginform(sidebyside)')
  // customerloginformsidebyside: TemplateRef<any>;
  // @ContentChild('customerhistory') customerhistory: TemplateRef<any>;
  // @ContentChild('customerlist') customerlist: TemplateRef<any>;
  // @ContentChild('menuitems') menuitems: TemplateRef<any>;
  // @ContentChild('navigationmenu') navigationmenu: TemplateRef<any>;

  // @ViewChild('templateContainer', { read: ViewContainerRef })
  //templateContainer: ViewContainerRef;

  selectedTemplateId: string;

  constructor(
    public templateService: TemplateService,
    public activateroute: ActivatedRoute,
    router: Router
  ) {
    if (activateroute.snapshot.url.join('/') == 'bootstrap-training')
      this.isVisit = false;
  }

  isVisit = false;
  evtDisplayTemlate(templateId: string) {
    this.templateService.setSelectedTemplateId(templateId);
    this.isVisit = true;
  }

  ngOnInit(): void {
    this.templateService.eventEmitter.subscribe(()=>{
       this.isVisit = false;
    })
  }
}
