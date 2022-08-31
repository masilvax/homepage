const toggleMenuBtn = document.getElementById("toggleMenuBtn");
const navigation = document.getElementById('navigation');
const sections = document.getElementsByClassName('navigation__li');
var isMenuOpend = (window.innerWidth > 768) ? true : false;
window.onresize = () => {
    isMenuOpend = (window.innerWidth > 768) ? false : true; //odwrotnie, bo niżej toggle'uje menu
    toggleMenu();
};
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
Array.from(sections).forEach((v) => {
    v.addEventListener('click', () => {
        const el = document.getElementById(v.getAttribute('data-dest'));
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 768)
            toggleMenu();
    });
});
