import { Pipe, PipeTransform, Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'imgElementSize'
})
export class ImgElementSizePipe implements PipeTransform {

  transform(value: HTMLImageElement, format?: string): Observable<string> {
    const sizeFormat = format || "$w x $h";
    const subject = new Subject<string>();

    value.addEventListener('load', (event) => {
      subject.next(sizeFormat.replace("$w", value.naturalWidth.toString()).replace("$h", value.naturalHeight.toString()));
      subject.complete();
    });

    return subject.asObservable();
  }

}
