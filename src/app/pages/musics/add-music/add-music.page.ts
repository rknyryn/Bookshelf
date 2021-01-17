import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.page.html',
  styleUrls: ['./add-music.page.scss'],
})
export class AddMusicPage implements OnInit {
  orderForm: FormGroup;
  public userId;

  constructor(public formBuilder: FormBuilder, public musicService: DatabaseService, 
    private storage: Storage, public toastController: ToastController, public navCtrl: NavController) {
    this.storage.get('userId').then((storageUserId) => {
      this.userId = storageUserId;
    });
    this.orderForm = this.formBuilder.group({
      "userId":["",Validators.required],
      "muzikAd":["",Validators.required],
      "albumAd": ["",Validators.required],
      "sozMuzik": ["",Validators.required],
      "tur": ["",Validators.required],
      "cikisYili": ["",Validators.required],
      "type": ["",Validators.required],
    });
  }
  ngOnInit() {
  }
  
  submit() {
    let temp = "";
    for(var i=0; i<this.orderForm.value.tur.length; i++){
      temp += this.orderForm.value.tur[i] + ".";
    }
    this.orderForm.value.userId = this.userId;
    this.orderForm.value.type = "music";
    this.orderForm.value.tur = temp;
    console.log(this.orderForm.value);

    this.musicService
      .addMusic(this.orderForm.value)
      .then((response) => {
        status = response["status"];
        //console.log(response);
        this.ToastGet(status);
      }).finally(() => {
        this.navCtrl.navigateRoot("musics");
      })
  }

  async ToastGet(status) {
    let message = "";
    if(status == "success"){
      message = "Kayıt Edildi";
      status = "success";
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
