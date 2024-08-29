import { Country } from "./country";
import { Region } from "./regions.type";

export interface CacheStore{
  byCapital : TermCountries,
  byCountries : TermCountries,
  byRegion : TermRegions,
}

export interface TermCountries{
  term: string;
  countries: Country[]
}

export interface TermRegions{
  region? : Region,
  countries : Country[]
}
