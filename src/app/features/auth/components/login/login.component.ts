import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginCredentials } from '../../../../core/models/login-credentials';

console.log('LoginComponent');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  now = new Date();
  loginFormGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const loginCredentials: LoginCredentials = {
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password,
    };
    this.authService.login(loginCredentials).subscribe({
      complete: () => {
        this.authService.emitLoginSuccess();
        console.log('Login successful');
        this.router.navigate(['/']);
      },
    });
  }

  onLoginFormSubmit() {
    if (this.loginFormGroup.invalid) {
      console.error('Invalid form');
      return;
    }

    this.login();
  }
}

