
// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
    const { name, portrait, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const liens = document.createElement("a");
        liens.setAttribute("href", `/photographer.html?id=${data.id}`);
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const pCountry = document.createElement('p');
        pCountry.textContent = country;
        pCountry.setAttribute("class", "p-country");
        const pCity = document.createElement('p');
        pCity.textContent = city;
        pCity.setAttribute("class", "p-city");
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.setAttribute("class", "p-tagline");

        const pPrice = document.createElement('p');
        pPrice.textContent = price;
        pPrice.setAttribute("class", "p-price");


        liens.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pCountry);
        article.appendChild(pPrice);
        article.appendChild(pTagline);

        return liens;
    }

    return { name, picture, getUserCardDOM };
}

