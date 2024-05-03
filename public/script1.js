var square = document.getElementsByClassName('square');

for(var i = 0; i<square.length; i++){
  square[i].addEventListener('mouseenter', function(){
    this.classList.add("rubberBand");
    this.addEventListener("animationend", function(){
      this.classList.remove("rubberBand");
    }, false);
  })
}