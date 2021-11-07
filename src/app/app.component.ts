import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavigationService } from './route-components/navigation/common/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public menuOpened!: boolean;

  private destroy = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {
  }

  public ngOnInit(): void {
    this.navigationSubscription();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
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
