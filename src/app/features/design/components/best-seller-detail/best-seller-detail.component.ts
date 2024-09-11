import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-best-seller-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './best-seller-detail.component.html',
  styleUrl: './best-seller-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestSellerDetailComponent { }
