import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UserDetails } from '../../../features/auth/models/UserDetails.';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../features/auth/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  userDetails: UserDetails = {} as UserDetails;
  isEntered: boolean = false;
  
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private userService: UserService,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      console.log('Is authenticated:', isAuthenticated);
      console.log('isEntered:', this.isEntered);
      this.isEntered = isAuthenticated;
      if (this.isEntered) {
        console.log('User is logged in');
        this.setUserDetails();
      }
    });
  }

  private setUserDetails(): void {
    const userId = this.authService.tokenPayload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? '';
    console.log('User ID:', userId);
    if (userId) {
      this.userService.getUserDetailsById(userId).subscribe((userDetails) => {
        this.userDetails = userDetails;
        //console.log('User details:', this.userDetails);
        this.change.markForCheck(); // Signal change detection
      });
    }
  }
 }
