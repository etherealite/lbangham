

const htmlToElement = (html) => {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  };
  
  
  miniMap = () => {
  
    const template = (vars) => {
      return `
        <nav class="minimap">
          <div class="minimap-backdrop"></div>
          <div class="minimap-viewpane">
            <div class="minimap-slider"></div>
            <div class="minimap-content">
              <div class="minimap-header"></div>
              <div class="minimap-main">
                ${vars.works.map((work) => {
                  return `<div class="work-frame"><img src="${work.src}" alt="${work.alt}"/></div>`
                }).join('')}
              </div>
              <div class="minimap-footer"></div>
            </div>
          </div>
        </nav>
      `;
    };
  
    const worklistNode = document.querySelector('.worklist');
    const works = Array.from(worklistNode.children).map((article) => {
      const img = article.querySelector('img');
      return {
        alt: img.getAttribute('alt'),
        src: img.getAttribute('src'),
      };
    });
  
    const mapElement = htmlToElement(template({works}));
    document.querySelector('body').appendChild(mapElement);
  
  
  
    const contentEl = mapElement.querySelector('.minimap-content');
  
    let ticking = false;
    document.addEventListener('scroll', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          contentEl.style.bottom = `${window.scrollY / 8.42}px`;
          ticking = false;
        })
      }
      ticking = true;
    });
  };
  
  
  scrollFade = () => {
    callback = (entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const ratio = entry.intersectionRatio > .75 ? 1: entry.intersectionRatio;
        const img = element.querySelector('img');
        img.style.opacity = ratio;
        img.style.transition = `.2s ease-in-out`;
        img.style.filter = `blur(${1 - ratio}em)`;
      });
    };
  
    const header = document.querySelector('header');
    const compStyles = window.getComputedStyle(header);
    const marginTop = compStyles.getPropertyValue('height');
  
    observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: `-${marginTop} 0px 0px 0px`,
      threshold: [...Array(11).keys()].map(i => i / 10)
    });
  
    const articles = document.querySelectorAll('.worklist article');
  
  
    articles.forEach(art => observer.observe(art));
    
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    
    // console.log(elements)
    // elements.forEach((element => element.style.opacity = "0.1"))
    // miniMap();
    // scrollFade();
  });