import data from "./lib/data.js"

/** Elements */
const btnEl = document.querySelector(".hamburger__menu")
console.log(btnEl)

const linksEl = document.querySelector('.permalinks')





btnEl.addEventListener('click', function () {
    linksEl.classList.toggle('show')

})


function readData(userData) {
    let items = `
        <article class="portfolio__item">
            <div class="portfolio__item-img">
                <img src="${userData.image}" alt="${userData.title}" />
            </div>
            <h3>${userData.title}</h3>
            <div class="portfolio__item-cta">
                <a
                    href="${userData.githubUrl}"
                    class="btn__red res__download"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github
                </a>
                <a
                    href="${userData.url && userData.webUrl}"
                    class="btn__red res__download"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Live Demo
                </a>
            </div>
        </article>
    `;

    document.querySelector(".portfolio__container").innerHTML += items;
}

function userData() {
    return data.forEach((value) => readData(value));
}

userData();
