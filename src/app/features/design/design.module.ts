import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DesignComponent } from './components/design/design.component';
import { RouterModule, Routes } from '@angular/router';
import { CoinWalletComponent } from './components/coin-wallet/coin-wallet.component';
import { SizeVolumeComponent } from './components/size-volume/size-volume.component';
import { ColorComponent } from './components/color/color.component';
import { StyleComponent } from './components/style/style.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { ViewComponent } from './components/view/view.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { ProductAreaComponent } from './components/product-area/product-area.component';
import { TechniqueComponent } from './components/technique/technique.component';


const routes: Routes = [
  {
    path: 'design',
    component: DesignComponent,
  },
];

@NgModule({
  declarations: [
    DesignComponent,
    CoinWalletComponent,
    ProductAreaComponent,
    TechniqueComponent,
    SizeVolumeComponent,
    ColorComponent,
    StyleComponent,
    ViewComponent,
    PromptComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class DesignModule {}
