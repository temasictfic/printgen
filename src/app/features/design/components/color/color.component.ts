import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Color } from '../../models/product';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent { 
  @Input() colors!: Color[];
  @Output() colorClick = new EventEmitter<Color>();

  onColorClick(color: Color): void {
    this.colorClick.emit(color);
  }

}
