import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { PicApiService } from '../pic-api.service';
 
import resources from '../resources.json';

const VIEW_COUNT = 20;

@Component({
  selector: 'f-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {

  @ViewChild("bgImage") backgroundImage: ElementRef;
  @ViewChild("end") picsEndElement: ElementRef;

  site: string;
  id: string;

  name: string;
  description: string;
  imageUrl: string;
  backgroundUrl: string;
  backgroundUrlP: string;
  created: Date;
  author: any;
  tags: any[];
  pageUrl: string;
  webPageUrl: string;
  externalSites: { site: string; id: string; URL: string; }[];

  pictures: any[];
  viewPictures: any[];

  observer: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private service: PicApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.site = params.get('site');
      this.id = params.get('id');

      this.service.getAccountProfile(this.site, this.id).subscribe(profile => {
        this.name = profile.name;
        this.imageUrl = "http://penguin.linux.test:8880/download?url=" + profile.imageURL;
        this.backgroundUrl = (profile.backgroundURL) ? "http://penguin.linux.test:8880/download?url=" + profile.backgroundURL : null;
        this.backgroundUrlP = profile.backgroundURL;
        this.description = profile.introduction;
        this.pageUrl = profile.pageURL;
        this.webPageUrl = profile.externalSites.find(exs => exs.site == "webpage")?.URL;
        this.externalSites = profile.externalSites.filter(exs =>exs.site != "webpage");
      });
      this.service.getPiscByAccount(this.site, this.id).subscribe(pics => {
        this.pictures = pics;
        this.viewPictures = pics.slice(0, VIEW_COUNT);
      });
    });
  }

  ngAfterViewInit() {
    if (this.backgroundImage != null) {
      this.backgroundImage.nativeElement.addEventListener("error", (event) => {
        this.backgroundUrl = this.backgroundUrlP;
      });
    }
    this.observer = new IntersectionObserver((entry) => {
      const length = this.viewPictures.length;
      if (!entry[0].isIntersecting || (length >= this.pictures.length)) {
        return;
      }
      this.viewPictures.push(...this.pictures.slice(length, length + VIEW_COUNT));
    });
    this.observer.observe(this.picsEndElement.nativeElement);
  }
}
