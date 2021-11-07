import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/route-components/header/common/title.service';
import { PageService } from 'src/app/route-components/navigation/common/page.service';
import { Pages } from 'src/app/route-components/navigation/common/pages.enum';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {

  private readonly TITLE = 'Games main page';

  constructor(
    private titleService: TitleService,
    private pageService: PageService,
    ) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle(this.TITLE);
    this.setPage();
  }

  private setPage(): void {
    this.pageService.setPage(Pages.MAIN);
  }
}
