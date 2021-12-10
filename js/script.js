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
    let categoriesDeck = document.querySelector('.movie-categories-html')

    categories.forEach(category => {
        let newSection = document.createElement('a')
        newSection.classList.add('row', 'dropdown-item', 'm-0', 'pb-0')

        let sectionTitle = document.createElement('row')
        sectionTitle.classList.add('m-0')
        sectionTitle.innerText = category
        newSection.appendChild(sectionTitle)

        let productDeck = document.createElement('div')
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
        <div class="card d-none col align-items-center mb-4 py-4 px-1">
                <img src="${title.imageUrl}" class="card-img-top img-fluid" alt="...">       
            <a href="./backoffice.html?movie_Id=${title._id}&category=${title.category}" class="mt-3"> Edit</a>
        </div>
    `
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



