import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-contry-table',
  templateUrl: './contry-table.component.html',
  styleUrl: './contry-table.component.css'
})
export class ContryTableComponent {


  @Input()
  public countries: Country[]=[];
}
