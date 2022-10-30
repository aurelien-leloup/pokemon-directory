import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from "../../services/pokemon.service";
import { FilterService } from "../../services/filter.service";
import {
  combineLatest,
  debounceTime,
  map,
  merge,
  mergeMap,
  Observable, of,
  startWith,
  Subject,
  switchMap,
  tap
} from "rxjs";
import { Pokemon } from "../../models/pokemon";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'height', 'weight', 'sprite'];

  pokemons$!: Observable<MatTableDataSource<Pokemon>>;
  loading = false;
  afterViewInit = false;


  constructor(private readonly filterService: FilterService,
              private readonly pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    const pokemonsFromFilter: Observable<Pokemon[]> = this.filterService.getFilter().pipe(
      tap(() => this.loading = true),
      debounceTime(1000),
      switchMap(filter => this.pokemonService.getPokemon(filter)),
      tap(() => this.loading = false)
    );

    const initialEmptyList: Observable<Pokemon[]> = of([]);


    this.pokemons$ = merge(initialEmptyList, pokemonsFromFilter).pipe(
      map(pokemons => this.generateMatDataSource(pokemons))
    )


  }

  generateMatDataSource(pokemons: Pokemon[]) {
    const datasource = new MatTableDataSource(pokemons);
    datasource.paginator = this.paginator;
    this.pokemonService.updatePokemonSeen(0, 20)
    return datasource;
  }


  onPageEvent(pageEvent: PageEvent) {
    this.pokemonService.updatePokemonSeen(pageEvent.pageIndex, pageEvent.pageSize);
  }
}
