var sgun;
var sgunid;
gunlist = document.getElementById('gunlist');
for(guntype in guns){
    gunlist.innerHTML += '<li data-role="list-divider">'+guns[guntype]['name']+'</li>';
    for(gun in guns[guntype]['guns']){
        gunlist.innerHTML += '<li><a href="#gun" data-transition="slide" onclick="changegun(' + "'" + gun + "', '" + guntype + "'" + ')">'+guns[guntype]['guns'][gun]['name']+'</a></li>';
    }
}

function changegun(gun, guntype){
    sgun = guns[guntype]['guns'][gun];
    sgunid = gun;
    for(index in document.getElementsByClassName('gunname')){
        document.getElementsByClassName('gunname')[index].innerHTML = sgun['name'];
    }
    for(var i = 0 ; i < 2 ; i++){
        document.getElementsByClassName('gunpng')[i].src = 'img/' + sgunid + '.png'
    }
    if(sgun['type'] == 'auto'){
        $("#shootbtn").bind('touchstart', function(){
            intervalId = setInterval(shoot(), 60000/sgun['rpm']);
        }).bind('touchend', function(){
            clearInterval(intervalId);
        });
    }
    for(stat in sgun['stats']){
        if(document.getElementById(stat)){
            document.getElementById(stat).innerHTML = "";
            for(i = 0 ; i < sgun['stats'][stat]; i++){
                document.getElementById(stat).innerHTML += "<img class='square' src='img/white.png'>";
            }
            for(i = 0; i < 20 - sgun['stats'][stat]; i++){
                document.getElementById(stat).innerHTML += "<img class='square' src='img/black.png'>";
            }
        }
    }
    useammo('load');
}

function useammo(param){
    if(!localStorage[sgunid]){
        reload();
    }
    else{
        if(param=='shoot'){
            localStorage[sgunid]--;
        }
    }
    document.getElementById('ammo').innerHTML = localStorage[sgunid] + '/' + sgun['stats']['ammo'];
}

function shoot(){
    if(localStorage[sgunid] > 0){
        if(sgun['type'] == 'burst'){
            gunsound();
            for(var i = 0 ; i < sgun['amount'] ; i++){
                useammo('shoot');
            }
        }
        else{
            gunsound();
            useammo('shoot');
        }
        document.getElementById('gunimage').style.webkitTransform = 'rotate(10deg)';
        document.getElementById('gunimage').style.webkitTransform = 'rotate(0)';

    }
}

function reload(){
    localStorage[sgunid] = sgun['stats']['ammo'];
    document.getElementById('ammo').innerHTML = localStorage[sgunid] + '/' + sgun['stats']['ammo'];
    audio = new Audio('snd/'+sgunid+'/reload.wav');
    audio.play();
}

function gunsound(){
    audio = new Audio('snd/'+sgunid+'/pewpew.wav');
    audio.play();
}

function resizeimg(img){
    img.className = "gunpng";

    if (img.naturalHeight/img.naturalWidth <= screen.height/screen.width){
        img.className += " horizontal";
    }
    else{
        img.className += " vertical";
    }
}