import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {DialogService} from '../../services/dialog.service';


@Component({
  selector: 'app-interaction-nutritions-modal',
  templateUrl: './interaction-nutritions-modal.component.html',
  styleUrls: ['./interaction-nutritions-modal.component.scss'],
})
export class InteractionNutritionsModalComponent implements OnInit {
  @Input() interactionNutritions;
  @Input() nutritions;

  constructor(private modalCtrl: ModalController, private dlgService: DialogService) { }

  ngOnInit() {
    console.log(this.interactionNutritions)
  }

  close(){
    this.modalCtrl.dismiss({interactionNutritions: this.interactionNutritions});
  }

  addNutrition(nutrition){
    let found = 0;
    if(!this.interactionNutritions) this.interactionNutritions = [];
    if (this.interactionNutritions.length >= 3) {
      this.dlgService.showAlert(null, null, "Üç adet besin ekleyebilirsiniz", ["Tamam"]);
    }
    else if (this.interactionNutritions.length == 0) {
      nutrition.added = 1;
      this.interactionNutritions.push(nutrition);
      this.close();
    }
    else{
      this.interactionNutritions.forEach(value => {
        if (value.id == nutrition.id) {
          found = 1;
          nutrition.added = 1;
          value.added = 1;
        }
      })
      if (found == 0) {
        nutrition.added = 1;
        this.interactionNutritions.push(nutrition);
        this.close();
      }
    }
  }

}
