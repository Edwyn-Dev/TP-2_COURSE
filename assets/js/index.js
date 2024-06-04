const articles = [
    "Orangina",
    "Creme Fraiche",
    "Tartiflette",
    "Emmental",
    "Bananes",
    "Chips",
    "Bieres",
    "Pizza"
];

// Ajout d'un tableau pour suivre les éléments masqués
const hiddenItems = new Set(); // Utilisation d'un Set pour suivre les indices des articles masqués

// Fonction pour afficher les articles de la liste de courses
function displayItems() {
    const listeCourse = document.getElementById('listeCourse'); // Récupère l'élément HTML où afficher la liste
    listeCourse.innerHTML = ''; // Réinitialise le contenu de la liste
    articles.forEach((item, index) => { // Parcourt chaque article
        const li = document.createElement('li'); // Crée un élément de liste
        // Ajoute le nom de l'article et les boutons d'actions (masquer/démasquer et supprimer)
        li.innerHTML = `
        <span onclick="toggleItem(${index})">
            ${hiddenItems.has(index) ? '[Démasqué]' : '[X]'}
            <span style="color:#000">
                ${item}
            </span>
        </span>
        <button onclick="removeItem(${index})" ${hiddenItems.has(index) ? 'disabled' : ''}>
            Supprimer
        </button>`;
        if (hiddenItems.has(index)) { // Si l'article est masqué
            li.classList.add('hidden'); // Ajoute une classe CSS pour masquer l'article
        }
        listeCourse.appendChild(li); // Ajoute l'élément à la liste
    });
    updateItemsDisplay(); // Met à jour l'affichage des articles masqués
}

// Fonction pour basculer l'état d'affichage d'un article (masquer/démasquer)
function toggleItem(index) {
    if (hiddenItems.has(index)) {
        hiddenItems.delete(index); // Si l'article est masqué, le retirer de hiddenItems
    } else {
        hiddenItems.add(index); // Sinon, l'ajouter à hiddenItems
    }
    displayItems(); // Réafficher la liste mise à jour
}

// Fonction pour ajouter un nouvel article
function addItem() {
    const newItem = document.getElementById('newItem').value; // Récupère la valeur de l'input
    if (newItem) { // Si l'input n'est pas vide
        articles.push(newItem); // Ajoute le nouvel article à la liste
        displayItems(); // Réaffiche la liste mise à jour
        document.getElementById('newItem').value = ''; // Vide l'input
    }
}

// Fonction pour supprimer un article
function removeItem(index) {
    if (!hiddenItems.has(index)) { // Vérifie si l'élément est masqué, s'il l'est, ne pas le supprimer
        articles.splice(index, 1); // Supprime l'article de la liste
        // Mise à jour des indices dans hiddenItems
        const newHiddenItems = new Set();
        hiddenItems.forEach((i) => {
            if (i > index) {
                newHiddenItems.add(i - 1); // Ajuste les indices des éléments masqués
            } else if (i < index) {
                newHiddenItems.add(i);
            }
        });
        hiddenItems.clear(); // Vide l'ancien set
        newHiddenItems.forEach((i) => hiddenItems.add(i)); // Met à jour hiddenItems
        displayItems(); // Réaffiche la liste mise à jour
    }
}

// Fonction pour supprimer le dernier article
function removeLastItem() {
    const lastIndex = articles.length - 1; // Récupère l'index du dernier article
    articles.pop(); // Supprime le dernier article de la liste
    hiddenItems.delete(lastIndex); // Supprime l'index de l'élément masqué si existant
    displayItems(); // Réaffiche la liste mise à jour
}

// Fonction pour mettre à jour l'affichage des articles
function updateItemsDisplay() {
    const itemsDisplay = document.getElementById('itemsDisplay'); // Récupère l'élément HTML où afficher les articles
    itemsDisplay.innerHTML = `<h1>Contenu du tableau :</h1><hr>`; // Initialise l'affichage
    articles.forEach((item, index) => { // Parcourt chaque article
        const span = document.createElement('span'); // Crée un élément de span
        span.innerText = item; // Ajoute le nom de l'article
        if (hiddenItems.has(index)) { // Si l'article est masqué
            span.style.textDecoration = 'line-through'; // Ajoute un style de texte barré
            span.style.color = 'red'; // Change la couleur du texte
            span.style.opacity = '0.25'; // Diminue l'opacité du texte
        }
        itemsDisplay.appendChild(span); // Ajoute l'article à l'affichage
        itemsDisplay.innerHTML += ' | '; // Ajoute un séparateur entre les articles
    });
    itemsDisplay.innerHTML += '<hr>'; // Ajoute une ligne de séparation
}

// Initialise la liste au chargement de la page
window.onload = displayItems; // Appelle displayItems() lorsque la page est chargée
