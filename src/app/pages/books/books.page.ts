import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController  } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  public books;
  public userId = -1;
  constructor(public bookService: DatabaseService, public toastController: ToastController,
     private storage: Storage, public alertController: AlertController) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this.storage.get('userId').then((storageUserId) => {
      this.userId = storageUserId;
    }).then(() => {
      this.bookService.getBooks(this.userId).then(books => {
        this.books = books;
      });
    });
  }

  deleteBook(bookId: number){
    this.bookService.deleteBook(this.userId, bookId).then((response) => {
      status = response["status"];
      this.ToastGet(status);
      this.getBooks();
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
    this.getBooks();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  async alert(books) {
    const alert = await this.alertController.create({
      header: 'Detaylar',
      message: '<h6>Kitap Adı: ' + books["ad"] + '</h6>' + 
      '<h6>Yazar: ' + books["yazar"] + '</h6>' +
      '<h6>Tür: ' + books["tur"] + '</h6>' + 
      '<h6>Basım Yılı: ' + books["basimYili"] + '</h6>' +
      '<h6>Yayınevi: ' + books["yayinEvi"] + '</h6>' +
      '<h6>Sayfa Sayısı: ' + books["sayfaSayisi"] + '</h6>' +
      '<h6>Dil: ' + books["dil"] + '</h6>',
      buttons: ['Kapat']
    });

    await alert.present();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
        this.books.forEach(item => {
        const shouldShow = ( item["ad"].toLowerCase().indexOf(query) > -1  
        ||  item["yazar"].toLowerCase().indexOf(query) > -1 
        ||  item["yayinEvi"].toLowerCase().indexOf(query) > -1
        ||  item["tur"].toLowerCase().indexOf(query) > -1)
        item["display"] = shouldShow ? 'block' : 'none';
        //console.log(item["ad"] + " " + item["display"]);
      });
    });
  }
}
