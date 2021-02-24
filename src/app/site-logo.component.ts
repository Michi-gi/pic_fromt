import { Component, OnInit, Input } from '@angular/core';

import resources from './resources.json';

@Component({
  selector: 'site-logo',
  templateUrl: './site-logo.component.html',
  styleUrls: ['./common.css', './site-logo.component.css']
})
export class SiteLogoComponent implements OnInit {

  @Input() site: string;
  @Input() logoClass: string;

  logoUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.logoUrl = resources.logo[this.site];
  }

}
