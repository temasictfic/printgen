import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Placement } from '../../models/product';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementComponent { 
  @Input() placements!: Placement[];
  @Output() placementClick = new EventEmitter<Placement>();

  onPlacementClick(placement: Placement): void {
    this.placementClick.emit(placement);
  }
}
