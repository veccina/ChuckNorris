document.addEventListener('DOMContentLoaded', function() {
    const jokeElement = document.getElementById('joke');
    const newJokeBtn = document.getElementById('newJokeBtn');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const favoritesList = document.getElementById('favoritesList');

    const fetchJoke = async () => {
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            if (!response.ok) throw new Error('Failed to fetch the joke');
            const data = await response.json();
            jokeElement.textContent = data.value;
            jokeElement.style.opacity = 1;
        } catch (error) {
            jokeElement.textContent = 'Failed to load a joke!';
            console.error('Error:', error);
        }
    };

    const updateFavoritesUI = () => {
        favoritesList.innerHTML = '';
        const favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
        favorites.forEach((joke, index) => {
            const li = document.createElement('li');
            li.textContent = joke;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Kaldır';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = () => removeFavorite(index);
            li.appendChild(removeBtn);
            favoritesList.appendChild(li);
        });
    };

    const addFavorite = () => {
        const joke = jokeElement.textContent;
        let favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
        favorites.push(joke);
        localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
        updateFavoritesUI();
    };

    const removeFavorite = (index) => {
        let favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
        favorites.splice(index, 1);
        localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
        updateFavoritesUI();
    };

    favoriteBtn.addEventListener('click', addFavorite);
    newJokeBtn.addEventListener('click', function() {
        jokeElement.style.opacity = 0;
        setTimeout(fetchJoke, 500);
    });

    fetchJoke();
    updateFavoritesUI();
});

function shareJoke(platform) {
    const joke = document.getElementById('joke').textContent;
    let url = '';
    if (platform === 'twitter') {
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(joke)}`;
    } else if (platform === 'facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.location.href)}&quote=${encodeURIComponent(joke)}`;
    }
    window.open(url, '_blank');
}
