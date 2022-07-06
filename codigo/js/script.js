let icon = document.getElementById('icon');
let closeIcon = document.querySelector('.btn-fechar');


icon.addEventListener('click', ()=>{
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
});

closeIcon.addEventListener('click', ()=>{
    document.getElementById('side-menu').style.width = '0px';
    document.getElementById('main').style.marginLeft = '0px';
});