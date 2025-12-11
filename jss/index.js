// sidebar

var mainSidebar = document.getElementById("main-sidebar");
var sideMenuStrip = document.getElementById("side-menu-strip");

var navToggleIconContainer = document.getElementById("nav-toggle-icon");
var sidebarMenuList = document.getElementById("sidebar-menu-list");

var sidebarWidth = 250;


function openSidebar() {
    mainSidebar.style.marginLeft = '0px';
    sideMenuStrip.style.left = `${sidebarWidth}px`;

    navToggleIconContainer.innerHTML = `
        <i onclick="closeSidebar()" class="fa-solid fa-xmark fs-5"></i>
    `;

    sidebarMenuList.classList.add('show');
}

function closeSidebar() {
    mainSidebar.style.marginLeft = `-${sidebarWidth}px`;
    sideMenuStrip.style.left = '0px';

    navToggleIconContainer.innerHTML = `
        <i onclick="openSidebar()" class="fa-solid fa-bars fs-4"></i>
    `;

    sidebarMenuList.classList.remove('show');
}



// cards


let allMovies = [];
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMAGE = './images/weather iimages1.jpg';
const API_KEY = 'eba8b9a7199efdcb0ca1f96879b83c44';

const searchInput = document.querySelector('input');
const container = document.querySelector(".row.g-4");

searchInput.addEventListener('input', () => {
    filterMovies(searchInput.value.toLowerCase());
});


async function getMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
        const data = await response.json();

        allMovies = data.results;
        displayMovies(allMovies);

    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="col-12 text-center text-white">Failed to load trending items.</div>`;
    }
}

getMovies();


const filterMovies = (searchTerm) => {
    if (!searchTerm) {
        displayMovies(allMovies);
        return;
    }

    const filteredResults = allMovies.filter(item => {
        const title = item.title || item.name || '';
        return title.toLowerCase().includes(searchTerm);
    });

    displayMovies(filteredResults);
};


const getStars = (voteAverage) => {
    const ratingInFive = voteAverage / 2;

    const rating = Math.floor(ratingInFive + 0.5);

    const finalRating = Math.max(0, Math.min(5, rating));

    const starsHtml = Array(finalRating).fill(
        `<i class="fa-solid fa-star text-warning fs-6"></i>`
    ).join('');

    return starsHtml;
};


const displayMovies = (results) => {


    const movieCardsHtml = results.map(item => {
        const { poster_path, overview, vote_average } = item;

        const title = item.title || item.name || 'N/A';
        const releaseDate = item.release_date || item.first_air_date || 'N/A';

        const description = overview;
        const vote = vote_average ? vote_average.toFixed(1) : '0.0';
        const imageUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : PLACEHOLDER_IMAGE;
        const starRatingHtml = getStars(vote_average);

        return `
            <div class="Ourcard col-lg-4 col-md-6 col-sm-12 overflow-hidden">
                <div class="item overflow-hidden position-relative animate__fadeIn">
                    <div class="cardImage overflow-hidden animate__fadeIn">
                        <img src="${imageUrl}" class="img-fluid ">
                    </div>
                    
                    <div class="overlay overflow-hidden animate__fadeIn">
                        <h1 class="animate__animated title animate__slideOutLeft text-center h2 ">${title}</h1>
                        <p class="animate__animated desc animate__slideOutLeft f-p">${description}</p>
                        <p class="animate__animated date animate__slideOutLeft"><span class="fst-normal">Release
                            Date<span> : ${releaseDate}</span></span></p>
                        <h3 class="rate animate__animated animate__slideOutLeft">${starRatingHtml}</h3>
                        <p class="rate animate__animated vote animate__slideOutLeft h5 rounded-circle border border-success p-2">${vote}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = movieCardsHtml;
};





//  contact validation


var contactNameInput = document.querySelector('.contact input[placeholder="Enter Your Name"]');
var contactEmailInput = document.querySelector('.contact input[placeholder="Enter Your Email"]');
var contactPhoneInput = document.querySelector('.contact input[placeholder="Enter Your Phone"]');
var contactAgeInput = document.querySelector('.contact input[placeholder="Enter Your Age"]');
var contactPasswordInput = document.querySelector('.contact input[placeholder="Enter Your Password"]');
var contactRePasswordInput = document.querySelector('.contact input[placeholder="ReEnter Password"]');
var submitBtn = document.querySelector('.contact .button-main');
var eyeIcon = contactPasswordInput.nextElementSibling;
var passP = document.querySelector('.pass-p');

var nameAlert = contactNameInput.parentElement.nextElementSibling;
var emailAlert = contactEmailInput.parentElement.nextElementSibling;
var phoneAlert = contactPhoneInput.parentElement.nextElementSibling;
var ageAlert = contactAgeInput.parentElement.nextElementSibling;
var passwordAlert = contactPasswordInput.parentElement.parentElement.nextElementSibling;
var rePasswordAlert = contactRePasswordInput.parentElement.nextElementSibling;

function updateValidationState(input, alert, isValid ) {
    if (isValid) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        alert.classList.replace("d-block", "d-none");

        submitBtn.classList.replace('btn-danger' , 'btn-white' )
        passP.classList.add('d-none')
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        alert.classList.replace("d-none", "d-block");

        submitBtn.classList.replace('btn-white', 'btn-danger')
        passP.classList.remove('d-none')
    }
}


function validateContactName() {
    var nameregex = /^[a-zA-Z\s]{3,}$/;
    var isValid = nameregex.test(contactNameInput.value);
    updateValidationState(contactNameInput, nameAlert, isValid);
    return isValid;
}

function validateContactEmail() {
    var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var isValid = emailregex.test(contactEmailInput.value);
    updateValidationState(contactEmailInput, emailAlert, isValid);
    return isValid;
}

function validateContactPhone() {
    var phoneRegex = /^\+?\d{10,11}$/;
    var isValid = phoneRegex.test(contactPhoneInput.value.replace(/[\s-]/g, ''));
    updateValidationState(contactPhoneInput, phoneAlert, isValid);
    return isValid;
}

function validateContactAge() {
    var age = parseInt(contactAgeInput.value);
    var isValid = !isNaN(age) && age >= 16 && age <= 100;
    updateValidationState(contactAgeInput, ageAlert, isValid);
    return isValid;
}

function validateContactPassword() {
    var Passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var isValid = Passwordregex.test(contactPasswordInput.value);
    updateValidationState(contactPasswordInput, passwordAlert, isValid);
    return isValid;
}

function validateContactRePassword() {
    var isValid = contactRePasswordInput.value === contactPasswordInput.value && contactRePasswordInput.value !== "";
    updateValidationState(contactRePasswordInput, rePasswordAlert, isValid);
    return isValid;
}


function togglePasswordVisibility() {
    if (contactPasswordInput.type === "password") {
        contactPasswordInput.type = "text";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        contactPasswordInput.type = "password";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    }
}


function validateContactForm(e) {

    if (e) e.preventDefault();


    var isFormValid = validateContactName() &
        validateContactEmail() &
        validateContactPhone() &
        validateContactAge() &
        validateContactPassword() &
        validateContactRePassword();

    if (isFormValid) {
        console.log(" successfully ");

        document.querySelector('.contact form').reset();



        const inputs = document.querySelectorAll('.contact input');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });

    } else {
        console.log(" Error ");


    }
}

contactNameInput.addEventListener('input', validateContactName);
contactEmailInput.addEventListener('input', validateContactEmail);
contactPhoneInput.addEventListener('input', validateContactPhone);
contactAgeInput.addEventListener('input', validateContactAge);
contactPasswordInput.addEventListener('input', validateContactPassword);
contactRePasswordInput.addEventListener('input', validateContactRePassword);

submitBtn.addEventListener('click', validateContactForm);





// sidebar anchors

const API_BASE_PATH = 'https://api.themoviedb.org/3';

async function fetchMovies(endpointPath = '/trending/all/day') {
    try {

        container.innerHTML = `<div class="col-12 text-center text-white"><i class="fa-solid fa-spinner fa-spin-pulse fa-3x"></i></div>`;

        const URL = `${API_BASE_PATH}${endpointPath}?api_key=${API_KEY}`;

        const response = await fetch(URL);
        const data = await response.json();

        allMovies = data.results;
        displayMovies(allMovies);

    } catch (error) {
        console.error("Error", error);
        container.innerHTML = `<div class="col-12 text-center text-white">Failed to load items. Please try again.</div>`;
    }
}

fetchMovies();


