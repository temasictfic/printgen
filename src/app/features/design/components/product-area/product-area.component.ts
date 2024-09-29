import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../../models/t-shirt';

@Component({
  selector: 'app-product-area',
  templateUrl: './product-area.component.html',
  styleUrl: './product-area.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAreaComponent { 
  @Input() productImageUrl!: string; 
  @Input() productBackgroundImgUrl!: string | null;
  @Input() productBackgroundColor!: string | null;
  @Input() color!: string;
}
