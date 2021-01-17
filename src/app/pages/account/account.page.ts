import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  orderForm: FormGroup;
  public userName;
  public userId = -1;
  constructor(public accountService: DatabaseService, private storage: Storage, public formBuilder: FormBuilder,
    public toastController: ToastController,public navCtrl: NavController) { 
      this.storage.get('userId').then((storageUserId) => {
        this.userId = storageUserId;
      });
      this.orderForm = this.formBuilder.group({
        "userId":["",Validators.required],
        "sifre":["",Validators.required],
        "sifreTekrar":["",Validators.required], 
        "edit": ["",Validators.required],
      });
  }

  ngOnInit() {
    this.getUserName();
  }

  exitAccount(){
    this.storage.set('userId', -1);
    this.navCtrl.navigateRoot("login");
  }

  getUserName(){
    this.storage.get('userId').then((storageUserId) => {
      this.userId = storageUserId;
      }).then(() => {
          this.accountService.getUserName(this.userId).then(name => {
          this.userName = name["username"];
      });
    });
  }

  submit() {
    if(this.orderForm.value.sifre == this.orderForm.value.sifreTekrar){
      this.orderForm.value.userId = this.userId;
      this.orderForm.value.edit = "edit";
      //console.log(this.orderForm.value);
      this.accountService
        .editUser(this.orderForm.value)
        .then((response) => {
          status = response["status"];
          //console.log(response);
          this.ToastGet(status);
      });
    }
    else{
      this.ToastGet("600");
    }
  }

  async ToastGet(status) {
    let message = "";
    if(status == "success"){
      message = "Güncelleme Başarılı";
      status = "success";
    }
    else if(status == "600"){
      message = "Şifreler Uyuşmuyor";
      status = "danger";
    }
    else{
      message = "Güncelleme Başarısız";
      status = "danger";
    }
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: status,
      position: 'top',
    });
    toast.present();
  }
}
