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

Array.from(sections).forEach(v=>{
    v.addEventListener('click',()=>{
        const el:HTMLElement = document.getElementById(v.getAttribute('data-dest'))//Property 'dataset' does not exist on type 'Element' 
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
        if (window.innerWidth <= 768)
            toggleMenu();
    })
});

/* Selected projects - filling from array, opening modal dialog with specified project (also next & previous) */
const projectsEl:HTMLElement = document.getElementById('mainView__projects')
interface project {
    name:string;
    description:string;
    url:string;
    imgSrc:string;
}
// Adding a project also remember to make change in css grid!!
const projects: project[] = [
  {
    name: "PlanThisSh!t",
    url: "http://planthisshit.com",
    imgSrc: "style/project-planthisshit.jpg",
    description:
      "Webapp for creating workout schedules. Also for personal trainers.",
  },
  {
    name: "Cyklistator",
    description: "Webapp for creating photo collages.",
    url: "https://serwer1445315.home.pl/cyklisci",
    imgSrc: "style/project-cyklisci.jpg",
  },
  {
    name: "BlendWax",
    description:
      "Web application for djs who prefer vinyl to other medium.",
    url: "https://serwer1445315.home.pl/blendwax",
    imgSrc: "style/project-planthisshit.jpg",
  },
  {
    name: "SnapshotNiugini",
    description: "Travelling blog and catalogue of commercial trips with CMS for a client",
    url: "https://snapshotniugini.com",
    imgSrc: "style/project-cyklisci.jpg",
  },
  {
    name: "BartNapierala",
    description: "Static website for a client",
    url: "http://bartnapierala.com",
    imgSrc: "style/project-planthisshit.jpg",
  },
  {
    name: "Bart's Mom's Atlas",
    description: "Atlas of regional wildlife with CMS",
    url: "http://bartnapierala.com/atlas",
    imgSrc: "style/project-cyklisci.jpg",
  },
  {
    name: "Bakajana",
    description: "Travel agency website with CMS",
    url: "http://bakajana.pl",
    imgSrc: "style/project-planthisshit.jpg",
  },
];
// Creating projects card from an array
projects.forEach(v => {
    const projDiv:HTMLElement = document.createElement('div')

    const imgWrapper:HTMLElement = document.createElement('div')
    imgWrapper.className = 'mainView__project-imgwrpr'//just for bg-color and mix-blend-mode
    const img:HTMLImageElement = document.createElement('img')
    img.src = v.imgSrc
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
    
    projectsEl.appendChild(projDiv)

    bigTransparentButtonCovering.addEventListener('click',(e:any)=>{
        console.log(e.target.dataset.name)
        openModal(e.target.dataset.name)
    })
})

// Modal
const projectDetailsModal:HTMLElement = document.getElementById('project-details')
const main:HTMLElement = document.getElementById('project-details__main')// for animation purposes only

const closeBtn:HTMLButtonElement = document.getElementById('project-details__close-btn') as HTMLButtonElement
closeBtn.addEventListener('click', ()=>{
    projectDetailsModal.style.setProperty('opacity','0')
    projectDetailsModal.style.setProperty('transform','scale(.1)')
    setTimeout(()=>{
        projectDetailsModal.style.setProperty('visibility','hidden')
        const kids = main.children
        Array.from(kids).forEach((v, i) => {
            (v as HTMLElement).style.setProperty("transform", "scale(.5)");
            (v as HTMLElement).style.setProperty("opacity", "0");
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
    console.log(nextBtn.children[0]);

    projectDetailsModal.style.setProperty('visibility','visible')
    projectDetailsModal.style.setProperty('opacity','1')
    projectDetailsModal.style.setProperty('transform','scale(1)')

    const kids = main.children
    Array.from(kids).forEach((v,i) => {
        setTimeout(()=>{
            (v as HTMLElement).style.setProperty('transform','scale(1)');
            (v as HTMLElement).style.setProperty('opacity','1')
            console.log(i,v.id)
        },(i+1)*100)
    });

    let titleEl:HTMLElement = document.getElementById('project-details__title')
    let descEl:HTMLElement = document.getElementById('project-details__desc')
    let urlEl:HTMLElement = document.getElementById('project-details__url')
    let imgEl:HTMLImageElement = (document.getElementById('project-details__img') as HTMLImageElement)

    projects.forEach((v,i)=>{
        if (v.name === title) {
          if (i == projects.length - 1) {
            nextBtn.dataset.name = projects[0].name;
            nextBtn.children[0].setAttribute('data-name',projects[0].name)
            previousBtn.dataset.name = projects[i - 1].name;
            previousBtn.children[0].setAttribute('data-name',projects[i - 1].name)
          } else if (i == 0) {
            nextBtn.dataset.name = projects[i + 1].name;
            nextBtn.children[0].setAttribute('data-name',projects[i + 1].name)
            previousBtn.dataset.name = projects[projects.length - 1].name;
            previousBtn.children[0].setAttribute('data-name',projects[projects.length - 1].name)
          } else {
            nextBtn.dataset.name = projects[i + 1].name;
            nextBtn.children[0].setAttribute('data-name',projects[i + 1].name)
            previousBtn.dataset.name = projects[i - 1].name;
            previousBtn.children[0].setAttribute('data-name',projects[i - 1].name)
          }

          titleEl.innerHTML = v.name;
          descEl.innerHTML = v.description;
          urlEl.innerHTML = `<a href="${v.url}" target="_blank">Visit ${v.name}</a>`;
          imgEl.src = v.imgSrc;
        }
    })
}
