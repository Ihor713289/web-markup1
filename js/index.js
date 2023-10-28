addEventListener('hashchange', (event) => {
    const route = decodeURI(location.hash.replace('#', ''))
    Router.navigateByName(route)
})


class CustomHeader extends HTMLElement {
    static observedAttributes = ['selected-page']

    constructor() {
        super();
    }

    connectedCallback() {
        const body = document.getElementById('app')
        const header = document.createElement('header')
        const menuIcon = document.createElement('img')
        menuIcon.setAttribute('src', './images/menu.svg')
        menuIcon.className = 'menu-icon'
        menuIcon.onclick = (event) => {
            const drawer = document.getElementById('navigation-drawer')
            drawer.className = 'drawer-opened'
        }
        const img = document.createElement('img')
        img.setAttribute('src', './images/Logo.svg')
        img.className = 'logo'
        img.onclick = (event) => {
            goHome()
        }
        const nav = document.createElement('nav')
        const ul = document.createElement('ul')
        ul.className = 'navigation-list'
        Router.routes.forEach((route) => {
            if (!route.hidden) {
                const li = document.createElement('li')
                li.innerText = route.name
                li.value = route.id
                if (route.id.toString() === this.getAttribute('selected-page')) {
                    li.className = 'selected-title'
                }
                li.onclick = (event) => {
                    Router.navigateById(li.value.toString())
                }
                ul.appendChild(li)
            }
        })
        nav.appendChild(ul)
        header.appendChild(menuIcon)
        header.appendChild(img)
        header.appendChild(nav)
        body.appendChild(header)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const listItems = document.querySelectorAll('li')

        listItems?.forEach((item) => {
            if (item.value.toString() === newValue) {
                item.className = 'selected-title'
            } else {
                item.className = ''
            }
        })
    }
}

class MainContent extends HTMLElement {
    static observedAttributes = ['page-id']

    connectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'page-id') {
            let contentContainer = document.getElementById('content-container')
            if (contentContainer === null || contentContainer === undefined) {
                contentContainer = document.createElement('main')
                contentContainer.setAttribute('id', 'content-container')
                const body = document.getElementById('app')
                body.appendChild(contentContainer)
            }

            const html = this.getHtml()
            contentContainer.innerHTML = ''
            if (typeof html === "string") {
                contentContainer.innerHTML = html
            } else {
                contentContainer.appendChild(html)
            }
        }
    }

    getHtml() {
        console.log(this.getAttribute('page-id'))
        switch (this.getAttribute('page-id')) {
            case '1':
                return this.getHomeContent()
            case '2':
                return this.getFirstArticleContent()
            case '3':
                return this.getSecondArticleContent()
            case '4':
                return this.getThirdArticleContent()
            case '5':
                return this.getFourthArticleContent()
            case '6':
                return this.getContactPage()
            case '7':
                return this.getRedirectPage()
            default :
                return this.getHomeContent()
        }
    }

    getHomeContent() {
        return `<section class="home-picture-container">
            <img class="home-picture" src="../images/home-picture.jpg" alt="homepage">
            <p class="image-text-centered">Welcome to Bike with me</p>
            <p class="image-text-centered-bottom">Discover the Utrecht region's breathtaking beauty and rich cycling heritage with us. Our website offers a diverse range of biking routes to cater to cycling enthusiasts. Explore the charming canals of Utrecht city or embrace the tranquillity of the Dutch countryside. Plan your adventure with detailed route descriptions, maps, and essential information. Connect with our passionate cycling community and make lasting memories while reducing your carbon footprint. Start your Utrecht cycling adventure today!</p>
        </section>
        <article>
            <h2>Articles</h2>
            <section class="articles-grid">
                <article class="article-preview">
                        <img class="article-preview-picture" src="../images/first/forest.jpg" alt="Forest">
                        <section class="article-description">
                            <h3>Forest adventure</h3>
                            <p>Embark on a captivating biking journey through the enchanting Nieuw Wulven Forest. This pristine natural oasis, located in the heart of the Utrecht region, offers a serene and invigorating experience for cyclists of all levels.</p>
                            <button class="view-button" onclick="Router.navigateById(2)">Read more</button>
                        </section>
                </article>
                <article class="article-preview">
                    <img class="article-preview-picture" src="../images/road.jpg" alt="Road">
                    <section class="article-description">
                        <h3>Historical ride</h3>
                        <p>This biking route seamlessly combines natural beauty, history, relaxation, and the whimsical joy of DuckCity. Revel in the serene riverside views, explore charming villages, savor refreshments at Theehuis Rhijnauwen, and create unforgettable memories with at DuckCity.</p>
                        <button class="view-button" onclick="Router.navigateById(3)">Read more</button>
                    </section>
                </article>
                <article class="article-preview">
                    <img class="article-preview-picture" src="../images/utrecht.jpg" alt="Utrecht channels">
                    <section class="article-description">
                        <h3>Bunnik to Utrecht Urban Escape</h3>
                        <p>Embark on a captivating biking journey from the charming Bunnik to the vibrant heart of Utrecht.</p>
                        <button class="view-button" onclick="Router.navigateById(4)">Read more</button>
                    </section>
                </article>
                <article class="article-preview">
                    <img class="article-preview-picture" src="../images/bridge.jpg" alt="Bridge">
                    <section class="article-description">
                        <h3>Utrecht to Houten</h3>
                        <p>Embark on a delightful biking journey from the heart of Utrecht to the charming town of Houten, weaving through the scenic neighborhood of Utrecht Lunetten. This route combines the vibrant energy of Utrecht with the tranquil charm of the countryside, offering a cycling experience that captures the essence of the region.</p>
                        <button class="view-button" onclick="Router.navigateById(5)">Read more</button>
                    </section>
                </article>
            </section>
        </article>`
    }

    getFirstArticleContent() {
        const data = this.getFirstArticleData()
        const article = this.createArticlePage(data)
        return article
    }

    getSecondArticleContent() {
        const data = this.getSecondArticleData()
        const article = this.createArticlePage(data)
        return article
    }

    getThirdArticleContent() {
        const data = this.getThirdArticleData()
        const article = this.createArticlePage(data)
        return article
    }

    getFourthArticleContent() {
        const data = this.getFourthArticleData()
        const article = this.createArticlePage(data)
        return article
    }

    createArticlePage(data) {
        const article = document.createElement('article')
        article.className = 'content-container'
        const title = document.createElement('h1')
        title.innerText = data.title
        article.appendChild(title)
        data.sections.forEach((section) => {
            const sectionElement = document.createElement('section')
            sectionElement.className = 'article-section'
            const title = document.createElement('h2')
            title.innerText = section.title
            sectionElement.appendChild(title)

            const contentSection = document.createElement('section')
            contentSection.className = 'article-content'
            const image = document.createElement('img')
            image.className = 'article-picture'
            image.setAttribute('src', section.imagePath)
            image.setAttribute('alt', section.alt)
            contentSection.appendChild(image)


            const content = document.createElement('p')
            content.innerHTML = section.content
            content.className = 'article-text'
            contentSection.appendChild(content)

            sectionElement.appendChild(contentSection)
            article.appendChild(sectionElement)
        })
        const factsSection = document.createElement('section')
        factsSection.className = 'facts-section'
        const factsTitle = document.createElement('h2')
        factsTitle.innerText = 'Trip facts'
        const factsList = document.createElement('ul')
        factsList.className = 'trip-facts'
        data.tripFacts.forEach((fact) => {
            const listItem = document.createElement('li')
            listItem.innerText = fact
            factsList.appendChild(listItem)
        })
        factsSection.appendChild(factsTitle)
        factsSection.appendChild(factsList)

        article.appendChild(factsSection)
        return article
    }

    getContactPage() {
        return `<article class="contact-page">
          <section class="contact-header">User service</section>
          <form class="contact-form">
              <section class="gender-input">
                <section>
                    <label>*Gender:</label>
                </section>
                <section class="gender-options">
                  <section>
                     <input type="radio" name="gender" id="male" value="male" checked/>
                     <label for="male">Male</label>
                  </section>
                  <section>
                    <input type="radio" name="gender" id="female" value="female"/>
                    <label for="female">Female</label>
                  </section>
                  <section>
                      <input type="radio" name="gender" id="other" value="other"/>
                      <label for="other">Other</label>
                  </section>
                 </section>
              </section>
              <section class="name-input">
                  <section>
                    <label for="firstname" class="input-label">*First name</label>
                    <br/>
                    <input class="text-input" type="text" name="firstname" id="firstname"/>
                  </section>
                  <section>
                    <label for="lastname" class="input-label">*Last name</label>
                    <br/>
                    <input class="text-input" type="text" name="lastname" id="lastname"/>
                  </section>
              </section>
              <section>
                    <label class="input-label" for="email">*Email</label>
                    <br/>
                    <input class="email-input" type="email" id="email" name="email"/>
              </section>
              <section>
                    <label class="input-label" for="mobile">Mobile number</label>
                    <br/>
                    <input class="email-input" type="number" id="mobile" name="mobile"/>
              </section>
              <section>
                  <label class="input-label" for="reason">Reason to contact us</label>
                  <br/>
                  <input class="reason-input" type="text" name="reason" id="reason"/>
              </section>
              <section>
                  <input class="submit-button" type="submit" onclick="goToRedirectPage()" value="Contact us">
              </section>
          </form>
      </article>`
    }

    getRedirectPage() {
        return `<section class="redirect-greeting">
            <h1>Thank you for contacting us!</h1>
            <h1>We will reach you as soon as possible!</h1>
            <button class="redirect-button" onclick="goHome()">Go back home</button>
        </section>`
    }

    getFirstArticleData() {
        return {
            title: 'Nieuw Wulven Forest Adventure',
            sections: [
                {
                    title: 'Forest magic',
                    imagePath: '../images/first/forest.jpg',
                    content: 'Embark on a captivating biking journey through the enchanting Nieuw Wulven Forest. This pristine natural oasis, located in the heart of the Utrecht region, offers a serene and invigorating experience for cyclists of all levels.',
                    alt: 'Forest'
                },
                {
                    title: 'Tranquil Woodland Trails',
                    imagePath: '../images/first/road.jpg',
                    content: 'Wind your way through a labyrinth of peaceful woodland trails, surrounded by towering trees and the soothing sounds of nature. The Nieuw Wulven Forest is a haven for those seeking a serene escape from the hustle and bustle of daily life.',
                    alt: 'Road'
                },
                {
                    title: 'Family-Friendly trip',
                    imagePath: '../images/first/field.jpg',
                    content: 'This route is perfect for families, offering a gentle, mostly flat terrain that\'s suitable for riders of all ages. It\'s an ideal outing for parents and children to enjoy together. Learn more: <a href="https://www.staatsbosbeheer.nl/wat-we-doen/werk-in-uitvoering/kromme-rijn-ontwikkeling-nieuw-wulven" target="_blank">Developing Nieuw Wulven<a>',
                    alt: 'Field'
                }
            ],
            tripFacts: [
                'Difficulty: Easy',
                'Distance: Approximately 10 kilometres',
                'Duration: 1.5 to 2 hours, including stops',
                'Trail Type: Well-maintained, predominantly flat forest paths'
            ]
        }
    }

    getSecondArticleData() {
        return {
            title: 'History, cars and pancakes',
            sections: [
                {
                    title: 'Joyful ride',
                    imagePath: '../images/second/duckcity.jpg',
                    content: 'This biking route seamlessly combines natural beauty, history, relaxation, and the whimsical joy of DuckCity. Revel in the serene riverside views, explore charming villages, savor refreshments at Theehuis Rhijnauwen, and create unforgettable memories with at DuckCity.',
                    alt: 'DuckCity parking lot'
                },
                {
                    title: 'Riverside Path',
                    imagePath: '../images/road.jpg',
                    content: 'Begin your ride along the peaceful Kromme Rijn river, where the soothing waters and lush greenery create a picturesque setting for your adventure.Pedal through the historic village of Rhijnauwen, known for its enchanting charm and traditional Dutch architecture.',
                    alt: 'Road to the Bunnik'
                },
                {
                    title: 'Unforgettable experience',
                    imagePath: '../images/second/river.jpg',
                    content: 'Embark on a captivating biking journey through the enchanting Nieuw Wulven Forest. This pristine natural oasis, located in the heart of the Utrecht region, offers a serene and invigorating experience for cyclists of all levels. Learn more: <a href="https://www.duckcityfun.nl/" target="_blank">DuckCity</a>, <a href="https://theehuisrhijnauwen.nl/" target="_blank">Theehuis Rhynauwen</a>.',
                    alt: 'Bridge in Bunnik'
                }
            ],
            tripFacts: [
                'Difficulty: Easy',
                'Distance: Approximately 7 kilometers (4.3 miles)',
                'Duration: 1 to 1.5 hours, allowing time for stops',
                'Terrain: Mostly flat, well-paved bike paths'
            ]
        }
    }

    getThirdArticleData() {
        return {
            title: 'Bunnik to Utrecht Urban Escape',
            sections: [
                {
                    title: 'Back to Urban',
                    imagePath: '../images/third/road.jpg',
                    content: 'Embark on a captivating biking journey from the charming Bunnik to the vibrant heart of Utrecht. This picturesque route seamlessly transitions from serene woodland to the bustling urban landscape, offering a unique and memorable cycling experience.',
                    alt: 'Beautiful forest road'
                },
                {
                    title: 'Woodland Magic',
                    imagePath: '../images/third/lake.jpg',
                    content: 'Begin your ride amidst the enchanting forest trails near Bunnik, where the whispering leaves and dappled sunlight create a fairytale-like ambiance.\n' +
                        'Follow the scenic path along the tranquil Kromme Rijn river, enjoying the soothing views of the water and the abundant greenery that lines the banks.',
                    alt: 'Woodland lake'
                },
                {
                    title: 'Utrecht\'s Vibrant Center',
                    imagePath: '../images/utrecht.jpg',
                    content: 'Your route culminates in Utrecht\'s city center, where you\'ll find a bustling atmosphere, charming canals, shops, cafes, and the city\'s rich cultural heritage waiting to be explored. Discover more about <a href="https://www.utrecht.nl/" target="_blank">Utrecht</a>.',
                    alt: 'Utrecht\'s city center'
                }
            ],
            tripFacts: [
                'Difficulty: Easy',
                'Distance: Approximately 7 kilometers (4.3 miles)',
                'Duration: 30 minutes to 1 hour, depending on your pace and stops',
                'Terrain: Initially woodland trails, then well-paved bike paths as you enter Utrecht'
            ]
        }
    }

    getFourthArticleData() {
        return {
            title: 'Utrecht to Houten',
            sections: [
                {
                    title: 'A pretty town',
                    imagePath: '../images/bridge.jpg',
                    content: 'Embark on a delightful biking journey from the heart of Utrecht to the charming town of Houten, weaving through the scenic neighborhood of Utrecht Lunetten. This route combines the vibrant energy of Utrecht with the tranquil charm of the countryside, offering a cycling experience that captures the essence of the region.',
                    alt: 'Forest'
                },
                {
                    title: 'Utrecht\'s Urban Pulse',
                    imagePath: '../images/fourth/bikelane.webp',
                    content: 'Begin your ride in Utrecht, where the city\'s lively atmosphere, historic architecture, and bustling streets create a captivating starting point for your adventure. Pedal through the picturesque Lunetten neighborhood, known for its tree-lined streets, green parks, and family-friendly ambiance. It\'s a peaceful respite within the city.',
                    alt: 'Road'
                },
                {
                    title: 'Houten\'s Quaint Charm',
                    imagePath: '../images/fourth/houten.jpg',
                    content: 'Arrive in Houten, a town famous for its cycling-friendly infrastructure, where you\'ll find charming streets, cozy cafes, and a warm welcome awaiting your arrival. Discover more about charming town of <a href="https://www.houten.nl/" target="_blank">Houten</a>.',
                    alt: 'Field'
                }
            ],
            tripFacts: [
                'Difficulty: Easy',
                'Distance: Approximately 10 kilometers (6.2 miles)',
                'Duration: 45 minutes to 1.5 hours, depending on your pace and stops',
                'Terrain: Mostly flat, with well-paved bike paths'
            ]
        }
    }
}

class CustomFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const body = document.getElementById('app')
        const footer = document.createElement('footer')
        footer.innerHTML = `<strong class="copyright">&copy; Copyright 2023</strong>
        <section class="contact-details">
            <img src="../images/mail.svg" alt="mail">
            <img src="../images/phone.svg" alt="phone">
            <img src="../images/instagram.svg" alt="instagram">
        </section>`
        body.appendChild(footer)
    }
}

class NavigationDrawer extends HTMLElement {
    static observedAttributes = ['selected-page']

    connectedCallback() {
        const body = document.getElementById('app')
        const aside = document.createElement('aside')
        aside.setAttribute('id', 'navigation-drawer')
        aside.className = 'drawer-closed'
        const navigationContent = document.createElement('section')
        navigationContent.className = 'navigation-content'
        const drawerHeader = this.getDrawerHeader()
        const divider = document.createElement('hr')
        navigationContent.appendChild(drawerHeader)
        navigationContent.appendChild(divider)
        const nav = document.createElement('nav')
        nav.className = 'drawer-navigation'
        const ul = document.createElement('drawer-navigation-list')
        ul.className = 'drawer-navigation-list'
        Router.routes.forEach((route) => {
            if (!route.hidden) {
                const li = document.createElement('li')
                li.innerText = route.name
                li.value = route.id
                if (route.id.toString() === this.getAttribute('selected-page')) {
                    li.className = 'selected-title'
                }
                li.onclick = (event) => {
                    Router.navigateById(li.value.toString())
                }
                ul.appendChild(li)
            }
        })
        nav.appendChild(ul)
        navigationContent.appendChild(nav)
        const contactUs = document.createElement('section')
        contactUs.className = 'contact-us-drawer'
        const contactDivider = document.createElement('hr')
        const span = document.createElement('span')
        span.innerText = 'Contact us'
        span.onclick = (event) => {
            Router.navigateById(6)
        }
        contactUs.appendChild(contactDivider)
        contactUs.appendChild(span)
        navigationContent.appendChild(contactUs)
        const overlay = document.createElement('section')
        overlay.setAttribute('id', 'overlay')
        overlay.onclick = () => {
            closeDrawer()
        }
        aside.appendChild(navigationContent)
        aside.appendChild(overlay)
        body.appendChild(aside)
    }

    getDrawerHeader() {
        const drawerHeader = document.createElement('section')
        drawerHeader.className = 'drawer-header'
        const logo = document.createElement('img')
        logo.setAttribute('src', './images/Logo.svg')
        logo.setAttribute('alt', 'Logo')
        const menu = document.createElement('img')
        menu.setAttribute('src', './images/menu.svg')
        menu.setAttribute('alt', 'Menu')
        menu.className = 'menu-icon'
        menu.onclick = (event) => {
            closeDrawer()
        }
        drawerHeader.appendChild(logo)
        drawerHeader.appendChild(menu)
        return drawerHeader
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const listItems = document.querySelectorAll('li')

        listItems.forEach((item) => {
            if (item.value.toString() === newValue) {
                item.className = 'selected-title'
            } else {
                item.className = ''
            }
        })
    }
}

customElements.define('custom-header', CustomHeader)
customElements.define('custom-footer', CustomFooter)
customElements.define('navigation-drawer', NavigationDrawer)
customElements.define('main-content', MainContent)

class Router {
    static navigateById(routeId) {
        const route = Router.routes.find((element) => {
            return routeId == element.id
        })
        this.navigate(route)
    }

    static navigateByName(routeName) {
        const route = Router.routes.find((element) => {
            return routeName == element.name
        })
        this.navigate(route)
    }

    static navigate(route) {
        if (!route) {
            return;
        }
        console.log('here')
        // history.pushState({ pageId: route.id }, '', route.name)
        window.location.hash = '#' + route.name
        const header = document.getElementById('custom-header')
        if (header && header.getAttribute('selected-page') !== route.id.toString()) {
            header.setAttribute('selected-page', route.id)
        }
        const mainContent = document.getElementById('main-content')
        mainContent?.setAttribute('page-id', route.id)
    }

    static routes = [
        {
            id: 1,
            name: 'Home'
        },
        {
            id: 2,
            name: 'Forest adventure'
        },
        {
            id: 3,
            name: 'Historical ride'
        },
        {
            id: 4,
            name: 'Utrecht urban escape'
        },
        {
            id: 5,
            name: 'Utrecht to Houten'
        },
        {
            id: 6,
            name: 'Contact us'
        },
        {
            id: 7,
            name: 'Redirect',
            hidden: true
        }
    ]
}

function goToRedirectPage() {
    Router.navigateById(7)
}

function goHome() {
    Router.navigateById(1)
}

function closeDrawer() {
    const drawer = document.getElementById('navigation-drawer')
    drawer.className = 'drawer-closed'
}