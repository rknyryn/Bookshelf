import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  orderForm: FormGroup;
  public userId;
  
  constructor(public formBuilder: FormBuilder, 
    public bookService: DatabaseService, 
    public toastController: ToastController,
    private storage: Storage, public navCtrl: NavController) { 
    this.storage.get('userId').then((storageUserId) => {
      this.userId = storageUserId;
    });
    this.orderForm = this.formBuilder.group({
      "userId":["",Validators.required],
      "kitapAd":["",Validators.required],
      "yazarAd": ["",Validators.required],
      "tur": ["",Validators.required],
      "basimYili": ["",Validators.required],
      "yayinevi": ["",Validators.required],
      "sayfaSayisi": ["",Validators.required],
      "dil": ["",Validators.required],
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
    this.orderForm.value.type = "book";
    this.orderForm.value.tur = temp;
    //console.log(this.orderForm.value);

    this.bookService
      .addBook(this.orderForm.value)
      .then((response) => {
        status = response["status"];
        //console.log(response);
        this.ToastGet(status);
      }).finally(() => {
        this.navCtrl.navigateRoot("books");
      });
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
