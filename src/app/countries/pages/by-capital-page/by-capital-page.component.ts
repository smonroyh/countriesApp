import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  constructor(private countryService : CountriesService){}
  ngOnInit(): void {
    this.countries=this.countryService.cacheStore.byCapital.countries;
    this.term= this.countryService.cacheStore.byCapital.term;
  }


  public countries: Country[]=[];
  public term : string ='';

  public isLoading : boolean=false;

  searchByCapital(term: string){

    this.isLoading=true;

    this.countryService.searchCapital(term).subscribe(countries => {
      this.countries=countries
      this.isLoading=false;
    })
  }
}
