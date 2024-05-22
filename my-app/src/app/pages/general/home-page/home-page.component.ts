import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../../services/auth-google.service';
import { MapComponent } from '../../../components/map/map.component';
import { SessionService } from '../../../services/session.service';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { last } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    NavBarComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public pageName: string = 'Home';
  profile: any;
  locationData: any;
  sessionInfo: any;
  isLoading: boolean = true;
  

  constructor( 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthGoogleService,
  ) {}  

  ngOnInit(): void {

    this.authService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;

      if (!isLoading) {
        this.profile = this.authService.getProfile();
        this.sendSessionData();
        this.cdr.detectChanges();
      }
    });
  }


  onLocationFound(latlng: any): void {
    this.locationData = latlng;
    this.sendSessionData();
  }

  sendSessionData(): void {
    if (this.profile && this.locationData) {

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const sessionData = {
        email: this.profile.email,
        lat: this.locationData.lat,
        lng: this.locationData.lng,
        timezone: timezone
      };

      this.sessionService.createSession(sessionData).subscribe({
        next: (res: any) => {
          this.retrieveSessionData();
        },
        error: (err: any) => console.error('Error creating session', err)
      });
    }
  }

  retrieveSessionData(): void {
    if (this.profile && this.profile.email) {
      this.sessionService.getSessionData(this.profile.email).subscribe({
        next: (data) => {
          if (data && Object.keys(data).length > 0) {
            this.sessionInfo = data; // Stocke les informations de session
            console.log('Retrieved session data:', this.sessionInfo);
          } else {
            console.log('No session data found, creating new session.');
            this.sendSessionData(); // Aucune donnée trouvée, donc création d'une nouvelle session
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error retrieving session data', error);
          this.sendSessionData();
        }
      });
    } else {
      console.error('Profile data is incomplete or not available');
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
