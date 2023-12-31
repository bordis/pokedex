import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  private url: string = 'https://pokeapi.co/api/v2/pokemon/';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species/';
  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;
  constructor(
    private ActiveRoute: ActivatedRoute,
    private service: PokeApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon(){
    const id = this.ActiveRoute.snapshot.paramMap.get('id');
    const pokemon = this.service.apiGetPokemons(this.url+id);
    const name = this.service.apiGetPokemons(this.urlName+id);
    return forkJoin([pokemon, name]).subscribe((res) => {
      this.pokemon = res
      this.isLoading = true;
    }, error => {
      this.apiError = true;
    });

  }

}
