import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RegistrationProvider } from '../../providers/registration/registration';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  saman = [];
  TotalAmount: Number = 0;
  constructor(public actionSheetCtrl: ActionSheetController, public registerP: RegistrationProvider, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.storage.get('item').then((val) => {
      this.saman = val;
      val.forEach(element => {
        this.TotalAmount = Number(Number(this.TotalAmount) + (Number(element.quantity) * Number(element.discountedPrice)));
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

    this.storage.get('item').then((val) => {
      // this.saman.push(val);
    });
  }

  Buy() {
    this.storage.get('item').then((val) => {
      this.storage.get('user').then((email) => {
        var dataToSend = {
          user: email,
          time: new Date(),
          itemPurchased: val
        }
        console.log(dataToSend);


        this.registerP.purchase(dataToSend).subscribe(data => {
          // console.log(data.msg);

        });
      });
    });
    this.saman = [];
  }

  deleteItem(product) {
    var isMatch = 0;
    let actionSheet = this.actionSheetCtrl.create({
      title: product.itemName,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            //Remove locally
            let index = this.saman.indexOf(product);
            if (index > -1) {
              this.saman.splice(index, 1);
              isMatch += 1;
            }
            this.storage.set('item', this.saman);
            this.TotalAmount = Number(Number(this.TotalAmount) - (Number(product.quantity) * Number(product.discountedPrice)));
            //Remove from database
            // this.reviewService.deleteReview(product._id);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

