//this debounce function controls the speed with which window.addEventListener fires
//without using "wait" to slow the firing down to every 20ms like below
//it would fire way more often and slow the whole page down
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

//select images
const sliderImages = document.querySelectorAll('.slide-in');

//function that runs every time the person scrolls
function checkSlide() {
    //loop over all images with a forEach
    //for each slider image we want to fire the move when its element is 50% visible
    sliderImages.forEach(sliderImage => {
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        //this handles when you scroll back UP:
        const imageBottom = sliderImage.offsetTop + sliderImage.height;

        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if(isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}

//listen for the scroll - and "debounce" the results before calling checkSlide function
window.addEventListener('scroll', debounce(checkSlide));