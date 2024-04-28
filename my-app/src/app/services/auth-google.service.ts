import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  private profileSubject = new BehaviorSubject<any>(null);
  public profile$ = this.profileSubject.asObservable();

  isLoading = new BehaviorSubject<boolean>(true);

  constructor() {
    this.initConfiguration();
    this.loadUserProfile();
  }

  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.googleClientId,
      redirectUri: window.location.origin + '/home',
      scope: 'openid profile email',
      responseType: 'token id_token',
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        this.fetchAndSetProfile();
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.router.navigate(['/login']);
  }

  fetchAndSetProfile() {
    this.isLoading.next(true);
    const profile = this.oAuthService.getIdentityClaims();
    this.profileSubject.next(profile); // Mise à jour du BehaviorSubject avec le nouveau profil
    this.isLoading.next(false);
  }

  private loadUserProfile() {
    if (this.oAuthService.hasValidAccessToken()) {
      this.fetchAndSetProfile();
    }
  }

  getToken() {
    return this.oAuthService.getAccessToken();
  }

  getProfile() {
    return this.profileSubject.value; // Retourne la dernière valeur du profile stockée dans BehaviorSubject
  }

}