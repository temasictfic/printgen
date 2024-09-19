import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DesignComponent } from './components/design/design.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'design',
    component: DesignComponent,
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: []
})
export class DesignModule { }