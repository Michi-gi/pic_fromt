import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, zip } from 'rxjs';

import { PicApiService } from '../pic-api.service';
import {ImgElementSizePipe} from '../utils/img-element-size.pipe';
 
import resources from '../resources.json';

@Component({
  selector: 'picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit, AfterViewInit {

  @ViewChild('image') imageElement: ElementRef;

  site: string;
  id: string;

  title: string;
  description: string;
  downloadUrls: string[];
  picPos: number;
  created: Date;
  author: any;
  tags: any[];
  pageUrl: string;

  logoUrl: string;
  mainImageSize: string;

  constructor(
    private route: ActivatedRoute,
    private service: PicApiService,
    private imageSizePipe: ImgElementSizePipe
  ) { }

  ngOnInit(): void {
    zip(this.route.paramMap, this.route.queryParamMap).subscribe( params => {
      this.site = params[0].get('site');
      this.id = params[0].get('id');
      const posStr = params[1].get('pos') || "0";
      this.picPos = Number(posStr);

      this.logoUrl = resources.logo[this.site];

      this.service.getPicProfile(this.site, this.id).subscribe(profile => {
        this.title = profile.title;
        this.downloadUrls = profile.imageURLs.map(url => ("http://penguin.linux.test:8880/download?url=" + url));
        this.description = profile.description;
        this.created= new Date(profile.created);
        this.author = profile.author;
        this.tags = profile.tags
        this.pageUrl = profile.pageURL;
      });
    });
  }

  ngAfterViewInit() {
    this.imageSizePipe.transform(this.imageElement.nativeElement).subscribe(value => {
      this.mainImageSize = value;
    });
  }

  imageClick(index) {
    this.picPos = index;
    this.imageSizePipe.transform(this.imageElement.nativeElement).subscribe(value => {
      this.mainImageSize = value;
    });
  }
}
