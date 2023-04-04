import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  // transform<T>(value: Array<T>, key: keyof T, order: 'asc' | 'desc' = 'desc'): T[] {
  // // transform(value: Array<Post>, args: any[]): any {
  //   const sortField = key;
  //   // const sortDirection = args[1];
  //   const sortDirection = order;

  //   let multiplier = 1;

  //   if (sortDirection === 'desc') {
  //     multiplier = -1;
  //   }

  //   value.sort((a: any, b: any) => {

  //     let aField;
  //     if (isNaN(a[sortField])) {
  //       aField = a[sortField].toLowerCase();
  //     } else {
  //       aField = +[sortField];
  //     }

  //     let bField;
  //     if (isNaN(b[sortField])) {
  //       bField = b[sortField].toLowerCase();
  //     } else {
  //       bField = +b[sortField];
  //     }

  //     if (aField < bField) {
  //       return - 1 * multiplier;
  //     } else if (aField > bField) {
  //       return 1 * multiplier;
  //     } else {
  //       return 0;
  //     }
  //   }
  //   );
  //   return value;
  // }

  transform<T>(
    value: Array<T>,
    sortField: keyof T,
    sortDirection: "asc" | "desc" = "desc"
  ): T[] | null {
    const multiplier = sortDirection === "desc" ? -1 : 1;

    value.sort((a: T, b: T) => {
      const aField = isNaN(a[sortField] as number)
        ? (a[sortField] as string).toLowerCase()
        : Number(a[sortField]);
      const bField = isNaN(b[sortField] as number)
        ? (a[sortField] as string).toLowerCase()
        : Number(b[sortField]);

      if (aField === bField) return 0;
      return aField < bField ? -1 * multiplier : 1 * multiplier;
    });
    return value;
  }

}
