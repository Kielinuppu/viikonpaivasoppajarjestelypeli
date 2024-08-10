document.addEventListener('DOMContentLoaded', (event) => {
    const imagesContainer = document.querySelector('.image-zone');
    const images = Array.from(document.querySelectorAll('.draggable'));
    const dropBoxes = Array.from(document.querySelectorAll('.drop-box'));
    const resultContainer = document.getElementById('result-container');
    const playAgainButton = document.getElementById('playAgain');

    let draggedItem = null;
    let currentDay = 1;
    const correctOrder = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'];

    images.forEach(img => {
        img.addEventListener('dragstart', dragStart);
        img.addEventListener('dragend', dragEnd);
    });

    dropBoxes.forEach(box => {
        box.addEventListener('dragover', dragOver);
        box.addEventListener('drop', drop);
    });

    playAgainButton.addEventListener('click', resetGame);

    function dragStart() {
        draggedItem = this;
        setTimeout(() => this.style.opacity = '0.5', 0);
    }

    function dragEnd() {
        setTimeout(() => this.style.opacity = '1', 0);
        draggedItem = null;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const boxIndex = parseInt(this.getAttribute('data-index'));
        const imageIndex = parseInt(draggedItem.getAttribute('data-index'));

        if (boxIndex === currentDay) {
            if (imageIndex === currentDay) {
                this.appendChild(draggedItem);
                draggedItem.style.cursor = 'default';
                draggedItem.setAttribute('draggable', 'false');
                this.classList.add('correct');
                playSound(draggedItem.getAttribute('data-audio'));
                currentDay++;
                
                // Poista punainen reunus kaikista kuvista
                images.forEach(img => img.classList.remove('incorrect'));
                dropBoxes.forEach(box => box.classList.remove('incorrect'));
                
                checkGameStatus();
            } else {
                draggedItem.classList.add('incorrect');
            }
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
            if (box.firstChild) {
                imagesContainer.appendChild(box.firstChild);
            }
            box.classList.remove('correct', 'incorrect');
        });
        images.forEach(img => {
            img.style.opacity = '1';
            img.style.cursor = 'grab';
            img.setAttribute('draggable', 'true');
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