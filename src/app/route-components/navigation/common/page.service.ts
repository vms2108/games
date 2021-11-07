import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Pages } from './pages.enum';

@Injectable()
export class PageService {

  private pageSubject = new BehaviorSubject<Pages>(Pages.MAIN);

  constructor() {
    this.pageSubject.next(Pages.MAIN);
  }

  public setPage(page: Pages): void {
    this.pageSubject.next(page);
  }

  public getPage(): Observable<Pages> {
    return this.pageSubject.asObservable();
  }
}
