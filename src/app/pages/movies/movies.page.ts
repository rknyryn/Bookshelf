import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  public movies;
  public userId = -1;
  constructor(public movieService: DatabaseService, public toastController: ToastController, 
    private storage: Storage, public alertController: AlertController) { }

  ngOnInit() {
    this.getMovies();
  }

  
  getMovies(){
    this.storage.get('userId').then((storageUserId) => {
      this.userId = storageUserId;
    }).then(() => {
      this.movieService.getMoives(this.userId).then(movies => {
        this.movies = movies;
      });
    });
  }

  deleteMovie(movieId: number){
    this.movieService.deleteMovie(this.userId, movieId).then((response) => {
      status = response["status"];
      const description = "Film Silindi";
      this.ToastGet(description, status);
      this.getMovies();
    });
  }

  async ToastGet(message, status) {

    status = (status == "success")? "success":"danger";
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: status,
      position: 'top',
    });
    toast.present();
  }

  doRefresh(event) {
    this.getMovies();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  async alert(movies) {
    const alert = await this.alertController.create({
      header: 'Detaylar',
      message: '<h6>Film Adı: ' + movies["ad"] + '</h6>' + 
      '<h6>Adı: ' + movies["yonetmen"] + '</h6>' +
      '<h6>Senarist: ' + movies["senarist"] + '</h6>' + 
      '<h6>Tür: ' + movies["tur"] + '</h6>' +
      '<h6>Yapım Yılı: ' + movies["yapimYili"] + '</h6>' +
      '<h6>Süre(dakika): ' + movies["sure"] + '</h6>',
      buttons: ['Kapat']
    });

    await alert.present();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
        this.movies.forEach(item => {
        const shouldShow = ( item["ad"].toLowerCase().indexOf(query) > -1  
        ||  item["yonetmen"].toLowerCase().indexOf(query) > -1 
        ||  item["senarist"].toLowerCase().indexOf(query) > -1
        ||  item["yapimYili"].toLowerCase().indexOf(query) > -1
        ||  item["tur"].toLowerCase().indexOf(query) > -1)
        item["display"] = shouldShow ? 'block' : 'none';
        //console.log(item["ad"] + " " + item["display"]);
      });
    });
  }
}
