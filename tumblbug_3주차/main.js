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

const pageAdder = () => {  // 가상 slide를 추가하다 보니, index값이 계속 변함 > realCounter 지정
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

const firstClone = slides[0].cloneNode(true); // firstClone 에 첫번째 페이지 추가
const lastClone = slides[slides.length - 1].cloneNode(true); // lastClone에 마지막 페이지 추가

firstClone.id = 'first-clone'; // id 부여
lastClone.id = 'last-clone';

slide.append(firstClone); // 슬라이드 뒤에 추가 -> 슬라이드 처음에서 prev 했을 때 슬라이드 없기에 가상 슬라이드 생성 
slide.prepend(lastClone); // 슬라이드 앞에 추가 -> 슬라이드 마지막에 next 했을 때 슬라이드 없기에 가상 슬라이드 생성

const slideWidth = slides[index].clientWidth;  // 사이즈 뽑기

//slide.style.transform = `translateX(${-slideWidth * index}px)`; // 슬라이드 넘어갈때마다 x축으로 해당index * width 이동

const startSlide = () =>{  // 슬라이드 시작
    slideId = setInterval(() =>{
        // index++;
        // slide.style.transform = `translateX(${-slideWidth * index}px)`; 
        // slide.style.transition = '.8s';
        moveToNextSlide()
    }, interval) // interval 초마다 setInterval 
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

const moveToNextSlide = () =>{ //
            slides = document.querySelectorAll('.slide');
            if(index >= slides.length - 1) return; // 빠르게 넘기면 다음 슬라이드 멈추는 것 방지하기 위해 return 
        index++;    // 다음 슬라이드에서 index++
        pageAdder(); // 해당 index에 맞는 pageInfo Object에서 적용
        
        slide.style.transform = `translateX(${-slideWidth * index}px)`;  // 넘어갈 때 x축으로 해당index * width 이동
        slide.style.transition = '.3s'; // 트랜지션 0.3초
}

const moveToPrevSlide = () =>{
            if(index <= 0) return; // 빠르게 넘기면 다음 슬라이드 멈추는 것 방지하기 위해 return
        index--;
        pageAdder(); // 해당 index에 맞는 pageInfo Object에서 적용
        
        slide.style.transform = `translateX(${-slideWidth * index}px)`;  // same
        slide.style.transition = '.3s'; // .3초 트랜지션
}

slideContainer.addEventListener('mouseenter', ()=>{ // 마우스가 slider안에 있을 때 
    clearInterval(slideId); // setInterval 중지
})

slideContainer.addEventListener('mouseleave', startSlide); // 마우스가 밖에 있을 때 다시 startSlide

nextBtn.addEventListener('click', moveToNextSlide); // next btn 클릭
 
prevBtn.addEventListener('click', moveToPrevSlide); // prev btn 클릭

startSlide();
