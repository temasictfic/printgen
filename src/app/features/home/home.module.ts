import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { DesignModule } from '../design/design.module';
import { BestSellerListComponent } from './components/best-seller-list/best-seller-list.component';
import { BestSellerDetailComponent } from './components/best-seller-detail/best-seller-detail.component';
import { HomeRoutingModule } from './home-routing.module';




@NgModule({
  declarations: [HomeComponent, BestSellerListComponent, BestSellerDetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    DesignModule,
  ],
})
export class HomeModule { }
