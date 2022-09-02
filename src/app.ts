const toggleMenuBtn:HTMLElement = document.getElementById("toggleMenuBtn")
const navigation:HTMLElement = document.getElementById('navigation')
const loader:HTMLElement = document.getElementById('loader')
const sections:HTMLCollectionOf<Element> = document.getElementsByClassName('navigation__li')

var isMenuOpend:boolean = (window.innerWidth > 768) ? true : false
var isBgImageLoaded:boolean = false

var image = new Image();
image.src = getBgUrl(document.getElementById('body'))
image.onload = function () {
    console.log('Loaded!')
    //loader.style.setProperty('width','0')
    //loader.style.setProperty('height','0')
    loader.style.setProperty('animation','close-loader .5s linear 1s 1 forwards')
    setTimeout(()=>{loader.parentElement.style.setProperty('opacity','0')},1500)
    setTimeout(()=>{loader.parentElement.style.setProperty('display','none')},1800)
}
function getBgUrl(el:HTMLElement):string{
    let url:string = document.defaultView.getComputedStyle(el, "").backgroundImage
    return url.replace(/url\(['"]?(.*?)['"]?\)/i, "$1")
}

window.onresize = ()=>{
    isMenuOpend = (window.innerWidth > 768) ? false : true;//odwrotnie, bo niżej toggle'uje menu
    toggleMenu()
}

const toggleMenu = ()=>{
//function toggleMenu():void {
    if(isMenuOpend){
        if (window.innerWidth > 768) {
            toggleMenuBtn.style.setProperty("transform","translateX(56px)")
            navigation.style.setProperty("margin-left", "-224px");
        }else{
            toggleMenuBtn.style.setProperty('transform','translateX(-100vw)')
            navigation.style.setProperty('left','100vw')
        }
    }else{
        if (window.innerWidth > 768) {
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

Array.from(sections).forEach((v)=>{
    v.addEventListener('click',()=>{
        const el:HTMLElement = document.getElementById(v.getAttribute('data-dest'))
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
        if (window.innerWidth <= 768)
            toggleMenu();
    })
});

