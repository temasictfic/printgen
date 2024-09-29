import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Technique } from '../../models/product';

@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrl: './technique.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechniqueComponent {
  @Input() techniques!: Technique[];
  @Output() techniqueClick = new EventEmitter<Technique>();

  onTechniqueClick(technique: Technique): void {
    this.techniqueClick.emit(technique);
  }

 }
