document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('favorite-coffee-form');
    const favoritesList = document.getElementById('favorites-list');
    const localStorageKey = 'favoriteCoffees';

    function renderFavorites() {
        favoritesList.innerHTML = '';

        const favorites = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        if (favorites.length === 0) {
            favoritesList.innerHTML = '<li>No favorites saved yet. Add one above!</li>';
            return;
        }

        favorites.forEach(favorite => {
            const listItem = document.createElement('li');
            listItem.textContent = `${favorite.name} (Method: ${favorite.method})`;
            favoritesList.appendChild(listItem);
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const coffeeName = document.getElementById('coffee-name').value.trim();
        const brewMethod = document.getElementById('brew-method').value.trim();

        if (coffeeName && brewMethod) {
            const favorites = JSON.parse(localStorage.getItem(localStorageKey)) || [];

            const newFavorite = {
                name: coffeeName,
                method: brewMethod
            };
            favorites.push(newFavorite);

            localStorage.setItem(localStorageKey, JSON.stringify(favorites));

            renderFavorites();

            form.reset();
        }
    });

    renderFavorites();
});