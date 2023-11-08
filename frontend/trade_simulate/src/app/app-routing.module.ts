import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGaurdService } from './service/route-gaurd.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGaurdService]},
  { path: 'watchlist', component: WatchlistComponent , canActivate:[RouteGaurdService]},
  { path: 'logout', component: LogoutComponent , canActivate:[RouteGaurdService]},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
