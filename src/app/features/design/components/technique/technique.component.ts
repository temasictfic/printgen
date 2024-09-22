import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrl: './technique.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechniqueComponent {
  @Input() techniques!: string[];
 }
