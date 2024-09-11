import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-auth',
  templateUrl: './button-auth.component.html',
  styleUrl: './button-auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAuthComponent { 
  @Input() text: string = '';
  @Input() routerLink: string = '';
}
