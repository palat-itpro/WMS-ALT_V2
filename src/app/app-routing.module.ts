import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExwarehouseComponent } from './exwarehouse/exwarehouse.component';
import { StockctrlComponent } from './stockctrl/stockctrl.component';
import { SohComponent } from './soh/soh.component';

import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent },
  { path: 'exwh', component: ExwarehouseComponent },
  { path: 'stkctrl', component: StockctrlComponent },
  { path: 'soh', component: SohComponent },
  { path: '*.*', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
