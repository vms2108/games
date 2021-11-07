import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NavigationService {

  private navigateOpenSubject = new BehaviorSubject<boolean>(false);

  public toogleNavigation(): void {
    this.navigateOpenSubject.next(!this.navigateOpenSubject.value);
  }

  public getNavigation(): Observable<boolean> {
    return this.navigateOpenSubject.asObservable();
  }
}
