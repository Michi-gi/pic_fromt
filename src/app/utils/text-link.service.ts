import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextLinkService {

  constructor() { }

  parse(text: string) {
    const div = document.createElement("div");
    div.innerHTML = text;
    let result = []
    div.childNodes.forEach(node => {
      if (node instanceof Text) {
        result.push({kind: 'text', content: node.data});
      } else if (node instanceof HTMLAnchorElement) {
        result.push({kind: 'link', ref: node.href, text: node.innerText});
      } else if (node instanceof HTMLBRElement) {
        result.push({kind: 'br'});
      } else if (node instanceof HTMLElement) {
        result = result.concat(this.parse(node.innerHTML));
      }
    });

    return result;
  }
}
