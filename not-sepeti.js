const yeniGorev = document.querySelector('.form-text');
const yeniGorevBtn = document.querySelector('.form-btn');
const gorevler= document.querySelector('.gorevler');

yeniGorevBtn.addEventListener('click', gorevEkle);
gorevler.addEventListener('click',gorevGuncelle);

document.addEventListener('DOMContentLoaded', localStorageOku);


function gorevEkle(e){
    e.preventDefault();

    if (yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);
        //localstoragea kaydet
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';
    } else {
        alert('Boş görev tanımı olmaz');
    }
    
};

function gorevGuncelle(e){
    const tiklanilanEleman = e.target;

    if (e.target.classList.contains('fa-check-square')) {
        // console.log('checked tıklandı');
        tiklanilanEleman.parentElement.classList.toggle('gorev-cizili');
    }
    if (e.target.classList.contains('fa-trash-alt')) {
        // console.log('delete tıklandı');
       
        if (confirm('are you sure')) {
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);            
            
        //animasyon bittikten sonra remove et diyoruz
        tiklanilanEleman.parentElement.addEventListener('transitionend',() => tiklanilanEleman.parentElement.remove());
        // tiklanilanEleman.parentElement.remove();
        }
    }
};


function localStorageArrayeDonustur() {
    let gorevler;

    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;
}


function localStorageKaydet(yeniGorev) {
    let gorevler = localStorageArrayeDonustur();
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function gorevItemOlustur(gorev){
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');


    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-item-li');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);
    //oluşturduğumuz divi gorevler genel divinin içine ekliyoruz
    gorevler.appendChild(gorevDiv);

    //tamamlandi butonu ekleme
    const tamamlandiBtn = document.createElement('i');
    tamamlandiBtn.classList.add('gorev-icon');
    tamamlandiBtn.classList.add('icon-tamamlandi');
    tamamlandiBtn.classList.add('far');
    tamamlandiBtn.classList.add('fa-check-square');
    gorevDiv.appendChild(tamamlandiBtn);

    //silme butonu ekleme
    const silBtn = document.createElement('i');
    silBtn.classList.add('gorev-icon');
    silBtn.classList.add('icon-sil');
    silBtn.classList.add('far');
    silBtn.classList.add('fa-trash-alt');
    gorevDiv.appendChild(silBtn);
};

function localStorageOku(){
    let gorevler = localStorageArrayeDonustur();

    gorevler.forEach(gorev => gorevItemOlustur(gorev));
};

function localStorageSil(gorev) {
    let gorevler = localStorageArrayeDonustur();

    //splice ile item sil
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    gorevler.splice(silinecekElemanIndex,1);

    localStorage.setItem('gorevler',JSON.stringify(gorevler));
}