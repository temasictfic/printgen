import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from "../../../../shared/shared.module";

@Component({
  selector: 'app-design',
  templateUrl: './design.component4.html',
  styleUrl: './design.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent { }
