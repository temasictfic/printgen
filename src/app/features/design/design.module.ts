import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DesignComponent } from './components/design/design.component';
import { RouterModule, Routes } from '@angular/router';
import { TShirtComponent } from './components/t-shirt/t-shirt.component';

const routes: Routes = [
  {
    path: 'design',
    component: DesignComponent,
  },
];

@NgModule({
  declarations: [TShirtComponent, DesignComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: []
})
export class DesignModule { }