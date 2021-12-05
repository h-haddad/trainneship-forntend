import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'availableColor'})
export class AvailableColorPipe implements PipeTransform {
  transform(type: boolean): string {

    let color: string;

    switch (type) {
      case false:
        color = 'bg-danger text-white';
        break;
      case true:
        color = 'bg-success text-white';
        break;
      default:
        color = 'bg-secondary text-white';
        break;
    }

    return color;

  }
}
