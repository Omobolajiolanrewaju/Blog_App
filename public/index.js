let thisPage = 1;
let limit = 20;
let list = document.querySelectorAll('.list .card');

function loadItem(){
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((card, key) => {
        if (key >= beginGet && key <= endGet){
            card.style.display = 'block'
        }else {
            card.style.display = 'none'
        }
    })
    listPage()
}
loadItem();
function listPage() {
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML='';
    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPage){
            newPage.classList.add('active')
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);

    }
}
function changePage(i){
    thisPage = i;
    loadItem();
}

list