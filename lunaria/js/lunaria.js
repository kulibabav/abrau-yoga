NodeList.prototype.forEach = Array.prototype.forEach;

window.addEventListener("load", function() { setTimeout(function() {

document.querySelectorAll('[data-active-label]').forEach( function(el) {
    var activeId = el.getAttribute('data-active-label');
    var activeSelector = activeId == '' ? '[data-active-label]' : '[data-active-label = "' + activeId + '"].active';
    el.addEventListener('click', function() {
        if (!el.classList.contains('active')) {
            document.querySelectorAll(activeSelector).forEach( function(active_el) {
                active_el.classList.remove('active');
            });
            var labelFor = el.getAttribute('for');
            document.querySelectorAll('[for = "' + labelFor + '"]').forEach( function(current_for) {
                current_for.classList.add('active');
            });
        };
    });
});

document.querySelectorAll('[data-modal-full]').forEach( function(el) {
    var targetName = el.getAttribute('data-modal-full');
    var targetEl = document.querySelector('[data-name = "' + targetName + '"]');
    el.addEventListener('click', function() {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            targetEl.classList.remove('modal-full');
        } else {
            document.querySelectorAll('[data-modal-full].active').forEach( function(activeEl) {
                var activeTargetName = activeEl.getAttribute('data-modal-full');
                var activeTargetEl = document.querySelector('[data-name = "' + activeTargetName + '"]');
                activeEl.classList.remove('active');
                activeTargetEl.classList.remove('modal-full');
            });
            el.classList.add('active')
            targetEl.classList.add('modal-full');
        };
    });
});

document.querySelectorAll('[data-thumb]').forEach( function(el) {
    var targetName = el.getAttribute('data-thumb');
    var targetEl = document.querySelector('[data-display = "' + targetName + '"]');
    el.addEventListener('click', function() {
        if (!el.classList.contains('active')) {
            document.querySelectorAll('[data-thumb = "' + targetName + '"].active').forEach( function(activeEl) {
                activeEl.classList.remove('active');
            });
            el.classList.add('active')
            targetEl.src = el.src;
        };
    });
});

document.querySelectorAll('[data-email-form]').forEach( function(form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(form);
        var XHR = new XMLHttpRequest();
        XHR.open('POST', 'php/sendmail.php', true);
        XHR.onload = function() {
            var updateInfo = form.querySelector('[data-form-message]'); 	
            if (XHR.responseText == 'true') {
                updateInfo.classList.remove('color-important');
                updateInfo.classList.add('color-success');
                updateInfo.innerHTML = 'Запрос успешно отправлен';
            } else {
                updateInfo.classList.remove('color-success');
                updateInfo.classList.add('color-important');
                updateInfo.innerHTML = 'Ошибка при отправке';
            };
        };
        XHR.send(formData);
        return false;
    });
});

document.querySelectorAll('[data-slider]').forEach( function(el) {
    var slider = new Slider(el);
    slider.init();
});

}, 1000) });

function Slider(slider) {
    var thisObject = this;
    thisObject.slider = slider;
    thisObject.config = config;
    thisObject.init = function() {
        thisObject.transition = false;
        // Определем контейнер слайдов
        thisObject.container = thisObject.slider.querySelector('[data-slides]');
        // Определяем исходное количество слайдов
        var slides = thisObject.container.querySelectorAll('[data-slide]');
        thisObject.count = slides.length;
        // Проверяем требуется ли инициализация
        var slideHeight = slides[0].offsetHeight;
        if (thisObject.count == 1 || thisObject.container.offsetHeight != slideHeight) return false;
        // Определяем текущую ширину слайда
        thisObject.slideWidth = slides[0].getBoundingClientRect().width;
        // Клонируем слайды слева и справа
        thisObject.container.innerHTML = thisObject.container.innerHTML + thisObject.container.innerHTML + thisObject.container.innerHTML;
        // Задаем индекс текущего слайда (с учетом клонирования)
        thisObject.current = thisObject.count;
        // Делаем первоначальное смещение и вешаем его на изменение размера окна
        thisObject.animation(false);
        thisObject.transit();
        window.addEventListener('resize', function() {
            thisObject.slideWidth = thisObject.container.querySelector('[data-slide]').getBoundingClientRect().width;
            thisObject.animation(false);
            thisObject.transit();
        });
        // Определяем список элементов управления
        thisObject.controls = thisObject.slider.querySelectorAll('[data-slide-left], [data-slide-right]');
        // Навешиваем обработчики событий на элементы управления
        thisObject.controls.forEach( function(el) {
            if (el.hasAttribute('data-slide-left')) {
                el.addEventListener('click', thisObject.moveLeft);
            } else {
                el.addEventListener('click', thisObject.moveRight);
            };
        });
        thisObject.controls.forEach( function(el) { el.classList.add('active') });
    };
    thisObject.move = function(shift) {
        thisObject.transition = true;
        thisObject.current = thisObject.current + shift;
        thisObject.animation(true);
        thisObject.transit();
        setTimeout(thisObject.checkFirstLast, 500);
    };
    thisObject.moveLeft = function() {
        if (thisObject.transition == false) thisObject.move(-1);
    };
    thisObject.moveRight = function() {
        if (thisObject.transition == false) thisObject.move(1);
    };
    thisObject.checkFirstLast = function() {
        if (thisObject.current == 0 || thisObject.current == 2 * thisObject.count) {
            thisObject.current = thisObject.count;
            thisObject.animation(false);
            thisObject.transit();
            thisObject.transition = false;
        } else {
            thisObject.transition = false;
        };
    };
    thisObject.animation = function(command) {
        if (command == true) {
            thisObject.container.style.transition = 'transform 0.5s ease';
        } else {
            thisObject.container.style.transition = 'unset';
        };
    };
    thisObject.transit = function() {
        thisObject.container.style.transform = 'translateX(-' + thisObject.current * thisObject.slideWidth + 'px)';
    };
};