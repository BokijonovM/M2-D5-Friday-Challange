let movieId
let category
let END_POINT
let method
window.onload = () => {
    movieId = new URLSearchParams(window.location.search).get('movie_Id')
    category = new URLSearchParams(window.location.search).get('category')
    END_POINT = movieId ? `https://striveschool-api.herokuapp.com/api/movies/` + movieId : "https://striveschool-api.herokuapp.com/api/movies/"
    method = movieId ? "PUT" : "POST"

    if (category)
        getTitleData(category)
}






async function getTitleInformation(e) {
    e.preventDefault()

    let body = {
        category: document.querySelector('#film_category').value,
        name: document.querySelector('#film_name').value,
        imageUrl: document.querySelector('#film_img').value,
        description: document.querySelector('#film_descr').value,
    }



    await sendTitleToServer(body)
}


async function sendTitleToServer(titleData) {
    try {
        let dataSent = await fetch(END_POINT, {
            method: method,
            body: JSON.stringify(titleData),
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2MzkxMzcyNTksImV4cCI6MTY0MDM0Njg1OX0.dxQCJ4P9B9hsCfAVADv3O3EEMc3fVV7XO3JdcwbB0eI",
                "Content-Type": "application/json",
            },
        })
        if (dataSent.ok != true)
            throw err
        let dataReceived = await dataSent.json()

        document.querySelector('form').reset()
        displayAlert('success', `${titleData.name} added successfully`)
    } catch (err) {
        displayAlert('danger', `${err}`)
    }

}


async function deleteTitle(e) {
    e.preventDefault()
    try {

        let dataDeleted = await fetch(END_POINT, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2MzkxMzcyNTksImV4cCI6MTY0MDM0Njg1OX0.dxQCJ4P9B9hsCfAVADv3O3EEMc3fVV7XO3JdcwbB0eI",
                "Content-Type": "application/json",
            },
        })
        if (dataDeleted.ok != true)
            throw err
        displayAlert('success', `Title deleted successfully`)

        setInterval(() => location.replace("file:///C:\Users\Muhsinjon Bokijonov\Documents\GitHub\M2-D5-Friday-Challange/index.html"), 3000)

    } catch (err) {
        displayAlert('danger', `${err}`)
    }

}


async function getTitleData(category) {
    console.log(category)
    try {

        let response = await fetch(`https://striveschool-api.herokuapp.com/api/movies/${category}/`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2MzkxMzcyNTksImV4cCI6MTY0MDM0Njg1OX0.dxQCJ4P9B9hsCfAVADv3O3EEMc3fVV7XO3JdcwbB0eI",
                "Content-Type": "application/json",
            },

        })
        if (response.ok != true)
            throw err
        document.getElementById("subtitle").innerText = "Edit Event"
        let moviesData = await response.json()
        let movie = moviesData.filter(movie => movie._id === movieId)

        let inputs = document.querySelectorAll('.form-control')
        inputs.forEach(input => {
            input.value = movie[0][`${input.id}`]
        })


        document.getElementById('sendBtn').innerText = 'Update movie'
        throw err
    } catch (err) {

    }

}






// Aux funcs
function displayAlert(status, msg) {
    let htmlRef = document.querySelector('nav')
    htmlRef.insertAdjacentHTML('afterend', `
                                                    <div class="alert alert-${status}" role="alert">
                                                        ${msg}
                                                    </div>`
    )
    setTimeout(() =>
        document.querySelector('.alert').remove(), 3000)
}









// function getMovies() {
//     let movie = {
//         name: document.getElementById('film_name').value,
//         category: document.getElementById('film_category').value,
//         imageUrl: document.getElementById('film_img').value,
//         description: document.getElementById('film_descr').value
//     }
//     let filmStringified = JSON.stringify(movie)
//     return filmStringified

// }



// async function insertMovie(e) {
//     try {

//         e.preventDefault()
//         let movie = getMovies()
//         let serverRes = await fetch("https://striveschool-api.herokuapp.com/api/movies", {
//             method: "POST",
//             body: movie,
//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2MzkxMzk4OTIsImV4cCI6MTY0MDM0OTQ5Mn0.DT_Ay4de_IDGvXgWg1I1ksPDwlbYY_opUvt8rkgSYaU",
//                 "Content-Type": "application/json",
//             }
//         })

//         let serverData = await serverRes.json()
//         console.log(serverData)
//         document.querySelector('form').reset()
//         alert(`${serverData.name} added successfully`)
//     } catch (e) {
//         alert(e)
//     }

// }

// let userId = new URLSearchParams(window.location.search).get('userId')
// const url = userId ? "https://striveschool-api.herokuapp.com/api/product/" + userId : "https://striveschool-api.herokuapp.com/api/product/"
// const method = userId ? "PUT" : "POST"


// window.onload = async () => {
//     console.log("URL", url)
//     console.log("METHOD", method)

//     const submitBtn = document.querySelector("button[type='submit']")

//     if (userId) {
//         document.getElementById("subtitle").innerText = "Edit Event"
//         try {
//             const response = await fetch(url, {
//                 headers: {
//                     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2Mzg5NzI4NjUsImV4cCI6MTY0MDE4MjQ2NX0.nLnmXj2cSk_s7mU43hZR2pjgHFHPydHPZLzMi8WQfsM",
//                     "Content-Type": "application/json",
//                 }
//             })
//             if (response.ok) {
//                 const userDetails = await response.json()
//                 console.log(userDetails)

//                 const { imageUrl, description, price, name, brand } = userDetails

//                 document.getElementById("prod_name").value = name
//                 document.getElementById("prod_price").value = price
//                 document.getElementById("prod_brand").value = brand
//                 document.getElementById("prod_img").value = imageUrl
//                 document.getElementById("prod_descr").value = description

//                 submitBtn.innerText = "Edit Event"
//                 submitBtn.classList.add("btn-success")
//             }
//         } catch (err) {
//             showAlert(err)
//         }
//     } else {
//         document.getElementById("subtitle").innerText = "Create an Event"
//         submitBtn.innerText = "Submit Event"
//         submitBtn.classList.add("btn-primary")
//     }

// }