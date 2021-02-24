import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PicApiService } from '../pic-api.service';

@Component({
  selector: 'account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./card-common.css', './account-card.component.css']
})
export class AccountCardComponent implements OnInit {

  constructor(
    private service: PicApiService
  ) { }

  @Input() profile: any;

  @Output() close = new EventEmitter<void>();

  imageUrl: string;
  pageUrl: string;

  site: string;
  id: string;
  name: string;
  description: string; 
  account: string;
  externalSites: { site: string; id: string; URL: string; }[];

  ngOnInit(): void {
    this.site = this.profile.site;
    this.imageUrl = "http://penguin.linux.test:8880/download?url=" + this.profile.imageURL;
    this.pageUrl = this.profile.pageURL;
    this.name = this.profile.name;
    this.account = this.profile.account;
    this.id = this.profile.id;
    this.externalSites = this.profile.externalSites;
    this.description = this.profile.introduction;
  }

  closeClicked() {
    this.close.emit();
  }
}
