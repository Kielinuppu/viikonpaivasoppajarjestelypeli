document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    
    function handleOrientation() {
        if (window.innerHeight > window.innerWidth) {
            // Pystysuunta
            container.style.transform = 'rotate(-90deg)';
            container.style.transformOrigin = 'left top';
            container.style.width = '100vh';
            container.style.height = '100vw';
            container.style.position = 'absolute';
            container.style.top = '100%';
            container.style.left = '0';
        } else {
            // Vaakasuunta
            container.style.transform = '';
            container.style.transformOrigin = '';
            container.style.width = '';
            container.style.height = '';
            container.style.position = '';
            container.style.top = '';
            container.style.left = '';
        }
    }

    // Kutsu funktiota heti ja aina kun ikkunan koko muuttuu
    handleOrientation();
    window.addEventListener('resize', handleOrientation);

    const imagesContainer = document.querySelector('.image-zone');
    const images = Array.from(document.querySelectorAll('.draggable'));
    const dropBoxes = Array.from(document.querySelectorAll('.drop-box'));
    const resultContainer = document.getElementById('result-container');
    const playAgainButton = document.getElementById('playAgain');

    let currentDay = 1;
    const correctOrder = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'];

    const wrongSound = new Audio('vaarin.mp3');

    images.forEach(img => {
        img.addEventListener('click', handleImageClick);
    });

    playAgainButton.addEventListener('click', resetGame);

    function handleImageClick() {
        const imageIndex = parseInt(this.getAttribute('data-index'));
        const targetBox = dropBoxes[currentDay - 1];

        if (imageIndex === currentDay) {
            targetBox.appendChild(this.cloneNode(true));
            this.style.visibility = 'hidden';
            targetBox.classList.add('correct');
            playSound(this.getAttribute('data-audio'));
            currentDay++;
            
            images.forEach(img => img.classList.remove('incorrect'));
            
            checkGameStatus();
        } else {
            this.classList.add('incorrect');
            wrongSound.play();
        }
    }

    function playSound(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
    }

    function checkGameStatus() {
        if (currentDay > 7) {
            resultContainer.classList.remove('hidden');
        }
    }

    function resetGame() {
        resultContainer.classList.add('hidden');
        currentDay = 1;
        dropBoxes.forEach(box => {
            box.innerHTML = '';
            box.classList.remove('correct', 'incorrect');
        });
        images.forEach(img => {
            img.style.visibility = 'visible';
            img.classList.remove('incorrect');
        });
        shuffleImages();
    }

    function shuffleImages() {
        const shuffledImages = images.sort(() => 0.5 - Math.random());
        imagesContainer.innerHTML = '';
        shuffledImages.forEach(img => imagesContainer.appendChild(img));
    }

    shuffleImages();
});