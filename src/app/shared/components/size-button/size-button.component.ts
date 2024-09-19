import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-size-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './size-button.component.html',
  styleUrl: './size-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeButtonComponent { 
  @Input() size!: string;
}
