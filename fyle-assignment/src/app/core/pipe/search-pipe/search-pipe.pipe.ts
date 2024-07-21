import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByKey',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, key: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return item[key].toLowerCase().includes(searchText);
    });
  }
}
