/* Loader */
const loader = document.querySelector('.loader');
var image = new Image();
image.src = getBgUrl(document.querySelector('body'));
image.onload = function () {
    console.log('Loaded!');
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
const sections = document.getElementsByClassName('navigation__li');
Array.from(sections).forEach(v => {
    v.addEventListener('click', () => {
        const el = document.getElementById(v.getAttribute('data-dest')); //Property 'dataset' does not exist on type 'Element' 
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth < 768)
            toggleMenu();
    });
});
// Observers for animate elements on scroll (observer named projDivAppear launch in loop while creating every project)
const rootElement = document.querySelector('.mainView');
let options = {
    root: rootElement,
    rootMargin: '0px 0px -10px 0px',
    threshold: 1.0
};
let projDivAppear = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.setProperty('transform', 'scaleX(1)');
            entry.target.style.setProperty('opacity', '1');
            observer.unobserve(entry.target);
        }
        else {
            return;
        }
    });
}, options);
const skills = document.querySelectorAll('.mainView__card--skills li');
let skillAppear = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.setProperty('transform', 'scaleX(1)');
            entry.target.style.setProperty('opacity', '1');
            observer.unobserve(entry.target);
        }
        else {
            return;
        }
    });
}, options);
//observer for skills launch
skills.forEach(skill => {
    skillAppear.observe(skill);
});
/* Selected projects - filling from array, opening modal dialog with specified project (also next & previous) */
const projectsEl = document.querySelector('.mainView__projects');
// When adding a project also remember to make change in css grid!!
const projectsArr = [
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
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'mainView__project-imgwrpr'; //just for bg-color and mix-blend-mode
    const img = document.createElement('img');
    img.src = v.imgSrc;
    img.loading = 'lazy';
    img.className = 'mainView__project-img';
    imgWrapper.appendChild(img);
    projDiv.appendChild(imgWrapper);
    const description = document.createElement('div');
    description.className = 'mainView__project-info';
    description.innerHTML = `<span class="mainView__project-title">${v.name}</span><span class="mainView__project-desc">${v.description}</span>`;
    projDiv.appendChild(description);
    const bigTransparentButtonCovering = document.createElement('div');
    bigTransparentButtonCovering.className = 'mainView__project-btn';
    bigTransparentButtonCovering.dataset.name = v.name;
    projDiv.appendChild(bigTransparentButtonCovering);
    projectsEl.appendChild(projDiv);
    // Animation when in viewport - observer launch
    projDivAppear.observe(projDiv);
    bigTransparentButtonCovering.addEventListener('click', (e) => {
        //console.log(e.target.dataset.name)
        openModal(e.target.dataset.name);
    });
    //carousel in modal
    const imgCarousel = document.createElement('img');
    imgCarousel.src = v.imgSrc;
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
    projectDetailsModal.style.setProperty('opacity', '0');
    projectDetailsModal.style.setProperty('transform', 'scale(.1)');
    setTimeout(() => {
        projectDetailsModal.style.setProperty('visibility', 'hidden');
        const kids = main.children;
        Array.from(kids).forEach((v, i) => {
            v.style.setProperty("transform", "scale(.5)");
            v.style.setProperty("opacity", "0");
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
    projectDetailsModal.style.setProperty('opacity', '1');
    projectDetailsModal.style.setProperty('transform', 'scale(1)');
    const kidsOfMain = main.children;
    Array.from(kidsOfMain).forEach((v, i) => {
        setTimeout(() => {
            v.style.setProperty('transform', 'scale(1)');
            v.style.setProperty('opacity', '1');
            //console.log(i,v.id)
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
    let imgEl = document.querySelector('.project-details__img');
    projectsArr.forEach((v, i) => {
        if (v.name === title) {
            if (i == projectsArr.length - 1) {
                nextBtn.dataset.name = projectsArr[0].name;
                nextBtn.children[0].setAttribute('data-name', projectsArr[0].name);
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
spans.forEach((v, i) => {
    v.addEventListener('mouseenter', ev => {
        if (i === 2) {
            ev.target.style.setProperty('animation', 'thiner-font .2s linear forwards');
        }
        else {
            ev.target.style.setProperty('animation', 'thicker-font .2s linear forwards');
        }
    });
    v.addEventListener('mouseleave', ev => {
        if (i === 2) {
            ev.target.style.setProperty('animation', 'thicker-font .2s linear forwards');
        }
        else {
            ev.target.style.setProperty('animation', 'thiner-font .2s linear forwards');
        }
    });
});
