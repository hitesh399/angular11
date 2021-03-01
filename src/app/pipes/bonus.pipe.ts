import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bonus',
})
export class BonusPipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value?: number, args?: number): any {
    // console.log(typeof value);
    // console.log(typeof args);
    console.log(value, args, "Test");

    if (args != undefined && value) {
      return value + 2 + args;
    } else if(value) {
      return value + 2;
    }
  }
}
