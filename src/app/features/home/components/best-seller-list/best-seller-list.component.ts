import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../../../../shared/models/card.';
import { BestSellerService } from '../../services/best-seller.service';



@Component({
  selector: 'app-best-seller-list',
  templateUrl: './best-seller-list.component.html',
  styleUrl: './best-seller-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestSellerListComponent { 
  cards: Card[] = [];
  page = 1;
  limit = 20;

  constructor(private bestSellerService: BestSellerService) {}

  ngOnInit() {
    //this.loadMoreCards();
  }

  onScroll() {
    const scrollContainer = document.querySelector('[cdkScrollable]');
    if (scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.loadMoreCards();
      }
    }
  }

  loadMoreCards() {
    this.bestSellerService.getBestSellers(this.page, this.limit).subscribe(newCards => {
      this.cards = [...this.cards, ...newCards];
      this.page++;
    });
  }
}
