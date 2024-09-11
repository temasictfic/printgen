import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UserDetails } from '../../../features/auth/models/UserDetails.';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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
    private router: Router,
    @Inject(AuthService) private authService: AuthService,
    //@Inject(UserService) private userService: UserService,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
      if (isLogged) {
        console.log('User is logged in');
        this.change.markForCheck();
        //this.setUserDetails(); TODO: UserService method to get user details
      }
    });
  }
 }
