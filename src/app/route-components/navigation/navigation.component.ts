import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavigationService } from './common/navigation.service';
import { PageService } from './common/page.service';
import { Pages } from './common/pages.enum';

enum NavigationTypes {
  MAIN = 'MAIN',
  TETRIS = 'TETRIS',
}

class NavigationItem {
  constructor(public type: NavigationTypes, public opened = false) {}
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {

  public readonly TYPES = NavigationTypes;

  public readonly PAGES = Pages;

  public page!: Pages;

  public menuOpened!: boolean;

  public items: NavigationItem[] = [
    new NavigationItem(NavigationTypes.MAIN),
    new NavigationItem(NavigationTypes.TETRIS),
  ];

  private destroy = new Subject<void>();

  constructor(
    private pageService: PageService,
    private changeDetectorRef: ChangeDetectorRef,
    private navigationService: NavigationService,
    ) {
    this.pageSubscription();
    this.navigationSubscription();
  }

  public getOpened(type: NavigationTypes): boolean {
    return this.items.find(item => item.type === type)!.opened;
  }

  public toggleItem(type: NavigationTypes): void {
    this.items = this.items.map(item => {
      if (item.type === type) {
        item.opened = !item.opened;
      }
      return item;
    });
  }

  private pageSubscription(): void {
    this.pageService.getPage()
    .pipe(
      takeUntil(this.destroy),
    )
    .subscribe(page => {
      this.page = page;
      this.changeDetectorRef.markForCheck();
    });
  }

  private navigationSubscription(): void {
    this.navigationService.getNavigation()
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(opened => {
        this.menuOpened = opened;
        this.changeDetectorRef.markForCheck();
      });
  }
}
