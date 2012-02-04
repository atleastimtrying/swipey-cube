window.onload = function(){
  var container = document.getElementsByTagName("body")[0]; //could be any element
  var display = document.getElementsByTagName("section")[0]; //could be any element
  var touched = false; // a useful flag for restructing otehr actions
  var X = 0; // the amount we increment
  var Y = 0;

  var addRotateTouches = function(){
    container.addEventListener("touchstart", rotateStart ,false);
    container.addEventListener("touchmove", rotateMove ,false);
    container.addEventListener("touchend", rotateEnd ,false);
  }

  var removeRotateTouches = function(){
    container.removeEventListener("touchstart", rotateStart ,false);
    container.removeEventListener("touchmove", rotateMove ,false);
    container.removeEventListener("touchend", rotateEnd ,false);
  }

  var rotateStart = function(){
    touched = true;
    startX = window.Touch ? event.touches[0].pageX : event.pageX;
    startY = window.Touch ? event.touches[0].pageY : event.pageY;
    event.preventDefault();
  }
  
  var rotateMove = function(event){
    event.preventDefault();
    var newX = (window.Touch ? event.touches[0].pageX : event.pageX);
    var curX = newX - startX;
    var deltaX = parseInt(curX);
    startX = newX;
    X += deltaX;
    X = (((X % 360) + 360) % 360);// a modulus fix.

    var newY = (window.Touch ? event.touches[0].pageY : event.pageY);
    var curY = newY - startY;
    var deltaY = parseInt(curY);
    startY = newY;
    Y += deltaY;
    Y = (((Y % 360) + 360) % 360);// a modulus fix.

    display.style.webkitTransform = "rotateY(" + X + "deg) rotateX(" + Y + "deg)";
  }
  var rotateEnd = function(){
    touched = false;
  }
  addRotateTouches();
};