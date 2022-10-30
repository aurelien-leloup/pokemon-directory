import { Filter } from "./models/filter";

export class AppSettings {
  static readonly MIN_HEIGHT = 0;
  static readonly MIN_WEIGHT = 0;
  static readonly MAX_WEIGHT = 1000;
  static readonly MAX_HEIGHT = 100;
  static readonly DEFAULT_FILTER: Filter = {
    name: '',
    minHeight: 0,
    minWeight: 0,
    maxHeight: 100,
    maxWeight: 1000
  }
  static readonly TOTAL_NUMBER = 1154;
}
