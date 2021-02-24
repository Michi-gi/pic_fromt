import { Component, OnInit } from '@angular/core';

import { Observable, concat } from 'rxjs';
import { map } from 'rxjs/operators';

import { PicApiService } from '../pic-api.service';

@Component({
  selector: 'query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  constructor(private service: PicApiService) { }

  inputField: string;
  lines: string[] = [];
  contents: any[] = [];

  ngOnInit(): void {
    const stored = sessionStorage.getItem("query_lines");
    if (stored != null) {
      this.lines = stored.split(" ");
      concat(...this.lines.map(line => this.service.getProfileFromUrl(line))).subscribe(content => {
        this.contents.push(content);
      });
    }
  }

  toCheck() {
    this.addEntry(this.inputField, true).subscribe(lines => {
      sessionStorage.setItem("query_lines", this.lines.join(" "));
    });
    this.inputField = "";
  }

  private addEntry(line, save = false): Observable<string> {
    return this.service.getProfileFromUrl(line).pipe(map(content => {
      this.lines.push(line);
      this.contents.push(content);

      return line; 
    }));
  }

  drop(event) {
    event.preventDefault();
    this.addEntry(event.dataTransfer.getData("text"), true).subscribe(lines => {
      sessionStorage.setItem("query_lines", this.lines.join(" "));
    });
  }

  dragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  remove(pos: number) {
    this.lines.splice(pos, 1);
    this.contents.splice(pos, 1);
    sessionStorage.setItem("query_lines", this.lines.join(" "));
  }
}
