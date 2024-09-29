import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFormatPlacement',
})
export class FormatPlacementPipe implements PipeTransform {

  transform(placement: string): string {
    return placement.replace(/_/g, ' ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
  }

}
