import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterCredentials } from '../../../../core/models/register-credentials';

console.log('RegisterComponent');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  now = new Date();
  registerFormGroup: FormGroup;
  registerSuccess = new EventEmitter<void>();

//public dialog: MatDialog,
constructor(private formBuilder: FormBuilder, private router: Router, @Inject(AuthService)private authService: AuthService) {
  this.registerFormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]]
  });
    
}

openTermsConditions() {
  //this.dialog.open(TermsConditionsComponent);
}

openPrivacyPolicy() {
  //this.dialog.open(PrivacyPolicyComponent);
}

register() {
  const registerCredentials: RegisterCredentials = {
    firstName: this.registerFormGroup.value.firstName,
    lastName: this.registerFormGroup.value.lastName,
    userName: this.registerFormGroup.value.userName,
    phoneNumber: this.registerFormGroup.value.phoneNumber,
    email: this.registerFormGroup.value.email,
    password: this.registerFormGroup.value.password,
    passwordConfirm: this.registerFormGroup.value.passwordConfirm
  };
  this.authService.register(registerCredentials).subscribe({
    complete: () => {
      this.registerSuccess.emit();
      console.log('Registration successful');
      this.router.navigate(['/']);
    },
  });
}

onRegisterFormSubmit() {
  if (this.registerFormGroup.invalid) {
    console.error('Invalid form');
    return;
  }

  this.register();
}

 }
