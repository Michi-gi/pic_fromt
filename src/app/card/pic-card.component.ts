import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PicApiService } from '../pic-api.service';

@Component({
  selector: 'pic-card',
  templateUrl: './pic-card.component.html',
  styleUrls: ['./card-common.css', './pic-card.component.css']
})
export class PicCardComponent implements OnInit {

  constructor(
    private service: PicApiService
  ) { }

  @Input() profile: any;
  @Input() mini: boolean = false;

  @Output() close = new EventEmitter<void>();

  carouselId: string;
  picPath: string;
  downloadUrls: string[];
  currentPicUrl: string;
  pageUrl: string;
  authorPageUrl: string;

  site: string;
  id: string;
  title: string;
  description: string;
  author: string;
  width: number;
  height: number;
  tags: any[];

  images: HTMLImageElement[];

  ngOnInit(): void {
    this.site = this.profile.site;
    this.id = this.profile.id;
    this.carouselId = "pic_carousel_" + this.site + "_" + this.profile.id;
    this.picPath= "/picture/" + this.site + "/" + this.profile.id;
    this.downloadUrls = this.getDownloadUrls(this.profile.imageURLs);
    this.currentPicUrl = this.downloadUrls[0];
    this.pageUrl = this.profile.pageURL;
    if (!this.mini) {
      this.service.getAccountProfile(this.profile.site, this.profile.author.id).subscribe(aProfile => {
        this.authorPageUrl = aProfile.pageURL;
      });
    }
    this.title = this.profile.title;
    this.description = this.profile.description;
    this.author = this.profile.author.name;
    this.width = this.profile.size.width;
    this.height = this.profile.size.height;
    this.tags = this.profile.tags;
  }

  private getDownloadUrls(urls: string[]): string[] {
    if ((urls == null) || (urls.length == 0)) {
      return ["#"];
    }
    return urls.map(url => "/api/download?url=" + url);
  }

  closeClicked() {
    this.close.emit();
  }

  changePic(index) {
    this.width = this.images[index].naturalWidth;
    this.height = this.images[index].naturalHeight;
    this.currentPicUrl = this.downloadUrls[index];
  }

  setImages(imgs: HTMLImageElement[]) {
    this.images = imgs;
  }
}
