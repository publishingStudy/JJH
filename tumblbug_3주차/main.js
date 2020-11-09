const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 1000;
const page = document.getElementById('page');

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId; 

const pageAdder = () => {
    page.innerHTML = `${index}/5`
}

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone); // 뒤에 추가
slide.prepend(lastClone); // 앞에 추가

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () =>{
    slideId = setInterval(() =>{
        // index++;
        // slide.style.transform = `translateX(${-slideWidth * index}px)`; 
        // slide.style.transition = '.8s';
        moveToNextSlide()
    }, interval)
}

const getSlides = () => {
    return document.querySelectorAll('.slide');
}

slide.addEventListener('transitionend', ()=>{
        slides = getSlides();
    if(slides[index].id === firstClone.id){
        slide.style.transition = 'none'; 
        index = 1;   
        slide.style.transform = `translateX(${-slideWidth * index}px)`
    }
    if(slides[index].id === lastClone.id){
        slide.style.transition = 'none'; 
        index = slides.length-2;   
        slide.style.transform = `translateX(${-slideWidth * index}px)`
    }
});

const moveToNextSlide = () =>{
        pageAdder();
            slides = document.querySelectorAll('.slide');
            if(index >= slides.length - 1) return;
        index++;
        slide.style.transform = `translateX(${-slideWidth * index}px)`; 
        slide.style.transition = '.8s';
}

const moveToPrevSlide = () =>{
        pageAdder();
            if(index <= 0) return;
        index--;
        slide.style.transform = `translateX(${-slideWidth * index}px)`; 
        slide.style.transition = '.8s';
}

slideContainer.addEventListener('mouseenter', ()=>{
    clearInterval(slideId);
    
})

slideContainer.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', moveToNextSlide);

prevBtn.addEventListener('click', moveToPrevSlide);

startSlide();

