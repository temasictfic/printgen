import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-area',
  templateUrl: './product-area.component.html',
  styleUrl: './product-area.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAreaComponent { 
  @Input() productImageUrl!: string; 
}
