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
  isLogged: boolean = false;
  
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private userService: UserService,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
      if (isLogged) {
        console.log('User is logged in');
        this.setUserDetails();
      }
    });
  }

  private setUserDetails(): void {
    const userId = this.authService.tokenPayload?.nameid ?? '';
    if (userId) {
      this.userService.getUserDetailsById(userId).subscribe((userDetails) => {
        this.userDetails = userDetails;
        //console.log('User details:', this.userDetails);
        this.change.markForCheck(); // Signal change detection
      });
    }
  }
 }
