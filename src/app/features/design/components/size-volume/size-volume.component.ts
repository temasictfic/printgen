import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-size-volume',
  templateUrl: './size-volume.component.html',
  styleUrl: './size-volume.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeVolumeComponent{
  @Input() sizes_volumes!: string[];
  

  onSizeVolumeClick(_t1: string) {
    throw new Error('Method not implemented.');
  }
 }
