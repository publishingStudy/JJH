const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 2000;
const page = document.getElementById('page');
const title = document.getElementById('title-item');
const desc = document.getElementById('desc-item');
const backColor = document.getElementById('card-background');


let pageInfo = [
    {
     pageNum: 1,
     pageColor: '#222222',
     pageTitle: '2030년 마침내<br> 인류최후의 유토피아',
     pageDesc: '전원이 힘을 모아서 기술 중심 유토피아 건설하기',
    },
    {
     pageNum: 2,
     pageColor: '#358EB5',
     pageTitle: '동그란 반지는<br>고정관념이지',
     pageDesc: '창에 비치는 달빛을 모티브로 한 사각 반지',
    },
    {
     pageNum: 3,
     pageColor: '#D77847',
     pageTitle: '성별에 상관없이<br>멋진 우리는',
     pageDesc: '말랑과 샤이엔, 트렌스젠더입니다.',
    },
    {
     pageNum: 4,
     pageColor: '#F3ADAC',
     pageTitle: '발그레한 장미색은<br>어떻게 만들어질까',
     pageDesc: '디자이너가 직접만든 CMYK 컬러배합 맞추기',
    },
    {
     pageNum: 5,
     pageColor: '#2EA68A',
     pageTitle: '500년의 폐기물보다<br>500년의 지구를 위해',
     pageDesc: 'CLAP 3기에서 플라스틱 Free 창작자를 찾습니다',
    }
]

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId; 
let realCounter = 1;


const pageAdder = () => {
    realCounter = index;
    if(realCounter === 6){
        realCounter = 1;
    }
    else if (realCounter === 0){
        realCounter = 5;
    }
    console.log(realCounter);
    page.innerHTML = `${realCounter}/5`;
    title.innerHTML = `${pageInfo[realCounter-1].pageTitle}`;
    desc.innerHTML = `${pageInfo[realCounter-1].pageDesc}`;
    backColor.style.background = `${pageInfo[realCounter-1].pageColor}`;
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
        
            slides = document.querySelectorAll('.slide');
            if(index >= slides.length - 1) return;
        index++;
        pageAdder(); // Here
        
        slide.style.transform = `translateX(${-slideWidth * index}px)`; 
        slide.style.transition = '.3s';
}

const moveToPrevSlide = () =>{
        
        
            if(index <= 0) return;
        index--;
        pageAdder(); // Here
        
        slide.style.transform = `translateX(${-slideWidth * index}px)`; 
        slide.style.transition = '.3s';
}

slideContainer.addEventListener('mouseenter', ()=>{
    clearInterval(slideId);
    
})

slideContainer.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', moveToNextSlide);

prevBtn.addEventListener('click', moveToPrevSlide);

startSlide();
