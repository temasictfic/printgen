import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrl: './style.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleComponent {
  @Input() styles!: string[];

  onStyleClick(_t1: string) {
    throw new Error('Method not implemented.');
  }
 }
