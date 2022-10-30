import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../../services/pokemon.service";
import { AppSettings } from "../../app-settings";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  total = AppSettings.TOTAL_NUMBER

  constructor(readonly pokemonService: PokemonService) {
  }

  ngOnInit(): void {

  }

}
