/* Loader */
const loader:HTMLElement = document.querySelector('.loader')
var image = new Image();

image.src = getBgUrl(document.querySelector('body'))

image.onload = function () {
    //console.log('Loaded!')
    loader.style.setProperty('animation','close-loader .5s linear 1s 1 forwards')
    setTimeout(()=>{(loader.children[0] as HTMLElement).style.setProperty('opacity','0')},1000)
    setTimeout(()=>{loader.parentElement.style.setProperty('opacity','0')},1500)
    setTimeout(()=>{loader.parentElement.style.setProperty('display','none')},1800)
}
function getBgUrl(el:HTMLElement):string{
    let url:string = document.defaultView.getComputedStyle(el, "").backgroundImage
    return url.replace(/url\(['"]?(.*?)['"]?\)/i, "$1")
}

/* Menu */
var isMenuOpend:boolean = (window.innerWidth > 768) ? true : false
const toggleMenuBtn:HTMLElement = document.querySelector(".navigation__btn--menu")
const navigation:HTMLElement = document.querySelector('.navigation')

const toggleMenu = ()=>{
//function toggleMenu():void {
    if(isMenuOpend){
        if (window.innerWidth >= 768) {
            toggleMenuBtn.style.setProperty("transform","translateX(56px)")
            navigation.style.setProperty("margin-left", "-224px");
        }else{
            toggleMenuBtn.style.setProperty('transform','translateX(-100vw)')
            navigation.style.setProperty('left','100vw')
        }
    }else{
        if (window.innerWidth >= 768) {
            toggleMenuBtn.style.setProperty('transform','translateX(0px)')
            navigation.style.setProperty('margin-left','0px')
        }else{
            toggleMenuBtn.style.setProperty('transform','translateX(0px)')
            navigation.style.setProperty('left','0px')
        }
    }
    isMenuOpend = !isMenuOpend
}
toggleMenuBtn.addEventListener('click',toggleMenu);

window.onresize = ()=>{
    isMenuOpend = (window.innerWidth >= 768) ? false : true;//odwrotnie, bo niżej toggle'uje menu
    toggleMenu()
}

/* Navigation clicks (scrolling to specified section) */
const sections:HTMLCollectionOf<Element> = document.getElementsByClassName('navigation__li')

Array.from(sections).forEach(v=>{
    v.addEventListener('click',()=>{
        const el:HTMLElement = document.getElementById(v.getAttribute('data-dest'))//Property 'dataset' does not exist on type 'Element' 
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
        if (window.innerWidth < 768)
            toggleMenu();
    })
});

/* Selected projects - filling from array, opening modal dialog with specified project (also next & previous) */
const projectsCard:HTMLElement = document.querySelector('.mainView__projects')
interface project {
    name:string;
    description:string;
    url:string;
    imgSrc:string;
    stack:string;
}
// When adding a project also remember to make change in css grid!!
const projectsArr: project[] = [
  {
    name: "PlanThisSh!t",
    url: "http://planthisshit.com",
    imgSrc: "style/project-planthisshit.jpg",
    description:
      "Webapp for creating workout schedules. Also for personal trainers.",
    stack:'AngularJS, Material Design, PHP, MySQL',
  },
  {
    name: "Cyklistator",
    description: "Webapp for creating photo collages.",
    url: "https://serwer1445315.home.pl/cyklisci",
    imgSrc: "style/project-cyklisci.jpg",
    stack:'Angular, Material Design',
  },
  {
    name: "BlendWax",
    description:
      "Web application for djs who prefer vinyl to other medium.",
    url: "https://serwer1445315.home.pl/blendwax",
    imgSrc: "style/project-blendwax.jpg",
    stack:'AngularJS, Material Design, PHP, MySQL',
  },
  {
    name: "SnapshotNiugini",
    description: "Travelling blog and catalogue of commercial trips with CMS for a client.",
    url: "https://snapshotniugini.com",
    imgSrc: "style/project-snapshotniugini.jpg",
    stack:'AngularJS, Material Design, PHP, MySQL',
  },
  {
    name: "BartNapierala",
    description: "Static website for a client.",
    url: "http://bartnapierala.com",
    imgSrc: "style/project-bartnapierala.jpg",
    stack:'HTML, AngularJS, CSS',
  },
  {
    name: "Bart's Mom's Atlas",
    description: "Atlas of regional wildlife with CMS.",
    url: "http://bartnapierala.com/atlas",
    imgSrc: "style/project-atlas.jpg",
    stack:'AngularJS, Material Design, PHP, MySQL',
  },
  {
    name: "Bakajana",
    description: "Travel agency website with CMS.",
    url: "http://bakajana.pl",
    imgSrc: "style/project-bakajana.jpg",
    stack:'Javascript, CSS, PHP, MySQL',
  },
  {
    name: "OptykOsinscy",
    description: "Static website for a client.",
    url: "http://optykosinscy.pl",
    imgSrc: "style/project-optyk.jpg",
    stack:'HTML, JQuery, CSS',
  },
];

// Creating projects card and projects carousel in hidden modal from an array
const carousel:HTMLElement = document.querySelector('.project-details__img-wrpr')
projectsArr.forEach(v => {
    //projects card  
    const projDiv:HTMLElement = document.createElement('div')
    projDiv.className = 'mainView__projects-li'

    const imgWrapper:HTMLElement = document.createElement('div')
    imgWrapper.className = 'mainView__project-imgwrpr'//just for bg-color and mix-blend-mode
    const img:HTMLImageElement = document.createElement('img')
    img.src = v.imgSrc
    img.width = 100
    img.height = 100
    img.loading = 'lazy'
    img.className = 'mainView__project-img'
    imgWrapper.appendChild(img)
    projDiv.appendChild(imgWrapper)

    const description:HTMLElement = document.createElement('div')
    description.className = 'mainView__project-info'
    description.innerHTML = `<span class="mainView__project-title">${v.name}</span><span class="mainView__project-desc">${v.description}</span>`
    projDiv.appendChild(description)

    const bigTransparentButtonCovering:HTMLElement = document.createElement('div')
    bigTransparentButtonCovering.className = 'mainView__project-btn'
    bigTransparentButtonCovering.dataset.name = v.name
    projDiv.appendChild(bigTransparentButtonCovering)
    
    projectsCard.appendChild(projDiv)

    // Animation when in viewport - observer launch
    //projDivAppear.observe(projDiv) // change of plans - instead of observing each projDiv, let's observe projectsCard after this foreach loop

    bigTransparentButtonCovering.addEventListener('click',(e:any)=>{
        openModal(e.target.dataset.name)
    })

    //carousel in modal
    const imgCarousel:HTMLImageElement = document.createElement('img')
    imgCarousel.src = v.imgSrc
    imgCarousel.width = 500
    imgCarousel.height = 500
    imgCarousel.loading = 'lazy'
    imgCarousel.dataset.name=v.name
    imgCarousel.classList.add('project-details__img')
    imgCarousel.classList.add('project-details__img--behind')
    carousel.appendChild(imgCarousel);
})

// Modal
const projectDetailsModal:HTMLElement = document.querySelector('.project-details')
const main:HTMLElement = document.querySelector('.project-details__main')// for animation purposes only (on select project from card)

const closeBtn:HTMLButtonElement = document.getElementById('project-details__close-btn') as HTMLButtonElement
closeBtn.addEventListener('click', ()=>{
    projectDetailsModal.classList.remove('visible')
    setTimeout(()=>{
        projectDetailsModal.style.setProperty('visibility','hidden')
        const kids = main.children
        Array.from(kids).forEach((v, i) => {
            (v as HTMLElement).classList.remove('visible')
        });
    },300)//wait .3s for transitions to end
})

const nextBtn:HTMLButtonElement = document.getElementById('project-details__next-btn') as HTMLButtonElement
nextBtn.addEventListener('click',(e:any)=>{
    openModal(e.target.dataset.name)
})

const previousBtn:HTMLButtonElement = document.getElementById('project-details__previous-btn') as HTMLButtonElement
previousBtn.addEventListener('click',(e:any)=>{
    openModal(e.target.dataset.name)
})

function openModal(title:string):void {

    projectDetailsModal.style.setProperty('visibility','visible')
    projectDetailsModal.classList.add('visible')

    const kidsOfMain = main.children
    Array.from(kidsOfMain).forEach((v,i) => {
        setTimeout(()=>{
            (v as HTMLElement).classList.add('visible')
        },(i+1)*100)
    });

    const kidsOfCarousel = carousel.children
    Array.from(kidsOfCarousel).forEach((v,i) => {
      if( (v as HTMLImageElement).dataset.name === title ){
        v.classList.remove('project-details__img--behind')
      }else{
        v.classList.add('project-details__img--behind')
      }
    })

    let titleEl:HTMLElement = document.querySelector('.project-details__title')
    let descEl:HTMLElement = document.querySelector('.project-details__desc')
    let urlEl:HTMLElement = document.querySelector('.project-details__url')
    //let imgEl:HTMLImageElement = (document.querySelector('.project-details__img') as HTMLImageElement)

    projectsArr.forEach((v,i)=>{
        if (v.name === title) {
          if (i == projectsArr.length - 1) {
            nextBtn.dataset.name = projectsArr[0].name;
            nextBtn.children[0].setAttribute('data-name',projectsArr[0].name)
            previousBtn.dataset.name = projectsArr[i - 1].name;
            previousBtn.children[0].setAttribute('data-name',projectsArr[i - 1].name)
          } else if (i == 0) {
            nextBtn.dataset.name = projectsArr[i + 1].name;
            nextBtn.children[0].setAttribute('data-name',projectsArr[i + 1].name)
            previousBtn.dataset.name = projectsArr[projectsArr.length - 1].name;
            previousBtn.children[0].setAttribute('data-name',projectsArr[projectsArr.length - 1].name)
          } else {
            nextBtn.dataset.name = projectsArr[i + 1].name;
            nextBtn.children[0].setAttribute('data-name',projectsArr[i + 1].name)
            previousBtn.dataset.name = projectsArr[i - 1].name;
            previousBtn.children[0].setAttribute('data-name',projectsArr[i - 1].name)
          }

          titleEl.innerHTML = v.name;
          descEl.innerHTML = v.description + `<br/><span>(Stack: ${v.stack})</span>`;
          urlEl.innerHTML = `<a href="${v.url}" target="_blank">Visit ${v.name}</a>`;
          //imgEl.src = v.imgSrc;
        }
    })
}

/* Text effects in about section */
const spans:NodeListOf<HTMLElement> = document.querySelectorAll('.mainView__about-efx span')
spans.forEach((span,i) => {
  span.addEventListener('mouseenter', () => {// 1st way - via value (first param of foreach loop)
    if(i === 2){
      span.style.setProperty('animation','thiner-font .2s linear forwards')
    } else {
      span.style.setProperty('animation','thicker-font .2s linear forwards')
    }
  })
  span.addEventListener('mouseleave', ev => {// 2nd way - via event
    if(i === 2){
      (ev.target as HTMLElement).style.setProperty('animation','thicker-font .2s linear forwards')
    } else {
      (ev.target as HTMLElement).style.setProperty('animation','thiner-font .2s linear forwards')
    }
  })
})

/* Animations - bservers for animate elements on scroll */
const rootElement = document.querySelector('.mainView')

/* in contact section */
const contactCards:NodeListOf<HTMLElement> = document.querySelectorAll('.mainView__card--contact')
const contactSection:HTMLElement = document.getElementById('contact')//querySelector('.mainView__card--contact')

let options2 = {
  root: rootElement,
  rootMargin: '0px 0px -10px 0px',
  threshold: 0.4
}

let contactAppear = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      contactCards.forEach((card,i) => {
        setTimeout(() => {
          card.classList.add('visible')
        }, i*100)
        setTimeout(() => {
          (card.children[0] as HTMLElement).classList.add('visible');
        }, 600 - (i*100))
        setTimeout(() => {
          (card.children[0].children[0] as HTMLElement).classList.add('visible');
        }, 800 + (i*100))
      })
      //observer.unobserve(entry.target)
    }else{
      contactCards.forEach((card,i) => {
        card.classList.remove('visible');
        (card.children[0] as HTMLElement).classList.remove('visible');
        (card.children[0].children[0] as HTMLElement).classList.remove('visible');
      })
      //return
    }
  })
}, options2);

contactAppear.observe(contactSection)
/* PiggySmalls animation and sound */
const audio:HTMLAudioElement = new Audio('style/piggy.mp3')
const words = [
  {word:'piggy',time:0},
  {word:'piggy',time:300},
  {word:'piggy',time:600},
  {word:"can't",time:1200},
  {word:'you',time:1500},
  {word:'see',time:1800},
  {word:'sometimes',time:2400},
  {word:'your',time:2850},
  {word:'words',time:3000},
  {word:'just',time:3450},
  {word:'hypnotize',time:3600},
  {word:'me',time:4200},
  {word:'',time:5100}
]
let isWordsAnimationOn:boolean = false
contactCards[1].addEventListener('mouseenter', () => {
  if(!isWordsAnimationOn){
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0.5
    audio.play()
    words.forEach((w,i) => {
              
        isWordsAnimationOn = true
        
        setTimeout(() => {
          let animatedWord = document.createElement('div')
          animatedWord.className = 'animated-word'
          animatedWord.innerHTML = w.word
          contactCards[1].children[0].children[0].appendChild(animatedWord)

          isWordsAnimationOn = i < words.length - 1 //true or false

          if(i === words.length - 1) {
            const animatedWords = document.querySelectorAll('.animated-word')
            animatedWords.forEach(word => {
              word.remove()
            })
          }

        }, w.time)
    })
  }
})

/* Experience section - skills and projects */
let options = {
  root: rootElement,
  rootMargin: '0px 0px -10px 0px',
  threshold: 0.3
}
let projectsCardAppear = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      Array.from(projectsCard.children).forEach((prjct,i) => {
        setTimeout(() => {
          (prjct as HTMLElement).classList.add('visible-x');
        }, i*100);
      });
      observer.unobserve(entry.target)
    }else{
      return
    }
  })
}, options);

projectsCardAppear.observe(projectsCard)

const skills = document.querySelectorAll('.mainView__card--skills-li')
/*let skillAppear = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      (entry.target as HTMLElement).style.setProperty('transform','scaleX(1)');
      (entry.target as HTMLElement).style.setProperty('opacity','1')
      observer.unobserve(entry.target)
    }else{
      return
    }
  })
}, options);
//observer for skills launch
skills.forEach(skill =>{
  skillAppear.observe(skill)
}) */

let skillAppear:IntersectionObserver = new IntersectionObserver((entries,observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting)
      return
    else{
      skills.forEach((skillListItem,i) => {
        setTimeout(() => {
          (skillListItem as HTMLElement).classList.add('visible-x');         
        }, i*100);
      })
      observer.unobserve(entry.target)
    }
  });
}, options)
const firstSkillList:HTMLElement = document.querySelector('.mainView__card--skills')
skillAppear.observe(firstSkillList)