import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementComponent { 
  @Input() placements!: string[];

}
