import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  $implements: OnInit;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  users = [];
  pages: Array<{ title: string, component: any }>;

  constructor(private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page) {
    this.storage.get('user').then((val) => {
      this.users.push(val);
    });
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.storage.get('user').then((val) => {
      val = [];
      this.storage.set('user', val);
      this.users = [];
    })
    console.log("Logged Out successfully");
    this.nav.push(LoginPage);
  }
}