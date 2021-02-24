import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TextLinkService } from './text-link.service';

@Component({
  selector: 'text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.css']
})
export class TextLinkComponent implements OnInit, OnChanges {

  @Input() text: string;
  textLink: any[];

  constructor(private service: TextLinkService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.textLink = this.service.parse(this.text);
  }

}
