import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './color-button.component.html',
  styleUrl: './color-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorButtonComponent { 
  @Input() rgb!: [string, string, string];
}
