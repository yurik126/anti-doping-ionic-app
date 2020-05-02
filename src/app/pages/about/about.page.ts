import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoTerms(){
    this.navController.navigateForward('terms');  

  }

  gotoPrivacy(){
    this.navController.navigateForward('privacy');  
  }



}
