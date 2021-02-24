import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PictureComponent } from './picture/picture.component';
import { QueryComponent } from './query/query.component';
import { PicCardComponent } from './card/pic-card.component';
import { AccountCardComponent } from './card/account-card.component';
import { PicCarouselComponent } from './utils/pic-carousel.component';
import { TextLinkComponent } from './utils/text-link.component';
import { ImgElementSizePipe } from './utils/img-element-size.pipe';
import { SiteLogoComponent } from './site-logo.component';
import { SiteIconComponent } from './site-icon.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    PictureComponent,
    QueryComponent,
    PicCardComponent,
    AccountCardComponent,
    PicCarouselComponent,
    TextLinkComponent,
    ImgElementSizePipe,
    SiteLogoComponent,
    SiteIconComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
