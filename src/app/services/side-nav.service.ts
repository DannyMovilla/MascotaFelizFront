import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  private menuIsOpen$: Subject<boolean>;
  private menuIsOpen: boolean = false;
  constructor() {
    this.menuIsOpen$ = new Subject<boolean>();
  }

  /**
   * If menu is open, let close it
   **/
  public open() {
    if (!this.menuIsOpen) {
      this.menuIsOpen = true;
      this.menuIsOpen$.next(false);
    }
  }
  /**
   * Both silence open and close is use by navbar output, to silence switch internal flag.
   **/
  public silenceOpen() {
    this.menuIsOpen = true;
  }
  public silenceClose() {
    this.menuIsOpen = false;
  }

  /**
   * If menu is close, let open it
   **/
  public close() {
    if (this.menuIsOpen) {
      this.menuIsOpen = false;
      this.menuIsOpen$.next(false);
    }
  }

  public toggle() {
    this.menuIsOpen = !this.menuIsOpen;
    this.menuIsOpen$.next(this.menuIsOpen);
  }

  public asObservable() {
    return this.menuIsOpen$.asObservable();
  }
}
