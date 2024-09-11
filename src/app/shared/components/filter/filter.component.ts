import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { BestSellerService } from '../../../features/design/services/best-seller.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  public filterForm: FormGroup;
  selectedStar = 0;

  constructor(private fb: FormBuilder, @Inject(BestSellerService) private bestSellerService: BestSellerService){
    this.filterForm = this.fb.group({
      star1: new FormControl(false),
      star2: new FormControl(false),
      star3: new FormControl(false),
      star4: new FormControl(false),
      star5: new FormControl(false),
      priceFrom: new FormControl(0),
      priceTo: new FormControl(0)
    });
  }
  updateSelectedStar() {
    let selectedStar = 0;
    for (let i = 1; i <= 5; i++) {
      if (this.filterForm.get(`star${i}`)?.value) {
        selectedStar++;
      }
    }
    this.selectedStar = selectedStar;
    this.emitFilterEvent();
  }

  resetFilters() {
    for (let i = 1; i <= 5; i++) {
      this.filterForm.get(`star${i}`)?.setValue(false);
    }
    this.updateSelectedStar();
  }

  resetPriceFilters() {
    this.filterForm.get('priceFrom')?.setValue(0);
    this.filterForm.get('priceTo')?.setValue(0);
    this.emitFilterEvent();
  } 

  get priceFrom() {
    return this.filterForm.get('priceFrom')?.value;
  }

  get priceTo() {
    return this.filterForm.get('priceTo')?.value;
  }

  get star1() {
    return this.filterForm.get('star1')?.value;
  }

  get star2() {
    return this.filterForm.get('star2')?.value;
  }

  get star3() {
    return this.filterForm.get('star3')?.value;
  }

  get star4() {
    return this.filterForm.get('star4')?.value;
  }

  get star5() {
    return this.filterForm.get('star5')?.value;
  }

  emitFilterEvent() {
    this.bestSellerService.filterEvent.emit({ // Service has an EventEmitter
      star1: this.star1,
      star2: this.star2,
      star3: this.star3,
      star4: this.star4,
      star5: this.star5,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo
    });
    //console.log({ star1: this.star1, star2: this.star2, star3: this.star3, star4: this.star4, star5: this.star5, priceFrom: this.priceFrom, priceTo: this.priceTo });
  }

  onFilter() {
    this.emitFilterEvent();
  }
 }
