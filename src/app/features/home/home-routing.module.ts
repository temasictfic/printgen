import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BestSellerDetailComponent } from './components/best-seller-detail/best-seller-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, //TODO: Best Seller Detail might be another module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}