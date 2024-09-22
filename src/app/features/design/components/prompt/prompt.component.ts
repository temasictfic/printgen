import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptComponent { }
