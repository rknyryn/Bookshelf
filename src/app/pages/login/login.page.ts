import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ToastController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  orderForm: FormGroup;
  
  constructor(public menuCtrl: MenuController, public formBuilder: FormBuilder, 
    public accountService: DatabaseService, public toastController: ToastController, 
    private storage: Storage, public navCtrl: NavController) {
    this.menuCtrl.enable(false);
    this.orderForm = this.formBuilder.group({
      "kullaniciAdi":["",Validators.required],
      "sifre":["",Validators.required],
      "login": ["",Validators.required],
    });
  }

  ngOnInit() {
  }
  
  submit(){
    this.orderForm.value.register = "login";
    //console.log(this.orderForm.value);
    this.accountService.controlUser(this.orderForm.value)
      .then((response) => {
        //console.log("response: " + response);
        if(response["login"] == false){
          this.ToastGet();
        }else{
          this.storage.set('userId', response["userId"]);
          this.menuCtrl.enable(true);
          this.navCtrl.navigateRoot("books");
        }
    });
  }

  async ToastGet() {
    let message = "Kullanıcı Adı veya Şifre Hatalı";
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: "danger",
      position: 'top',
    });
    toast.present();
  }
}
