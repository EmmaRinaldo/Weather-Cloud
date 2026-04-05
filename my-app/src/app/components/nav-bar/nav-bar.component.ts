import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  @Input() profile: any;
  @Input() pageName!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  greeting: string = '';

  ngOnInit(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Bonjour !';
    } else if (hour < 18) {
      this.greeting = 'Bon après-midi !';
    } else {
      this.greeting = 'Bonsoir !';
    }
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigate(pageName: string): void {
    this.pageName = pageName;
    this.router.navigate([pageName.toLowerCase()]);
  }

}
