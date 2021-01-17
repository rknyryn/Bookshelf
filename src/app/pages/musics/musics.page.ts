import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-musics',
  templateUrl: './musics.page.html',
  styleUrls: ['./musics.page.scss'],
})
export class MusicsPage implements OnInit {
  public musics;
  public userId = -1;
  constructor(public musicService: DatabaseService, private storage: Storage, public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.getMusics();
  }

  getMusics(){
    this.storage.get('userId').then((storageUserId) => {
      this.userId = storageUserId;
    }).then(() => {
      this.musicService.getMusics(this.userId).then(musics => {
        this.musics = musics;
      });
    })
  }

  deleteMusic(musicId: number){
    this.musicService.deleteMusic(this.userId, musicId).then((response) => {
      status = response["status"];
      this.getMusics();
      this.ToastGet(status);
    });
  }

  async ToastGet(status) {
    let message = "";
    if(status == "success"){
      message = "Kayıt Silindi";
      status = "success";
    }
    else{
      message = "Kayıt Silinemedi";
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

  doRefresh(event) {
    this.getMusics();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  async alert(music) {
    const alert = await this.alertController.create({
      header: 'Detaylar',
      message: '<h6>Albüm Adı: ' + music["albumAd"] + '</h6>' + 
      '<h6>Müzik Adı: ' + music["ad"] + '</h6>' +
      '<h6>Söz/Müzik: ' + music["sozMuzik"] + '</h6>' + 
      '<h6>Tür: ' + music["tur"] + '</h6>' +
      '<h6>Çıkış Yılı: ' + music["cikisYili"] + '</h6>',
      buttons: ['Kapat']
    });

    await alert.present();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
        this.musics.forEach(item => {
        const shouldShow = ( item["ad"].toLowerCase().indexOf(query) > -1  
        ||  item["albumAd"].toLowerCase().indexOf(query) > -1 
        ||  item["sozMuzik"].toLowerCase().indexOf(query) > -1
        ||  item["tur"].toLowerCase().indexOf(query) > -1)
        item["display"] = shouldShow ? 'block' : 'none';
        //console.log(item["ad"] + " " + item["display"]);
      });
    });
  }
}
