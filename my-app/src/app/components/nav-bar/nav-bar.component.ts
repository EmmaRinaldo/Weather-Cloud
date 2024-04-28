import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
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
    private authService: AuthGoogleService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
