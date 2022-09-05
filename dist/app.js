/* Loader */
const loader = document.getElementById('loader');
var image = new Image();
image.src = getBgUrl(document.getElementById('body'));
image.onload = function () {
    console.log('Loaded!');
    loader.style.setProperty('animation', 'close-loader .5s linear 1s 1 forwards');
    setTimeout(() => { loader.parentElement.style.setProperty('opacity', '0'); }, 1500);
    setTimeout(() => { loader.parentElement.style.setProperty('display', 'none'); }, 1800);
};
function getBgUrl(el) {
    let url = document.defaultView.getComputedStyle(el, "").backgroundImage;
    return url.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}
/* Menu */
var isMenuOpend = (window.innerWidth > 768) ? true : false;
const toggleMenuBtn = document.getElementById("toggleMenuBtn");
const navigation = document.getElementById('navigation');
const toggleMenu = () => {
    //function toggleMenu():void {
    if (isMenuOpend) {
        if (window.innerWidth > 768) {
            toggleMenuBtn.style.setProperty("transform", "translateX(56px)");
            navigation.style.setProperty("margin-left", "-224px");
        }
        else {
            toggleMenuBtn.style.setProperty('transform', 'translateX(-100vw)');
            navigation.style.setProperty('left', '100vw');
        }
    }
    else {
        if (window.innerWidth > 768) {
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
    isMenuOpend = (window.innerWidth > 768) ? false : true; //odwrotnie, bo niżej toggle'uje menu
    toggleMenu();
};
/* Navigation clicks (scrolling to specified section) */
const sections = document.getElementsByClassName('navigation__li');
Array.from(sections).forEach((v) => {
    v.addEventListener('click', () => {
        const el = document.getElementById(v.getAttribute('data-dest')); //Property 'dataset' does not exist on type 'Element' 
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 768)
            toggleMenu();
    });
});
/* Selected projects - filling from array, opening modal dialog with specified project (also next & previous) */
const projectDetailsModal = document.getElementById('project-details');
const closeBtn = document.getElementById('project-details__close-btn');
closeBtn.addEventListener('click', () => {
    projectDetailsModal.style.setProperty('display', 'none');
});
const nextBtn = document.getElementById('project-details__next-btn');
nextBtn.addEventListener('click', (e) => {
    openModal(e.target.dataset.name);
});
const previousBtn = document.getElementById('project-details__previous-btn');
previousBtn.addEventListener('click', (e) => {
    openModal(e.target.dataset.name);
});
const projectsEl = document.getElementById('mainView__projects');
// Adding a project also remember to make change in css grid!!
const projects = [
    { name: 'planthissh!t', description: 'Webapp for creating workout schedules.', url: 'terefere', imgSrc: 'style/skills-ts.svg' },
    { name: 'cyklisci', description: 'do kolazy', url: 'terefere', imgSrc: 'style/skills-js.svg' },
    { name: 'blendwax', description: 'do djki', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
    { name: 'SnapshotNiugini', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
    { name: 'Bakajana', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-java.svg' },
    { name: 'BartNapierala', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-svn.svg' },
    { name: 'Atlas', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
];
projects.forEach((v) => {
    const projDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = v.imgSrc;
    img.loading = 'lazy';
    img.className = 'mainView__project-img';
    projDiv.appendChild(img);
    const description = document.createElement('div');
    description.className = 'mainView__project-info';
    description.innerHTML = `<span class="mainView__project-title">${v.name}</span><span class="mainView__project-desc">${v.description}</span>`;
    projDiv.appendChild(description);
    const bigTransparentButtonCovering = document.createElement('div');
    bigTransparentButtonCovering.className = 'mainView__project-btn';
    bigTransparentButtonCovering.dataset.name = v.name;
    projDiv.appendChild(bigTransparentButtonCovering);
    projectsEl.appendChild(projDiv);
    bigTransparentButtonCovering.addEventListener('click', (e) => {
        console.log(e.target.dataset.name);
        openModal(e.target.dataset.name);
    });
});
function openModal(title) {
    console.log(nextBtn.children[0]);
    projectDetailsModal.style.setProperty('display', 'block');
    let titleEl = document.getElementById('project-details__title');
    let descEl = document.getElementById('project-details__desc');
    let urlEl = document.getElementById('project-details__url');
    let imgEl = document.getElementById('project-details__img');
    projects.forEach((v, i) => {
        if (v.name === title) {
            if (i == projects.length - 1) {
                nextBtn.dataset.name = projects[0].name;
                nextBtn.children[0].setAttribute('data-name', projects[0].name);
                previousBtn.dataset.name = projects[i - 1].name;
                previousBtn.children[0].setAttribute('data-name', projects[i - 1].name);
            }
            else if (i == 0) {
                nextBtn.dataset.name = projects[i + 1].name;
                nextBtn.children[0].setAttribute('data-name', projects[i + 1].name);
                previousBtn.dataset.name = projects[projects.length - 1].name;
                previousBtn.children[0].setAttribute('data-name', projects[projects.length - 1].name);
            }
            else {
                nextBtn.dataset.name = projects[i + 1].name;
                nextBtn.children[0].setAttribute('data-name', projects[i + 1].name);
                previousBtn.dataset.name = projects[i - 1].name;
                previousBtn.children[0].setAttribute('data-name', projects[i - 1].name);
            }
            titleEl.innerHTML = v.name;
            descEl.innerHTML = v.description;
            urlEl.innerHTML = v.url;
            imgEl.src = v.imgSrc;
        }
    });
}
