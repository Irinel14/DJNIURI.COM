document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function updateSliderPosition() {
        console.log('Updating slider position to index:', currentIndex);
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    leftArrow.addEventListener('click', () => {
        console.log('Left arrow clicked');
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
        console.log('Current index after left click:', currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        console.log('Right arrow clicked');
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSliderPosition();
        }
        console.log('Current index after right click:', currentIndex);
    });

    // Allow touch swiping for mobile devices
    let startX;
    let isDown = false;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        console.log('Mouse down:', startX);
    });

    slider.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        isDown = false;
        const endX = e.pageX;
        console.log('Mouse up:', endX);
        if (startX - endX > 50) {
            // Swipe left
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        } else if (endX - startX > 50) {
            // Swipe right
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        }
        console.log('Swipe action completed. Current index:', currentIndex);
    });

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        isDown = true;
        console.log('Touch start:', startX);
    });

    slider.addEventListener('touchend', (e) => {
        if (!isDown) return;
        isDown = false;
        const endX = e.changedTouches[0].pageX;
        console.log('Touch end:', endX);
        if (startX - endX > 50) {
            // Swipe left
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        } else if (endX - startX > 50) {
            // Swipe right
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        }
        console.log('Swipe action completed. Current index:', currentIndex);
    });

    slider.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            console.log('Mouse leave. Swipe action cancelled.');
        }
    });
});
