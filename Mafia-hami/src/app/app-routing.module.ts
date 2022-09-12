import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InitDashboardComponent } from './components/init-dashboard/init-dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'init-dashboard', component: InitDashboardComponent },
  { path: 'init-dashboard/:id/:playerId', component: InitDashboardComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
