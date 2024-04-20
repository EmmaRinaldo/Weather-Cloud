import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Assurez-vous que cette voie d'accès est correcte

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/api/sessions`;
  constructor(private http: HttpClient) {}

  createSession(sessionData: { email: string, lat: number, lng: number, timezone: string}) {
    return this.http.post(`${this.apiUrl}`, sessionData);
  }

  getSessionData(email: string): Observable<any> {
    let params = new HttpParams().set('email', email); // Crée des paramètres HTTP avec l'email
    return this.http.get<any>(`${this.apiUrl}/latest`, { params: params });
  }

  getSessionsByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sessionsByEmail`, { params: { email } });
}
  
}
