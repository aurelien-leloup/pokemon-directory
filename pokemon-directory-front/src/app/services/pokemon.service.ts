import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Filter } from "../models/filter";
import { Pokemon } from "../models/pokemon";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private filteredPokemonNumberSubject: BehaviorSubject<number>;
  private pokemons: Pokemon[] = [];
  private pokemonSeen = new Set<string>();
  private pokemonSeenSubject: BehaviorSubject<string[]>;

  constructor(private readonly http: HttpClient) {
    this.filteredPokemonNumberSubject = new BehaviorSubject<number>(0);
    this.pokemonSeenSubject = new BehaviorSubject<string[]>([]);
  }

  getPokemon(filter: Filter): Observable<Pokemon[]> {
    let params = new HttpParams();

    params = params.append('name', filter.name);
    params = params.append('minHeight', filter.minHeight);
    params = params.append('maxHeight', filter.maxHeight);
    params = params.append('minWeight', filter.minWeight);
    params = params.append('maxWeight', filter.maxWeight);

    return this.http.get<Pokemon[]>('http://localhost:8080/pokemon', {params}).pipe(
      tap(pokemons => {
        this.filteredPokemonNumberSubject.next(pokemons.length);
        this.pokemons = pokemons;
      })
    );
  }

  getFilteredPokemonNumberSubject(): Observable<number> {
    return this.filteredPokemonNumberSubject.asObservable();
  }

  onPageChanged(pageIndex: number) {

  }

  getPokemonSeen(): Observable<string[]> {
    return this.pokemonSeenSubject.asObservable();
  }

  updatePokemonSeen(pageIndex: number, pageSize: number) {
    this.pokemons
      .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
      .forEach(pokemon => this.pokemonSeen.add(pokemon.name))

    this.pokemonSeenSubject.next(Array.from(this.pokemonSeen));
  }
}
