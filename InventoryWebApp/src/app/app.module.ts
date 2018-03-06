import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { GetAllDataService } from './services/get-all-data.service';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent }
  ]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  
  ],
  providers: [GetAllDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
