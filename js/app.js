App = function(){
  var container = document.getElementsByTagName("body")[0]; //could be any element
  var display = document.getElementsByTagName("section")[0]; //could be any element
  var sides = document.getElementsByTagName("div");
  var touched = false; // a useful flag for restructing otehr actions
  var startX = 0;
  var startY = 0;
  var X = 0; // the amount we increment
  var Y = 0;

  var addSpansToSide = function(side){
    for(var i = 0; i < Math.ceil(Math.random()*100); i++){
      var span = document.createElement("span");
      var xRotation = Math.ceil(Math.random()*90);
      var x = Math.ceil(Math.random()*100);
      var z = Math.ceil(Math.random()*100);
      
      span.style.height = Math.random()*40+ "px";
      span.style.width = Math.random()*100+ "px";
      span.style.webkitTransform = " translate3d(" + x + "px,0px," + z + "px) rotateY(90deg) rotateX(" + xRotation + "deg)";
      side.appendChild(span);
    }
  };
  
  var eachSide = function(func){
    for(var i = 0; i < sides.length; i++){
      func(sides[i]);
    }
  };

  var addRotateMouse = function(){
    container.addEventListener("mousedown", rotateStart ,false);
    container.addEventListener("mousemove", rotateMove ,false);
    container.addEventListener("mouseup", rotateEnd ,false);
  };

  var removeRotateTouches = function(){
    container.removeEventListener("touchstart", rotateStart ,false);
    container.removeEventListener("touchmove", rotateMove ,false);
    container.removeEventListener("touchend", rotateEnd ,false);
  };

  var rotateStart = function(){
    touched = true;
    startX = window.Touch ? event.touches[0].pageX : event.pageX;
    startY = window.Touch ? event.touches[0].pageY : event.pageY;
    event.preventDefault();
  };

  var rotateMove = function(event){
    event.preventDefault();
    var newX = (window.Touch ? event.touches[0].pageX : event.pageX);
    var newY = (window.Touch ? event.touches[0].pageY : event.pageY);
    
    var curX = newX - startX;
    var deltaX = parseInt(curX);
    startX = newX;
    X += deltaX;
    X = (((X % 360) + 360) % 360);// a modulus fix.

    var curY = newY - startY;
    var deltaY = parseInt(curY);
    startY = newY;
    Y += deltaY;
    Y = (((Y % 360) + 360) % 360);// a modulus fix.
    updateRotation();
  };

  var updateRotation = function(){
    display.style.webkitTransform = "rotateY(" + X + "deg) rotateX(" + Y + "deg)";
  };

  var rotateEnd = function(){
    touched = false;
  };
  
  var init = function(){
    eachSide(addSpansToSide);
    window.Touch ? addRotateTouches() : addRotateMouse();
  }();

};

window.onload = function(){
  window.app = new App();
};