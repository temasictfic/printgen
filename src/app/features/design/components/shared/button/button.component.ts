import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent { 
  @Input() color: string = '';
  @Input() class: string = '';
  @Input() type: string = 'button';
  @Input() label: string = '';
  @Output() clickHandler = new EventEmitter<void>();

  onClick() {
    this.clickHandler.emit();
  }
}
