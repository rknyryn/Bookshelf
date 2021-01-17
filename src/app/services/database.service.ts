import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}

  //KİTAP İŞLEMLERİ
  getBooks(userId) {
    return new Promise((resolve, reject) => {
      let request = this.http.get('http://deneme.enginyenice.shop/index.php?type=book&userId=' + userId).subscribe(
        (book) => {
          //console.log(book);
          resolve(book);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }
  addBook(data){
    var formData = new FormData();
    formData.append('ad', data.kitapAd);
    formData.append('yazar', data.yazarAd);
    formData.append('tur', data.tur);
    formData.append('basimYili', data.basimYili);
    formData.append('yayinEvi', data.yayinevi);
    formData.append('sayfaSayisi', data.sayfaSayisi);
    formData.append('dil', data.dil);
    formData.append('userId', data.userId);
    formData.append('type', data.type);
    return new Promise((resolve, reject) => {
      let request = this.http.post('http://deneme.enginyenice.shop/',formData).subscribe(
        (book) => {
          resolve(book);
          //console.log(book);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }
  deleteBook(userId, bookId) {
    return new Promise((resolve, reject) => {
      let request = this.http.get('http://deneme.enginyenice.shop/?RemoveId=' + bookId +'&RemoveUserId='+ userId + '&RemoveType=book').subscribe(
        (book) => {
          //console.log(book);
          resolve(book);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }

  //FİLM İŞLEMLERİ
  getMoives(userId) {
    return new Promise((resolve, reject) => {
      let request = this.http.get('http://deneme.enginyenice.shop/index.php?type=movie&userId=' + userId).subscribe(
        (book) => {
          //console.log(book);
          resolve(book);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }
  addMovie(data){
    var formData = new FormData();
    formData.append('ad', data.filmAd);
    formData.append('yonetmen', data.yonetmenAd);
    formData.append('senarist', data.senaristAd);
    formData.append('tur', data.tur);
    formData.append('yapimYili', data.yapimYili);
    formData.append('sure', data.sure);
    formData.append('userId', data.userId);
    formData.append('type', data.type);
    return new Promise((resolve, reject) => {
      let request = this.http.post('http://deneme.enginyenice.shop/',formData).subscribe(
        (movie) => {
          resolve(movie);
          //console.log(movie);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }
  deleteMovie(userId, movieId) {
    return new Promise((resolve, reject) => {
      let request = this.http.get('http://deneme.enginyenice.shop/?RemoveId=' + movieId +'&RemoveUserId='+ userId + '&RemoveType=movie').subscribe(
        (movie) => {
          //console.log(book);
          resolve(movie);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }

  //MÜZİK İŞLEMLERİ
  getMusics(userId) {
    return new Promise((resolve, reject) => {
      let request = this.http.get('http://deneme.enginyenice.shop/index.php?type=music&userId=' + userId).subscribe(
        (music) => {
          //console.log(music);
          resolve(music);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }
  addMusic(data){
    var formData = new FormData();
    formData.append('ad', data.muzikAd);
    formData.append('albumAd', data.albumAd);
    formData.append('sozMuzik', data.sozMuzik);
    formData.append('tur', data.tur);
    formData.append('cikisYili', data.cikisYili);
    formData.append('userId', data.userId);
    formData.append('type', data.type);
    return new Promise((resolve, reject) => {
      let request = this.http.post('http://deneme.enginyenice.shop/',formData).subscribe(
        (music) => {
          resolve(music);
          //console.log(music);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }
  deleteMusic(userId, musicId) {
    return new Promise((resolve, reject) => {
      let request = this.http.get('http://deneme.enginyenice.shop/?RemoveId=' + musicId +'&RemoveUserId='+ userId + '&RemoveType=music').subscribe(
        (music) => {
          console.log(music);
          resolve(music);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }

  //KULLANICI İŞLEMLERİ
  addUser(data){
    var formData = new FormData();
    formData.append('username', data.kullaniciAdi);
    formData.append('password', data.sifre);
    formData.append('register', data.register);
    return new Promise((resolve, reject) => {
      let request = this.http.post('http://deneme.enginyenice.shop/',formData).subscribe(
        (user) => {
          resolve(user);
          //console.log(user);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }

  controlUser(data){
    var formData = new FormData();
    formData.append('username', data.kullaniciAdi);
    formData.append('password', data.sifre);
    formData.append('login', data.login);
    return new Promise((resolve, reject) => {
      let request = this.http.post('http://deneme.enginyenice.shop/',formData).subscribe(
        (user) => {
          resolve(user);
          //console.log(user);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }

  getUserName(userId){
    return new Promise((resolve, reject) => {
      let request = this.http.get('http://deneme.enginyenice.shop/?getUsername=' + userId).subscribe(
        (userName) => {
          //console.log(userName);
          resolve(userName);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }

  editUser(data){
    var formData = new FormData();
    formData.append('userId', data.userId);
    formData.append('password', data.sifre);
    formData.append('edit', data.edit);
    return new Promise((resolve, reject) => {
      let request = this.http.post('http://deneme.enginyenice.shop/',formData).subscribe(
        (user) => {
          resolve(user);
          console.log(user);
        },
        (e) => {
          reject(e);
        }, () => {
          request.unsubscribe();
        }
      );
    });
  }
}
