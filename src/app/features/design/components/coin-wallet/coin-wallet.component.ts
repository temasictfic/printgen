import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { CreditService } from '../../services/credit.service';

@Component({
  selector: 'app-coin-wallet',
  templateUrl: './coin-wallet.component.html',
  styleUrl: './coin-wallet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinWalletComponent {
  @Input() credit!: number;

  constructor(@Inject(CreditService) private creditService: CreditService) {
    this.creditService.getCredit().subscribe((credit) => {
      this.credit = credit;
    });
   }
 }
