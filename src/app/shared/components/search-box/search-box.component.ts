import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer : Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription ;

  @Input()
  public placeholder:string="";



  @Input()
  public initialValue : string='';

  // @Output() onValue : EventEmitter<string>=new EventEmitter();

  @Output() onDebounce : EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription=this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>
      this.onDebounce.emit(value)
      // console.log("debo. value", value)
    )
  }

  ngOnDestroy(): void {
    console.log("Destruido")
    this.debouncerSubscription?.unsubscribe();
  }

  // emitValue(placeholder : string){
  //   this.onValue.emit(placeholder);
  // }



  onKeyPress(searchTerm : string){
    console.log("escribe")
    this.debouncer.next(searchTerm);
  }
}
