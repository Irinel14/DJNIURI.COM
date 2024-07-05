document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 1; // Indexul curent al slide-ului, începând cu al doilea slide

    // Funcție pentru actualizarea poziției slider-ului
    function updateSliderPosition() {
        slider.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    // Setăm slide-urile inițiale pentru a asigura scroll-ul infinit
    slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
    });

    // Clonăm primul și ultimul slide pentru a permite scroll-ul infinit
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    // Inițializăm slider-ul la slide-ul curent
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;

    // Funcție pentru actualizarea slide-urilor la redimensionarea ferestrei
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.left = `${index * 100}%`;
        });
        slider.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    // Actualizăm slide-urile la redimensionarea ferestrei
    window.addEventListener('resize', updateSlides);

    // Logica pentru swipe pe dispozitive mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleGesture();
    });

    function handleGesture() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            currentIndex++;
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(${-currentIndex * 100}%)`;
        }

        if (touchEndX - touchStartX > 50) {
            // Swipe right
            currentIndex--;
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(${-currentIndex * 100}%)`;
        }

        // Verificăm dacă s-a ajuns la clonări și ajustăm currentIndex și transformarea slider-ului
        if (currentIndex >= slides.length) {
            setTimeout(() => {
                currentIndex = 1;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(${-currentIndex * 100}%)`;
            }, 500);
        }

        if (currentIndex < 0) {
            setTimeout(() => {
                currentIndex = slides.length - 2;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(${-currentIndex * 100}%)`;
            }, 500);
        }
    }

    // Eliminăm sagetile din colțul stânga jos
    const leftArrow = document.querySelector('.left-arrow');
    if (leftArrow) {
        leftArrow.style.display = 'none';
    }

    const rightArrow = document.querySelector('.right-arrow');
    if (rightArrow) {
        rightArrow.style.display = 'none';
    }
});
