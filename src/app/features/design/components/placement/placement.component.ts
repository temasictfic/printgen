import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementComponent { 
  @Input() placements!: string[];
  @Output() placementClick = new EventEmitter<string>();

  onPlacementClick(placement: string): void {
    this.placementClick.emit(placement);
  }

}
