import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from "../../../../shared/shared.module";

@Component({
  selector: 'app-design',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
],
  templateUrl: './design.component2.html',
  styleUrl: './design.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent { }
