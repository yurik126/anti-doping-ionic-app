import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navController: NavController, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navController.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navController.navigateForward('register');
    }
  }

  searchproduct() {
    this.navController.navigateForward('menu/products');
  };

  searchsubstance() {
    this.navController.navigateForward('menu/substances');
  };

  prescriptions() {
    this.navController.navigateForward('menu/prescriptions/2');
  };

  prohibitedproducts() {
    this.navController.navigateForward('menu/prohibited-products');
  };

  interaction() {
    this.navController.navigateForward('menu/interaction');
  };

}
