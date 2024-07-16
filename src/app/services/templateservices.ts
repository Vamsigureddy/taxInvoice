import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private selectedTemplateIdSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  selectedTemplateId$: Observable<string> =
    this.selectedTemplateIdSubject.asObservable();

  public eventEmitter = new EventEmitter<any>();

  setSelectedTemplateId(templateId: string) {
    this.selectedTemplateIdSubject.next(templateId);
  }

  backButtonFired() {
    this.eventEmitter.next('back');
  }
  constructor() {
    this.loadData();  // Load data from localStorage when the service is instantiated
  }
  private customerRecords: any[] = [];
  saveData(record: any) {
    this.customerRecords.push(record);
    this.saveToLocalStorage();  }
  getData() {
    return this.customerRecords;
  }
  private saveToLocalStorage() {
    localStorage.setItem('customerRecords', JSON.stringify(this.customerRecords));
  }
  private loadData() {
    const data = localStorage.getItem('customerRecords');
    if (data) {
      this.customerRecords = JSON.parse(data);
    }
  }
}
