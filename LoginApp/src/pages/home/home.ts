import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, ModalController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { RegistrationProvider } from '../../providers/registration/registration';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  options: BarcodeScannerOptions;
  results: {};
  show: {};
  saman = [];
  quantity: any;
  temp: {};
  newPara: any;

  constructor(public modalCtrl: ModalController, public registerP: RegistrationProvider, public alertCtrl: AlertController, public menuCtrl: MenuController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    this.registerP.getAllItems().subscribe(data => {
      this.saman = data.msg;
      this.temp = "";
      this.newPara = "";
    });
    this.storage.set('item', []);
  }

  async scanBarcode() {
    this.options = {
      prompt: 'scan a barcode to see the results!!'
    }
    this.results = await this.barcodeScanner.scan(this.options);
  }

  async encodeData() {
    this.results = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, "Omprakash Shivpuje");
  }

  setData(newEntry) {
    var isMatch = 0;
    this.saman.forEach(element => {
      if (element.barCode == newEntry) {
        this.temp = element;
        isMatch += 1;
      }
    });
    if (isMatch == 0) {
      let alert = this.alertCtrl.create({
        title: 'Info!',
        subTitle: 'This Item is Not present in Store! Please scan again!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  AddData(entry) {
    let confirm = this.alertCtrl.create({
      title: entry.itemName,
      message: "Special Price: " + entry.discountedPrice + ' Rs ' + ' Hurry Up!!' + ' Only ' + entry.quantity + ' Remaining ',
      inputs: [
        {
          name: "quantity",
          placeholder: "Qty."
        }
      ],
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: data => {
            console.log('Agree clicked');
            this.storage.get('item').then((val) => {
              if (val.length != 0) {
                val.forEach(element => {
                  if (entry.barCode == element.barCode) {
                    this.storage.get('item').then((val) => {
                      val.forEach(Item => {
                        if (entry.barCode == Item.barCode) {
                          Item.quantity = Number(Number(data.quantity) + Number(Item.quantity));
                          this.storage.set('item', val);
                        }
                      });
                    });
                  }
                  else {
                    entry.quantity = Number(data.quantity);
                    val.push(entry);
                    this.storage.set('item', val);
                  }
                });
              } else {
                entry.quantity = Number(data.quantity);
                val.push(entry);
                this.storage.set('item', val);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  // wishListPage() {

  // }
  openCartPage() {
    this.navCtrl.push(CartPage);
  }

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    setTimeout(() => {
      // console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
    this.registerP.getAllItems().subscribe(data => {
      // console.log(data);
      this.saman = data.msg;
      // console.log(data.msg);
      this.temp = "";
    });
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  getItem() {
    this.registerP.getAllItems().subscribe(data => {
      this.saman = data.msg;
      this.temp = "";
      this.newPara = "";
      this.results = "";
    });
  }
}