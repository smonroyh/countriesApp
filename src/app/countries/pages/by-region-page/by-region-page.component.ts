import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/regions.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries : Country[]=[];

  public regions : Region []= ['Africa','Americas','Asia','Europe','Oceania'];

  public selectedRegion? :Region;

  constructor (private countryService :  CountriesService){}

  ngOnInit(): void {
    this.countries=this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }


  searchByRegion(term : Region){
    this.selectedRegion = term;
    this.countryService.searchRegion(term).subscribe(countries => this.countries = countries);
  }
}
