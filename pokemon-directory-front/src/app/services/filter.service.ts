import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Filter } from "../models/filter";
import { AppSettings } from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject: BehaviorSubject<Filter>;

  constructor() {
    this.filterSubject = new BehaviorSubject<Filter>({...AppSettings.DEFAULT_FILTER})
  }

  getFilter(): Observable<Filter> {
    return this.filterSubject.asObservable();
  }

  setFilter(filter: Filter) {
    this.filterSubject.next(filter);
  }
}
