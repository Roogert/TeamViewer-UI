import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  signupForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  signupInvalid = false;

  constructor(private authService: AuthServiceService) {}
  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      const user = {
        first_name: this.signupForm.get('first_name')?.value,
        last_name: this.signupForm.get('last_name')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
      };
      this.authService.signUp(user).subscribe({
        next: () => console.log('Signed up successfully'),
        error: () => (this.signupInvalid = true),
      });
    }
  }
}
