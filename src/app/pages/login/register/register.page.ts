import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MenuController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  orderForm: FormGroup;

  constructor(public menuCtrl: MenuController, public formBuilder: FormBuilder, public accountService: DatabaseService, public toastController: ToastController) {
    this.menuCtrl.enable(false);
    this.orderForm = this.formBuilder.group({
      "kullaniciAdi":["",Validators.required],
      "sifre":["",Validators.required],
      "sifreTekrar":["",Validators.required],
      "register": ["",Validators.required],
    });
  }

  ngOnInit() {
  }

  submit(){
    this.orderForm.value.register = "register";
    //console.log(this.orderForm.value);
    if(this.orderForm.value.sifre == this.orderForm.value.sifreTekrar){
      this.accountService.addUser(this.orderForm.value)
      .then((response) => {
        status = response["status"];
        this.ToastGet(status);
      });
    }else{
      this.ToastGet("600")
    }
  }

  async ToastGet(status) {
    let message = "";
    if(status == "success"){
      message = "Kayıt Edildi";
      status = "success";
    }
    else if(status == "600"){
      message = "Şifreler Eşleşmiyor";
      status = "danger";
    }
    else{
      message = "Kayıt Başarısız";
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
