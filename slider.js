function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
        total.textContent = `0${slides.length}`;
    } else {
        current.textContent = slideIndex;
        total.textContent = slides.length;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width; //на случай если слайды разной ширины, подстроим их под размер нашего окошка
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'), //order list
        dotsOpacity = [];
    dots.classList.add('carousel-dots');

    dots.style.cssText = `
       position: absolute;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: 15;
       display: flex;
       justify-content: center;
       margin-right: 15%;
       margin-left: 15%;
       list-style: none;
   `;

    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
           box-sizing: content-box;
           flex: 0 1 auto;
           width: 30px;
           height: 6px;
           margin-right: 3px;
           margin-left: 3px;
           cursor: pointer;
           background-color: #fff;
           background-clip: padding-box;
           border-top: 10px solid transparent;
           border-bottom: 10px solid transparent;
           opacity: .5;
           transition: opacity .6s ease;
       `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsOpacity.push(dot);
    }

    function currentSlide() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function opacityDots() {
        dotsOpacity.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dotsOpacity[slideIndex - 1].style.opacity = 1;
    }

    function modToNum(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == modToNum(width) * (slides.length - 1)) { //уходим от текстового значения ширины в пикселях
            offset = 0;
        } else {
            offset += modToNum(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlide()
        opacityDots()
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = modToNum(width) * (slides.length - 1);
        } else {
            offset -= modToNum(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlide()
        opacityDots()
    });

    dotsOpacity.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = modToNum(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlide()
            opacityDots()
        });
    });
}

export default slider;