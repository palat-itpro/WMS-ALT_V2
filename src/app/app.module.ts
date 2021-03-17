import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

//Fire
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

//Env
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';


//Components
import { TopbarComponent } from './layout/topbar/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar/sidebar.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExwarehouseComponent } from './exwarehouse/exwarehouse.component';
import { SohComponent } from './soh/soh.component';
import { StockctrlComponent } from './stockctrl/stockctrl.component';
import { RouterModule } from '@angular/router';
import { ExwhcontComponent } from './exwarehouse/exwhcont/exwhcont.component';
import { AddcontainerComponent } from './exwarehouse/exwhcont/addcontainer/addcontainer.component';
import { ExwhComponent } from './exwarehouse/exwh/exwh.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginDialogComponent } from './auth/login/login.component';
import { UnloaddialogComponent } from './exwarehouse/exwhcont/unloaddialog/unloaddialog.component';
import { UnloadingComponent } from './exwarehouse/exwhcont/unloading/unloading.component';
import { EmptycontComponent } from './exwarehouse/exwhcont/emptycont/emptycont.component'
import { ConfirmunloadComponent } from './exwarehouse/exwhcont/unloading/confirmunload/confirmunload.component'

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    DashboardComponent,
    ExwarehouseComponent,
    SohComponent,
    StockctrlComponent,
    ExwhcontComponent,
    AddcontainerComponent,
    ExwhComponent,
    LoginComponent,
    LoginDialogComponent,
    UnloaddialogComponent,
    UnloadingComponent,
    EmptycontComponent,
    ConfirmunloadComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    //Materials
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatRippleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
