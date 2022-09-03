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
        const el = document.getElementById(v.getAttribute('data-dest'));
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 768)
            toggleMenu();
    });
});
/* Portfolio */
const projectsEl = document.getElementById('mainView__projects');
const projects = [
    { name: 'planthissh!t', description: 'Webapp for creating workout schedules.', url: 'terefere', imgSrc: 'style/skills-ts.svg' },
    { name: 'cyklisci', description: 'do kolazy', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
    { name: 'blendwax', description: 'do djki', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
    { name: 'SnapshotNiugini', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
    { name: 'Bakajana', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
    { name: 'BartNapierala', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
    { name: 'Atlas', description: 'do treningu', url: 'terefere', imgSrc: 'style/oldskills-eclipse.svg' },
];
projects.forEach((v) => {
    const projDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = v.imgSrc;
    img.loading = 'lazy';
    img.className = 'mainView__project-img';
    projDiv.appendChild(img);
    /*
        const name:HTMLElement = document.createElement('div')
        name.innerHTML = v.name
        projDiv.appendChild(name) */
    const description = document.createElement('div');
    description.className = 'mainView__project-desc';
    description.innerHTML = `<span class="mainView__project-title">${v.name}</span><span>${v.description}</span>`;
    projDiv.appendChild(description);
    projectsEl.appendChild(projDiv);
});
