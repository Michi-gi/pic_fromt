import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, AfterViewInit, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'pic-carousel',
  templateUrl: './pic-carousel.component.html',
  styleUrls: ['./pic-carousel.component.css']
})
export class PicCarouselComponent implements OnInit, AfterViewInit {

  @Input() id: string;
  @Input() linkPath: string;
  @Input() picUrls: string[];

  @Output() picChange = new EventEmitter<number>();
  @Output() picsReady = new EventEmitter<HTMLImageElement[]>();

  @ViewChild('carousel') carousel: ElementRef;
  @ViewChildren('imgs') imgTags: QueryList<ElementRef>;

  pos: number;
  
  constructor() {
  }

  ngOnInit(): void {
    this.pos = 0;
  }

  ngAfterViewInit() {
    const carouselElement = this.carousel.nativeElement;
    carouselElement.addEventListener('slid.bs.carousel', (event) => {
      this.pos = event.to;
      this.picChange.emit(event.to);
    });
    this.picsReady.emit(this.imgTags.toArray().map(ref => ref.nativeElement));
  }
}
