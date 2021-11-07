import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitleService } from 'src/app/route-components/header/common/title.service';

import { NavigationService } from './../navigation/common/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  public title = this.titleService.getTitle();

  public isLoggedIn!: boolean;

  private subscriptions = new Subscription();

  constructor(
    private titleService: TitleService,
    private navigationService: NavigationService,
  ) {
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public toggleNavigation(): void {
    this.navigationService.toogleNavigation();
  }
}
