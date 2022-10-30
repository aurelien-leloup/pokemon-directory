import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { filter, map, Observable, Subscription, tap } from "rxjs";
import { Filter } from "../../models/filter";
import { FilterService } from "../../services/filter.service";
import { Options } from "@angular-slider/ngx-slider";
import { AppSettings } from "../../app-settings";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  heightSliderOptions: Options = {
    floor: AppSettings.MIN_HEIGHT,
    ceil: AppSettings.MAX_HEIGHT,
    step: 1
  };
  weightSliderOptions: Options = {
    floor: AppSettings.MIN_WEIGHT,
    ceil: AppSettings.MAX_WEIGHT,
    step: 10
  };

  filterForm = new FormGroup({
    name: new FormControl(''),
    height: new FormControl([this.heightSliderOptions.floor, this.heightSliderOptions.ceil]),
    weight: new FormControl([this.weightSliderOptions.floor, this.weightSliderOptions.ceil])
  });

  subscriptions = new Subscription();

  constructor(private readonly filterService: FilterService) {
  }

  ngOnInit(): void {

    const formChanges$ = this.filterForm.valueChanges.pipe(
      map(formValues => formValues as ({ name: string, height: number[], weight: number[] })),
      map((formValues: { name: string, height: number[], weight: number[] }) => ({
        name: formValues.name,
        minHeight: formValues.height[0],
        maxHeight: formValues.height[1],
        minWeight: formValues.weight[0],
        maxWeight: formValues.weight[1]
      } as Filter)),
      tap(filter => this.filterService.setFilter(filter))
    );

    this.subscriptions.add(formChanges$.subscribe())
  }


  get f() {
    return this.filterForm.controls
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
