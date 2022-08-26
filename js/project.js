var fgImage = null;
var canvas1;
var canvas2;
var bgImage = null;


function forImg(){
    canvas1 =document.getElementById('can1');
    var imgFile = document.getElementById('forgimg');
    fgImage = new SimpleImage(imgFile);
    fgImage.drawTo(canvas1);
}

function bacImg(){
    canvas2 = document.getElementById('can2');
    var imgFile1 = document.getElementById('backimg');
    bgImage = new SimpleImage(imgFile1);
    bgImage.drawTo(canvas2);
}




// function patch(){
//     var output = new SimpleImage(fgImage.getwidth(),fgImage.getHeight());
//     var greenThreshold = 240;
//     for(var pixel of fgImage.values()){
//         var x= pixel.getX();
//         var y = pixel.getY();
//         if (pixel.getGreen() > greenThreshold){
//             var bgPixel = bgImage.getPixel(x,y);
//             output.setPixel(x,y,bgPixel);
//         }
//         else{
//             output.setPixel(x,y,pixel);
//         }
//     }
//     return output;
// }
function patch() {
    
    var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
    var greenThreshold = 240;
    for (var pixel of fgImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      if (pixel.getGreen() > greenThreshold) {
        
          var bgPixel = bgImage.getPixel(x,y);
          output.setPixel(x,y,bgPixel);
      }
      else {
        
        output.setPixel(x,y,pixel);
      }
    }
    return output;
}
  

function greenScreen(){
    if(fgImage == null || !fgImage.complete() ){
        alert("foreground image not loaded properly");
        return;
    }
    if (bgImage == null || !bgImage.complete()){
        alert("background image not loaded properly");
        return;
    }
    clearImages();
    var result = patch();
    result.drawTo(canvas1);

}

function clearImages(){
    clearScreen(canvas1);
    clearScreen(canvas2);
}

function clearScreen(canvas){
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
