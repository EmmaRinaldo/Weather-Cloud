import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/general/home-page/home-page.component';
import { HistoriqueComponent } from './pages/general/historique/historique.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'historique', component: HistoriqueComponent, canActivate: [authGuard] },
];
