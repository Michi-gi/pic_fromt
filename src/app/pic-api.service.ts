import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PicApiService {

  constructor(private http: HttpClient) { }

  getProfileFromUrl(url: string): Observable<any> {
    return this.http.get("/api/judgesite?url=" + encodeURI(url), {observe: 'body', responseType: 'json'}).pipe(flatMap(judged => {
      switch (judged["kind"]) {
        case "pic":
          return this.getPicProfile(judged["site"], judged["id"])
        case "author":
          return this.getAccountProfile(judged["site"], judged["id"])
      }
    }));
  }

  getPicProfile(site: string, id: string): Observable<any> {
    return this.http.get("/api/picprofile?site=" + site + "&id=" + id, {observe:'body', responseType: 'json'}).pipe(map(result => ({ ...result, kind: "pic"})));
  }

  getAccountProfile(site: string, id: string): Observable<any> {
    return this.http.get("/api/authorprofile?site=" + site + "&id=" + id, {observe:'body', responseType: 'json'}).pipe(map(result => ({ ...result, kind: "author"})));
  }

  getPiscByAccount(site: string, id: string, count: number): Observable<any> {
    return this.http.get<any>("/api/picbyauthor?site=" + site + "&id=" + id + "&count=" + count, {observe:'body', responseType: 'json'}).pipe(map(result => ({ pictures: result.pictures.map(pic => ({ ...pic, kind: "pic"})), tags: result.tags }) ));
  }

}
