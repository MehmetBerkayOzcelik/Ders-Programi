
    // Kaydedilen dersler icin dizi olusturdum
    var kaydedilenDersler = [];
    

    // sayfa yuklendiginde localstorage a kaydettigimiz dersleri yukluyoruz ( onceden kaydettigimiz dersler)
    window.onload = function() {
        var kaydedilmisDerslerJSON = localStorage.getItem('kaydedilenDersler');
        if (kaydedilmisDerslerJSON) {
            kaydedilenDersler = JSON.parse(kaydedilmisDerslerJSON);
            kaydedilenDersler.forEach(function(ders) {
                ekranaEkle(ders);
            });
        }
    };
    document.getElementById('calismaProgrami').addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller 
        
        // ekranda ki inputlarimizdan gelen verileri degiskene atiyoruz
        var dersAdi = document.getElementById('dersAdi').value;
        var calismaSuresi = parseInt(document.getElementById('calismaSuresi').value);
        var tarihinput = document.getElementById('tarih').value;
        var checkboxinput = document.getElementById('mycheckbox');
        

        // Yeni bir ders nesnesi oluştur
        var yeniDers = {
            dersAdi: dersAdi,
            calismaSuresi: calismaSuresi,
            tarihinput:tarihinput,
            checkboxinput:false
        };
        
        // Dersi ekrana ekle ve yerel depolamada sakla
        ekranaEkle(yeniDers);
        kaydedilenDersler.push(yeniDers);
        localStorage.setItem('kaydedilenDersler', JSON.stringify(kaydedilenDersler));
        // Formu sıfırla
        document.getElementById('calismaProgrami').reset();
        haftalikDersList.style.display="block";
    });

    
    // Yeni dersi ekrana eklemek icin bir fonksiyon
    function ekranaEkle(ders) {

    // tarih inputunu alip farkli degiskenlerle isliyoruz
    var tarih = ders.tarihinput;
    var tarihObj = new Date(tarih);
    var gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    var bugun = gunler[tarihObj.getDay()];
    var gun = tarihObj.getDay();
    var ay = tarihObj.getMonth()+1;
    var yil = tarihObj.getFullYear();


    var yeniLi = document.createElement('li');  // li etiketini olusturuyoruz
    var strong = document.createElement('strong'); // Kalın etiketi olusturuyoruz
    

    strong.textContent = ders.dersAdi; // ders adini kalin yapiyoruz
    yeniLi.appendChild(strong);
        
    // yeni li etiketine yukarida ders adi verdikten sonra kalan bilgileri ekliyoruz
    yeniLi.innerHTML += ' - ' + ders.calismaSuresi + ' dakika '+ bugun + " " + gun +"/"+ ay +"/"+ yil +" ";
    
    // sil butonu olusturuyoruz 
    var silButton = document.createElement('button');
    silButton.textContent = "Sil";
    silButton.className = "silButton";
    silButton.onclick = function () {
        silDers(ders); // silme icin fonksiyon olusturuyoruz
    }
    // duzenle butonu olusturuyoruz
    var duzenleButton = document.createElement('button');
    duzenleButton.textContent = "Duzenle";
    duzenleButton.className="duzenleButton";
    duzenleButton.onclick = function(){
        duzenleDers(ders); // duzenleme icin fonksiyon olusturuyoruz
    }

    // checkbox icin label olusturuyoruz
    var checkboxlabel = document.createElement('label');
    checkboxlabel.className="checkboxlabel";
    checkboxlabel.textContent="Dersi Çalıştıysanız  kutucuğa tıklayın.";
    
   // calisilan dersleri ayirt etmek icin checkbox olusturuyoruz
    var checkbox = document.createElement('input');
    checkbox.className = "mycheckbox";
    checkbox.type = "checkbox";
    checkbox.checked = ders.checkboxinput; // checkboxin true ya da false olma durumunu ayarliyoruz baslangica gore
   
    // checkboxin degisimini dinliyoruz
    checkbox.addEventListener('change', function() {

    calisilanList.style.display="block";   
    ders.checkboxinput = this.checked; // check boxin durumu degistiginde checkboxinputun durumunu degistiriyoruz
    localStorage.setItem('kaydedilenDersler', JSON.stringify(kaydedilenDersler)); // localstorage a set ediyoruz
    refreshKaydedilenDersListesi();
    
    });

    // checkbox in durumu true iste kosul sunuyoruz
    if(checkbox.checked === true){
       let kayit = localStorage.getItem('kaydedilenDersler'); // dersleri kayit degiskeninde gosteriyourz
       let calisilansure = document.getElementById('calisilandk'); 
       let dersler = JSON.parse(kayit); // dersler degiskenine parse ediyoruz kayiti
       var toplam = 0;
        for (let index = 0; index < dersler.length; index++) { // parse ettigimiz verinin uzunlugu kadar donmesini sagliyoruz
                
                if (dersler[index].checkboxinput === true) { //donen degerin sayisina girip checkboxinputu kontrol ediyoruz true ise kosula giriyor
                    let calisilan = dersler[index].calismaSuresi; // donen degerin calisma suresini calisilan degerine atiyoruz
                    toplam += calisilan; // toplayip esitliyoruz degeri
                    calisilansure.textContent = "Toplam Dakika : " + parseInt(toplam);  // ekrana yazdiriyoruz  
                }
              
         }
        // true olan deger oldugu icin calisilan ders listesine ekliyoruz
        calisilanDersListesi.appendChild(yeniLi);
        yeniLi.appendChild(checkboxlabel);
        yeniLi.appendChild(checkbox);
        yeniLi.appendChild(silButton);
        yeniLi.appendChild(duzenleButton);
    }
    else{ // eger degerimiz false ise calisilmamistir bu yuzden haftalara boluyoruz tarih inputundan aldigimiz veri ile
        
     if(bugun === "Pazar"){
    pazarListesi.appendChild(yeniLi);
    yeniLi.appendChild(checkboxlabel);
     yeniLi.appendChild(checkbox);
     yeniLi.appendChild(silButton);
     yeniLi.appendChild(duzenleButton);
    }
    else if(bugun === "Pazartesi"){
    pazartesiListesi.appendChild(yeniLi);
     yeniLi.appendChild(checkboxlabel);
     yeniLi.appendChild(checkbox);
     yeniLi.appendChild(silButton);
     yeniLi.appendChild(duzenleButton);
    }
    else if(bugun === "Salı"){
    saliListesi.appendChild(yeniLi);
     yeniLi.appendChild(checkboxlabel);
     yeniLi.appendChild(checkbox);
     yeniLi.appendChild(silButton);
     yeniLi.appendChild(duzenleButton);
    }
    else if(bugun === "Çarşamba"){
    carsambaListesi.appendChild(yeniLi);
     yeniLi.appendChild(checkboxlabel);
     yeniLi.appendChild(checkbox);
     yeniLi.appendChild(silButton);
     yeniLi.appendChild(duzenleButton);
    }
    else if(bugun === "Perşembe"){
    persembeListesi.appendChild(yeniLi);
     yeniLi.appendChild(checkboxlabel);
     yeniLi.appendChild(checkbox);
     yeniLi.appendChild(silButton);
     yeniLi.appendChild(duzenleButton);
    }
    else if(bugun === "Cuma"){
    cumaListesi.appendChild(yeniLi);
     yeniLi.appendChild(checkboxlabel);
     yeniLi.appendChild(checkbox);
     yeniLi.appendChild(silButton);
     yeniLi.appendChild(duzenleButton);
    }
    else if(bugun === "Cumartesi"){
    cumartesiListesi.appendChild(yeniLi);
    yeniLi.appendChild(checkboxlabel);
     yeniLi.appendChild(checkbox);
     yeniLi.appendChild(silButton);
     yeniLi.appendChild(duzenleButton);
    }
 }
   
}
    // yukarida tanimladigimiz silme butonunun fonksiyonu
    function silDers(ders){
        var index = kaydedilenDersler.indexOf(ders); // hangi indekste oldugunu buluyoruz
        if (index !== -1) { // -1 degil ise 
            kaydedilenDersler.splice(index, 1); // kaydedilen derslerde ki indeximizin kaldirilacak oge sayisii 1
            localStorage.setItem('kaydedilenDersler',JSON.stringify(kaydedilenDersler));// durumu set ediyoruz
            refreshKaydedilenDersListesi();
        }
    }
    // yukarida tanimladigimiz guncelleme butonunun fonksiyonu
    function duzenleDers(ders) {
         // prompt olarak verileri aliyoruz
    var yeniDersAdi = prompt("Yeni ders adını giriniz:", ders.dersAdi);
    var yeniCalismaSuresi = parseInt(prompt("Yeni çalışma süresini giriniz (dakika):", ders.calismaSuresi));

    // yeni ders bilgilerini guncelliyoruz
    ders.dersAdi = yeniDersAdi;
    ders.calismaSuresi = yeniCalismaSuresi;

    // guncellenen verileri set ediyoruz
    localStorage.setItem('kaydedilenDersler', JSON.stringify(kaydedilenDersler));
    refreshKaydedilenDersListesi();
    }
    // dersleri yenilememiz icin fonksiyon
    function refreshKaydedilenDersListesi() {
    var dersListesi = document.querySelectorAll("li"); // butun dersleri remove edip
    dersListesi.forEach(function (item) {
        item.remove();
    });
    kaydedilenDersler.forEach(function (ders) { // guncel dersleri ekrana ekliyoruz
        ekranaEkle(ders);
    });
}


     var liste = document.getElementById('calisilanDersListesi');
     var observer = new MutationObserver(function(mutations) { // burada calisilan listemizde tik kaldirildiginda textcontentimiz en son cikarilan sayi olarak 
         mutations.forEach(function(mutation) {                // kaliyordu bu yontem ile calisan listemizi 0 olarak kalmasini sagliyoruz
            let calisilansure = document.getElementById('calisilandk'); //    MutationObserver listemizi dinletiyoruz uzunlugu 0 ise harekete geciyor

             if (mutation.target.children.length === 0) {
                calisilansure.textContent = "Toplam Dakika : 0 ";    

             }
         });
     });

     // Observeri <ul> ogesine bagliyoruz
     observer.observe(liste, { childList: true });

    // listelerimizi tiklayarak acmak icin fonksiyonlarimiz
    var haftalikDersList = document.getElementById('haftalikDersProgrami'); 
    var calisilanList = document.getElementById("calisilanDersListesi");
    // listelerimizi tiklayarak acmak icin fonksiyonlarimiz
    function dersProgramiAc(){
        if(haftalikDersList.style.display ==="block"){
            haftalikDersList.style.display="none";
        }
        else{
            haftalikDersList.style.display="block";
        }
        
    }
    // listelerimizi tiklayarak acmak icin fonksiyonlarimiz  
    function calisilanDersAc(){

        if(calisilanList.style.display === "block"){
            calisilanList.style.display = "none";
        }
        else{
            calisilanList.style.display = "block";
        }
    }