import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrl: './technique.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechniqueComponent {
  @Input() techniques!: string[];
  @Output() techniqueClick = new EventEmitter<string>();

  onTechniqueClick(technique: string): void {
    [technique] = technique.split(' ');
    technique = technique.toLowerCase();
    this.techniqueClick.emit(technique);
  }

 }
