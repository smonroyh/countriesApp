import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/regions.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  public cacheStore: CacheStore={
    byCapital:   {term: '',countries:[]},
    byCountries :{term: '',countries:[]},
    byRegion :   {region : "Africa",countries:[]}
  }


  private url = "https://restcountries.com/v3.1";

  private getCountriesRequest(url : string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(()=>of([])),
    )
  }

  searchCountryByAlphaCode(code : string): Observable<Country | null>{
    return this.httpClient.get<Country[]>(`${this.url}/alpha/${code}`)
    .pipe(

      map(countries=>countries.length>0 ? countries[0] : null),
      catchError(
        error=> of(null)
      )
    )
  }

  searchCapital(term : string) : Observable<Country[]>{
    return this.getCountriesRequest(`${this.url}/capital/${term}`)
    .pipe(
      tap(countries =>this.cacheStore.byCapital = {term, countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

  searchCountry(term : string) : Observable<Country[]>{
    return this.getCountriesRequest(`${this.url}/name/${term}`)
    .pipe(
      tap(countries =>this.cacheStore.byCountries={term,countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

  searchRegion(term : Region) : Observable<Country[]>{
    return this.getCountriesRequest(`${this.url}/region/${term}`)
    .pipe(
      tap(countries =>this.cacheStore.byRegion={region:term,countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

}
