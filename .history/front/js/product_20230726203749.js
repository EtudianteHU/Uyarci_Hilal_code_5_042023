const url = new URL(window.location); // permet créer un objet "URL" à partir de "window.location" => window.location contient l'URL qui est dans la barre d'adresse du navigateur
const params = new URLSearchParams(url.search); // ici ça permet de créer un objet de type URLSearchParams qui va permettre de récupérer des paramètres qui sont dans l'URL
const id = params.get("id"); // permet de récupérer la valeur de la propriété "id" depuis l'URL (http://127.0.0.1:5500/front/html/product.html?id=a557292fe5814ea2b15c6ef4bd73ed83) ici, en faisait un param.get('id'), on récupére la valeur qui vient après le = c'est à dire "a557292fe5814ea2b15c6ef4bd73ed83" puis on stocke le résultat dans une constante grace au "const id = "

async function getProduct() {
    const data = await fetch(`http://localhost:3000/api/products/${id}`);
    // lorsque l'on fait une requete à un serveur (ici avec la méthode fetch), on ne reçoit pas la réponse tout suite
    // si on ne met pas d'await, la suite du code va etre exécutée meme si on n'a pas encore reçu la réponse
    // Le await permet de bloquer l'exécution tant que l'on n'a pas de réponse
    // A chaque fois que l'on une opération asynchrone, on va généralement utiliser un async await pour bloquer l'exécution
    location.reload();
    const product = await data.json();
    return product;
    // logs [{ name: 'Joker'}, { name: 'Batman' }]
}
// on récupére un objet
const product = await getProduct(); /* on récupére un objet {
    "colors": [
        "Pink",
        "White"
    ],
    "_id": "a557292fe5814ea2b15c6ef4bd73ed83",
    "name": "Kanap Autonoé",
    "price": 1499,
    "imageUrl": "http://localhost:3000/images/kanap04.jpeg",
    "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt": "Photo d'un canapé rose, une à deux place"
}*/
// color, _id, price, description sont des propriétés
// ce qui vient après les ":" correspond aux valeurs de chaque propriété
// pour récupérer une valeur d'une propriété, on utilise la sytnaxe suivante :
// nomDeMaVariable.nomDeMaPropriete
// Par ex: pour récupérer le prix, on fait product.price => la valeur retournée sera 1499

// Récupération de l'élément #title dans l'HTML
const nameContainer = document.querySelector("#title");
nameContainer.innerHTML = product.name;
// Récupération de l'élément  #price dans l'HTML
const priceContainer = document.querySelector("#price");
priceContainer.innerHTML = product.price;
// Récupération de l'élément #description dans L'HTML
const descriptionContainer = document.querySelector("#description"); // le querySelector a permis de récupérer l'élément #description dans l'HTML
descriptionContainer.innerHTML = product.description; // le innerHTML permet de remplacer de contenu de l'élément par celui qui est sur la droite après le égal (ici la valeur de la propriété "description")
// Récupération de l'élément #colors dans L'HTML
const optionContainer = document.querySelector("#colors");

// product.colors permet de récupérer la liste des couleurs (c'est un tableau)
// pour parcourir notre tableau, on va utiliser le forEach. Le paramètre de fonction forEach aura une valeur différente à chaque itération (une itération c'est un tour de boucle)
// dans notre exemple, element sera d'abord égal à "Pink", puis lors de la 2nde itération, il sera égal à White
product.colors.forEach((element) => {
    // le + permet de faire une concaténation, c'est à dire de conserver les données que l'on a ajoutée lors des précédentes itérations. Si on ne le met pas, alors notre liste déroulante que la dernière couleur et pas l'ensemble des couelurs

    optionContainer.innerHTML += ` <option value="${element}">${element}</option>`;
});

// identique à ce que l'on a fait au dessus :
/* const colors = products.colors 
colors.forEach((element) => {
    // le + permet de faire une concaténation, c'est à dire de conserver les données que l'on a ajoutée lors des précédentes itérations. Si on ne le met pas, alors notre liste déroulante que la dernière couleur et pas l'ensemble des couelurs
    console.log('couleur courante : ', element)
    optionContainer.innerHTML = ` <option value="${element}">${element}</option>`
})*/

// Récupération de l'élément .item__img dans L'HTML
const imageContainer = document.querySelector(".item__img");

imageContainer.innerHTML = ` <img src="${product.imageUrl}" alt="${product.altTxt}">`;

const btnSelector = document.querySelector("#addToCart");
btnSelector.addEventListener("click", (event) => {
    const selectedColor = document.querySelector("#colors").value;
    const quantityString = document.querySelector("#quantity").value;
    const quantityNumber = parseInt(quantityString); // parseInt =< convertit une chaine de caractère en  nombre entier
    if (quantityNumber <= 0 || quantityNumber > 100 || selectedColor === "") {
        // si la qté est inférieure à 0 ou supérieure à 100, on affiche un mesage d'erreur
        alert("Veuillez saisir une quantité et une color");
        return; // permet de ne pas exécuter la suite du code, comme il y a une erreur
    }

    const panierInString = localStorage.getItem("panier") || "[]"; // soit on récupère la valeur du panier dans le local storage, soit on met un tableau vide

    const panierObject = JSON.parse(panierInString); // meme chose :  JSON.parse(localStorage.getItem('panier'))

    const productFound = panierObject.find(
        (product) => product.id === id && product.color === selectedColor
    ); // la méthode fin retourne "undefined" si l'objet n'a pas été trouvé, ou l'objet si elle l'a trouvé

    if (productFound === undefined) {
        // ajouter le produit au panier

        const productToAdd = {
            id: id,
            color: selectedColor,
            quantity: quantityNumber,
        };
        // push permet d'ajouter un élément à un tableau
        panierObject.push(productToAdd);
    } else {
        // mettre à jour la quantité

        productFound.quantity = productFound.quantity + quantityNumber; // on ajoute la nouvelle quantité sélectionnée à l'ancienne
    }

    localStorage.setItem("panier", JSON.stringify(panierObject)); // JSON.stringiy permet de convertir un objet/tableau en chaine de caractères. C'est l'inverse de JSON.parse
    alert("La produit a été commandé");
    
});
