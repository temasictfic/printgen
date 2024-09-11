import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserDetails } from '../../../features/auth/models/UserDetails.';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-profile',
  templateUrl: './dropdown-profile.component.html',
  styleUrl: './dropdown-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownProfileComponent {
  @Input()
  userDetails!: UserDetails;

  constructor(
    @Inject(AuthService) private authService: AuthService,
    private flowbiteService: FlowbiteService,
    private router: Router,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initDropdowns();
    });
  }
// TODO: logout endpointi yok!!!
  onLogoutClick(): void {
    this.authService.logout().subscribe({
      complete: () => {
        console.log('Logout successful');
        this.change.markForCheck();
        this.router.navigate(['/']);
      },
    });
  }
}
