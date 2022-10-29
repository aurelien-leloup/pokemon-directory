import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Filter } from "../models/filter";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject: BehaviorSubject<Filter>;

  constructor() {
    this.filterSubject = new BehaviorSubject<Filter>({
      name: '',
      minHeight: 0,
      minWeight: 0,
      maxHeight: 100,
      maxWeight: 1000
    })
  }

  getFilter(): Observable<Filter> {
    return this.filterSubject.asObservable();
  }
}
