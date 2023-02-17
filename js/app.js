let innercircle = document.getElementById("innercircle");
let button = document.getElementById("spin");
let popupImage = document.getElementById("popup-image");
let popupOverlay = document.getElementById("popup-overlay");
let popupImageLost = document.getElementById("popup-image-lost");
let popupOverlayLost = document.getElementById("popup-overlay-lost");


button.addEventListener("click", function () {
    // Запускаем вращение колеса
    let duration = 20000; // Длительность вращения в миллисекундах
    let startTime = Date.now();
    let possibleAngles = [45, 90, 135, 170, 190, 225, 270, 315, 360];
    let resultAngle = possibleAngles[Math.floor(Math.random() * possibleAngles.length)];

    let spinWheel = function () {
        let elapsedTime = Date.now() - startTime;
        let progress = elapsedTime / duration;
        let angle = 720 * progress * (1 - progress); // Угол поворота в градусах
        button.style.animationPlayState = 'paused'
        if (progress < 0.2) {
            // Колесо продолжает вращаться быстро
            innercircle.style.transform = "rotate(" + angle + "deg)";
            setTimeout(spinWheel, 16); // Повторяем через 16 миллисекунд
        } else {
            // Колесо замедляется и останавливается
            let slowProgress = (progress - 0.8) / 0.2; // Прогресс замедления
            let slowAngle = angle + (resultAngle - angle) * slowProgress; // Угол замедления
            innercircle.style.transform = "rotate(" + slowAngle + "deg)";
            if (slowProgress < 1) {
                setTimeout(spinWheel, 16); // Повторяем через 16 миллисекунд
            } else {
                // Вращение завершено, показываем изображение
                if (resultAngle <= 45 || resultAngle <= 180) {
                    popupImage.style.opacity = "1";
                    popupOverlay.style.opacity = "1";
                    popupOverlay.style.zIndex = "9999999";
                    // Закрытие поп-апа при клике на сам поп-ап
                    popupImage.addEventListener("click", function () {
                        popupImage.style.opacity = "0";
                        popupOverlay.style.opacity = "0";
                        popupOverlay.style.zIndex = "0";
                        button.style.animationPlayState = 'running'

                    });

                    // Закрытие поп-апа при клике на область за ним
                    popupOverlay.addEventListener("click", function () {
                        popupImage.style.opacity = "0";
                        popupOverlay.style.opacity = "0";
                        popupOverlay.style.zIndex = "0";
                        button.style.animationPlayState = 'running'

                    });
                } else if (resultAngle >= 181 || resultAngle >= 315) {
                    popupImageLost.style.opacity = "1";
                    popupOverlayLost.style.opacity = "1";
                    popupOverlayLost.style.zIndex = "9999999";

                    // Закрытие поп-апа при клике на сам поп-ап
                    popupImageLost.addEventListener("click", function () {
                        popupImageLost.style.opacity = "0";
                        popupOverlayLost.style.opacity = "0";
                        popupOverlayLost.style.zIndex = "0";
                        button.style.animationPlayState = 'running'

                    });

                    // Закрытие поп-апа при клике на область за ним
                    popupOverlayLost.addEventListener("click", function () {
                        popupImageLost.style.opacity = "0";
                        popupOverlayLost.style.opacity = "0";
                        popupOverlayLost.style.zIndex = "0";
                        button.style.animationPlayState = 'running'

                    });
                }
            }
        }
    };
    window.onload = function () {
        innercircle.classList.add("spin-animation-innercircle");
        button.classList.add('spin-animation-btn');
        setTimeout(function () {
            innercircle.classList.add("stopped");
            setTimeout(function () {
                innercircle.classList.remove("spin-animation-innercircle");
                innercircle.classList.remove("stopped");
            }, 300);
        }, 2000);
    };
    // Запускаем вращение колеса
    spinWheel();
});