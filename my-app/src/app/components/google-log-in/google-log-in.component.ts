import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGoogleService } from '../../services/auth-google.service';


@Component({
  selector: 'app-google-log-in',
  standalone: true,
  imports: [],
  templateUrl: './google-log-in.component.html',
  styleUrl: './google-log-in.component.css'
})
export class GoogleLogInComponent {

  private authService = inject(AuthGoogleService);
  signInWithGoogle() {
    this.authService.login();
  }

}
