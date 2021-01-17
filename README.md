# Bookshelf
Kişilerin kitaplıklarında bulunan; kitap, film ve müzikleri kayıt
edebileceği ve kayıtlarını listeleyerek sahip olduklarını 
görüntüleyebileceği bir mobil uygulama.
(fotoğraflar)

## Nasıl Çalıştırılır
Dosya klasörü içerisinde:
Öncelikle gerekli paketlerin kurulumu için;

``npm install``

Uygulamayı web üzerinde çalıştırmak için;

``ionic serve``


## Uygulamanın Geliştirilmesi ve Kullanımı
Tüm veritabanları işlemlerini gerçekleştirmek için php api kullanılmıştır.
Veritabanına erişmek için "database" adında oluşturulan bir service kullanılmıştır.
Service içerisindeki fonksiyonlar: 
### Kitap İşlemleri
``getBooks(userId) {..} ``

``addBook(data) {..}``

``deleteBook(userId, bookId) {..}``
### Film İşlemleri
``getMoives(userId) {..} ``

``addMovie(data) {..}``

``deleteMovie(userId, movieId) {..}``
### Müzik İşlemleri
``getMusics(userId) {..} ``

``addMusic(data) {..}``

``deleteMusic(userId, musicId) {..}``
### Kullanıcı İşlemleri
``addUser(data) {..} ``

``controlUser(data) {..}``

``getUserName(userId) {..}``

``editUser(data) {..}``

## Login Page
Kullanıcının, kullanıcı adı ve şifresi ile giriş yaptığı zaman;
eğer hesap bulunuyorsa kullanıcı id'sini geri döndüren, eğer hesap bulunmuyorsa
false değeri döndüren bir yapı oluşturulmuştur. Kullanıcı id'si kullanıcının
kayıtlarını(kitap/film/müzik) almak için kullanılmaktadır.
	Başarılı giriş yapan kullanıcılar kitaplar sayfasına yönlendirilir.

## Register Page
Kullanıcıdan; kullanıcı adı, şifre ve şifre tekrarını alarak, öncelikle
şifrelerin aynı olduğunu kontrol ediliyor, ardından kullanıcı veritabanına ekleniyor.
Veriler formGroup kullanılarak alınıyor ve işlemler gerçekleştiriliyor.

## Sayfalar
Sayfalar içerisinde temel olarak aynı işlemler gerçekleşmektedir, sadece içerik değişmektedir.
Örnek bir sayfa:
### Kitaplar
Kullanıcının kayıt etmiş olduğu kitapların listelendiği bir sayfa ve kitap
ekleme sayfasına sahip.Listelenen kitapların detaylarını görmek için kitapların
üzerine tıklanabilir. 

![Details](https://raw.githubusercontent.com/rknyryn/Bookshelf/main/imgs/details.png)


Kitap silmek için; silinecek kitap sola kaydırılıdığında
çıkan "Sil" butonu ile silinebilir.

![Delete](https://raw.githubusercontent.com/rknyryn/Bookshelf/main/imgs/delete.png)

Kitap eklemek için; sayfanın sağ alt kısmında
bulunan butona basılarak kitap ekleme sayfasına erişilebilir. Gerekli alanlar 
doldurulduktan sonra "Kaydet" butonuna basılarak kayıt gerçekleştirilir.

![Save](https://github.com/rknyryn/Bookshelf/blob/main/imgs/addBook.png?raw=true)

Liste aşağı çekilerek yenilenebilir.

![Refresh](https://github.com/rknyryn/Bookshelf/blob/main/imgs/refresh.png?raw=true)
