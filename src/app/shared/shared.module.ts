import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { ButtonAuthComponent } from './components/button-auth/button-auth.component';
import { DropdownProfileComponent } from './components/dropdown-profile/dropdown-profile.component';
import { FlowbiteService } from '../core/services/flowbite.service';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    ButtonAuthComponent,
    DropdownProfileComponent,
    CardComponent,
    FilterComponent
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [CardComponent],
})
export class SharedModule {}
