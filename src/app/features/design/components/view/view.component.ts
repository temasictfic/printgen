import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent { 
  @Input() views!: Map<string, string[]>;

}
