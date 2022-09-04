/* Loader */
const loader:HTMLElement = document.getElementById('loader')
var image = new Image();

image.src = getBgUrl(document.getElementById('body'))

image.onload = function () {
    console.log('Loaded!')
    loader.style.setProperty('animation','close-loader .5s linear 1s 1 forwards')
    setTimeout(()=>{loader.parentElement.style.setProperty('opacity','0')},1500)
    setTimeout(()=>{loader.parentElement.style.setProperty('display','none')},1800)
}
function getBgUrl(el:HTMLElement):string{
    let url:string = document.defaultView.getComputedStyle(el, "").backgroundImage
    return url.replace(/url\(['"]?(.*?)['"]?\)/i, "$1")
}

/* Menu */
var isMenuOpend:boolean = (window.innerWidth > 768) ? true : false
const toggleMenuBtn:HTMLElement = document.getElementById("toggleMenuBtn")
const navigation:HTMLElement = document.getElementById('navigation')

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

window.onresize = ()=>{
    isMenuOpend = (window.innerWidth > 768) ? false : true;//odwrotnie, bo niżej toggle'uje menu
    toggleMenu()
}

/* Navigation clicks (scrolling to specified section) */
const sections:HTMLCollectionOf<Element> = document.getElementsByClassName('navigation__li')

Array.from(sections).forEach((v)=>{
    v.addEventListener('click',()=>{
        const el:HTMLElement = document.getElementById(v.getAttribute('data-dest'))//Property 'dataset' does not exist on type 'Element' 
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
        if (window.innerWidth <= 768)
            toggleMenu();
    })
});

/* Selected projects - filling from array, opening modal dialog with specified project (also next & previous) */
const projectDetailsModal:HTMLElement = document.getElementById('project-details')

const projectDetailsCloseBtn:HTMLButtonElement = document.getElementById('project-details__close-btn') as HTMLButtonElement
projectDetailsCloseBtn.addEventListener('click', ()=>{
    projectDetailsModal.style.setProperty('display','none')
})

const projectDetailsNextBtn:HTMLButtonElement = document.getElementById('project-details__next-btn') as HTMLButtonElement
projectDetailsNextBtn.addEventListener('click',(e:any)=>{
    openModal(e.target.dataset.name)
})

const projectDetailsPreviousBtn:HTMLButtonElement = document.getElementById('project-details__previous-btn') as HTMLButtonElement
projectDetailsPreviousBtn.addEventListener('click',(e:any)=>{
    openModal(e.target.dataset.name)
})

const projectsEl:HTMLElement = document.getElementById('mainView__projects')
interface project {
    name:string;
    description:string;
    url:string;
    imgSrc:string;
}
// Adding a project also remember to make change in css grid!!
const projects:project[] = [
    {name: 'planthissh!t',description:'Webapp for creating workout schedules.', url: 'terefere', imgSrc:'style/skills-ts.svg'},
    {name: 'cyklisci',description:'do kolazy', url: 'terefere', imgSrc:'style/skills-js.svg'},
    {name: 'blendwax',description:'do djki', url: 'terefere', imgSrc:'style/oldskills-eclipse.svg'},
    {name: 'SnapshotNiugini',description:'do treningu', url: 'terefere', imgSrc:'style/oldskills-eclipse.svg'},
    {name: 'Bakajana',description:'do treningu', url: 'terefere', imgSrc:'style/oldskills-java.svg'},
    {name: 'BartNapierala',description:'do treningu', url: 'terefere', imgSrc:'style/oldskills-svn.svg'},
    {name: 'Atlas',description:'do treningu', url: 'terefere', imgSrc:'style/oldskills-eclipse.svg'},
]
projects.forEach((v) => {
    const projDiv:HTMLElement = document.createElement('div')

    const img:HTMLImageElement = document.createElement('img')
    img.src = v.imgSrc
    img.loading = 'lazy'
    img.className = 'mainView__project-img'
    projDiv.appendChild(img)

    const description:HTMLElement = document.createElement('div')
    description.className = 'mainView__project-info'
    description.innerHTML = `<span class="mainView__project-title">${v.name}</span><span class="mainView__project-desc">${v.description}</span>`
    projDiv.appendChild(description)

    const bigTransparentButtonCovering:HTMLElement = document.createElement('div')
    bigTransparentButtonCovering.className = 'mainView__project-btn'
    bigTransparentButtonCovering.dataset.name = v.name
    projDiv.appendChild(bigTransparentButtonCovering)
    
    projectsEl.appendChild(projDiv)

    bigTransparentButtonCovering.addEventListener('click',(e:any)=>{
        console.log(e.target.dataset.name)
        openModal(e.target.dataset.name)
    })
})

function openModal(title:string):void {

    projectDetailsModal.style.setProperty('display','block')

    let titleEl:HTMLElement = document.getElementById('project-details__title')
    let descEl:HTMLElement = document.getElementById('project-details__desc')
    let urlEl:HTMLElement = document.getElementById('project-details__url')
    let imgEl:HTMLImageElement = (document.getElementById('project-details__img') as HTMLImageElement)

    projects.forEach((v,i)=>{
        if (v.name === title) {
          if (i == projects.length - 1) {
            projectDetailsNextBtn.dataset.name = projects[0].name;
            projectDetailsPreviousBtn.dataset.name = projects[i - 1].name;
          } else if (i == 0) {
            projectDetailsNextBtn.dataset.name = projects[i + 1].name;
            projectDetailsPreviousBtn.dataset.name = projects[projects.length - 1].name;
          } else {
            projectDetailsNextBtn.dataset.name = projects[i + 1].name;
            projectDetailsPreviousBtn.dataset.name = projects[i - 1].name;
          }

          titleEl.innerHTML = v.name;
          descEl.innerHTML = v.description;
          urlEl.innerHTML = v.url;
          imgEl.src = v.imgSrc;
        }
    })
}
