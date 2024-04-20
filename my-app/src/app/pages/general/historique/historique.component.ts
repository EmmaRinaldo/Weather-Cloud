import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { AuthGoogleService } from '../../../services/auth-google.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
  ],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {

  public pageName: string = 'Historique';
  profile: any;
  sessions: any[] = [];
  isLoading: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthGoogleService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {

    this.authService.isLoading.subscribe(isLoading => {
      if (!isLoading) {
        this.profile = this.authService.getProfile();
        if (this.profile && this.profile.email) {
          this.fetchSessionHistory(this.profile.email); // Fetch session history when profile is loaded
        }
        this.cdr.detectChanges();
      }
    });

  }

  // Function to fetch session history
  fetchSessionHistory(email: string): void {
    this.sessionService.getSessionsByEmail(email).subscribe({
      next: (data: any) => {
        this.sessions = data; 
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error fetching session history:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      },}
    );
  }

  getIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
