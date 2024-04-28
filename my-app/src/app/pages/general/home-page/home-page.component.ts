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
  firstLoad: boolean = false;
  lastEmail: string | null = null;
  lastInjection: number | null = null;
  

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
        if (this.lastEmail !== this.profile.email) {
          this.firstLoad = true;
          this.lastEmail = this.profile.email;
        }
        if (this.firstLoad || !this.lastInjection || (Date.now() - this.lastInjection > 60000)) {// regarde ça ce soir
          this.sendSessionData();
          this.firstLoad = false;
        } else {
          this.retrieveSessionData();
        }
        this.cdr.detectChanges();
      }
    });
  }


  onLocationFound(latlng: any): void {
    this.locationData = latlng;
    if (this.firstLoad) {
      this.sendSessionData();
      this.firstLoad = false;
    } else {
      this.retrieveSessionData();
    }
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
          this.lastInjection = Date.now();
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
          this.isLoading = false;
          // En cas d'erreur lors de la récupération, vous pourriez également envisager de créer une nouvelle session
          this.sendSessionData();
        }
      });
    } else {
      console.error('Profile data is incomplete or not available');
      this.isLoading = false;
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.firstLoad = false;
    this.lastEmail = null; // revoir ça ce soir (je devrais peut être le supprimer)
    this.lastInjection = null;
  }

}
