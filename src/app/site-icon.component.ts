import { Component, OnInit, Input } from '@angular/core';

import resources from './resources.json';

@Component({
  selector: 'site-icon',
  templateUrl: './site-icon.component.html',
  styleUrls: ['./common.css', './site-icon.component.css']
})
export class SiteIconComponent implements OnInit {

  @Input() site: string;
  @Input() iconClass: string;

  iconUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.iconUrl = resources.symbol[this.site];
  }

}
