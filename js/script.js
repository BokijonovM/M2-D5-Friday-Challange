const hideAppear = function () {
    let iconId = document.getElementById("search-icon-nav")
    let searchInput = document.getElementById("nav-form-control")
    iconId.style.display = "none"
    searchInput.style.display = "block"
}
const hideAppear1 = function () {
    let iconId = document.getElementById("search-icon-nav")
    let searchInput = document.getElementById("nav-form-control")
    iconId.style.display = "block"
    searchInput.style.display = "none"
}


// Fetching

async function getCategories() {
    let response = await fetch('https://striveschool-api.herokuapp.com/api/movies/', {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2MzkxMzk4OTIsImV4cCI6MTY0MDM0OTQ5Mn0.DT_Ay4de_IDGvXgWg1I1ksPDwlbYY_opUvt8rkgSYaU",
            "Content-Type": "application/json",
        },
    })
    let categories = await response.json()
    categories.pop()
    createSections(categories)
    loadTitles(categories)

}


function createSections(categories) {
    let categoriesDeck = document.querySelector('.genres-title')

    categories.forEach(category => {
        let newSection = document.createElement('section')
        newSection.classList.add('m-0', 'flex-column', 'pb-0')

        let sectionTitle = document.createElement('h5')
        sectionTitle.classList.add('m-0', 'row', 'mb-3')
        sectionTitle.innerText = category
        newSection.appendChild(sectionTitle)

        let productDeck = document.createElement('div')
        productDeck.classList.add('row', 'mx-0', 'productsDeck')
        productDeck.id = category
        newSection.insertAdjacentElement('beforeend', productDeck)

        categoriesDeck.insertAdjacentElement('afterbegin', newSection)
    });

}

window.onload = () => {
    getCategories()

}

async function loadTitles(categories) {

    categories.forEach(async function (category) {
        let titles = await getTitles(category)

        titles.forEach(title => {

            let categorySection = document.querySelector(`#${title.category}`)
            categorySection.insertAdjacentHTML("afterbegin", `${generateTitlesHTML(title)}`)

        })
        cardsResponsive()

    })

}

async function getTitles(category) {
    let response = await fetch(`https://striveschool-api.herokuapp.com/api/movies/${category}`, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2MzkxMzk4OTIsImV4cCI6MTY0MDM0OTQ5Mn0.DT_Ay4de_IDGvXgWg1I1ksPDwlbYY_opUvt8rkgSYaU",
            "Content-Type": "application/json",
        },
    })
    let titles = await response.json()
    return titles
}


function generateTitlesHTML(title) {
    return `
        <div class="card col-3 align-items-center mb-4 bg-transparent img-hover-zoom">
            <a href="../back-office.html?movie_Id=${title._id}&category=${title.category}"><img src="${title.imageUrl}" class="card-img-top" alt="...">  </a>  
            
        </div>
    `
}
//<a class="text-white" href="../back-office.html?movie_Id=${title._id}&category=${title.category}"></a>   



let test
function cardsResponsive() {
    let cards = document.querySelectorAll('.card')
    let aux = 0
    cards.forEach(card => {

        if (aux === 0 || aux === 1) {
            card.classList.add('d-sm-flex')
        }

        if (aux === 2 || aux === 3) {
            card.classList.add('d-md-flex')
        }


        if (aux === 4) {
            card.classList.add('d-lg-flex')
        }
        if (aux === 5) {
            card.classList.add('d-xl-flex')
        }

        if (aux === 6) {
            card.classList.add('d-xl-flex')
            aux = 0
            return
        }
        aux++
    })

}








// async function getMovies() {
//     try {
//         let movieJSON = await fetch("https://striveschool-api.herokuapp.com/api/movies", {
//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2MzkxMzk4OTIsImV4cCI6MTY0MDM0OTQ5Mn0.DT_Ay4de_IDGvXgWg1I1ksPDwlbYY_opUvt8rkgSYaU"
//                 ,
//             }
//         })
//         let movieList = await movieJSON.json()
//         movieList.shift()

//         let brandList = getNames(movieList)
//         createSections(brandList)
//         appendCards(movieList)

//     } catch (e) {
//         console.log(e)
//         alert(e)
//     }
// }

// window.onload = () => {
//     getMovies()

// }
// function createSections(names) {
//     let hero = document.querySelector('.list-movies')
//     names.forEach(name => {
//         let newSection = document.createElement('section')
//         newSection.classList.add('container', 'px-0')

//         let sectionTitle = document.createElement('h2')
//         sectionTitle.classList.add('row', 'mx-0')
//         sectionTitle.innerText = name
//         newSection.appendChild(sectionTitle)

//         let productDeck = document.createElement('div')
//         productDeck.classList.add('row', 'productsDeck')
//         newSection.insertAdjacentElement('beforeend', productDeck)

//         hero.insertAdjacentElement('afterend', newSection)
//     });

// }

// function getNames(data) {
//     let names = []
//     data.filter(movie => {
//         if (names.includes(movie.name) === false)
//             names.push(movie.name)
//     })
//     return names
// }

// function generateCards(movie) {
//     return `
//             <div class="col-sm-5 col-md-4 col-lg-3 col-xl-2 pt-2 pb-2 pl-0 pr-1 img-hover-zoom">
//                 <img src="${movie.imageUrl}" class="card-img-top" alt="..." width="100%" height="100%" />
//                 <h5 class="card-title text-truncate d-none">Name: ${movie.name}</h5>
//                 <span class="badge badge-warning mx-3 d-none">${movie.category}</span>
//                 <p class="card-text mb-3" id="description d-none">Description:  ${movie.description}</p>
//             </div>
//             `
// }


// function appendCards(movies) {
//     movies.forEach(movie => {

//         let sectionToInsert = document.querySelector(`#${movie.name.toLowerCase()}`)

//         sectionToInsert.insertAdjacentHTML('beforeend', `${generateCards(movie)}`)
//     })
// }



