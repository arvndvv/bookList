function navClicked(id){
document.querySelector('.book__header__nav__item--active').classList.remove('book__header__nav__item--active');

document.querySelector(`#${id}`).classList.add('book__header__nav__item--active');
if(id=='listBookNav'){
    listBooks();
    document.querySelector('#booklist').classList.remove('hide');
}
else{
    document.querySelector('#booklist').classList.add('hide');

}
}

function addBook(){
    let title=document.querySelector('#name');
    let author=document.querySelector('#author');
    let price=document.querySelector('#price');
    let desc=document.querySelector('#desc');
    if(title.value=='' || author.value==''|| price.value==0 ||desc.value==''){
        console.log('invalid input');
        document.querySelector('.error').classList.remove('hide');
       let errorMsgHideInterval= setInterval(() => {
        document.querySelector('.error').classList.add('hide');
            clearInterval(errorMsgHideInterval)
        }, 1200);
        return;
    }
    let bookObj={title:title.value,author:author.value,price:price.value,desc:desc.value}
    let ls=JSON.parse(localStorage.getItem('books'));
    let payload=ls&&ls.length?[...ls,bookObj]:[bookObj];
    localStorage.setItem('books',JSON.stringify(payload));
    title.value=author.value=price.value=desc.value='';
    navClicked('listBookNav')

}

function listBooks(){
    document.querySelector('#booklist').innerHTML='';
    ls=JSON.parse(localStorage.getItem('books'));
    if(ls&&ls.length){
        ls.forEach(book=>{
            let card=document.createElement('span');
            card.setAttribute('class','card');
            let title=document.createElement('span');
            title.setAttribute('class','card__title');
            title.textContent=book.title;
            let author=document.createElement('span');
            author.setAttribute('class','card__author');
            author.textContent=`By: ${book.author}`;
            let desc=document.createElement('span');
            desc.setAttribute('class','card__desc');
            desc.textContent=book.desc;
            let price=document.createElement('span');
            price.setAttribute('class','card__price');
            price.textContent=`₹ ${book.price}`;
            console.log(card,title,author);
            card.append(title,author,desc,price);
            document.querySelector('#booklist').appendChild(card);
        })


    }
   
}

