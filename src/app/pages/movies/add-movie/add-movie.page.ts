import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  orderForm: FormGroup;
  public userId;

  constructor(public formBuilder: FormBuilder, public movieService: DatabaseService, 
    public toastController: ToastController,private storage: Storage, public navCtrl: NavController) {
      this.storage.get('userId').then((storageUserId) => {
        this.userId = storageUserId;
      });
    this.orderForm = this.formBuilder.group({
      "userId":["",Validators.required],
      "filmAd":["",Validators.required],
      "yonetmenAd": ["",Validators.required],
      "senaristAd": ["",Validators.required],
      "tur": ["",Validators.required],
      "yapimYili": ["",Validators.required],
      "sure": ["",Validators.required],
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
    this.orderForm.value.type = "movie";
    this.orderForm.value.tur = temp;
    console.log(this.orderForm.value);

    this.movieService
      .addMovie(this.orderForm.value)
      .then((response) => {
        status = response["status"];
        //console.log(response);
        this.ToastGet(status);
      }).finally(() => {
        this.navCtrl.navigateRoot("movies");
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
