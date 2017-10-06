import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchCategoryPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (value) {
      if (!items) {
        return [];
      }
      items.filter((it) => {
        if (it[field] === value) {
          items = [];
          items.push(it);
        }
        console.log("items", items);
        return items;
      });
    } else {
      return items;
    }
  }
}
