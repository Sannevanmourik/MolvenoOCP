import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumSelect'
})
export class EnumSelectPipe implements PipeTransform {

  transform(value, args: string[]): any {
    const options = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        options.push({key: enumMember, value: value[enumMember]});
        // Uncomment if you want log
        // console.log("enum member: ", value[enumMember]);
      }
    }
    return options;
  }

}
