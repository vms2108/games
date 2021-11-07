import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TitleService } from 'src/app/route-components/header/common/title.service';
import { NavigationService } from 'src/app/route-components/navigation/common/navigation.service';
import { PageService } from 'src/app/route-components/navigation/common/page.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './route-components/header/header.component';
import { NavigationComponent } from './route-components/navigation/navigation.component';
import { IndexModule } from './route-modules/index/index.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
  ],
  providers: [
    TitleService,
    NavigationService,
    PageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
