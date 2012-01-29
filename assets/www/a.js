console.log('a.js');

String.prototype.supplant = function (o) { 
    return this.replace(/{([^{}]*)}/g, 
        function (a, b) {  
            var r = o[b];
            return typeof r === 'string' ? 
                r : a; 
        }
    ); 
};

document.addEventListener("deviceready", function () {
    console.log('deviceready')
    start();
 }, false);

setTimeout (function() { 
    start();
    console.log('timeout'); 
}, 2000 );
