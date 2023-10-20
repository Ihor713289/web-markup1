class CustomHeader extends HTMLElement {
    static observedAttributes = ['selected-page']
    constructor() {
        super();
    }

    connectedCallback() {
        const body = document.getElementById('app')
        const header = document.createElement('header')
        const img = document.createElement('img')
        img.setAttribute('src', './images/Logo.svg')
        const nav = document.createElement('nav')
        const ul = document.createElement('ul')
        ul.className = 'navigation-list'
        Router.routes.forEach((route) => {
            const li = document.createElement('li')
            li.innerText = route.name
            li.value = route.id
            if (route.id.toString() === this.getAttribute('selected-page')) {
                li.className = 'selected-title'
            }
            li.onclick = (event) => {
                const header = document.getElementById('custom-header')
                header.setAttribute('selected-page', li.value.toString())
            }
            ul.appendChild(li)
        })
        nav.appendChild(ul)
        header.appendChild(img)
        header.appendChild(nav)
        body.appendChild(header)
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
        const mainContent = document.getElementById('main-content')
        mainContent?.setAttribute('page-id', newValue)
    }
}

class MainContent extends HTMLElement {
    static observedAttributes = ['page-id']

    connectedCallback() {}

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
            if (typeof html === "string" ) {
                contentContainer.innerHTML = html
            } else {
                contentContainer.appendChild(html)
            }
        }
    }

    getHtml() {
        switch (this.getAttribute('page-id')) {
            case '1':
                return this.getHomeContent()
            case '2':
                return this.getForestContent()
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
                            <button class="view-button">Read more</button>
                        </section>
                </article>
                <article class="article-preview">
                    <img class="article-preview-picture" src="../images/road.jpg" alt="Road">
                    <section class="article-description">
                        <h3>Historical ride</h3>
                        <p>This biking route seamlessly combines natural beauty, history, relaxation, and the whimsical joy of DuckCity. Revel in the serene riverside views, explore charming villages, savor refreshments at Theehuis Rhijnauwen, and create unforgettable memories with at DuckCity.</p>
                        <button class="view-button">Read more</button>
                    </section>
                </article>
                <article class="article-preview">
                    <img class="article-preview-picture" src="../images/utrecht.jpg" alt="Utrecht channels">
                    <section class="article-description">
                        <h3>Bunnik to Utrecht Urban Escape</h3>
                        <p>Embark on a captivating biking journey from the charming Bunnik to the vibrant heart of Utrecht.</p>
                        <button class="view-button">Read more</button>
                    </section>
                </article>
                <article class="article-preview">
                    <img class="article-preview-picture" src="../images/bridge.jpg" alt="Bridge">
                    <section class="article-description">
                        <h3>Utrecht to Houten</h3>
                        <p>Embark on a delightful biking journey from the heart of Utrecht to the charming town of Houten, weaving through the scenic neighborhood of Utrecht Lunetten. This route combines the vibrant energy of Utrecht with the tranquil charm of the countryside, offering a cycling experience that captures the essence of the region.</p>
                        <button class="view-button">Read more</button>
                    </section>
                </article>
            </section>
        </article>`
    }

    getForestContent() {
        const data = this.getForestData()
        const article = document.createElement('article')
        article.className = 'content-container'
        const title = document.createElement('h1')
        title.innerText = data.title
        article.appendChild(title)
        data.sections.forEach((section) => {
            const sectionElement = document.createElement('section')
            sectionElement.className = 'article-section'
            const image = document.createElement('img')
            image.className = 'article-picture'
            image.setAttribute('src', section.imagePath)
            image.setAttribute('alt', section.alt)
            sectionElement.appendChild(image)

            const contentSection = document.createElement('section')
            contentSection.className = 'article-content'
            const title = document.createElement('h3')
            title.innerText = section.title
            const content = document.createElement('p')
            content.innerText = section.content
            contentSection.appendChild(title)
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

    createArticlePage(data) {

    }

    getForestData() {
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
                    title: 'Forest magic',
                    imagePath: '../images/first/road.jpg',
                    content: 'Wind your way through a labyrinth of peaceful woodland trails, surrounded by towering trees and the soothing sounds of nature. The Nieuw Wulven Forest is a haven for those seeking a serene escape from the hustle and bustle of daily life.',
                    alt: 'Road'
                },
                {
                    title: 'Forest magic',
                    imagePath: '../images/first/field.jpg',
                    content: 'This route is perfect for families, offering a gentle, mostly flat terrain that\'s suitable for riders of all ages. It\'s an ideal outing for parents and children to enjoy together.',
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

customElements.define('custom-header', CustomHeader)
customElements.define('custom-footer', CustomFooter)
customElements.define('main-content', MainContent)

class Router {
    static navigate(routeId) {
        const index = Router.routes.findIndex((element) => {
            return routeId === element.id
        })
        if (!index) {
            throw new Error('No route was found!')
        }
        history.pushState()
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
        }
    ]
}