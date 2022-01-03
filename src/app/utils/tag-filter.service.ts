import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagFilterService {

  constructor() { }

  getTagsFromProfiles(profiles: any[]): any[] {
    const tagStatics = profiles.flatMap(pf => pf.tags).reduce((statics, t) => {
      if (statics[t.name] == null) {
        statics[t.name] = { tag: t, count: 1 };
      } else {
        statics[t.name].count += 1;
      }
      return statics;
    }, {});
    const sorted = [...Object.entries(tagStatics)].sort((a, b) => b[1]['count'] - a[1]['count']);

    return sorted.map(elem => elem[1]["tag"]);
  }

  simpleFilter(target: any[], tag: any): any[] {
    return target.filter(pic => pic.tags.some(t => (t.name == tag.name)));
  }

  andFilter(target:any[], tags: any[]): any[] {
    return target.filter(pic => tags.every(t => pic.tags.some(pt => (pt.name == t.name))));
  }

  orFilter(target:any[], tags: any[]): any[] {
    return target.filter(pic => tags.some(t => pic.tags.some(pt => (pt.name == t.name))));
  }

  filter(target: any[], conditions: { op: string, data: any[] }): any[] {
    if (conditions.op == "and") {
      return this.andFilterHierarchy(target, conditions.data);
    }
    if (conditions.op == "or") {
      return this.orFilterHierarchy(target, conditions.data);
    }

    return [];
  }

  private andFilterHierarchy(target:any[], conditions: any[]): any[] {
    if (conditions.every(cond => 'name' in cond)) {
      return this.andFilter(target, conditions);
    }
    let result = [];
    for (let cond of conditions) {
      if ('name' in cond) {
        result = this.intersection(result, this.simpleFilter(target, cond));
      } else if (cond.op == "and") {
        result = this.intersection(result, this.andFilterHierarchy(target, cond));
      } else if (cond.op == "or") {
        result = this.intersection(result, this.orFilterHierarchy(target, cond));
      }
    }

    return result;
  }

  private orFilterHierarchy( target:any[], conditions: any[]): any[] {
    if (conditions.every(cond => 'name' in cond)) {
      return this.orFilter(target, conditions);
    }
    let result = [];
    for (let cond of conditions) {
      if ('name' in cond) {
        result = this.marge(result, this.simpleFilter(target, cond));
      } else if (cond.op == "and") {
        result = this.marge(result, this.andFilterHierarchy(target, cond));
      } else if (cond.op == "or") {
        result = this.marge(result, this.orFilterHierarchy(target, cond));
      }
    }

    return result;
  }

  private intersection(a: any[], b: any[]): any[] {
    return a.filter(e => b.includes(e));
  }

  private marge(a: any[], b: any[]): any[] {
    return [...(new Set([...a, ...b]))];
  }
}
