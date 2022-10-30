import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../../services/pokemon.service";
import { map, Observable } from "rxjs";
import { AppSettings } from "../../app-settings";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  percentSeen$!: Observable<number>

  constructor(private readonly pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.percentSeen$ = this.pokemonService.getPokemonSeen().pipe(
      map(pokemonSeen => pokemonSeen.length / AppSettings.TOTAL_NUMBER)
    )
  }

}
