import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-t-shirt',
  templateUrl: './t-shirt.component.html',
  styleUrl: './t-shirt.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TShirtComponent { }

