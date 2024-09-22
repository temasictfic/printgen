import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent { 
  @Input() colors!: string[];

}
