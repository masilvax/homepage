/* Loader */
const loader = document.querySelector('.loader');
var image = new Image();
image.src = getBgUrl(document.querySelector('body'));
image.onload = function () {
    //console.log('Loaded!')
    loader.style.setProperty('animation', 'close-loader .5s linear 1s 1 forwards');
    setTimeout(() => { loader.children[0].style.setProperty('opacity', '0'); }, 1000);
    setTimeout(() => { loader.parentElement.style.setProperty('opacity', '0'); }, 1500);
    setTimeout(() => { loader.parentElement.style.setProperty('display', 'none'); }, 1800);
};
function getBgUrl(el) {
    let url = document.defaultView.getComputedStyle(el, "").backgroundImage;
    return url.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}
/* Menu */
var isMenuOpend = (window.innerWidth > 768) ? true : false;
const toggleMenuBtn = document.querySelector(".navigation__btn--menu");
const navigation = document.querySelector('.navigation');
const toggleMenu = () => {
    //function toggleMenu():void {
    if (isMenuOpend) {
        if (window.innerWidth >= 768) {
            toggleMenuBtn.style.setProperty("transform", "translateX(56px)");
            navigation.style.setProperty("margin-left", "-224px");
        }
        else {
            toggleMenuBtn.style.setProperty('transform', 'translateX(-100vw)');
            navigation.style.setProperty('left', '100vw');
        }
    }
    else {
        if (window.innerWidth >= 768) {
            toggleMenuBtn.style.setProperty('transform', 'translateX(0px)');
            navigation.style.setProperty('margin-left', '0px');
        }
        else {
            toggleMenuBtn.style.setProperty('transform', 'translateX(0px)');
            navigation.style.setProperty('left', '0px');
        }
    }
    isMenuOpend = !isMenuOpend;
};
toggleMenuBtn.addEventListener('click', toggleMenu);
window.onresize = () => {
    isMenuOpend = (window.innerWidth >= 768) ? false : true; //odwrotnie, bo niżej toggle'uje menu
    toggleMenu();
};
/* Navigation clicks (scrolling to specified section) */
const menuAnchors = document.querySelectorAll('.navigation__a');
menuAnchors.forEach(anchor => {
    anchor.addEventListener('click', (ev) => {
        ev.preventDefault();
        const el = document.getElementById(anchor.dataset.dest);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth < 768)
            toggleMenu();
    });
});
/* Selected projects - filling from array, opening modal dialog with specified project (also next & previous) */
const projectsCard = document.querySelector('.mainView__projects');
// When adding a project also remember to make change in css grid!!
const projectsArr = [
    {
        name: "Kotłownia",
        url: "https://serwer1445315.home.pl/kotlownia",
        imgSrc: "style/project-kotlownia.jpg",
        description: "Environmental sensors for my boiler room.",
        stack: 'Angular 19, Material Design, PHP, MySQL, Arduino IDE, C++, ESP32, LEGO Bricks :D',
    },
    // {
    //   name: "Ogrody Brody",
    //   url: "http://ogrody-brody.pl",
    //   imgSrc: "style/project-planthisshit.jpg",
    //   description:
    //     "Garden landscape designer website with CMS for a client.",
    //   stack:'Angular 17, Ag-Grid, Material Design, PHP, MySQL',
    // },
    {
        name: "PlanThisSh!t",
        url: "http://planthisshit.com",
        imgSrc: "style/project-planthisshit.jpg",
        description: "Webapp for creating workout schedules. Also for personal trainers.",
        stack: 'AngularJS, Material Design, PHP, MySQL',
    },
    {
        name: "Cyklistator",
        description: "Webapp for creating photo collages.",
        url: "https://serwer1445315.home.pl/cyklisci",
        imgSrc: "style/project-cyklisci.jpg",
        stack: 'Angular, Material Design',
    },
    {
        name: "BlendWax",
        description: "Web application for djs who prefer vinyl to other medium.",
        url: "https://serwer1445315.home.pl/blendwax",
        imgSrc: "style/project-blendwax.jpg",
        stack: 'AngularJS, Material Design, PHP, MySQL',
    },
    {
        name: "SnapshotNiugini",
        description: "Travelling blog and catalogue of commercial trips with CMS for a client.",
        url: "https://snapshotniugini.com",
        imgSrc: "style/project-snapshotniugini.jpg",
        stack: 'AngularJS, Material Design, PHP, MySQL',
    },
    {
        name: "BartNapierala",
        description: "Static website for a client.",
        url: "http://bartnapierala.com",
        imgSrc: "style/project-bartnapierala.jpg",
        stack: 'HTML, AngularJS, CSS',
    },
    {
        name: "Bart's Mom's Atlas",
        description: "Atlas of regional wildlife with CMS.",
        url: "http://bartnapierala.com/atlas",
        imgSrc: "style/project-atlas.jpg",
        stack: 'AngularJS, Material Design, PHP, MySQL',
    },
    {
        name: "Bakajana",
        description: "Travel agency website with CMS.",
        url: "http://bakajana.pl",
        imgSrc: "style/project-bakajana.jpg",
        stack: 'Javascript, CSS, PHP, MySQL',
    },
    {
        name: "OptykOsinscy",
        description: "Static website for a client.",
        url: "http://optykosinscy.pl",
        imgSrc: "style/project-optyk.jpg",
        stack: 'HTML, JQuery, CSS',
    },
];
// Creating projects card and projects carousel in hidden modal from an array
const carousel = document.querySelector('.project-details__img-wrpr');
projectsArr.forEach(v => {
    //projects card  
    const projDiv = document.createElement('div');
    projDiv.className = 'mainView__projects-li';
    projDiv.dataset.name = v.name;
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'mainView__project-imgwrpr'; //just for bg-color and mix-blend-mode
    const img = document.createElement('img');
    img.src = v.imgSrc;
    img.width = 100;
    img.height = 100;
    img.loading = 'lazy';
    img.className = 'mainView__project-img';
    imgWrapper.appendChild(img);
    projDiv.appendChild(imgWrapper);
    const description = document.createElement('div');
    description.className = 'mainView__project-info';
    description.innerHTML = `<span class="mainView__project-title">${v.name}</span><span class="mainView__project-desc">${v.description}</span>`;
    projDiv.appendChild(description);
    projectsCard.appendChild(projDiv);
    // Animation when in viewport - observer launch
    //projDivAppear.observe(projDiv) // change of plans - instead of observing each projDiv, let's observe projectsCard after this foreach loop
    projDiv.addEventListener('click', (e) => {
        openModal(projDiv.dataset.name);
    });
    //carousel in modal
    const imgCarousel = document.createElement('img');
    imgCarousel.src = v.imgSrc;
    imgCarousel.width = 500;
    imgCarousel.height = 500;
    imgCarousel.loading = 'lazy';
    imgCarousel.dataset.name = v.name;
    imgCarousel.classList.add('project-details__img');
    imgCarousel.classList.add('project-details__img--behind');
    carousel.appendChild(imgCarousel);
});
// Modal
const projectDetailsModal = document.querySelector('.project-details');
const main = document.querySelector('.project-details__main'); // for animation purposes only (on select project from card)
const closeBtn = document.getElementById('project-details__close-btn');
closeBtn.addEventListener('click', () => {
    projectDetailsModal.classList.remove('visible');
    setTimeout(() => {
        projectDetailsModal.style.setProperty('visibility', 'hidden');
        const kids = main.children;
        Array.from(kids).forEach((v, i) => {
            v.classList.remove('visible');
        });
    }, 300); //wait .3s for transitions to end
});
const nextBtn = document.getElementById('project-details__next-btn');
nextBtn.addEventListener('click', (e) => {
    openModal(e.target.dataset.name);
});
const previousBtn = document.getElementById('project-details__previous-btn');
previousBtn.addEventListener('click', (e) => {
    openModal(e.target.dataset.name);
});
function openModal(title) {
    projectDetailsModal.style.setProperty('visibility', 'visible');
    projectDetailsModal.classList.add('visible');
    const kidsOfMain = main.children;
    Array.from(kidsOfMain).forEach((v, i) => {
        setTimeout(() => {
            v.classList.add('visible');
        }, (i + 1) * 100);
    });
    const kidsOfCarousel = carousel.children;
    Array.from(kidsOfCarousel).forEach((v, i) => {
        if (v.dataset.name === title) {
            v.classList.remove('project-details__img--behind');
        }
        else {
            v.classList.add('project-details__img--behind');
        }
    });
    let titleEl = document.querySelector('.project-details__title');
    let descEl = document.querySelector('.project-details__desc');
    let urlEl = document.querySelector('.project-details__url');
    //let imgEl:HTMLImageElement = (document.querySelector('.project-details__img') as HTMLImageElement)
    projectsArr.forEach((v, i) => {
        if (v.name === title) {
            if (i == projectsArr.length - 1) {
                nextBtn.dataset.name = projectsArr[0].name;
                nextBtn.children[0].setAttribute('data-name', projectsArr[0].name); //Property 'dataset' does not exist on type 'Element' 
                previousBtn.dataset.name = projectsArr[i - 1].name;
                previousBtn.children[0].setAttribute('data-name', projectsArr[i - 1].name);
            }
            else if (i == 0) {
                nextBtn.dataset.name = projectsArr[i + 1].name;
                nextBtn.children[0].setAttribute('data-name', projectsArr[i + 1].name);
                previousBtn.dataset.name = projectsArr[projectsArr.length - 1].name;
                previousBtn.children[0].setAttribute('data-name', projectsArr[projectsArr.length - 1].name);
            }
            else {
                nextBtn.dataset.name = projectsArr[i + 1].name;
                nextBtn.children[0].setAttribute('data-name', projectsArr[i + 1].name);
                previousBtn.dataset.name = projectsArr[i - 1].name;
                previousBtn.children[0].setAttribute('data-name', projectsArr[i - 1].name);
            }
            titleEl.innerHTML = v.name;
            descEl.innerHTML = v.description + `<br/><span>(Stack: ${v.stack})</span>`;
            urlEl.innerHTML = `<a href="${v.url}" target="_blank">Visit ${v.name}</a>`;
            //imgEl.src = v.imgSrc;
        }
    });
}
/* Text effects in about section */
const spans = document.querySelectorAll('.mainView__about-efx span');
spans.forEach((span, i) => {
    span.addEventListener('mouseenter', () => {
        if (i === 2) {
            span.style.setProperty('animation', 'thiner-font .2s linear forwards');
        }
        else {
            span.style.setProperty('animation', 'thicker-font .2s linear forwards');
        }
    });
    span.addEventListener('mouseleave', (ev) => {
        if (i === 2) {
            ev.target.style.setProperty('animation', 'thicker-font .2s linear forwards');
        }
        else {
            ev.target.style.setProperty('animation', 'thiner-font .2s linear forwards');
        }
    });
});
/* Animations - intersectionObservers for animate elements on scroll */
const rootElement = document.querySelector('.mainView');
/* in contact section */
const contactCards = document.querySelectorAll('.mainView__card--contact');
const contactSection = document.getElementById('contact'); //querySelector('.mainView__card--contact')
let options2 = {
    root: rootElement,
    rootMargin: '0px 0px -10px 0px',
    threshold: 0.4
};
let contactAppear = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contactCards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 100);
                setTimeout(() => {
                    card.children[0].classList.add('visible');
                }, 600 - (i * 100));
                setTimeout(() => {
                    card.children[0].children[0].classList.add('visible');
                }, 800 + (i * 100));
            });
            //observer.unobserve(entry.target)
        }
        else {
            contactCards.forEach((card, i) => {
                card.classList.remove('visible');
                card.children[0].classList.remove('visible');
                card.children[0].children[0].classList.remove('visible');
            });
            //return
        }
    });
}, options2);
contactAppear.observe(contactSection);
/* PiggySmalls animation and sound */
const audio = new Audio('style/piggy.mp3');
const words = [
    { word: 'piggy', time: 0 },
    { word: 'piggy', time: 320 },
    { word: 'piggy', time: 640 },
    { word: "can't", time: 1280 },
    { word: 'you', time: 1600 },
    { word: 'see', time: 1920 },
    { word: 'sometimes', time: 2560 },
    { word: 'your', time: 2960 },
    { word: 'words', time: 3120 },
    { word: 'just', time: 3520 },
    { word: 'hypnotize', time: 3680 },
    { word: 'me', time: 4400 },
    { word: '', time: 5100 }
];
let isWordsAnimationOn = false;
contactCards[1].addEventListener('mouseenter', () => {
    if (!isWordsAnimationOn) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play();
        words.forEach((w, i) => {
            isWordsAnimationOn = true;
            setTimeout(() => {
                let animatedWord = document.createElement('div');
                animatedWord.className = 'animated-word';
                animatedWord.innerHTML = w.word;
                contactCards[1].children[0].children[0].appendChild(animatedWord);
                isWordsAnimationOn = i < words.length - 1; //true or false
                if (i === words.length - 1) {
                    const animatedWords = document.querySelectorAll('.animated-word');
                    animatedWords.forEach(word => {
                        word.remove();
                    });
                }
            }, w.time);
        });
    }
});
/* Mouse interaction with piggy-contact */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
    const piggyContacts = document.querySelectorAll(".mouse-track");
    document.addEventListener("mousemove", (e) => {
        window.requestAnimationFrame(() => {
            piggyContacts.forEach((piggyContact) => {
                rotatePiggyContact(e, piggyContact);
            });
        });
    });
}
const rotatePiggyContact = (e, element) => {
    const x = e.clientX;
    const y = e.clientY;
    const rect = element.getBoundingClientRect();
    const middleX = rect.left + (rect.width / 2); // + window.scrollX//window.innerWidth/2
    const middleY = rect.top + (rect.height / 2); // + window.scrollY//window.innerHeight/2
    const offsetX = ((x - middleX) / window.innerWidth) * 70;
    let offsetY = ((y - middleY) / window.innerHeight) * 70;
    offsetY = offsetY < -70 ? 0 : offsetY;
    element.style.setProperty("--rotateX", -1 * offsetY + "deg");
    element.style.setProperty("--rotateY", offsetX + "deg");
    // TO SAMO - tylko ostatni się płynnie animuje
    //element.style.setProperty("transform","perspective(1000px) rotateX("+(-1 * offsetY)+"deg) rotateY("+offsetX+"deg)")
};
/* Experience section - skills and projects */
let options = {
    root: rootElement,
    rootMargin: '0px 0px -10px 0px',
    threshold: 0.3
};
let projectsCardAppear = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            Array.from(projectsCard.children).forEach((prjct, i) => {
                setTimeout(() => {
                    prjct.classList.add('visible-x');
                }, i * 100);
            });
            observer.unobserve(entry.target);
        }
        else {
            return;
        }
    });
}, options);
projectsCardAppear.observe(projectsCard);
const skills = document.querySelectorAll('.mainView__card--skills-li');
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
let skillAppear = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting)
            return;
        else {
            skills.forEach((skillListItem, i) => {
                setTimeout(() => {
                    skillListItem.classList.add('visible-x');
                }, i * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, options);
const firstSkillList = document.querySelector('.mainView__card--skills');
skillAppear.observe(firstSkillList);
