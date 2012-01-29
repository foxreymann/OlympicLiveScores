console.log('a.js');

document.addEventListener("deviceready", function () {
    console.log('deviceready')
    start();
 }, false);

setTimeout (function() { 
    start();
    console.log('timeout'); 
}, 2000 );
