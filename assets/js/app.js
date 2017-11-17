var counter = function(e) {

    var wrapper = $(".form__text");
    var length = wrapper.val().length;
    var maxLength = 650;


    if (length >= maxLength && ( e.keyCode != 8 ||  e.keyCode != 46 ) ) {

        $(".textarea__counter .textarea__counter-text").html( length );

        $(".textarea__counter-max").addClass("red");


    } else	{

        $(".textarea__counter-max").removeClass("red");
        $(".textarea__counter .textarea__counter-text").html( length );

    }




};

$(".form__text").bind('keyup', counter);
$(".form__text").bind('keydown', counter);


//Placeholder
$(".placeholder").focus(function() {

    $(this).removeClass("italic");

}).blur(function() {

    if( !$(this).val().length ) $(this).addClass("italic");

});

// accord

$(".service__button").on("click", function(){
    var t = $(this);


    $(".service__prices").stop().slideUp(300);

    t.next(".service__prices").stop().slideToggle(300, function () {

        if( $(this).is(":visible") ) $(this).css("display", "flex");

    });

});

// map

ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("map", {
        center: [48.783943, 44.578888],
        zoom: 17,
        controls : []
    });

    // Создаем ломаную с помощью вспомогательного класса Polyline.
    var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин ломаной.
        [48.785628, 44.577351],
        [48.784561, 44.579164],
        [48.784409, 44.578965],
        [48.784146, 44.579392],
        [48.783868, 44.579025]
    ], {
        // Описываем свойства геообъекта.
        // Содержимое балуна.
        balloonContent: "Ломаная линия"
    }, {
        // Задаем опции геообъекта.
        // Отключаем кнопку закрытия балуна.
        balloonCloseButton: false,
        // Цвет линии.
        strokeColor: "#ff1c26",
        // Ширина линии.
        strokeWidth: 4,
        // Коэффициент прозрачности.
        strokeOpacity: 0.9
    });

    // Добавляем линии на карту.


    myPlacemark = new ymaps.Placemark([48.783943, 44.578888], {
        hintContent: 'АвтоДоп',
        balloonContent: 'Автосервис \ Мойка'
    });

    // Ползунок изменения масштаба
    myMap.controls.add('zoomControl', {
        float: 'none',
        position: { left: 10, top: 44 }
    });
    myMap.behaviors.disable(['scrollZoom']);
    myMap.geoObjects
        .add(myPlacemark)
        .add(myPolyline);
}

// smooth scroll

$(document).ready(function () {
    $('.header__item-link').click(function (e) {

        var href = $(this).attr('href');

        $('html, body').animate({
            scrollTop:  $(href).offset().top
        }, 500);

        e.preventDefault();
    })
});

// button up

$(document).ready(function () {
    var btn = $('.wrapper__button');

    btn.on('click', function (e) {
       $('html, body').animate({
           scrollTop: 0
       }, 500);

        e.preventDefault();
    });

    $(window).on('scroll', function () {

        var t = $(this),
            height = t.height(),
            top = t.scrollTop();

        if(top > height) {
            if(!btn.is(':visible')) {
                btn.show(300, function () {
                    if( $(this).is(":visible") ) $(this).css("display", "flex");
                });

            }
        }   else    {
            btn.hide();
        }
    });


});


// gallery

$(document).on("click", "#gallery--pic .preview", function(e) {

    var t = $(this);

    var src = t.attr("src");

    var currentImg =  $('.gallery__pictures-pic[src="'+src+'"]');

    var next = currentImg.parent("li").next("li").find(".gallery__pictures-pic");

    if( !next.length ) {
        var next = $(".gallery__pictures-pic:first-child");
    }

    goImg( next.attr("src") );

    e.preventDefault();
    e.stopPropagation();

});



function goImg( src ) {

    var gallery = $("#gallery--pic");


    //Если нет галереи, добавляем
    if( !gallery.length ) {


        if( $("body").append('<div id="gallery--pic" class="fixed">'+
                '<div class="container__pic">'+
                '<i class="fa fa-times-circle close"></i>'+
                '<img class="preview" />'+
                '</div>'+
                '</div>') ) {

            var gallery = $("#gallery--pic");

            gallery.find(".preview").attr({"src": src});
            gallery.fadeIn(300);


        }

        //Иначе просто показываем и меняем ссылку у превью
    } else {

        gallery.find(".preview").attr({"src": src});
        gallery.fadeIn(300);

    }


    $("body, html").css({"overflow":"hidden"});


}

$(".gallery__pictures-pic").click(function() {

    var t = $(this);

    var src = t.attr("src");

    goImg( src );

});

$(document).on("click", ".fixed", function() {

    $("#gallery--pic").fadeOut(300);
    $("body, html").css({"overflow":"auto"});

});

// comparison
$(document).ready(function () {
    $('#myImageCompare, #myImageCompare1').imagesCompare();
});

// slider section

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

(function( $ ){

    $.fn.mySlider = function( contentClass, slideClass, time, interval ) {



        return this.each(function( ) {


            var flag = false;
            var t = $(this);

            var content = t.find(contentClass);
            var slides = t.find(slideClass);

            var pointsClass = "points";
            var pointClass = "point";


            //Добавляем точки
            function renderPoints() {

                if( t.append('<div class="'+pointsClass+'"></div>') ) {

                    var points = t.find("."+pointsClass);

                    slides.each(function(i) {

                        $(this).attr({"slide": i});

                        points.append('<span class="'+pointClass+'" item="'+i+'"></span>');

                    });

                }

                return true;

            }

            //Слайдер
            function gogo( next ) {

                var active = t.find(".active_slide");

                //alert(slideClass)

                var next = next ? next : active.next(slideClass);

                clearInterval( sliderIntervalID );
                flag = true;



                //Если слайды закончились
                if( !next.length ) {


                    var i = 0;

                    content.animate({"left": 0}, time);

                    active.removeClass("active_slide");
                    t.find(slideClass+":first").addClass("active_slide");


                    t.find(".active_point").removeClass("active_point");
                    t.find("."+pointClass+':first').addClass("active_point");

                    flag = false;
                    return true;

                }

                content.stop().animate({"left": -next.position().left }, time, function() {

                    var i = next.attr("slide");

                    active.removeClass("active_slide");
                    next.addClass("active_slide");

                    t.find(".active_point").removeClass("active_point");
                    t.find("."+pointClass+'[item='+i+']').addClass("active_point");
                    flag = false;

                });


            }


            //Интервал карусели
            function sliderInterval() {

                return setInterval(function() {

                    gogo( false );


                }, interval);

            }

            var sliderIntervalID = sliderInterval();

            //Вешаем обработчик на батоны
            $(document).on("click", ".arrow__right", function() {

                if( !flag ) gogo( false );

            })


            //Вешаем обработчик на батоны
            $(document).on("click", ".arrow__left", function() {

                var active = t.find(".active_slide");
                var next = active.prev(slideClass);

                // gu

                if( next.length && !flag ) {

                    gogo( next );

                }

            })



            //Вешаем обработчик на батоны
            $(document).on("click", "."+pointsClass+" ."+pointClass, function() {

                var _this = $(this);

                if( _this.hasClass("active_point") ) return true;

                clearInterval( sliderIntervalID );

                var i = _this.attr("item");

                var next = t.find('[slide='+ i +']');
                var active = t.find(".active_slide");

                active.removeClass("active_slide");
                next.addClass("active_slide");

                t.find(".active_point").removeClass("active_point");
                t.find("."+pointClass+'[item='+i+']').addClass("active_point");

                if( !next.length ) return;




                content.stop().animate({"left": -next.position().left }, time, function() {




                    //Запускаем интервал
                    sliderIntervalID = sliderInterval();

                });

            })

            //Если батоны добавились, добавляем класс первой кнопке
            if( renderPoints() ) {

                t.find("."+pointsClass+" ."+pointClass+ ":first").addClass("active_point");
                t.find(slideClass+":first").addClass("active_slide");

            }

        })

    };
})( jQuery );

$("#slider").mySlider(".slider__list", ".slider__item", 1000, 4000);
$("#feedback__slider").mySlider(".feedback__slider-list", ".feedback__slider-item", 1000, 5000);


// smooth scroll to ads

$(document).ready(function () {

    $('.slider__link').click(function (e) {

        var href = $(this).attr('href');

        $('html, body').animate({
            scrollTop:  $(href).offset().top - ($(window).height()) / 4
        }, 500);

        e.preventDefault();
    });
});

// slider

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvdW50ZXIgPSBmdW5jdGlvbihlKSB7XG5cbiAgICB2YXIgd3JhcHBlciA9ICQoXCIuZm9ybV9fdGV4dFwiKTtcbiAgICB2YXIgbGVuZ3RoID0gd3JhcHBlci52YWwoKS5sZW5ndGg7XG4gICAgdmFyIG1heExlbmd0aCA9IDY1MDtcblxuXG4gICAgaWYgKGxlbmd0aCA+PSBtYXhMZW5ndGggJiYgKCBlLmtleUNvZGUgIT0gOCB8fCAgZS5rZXlDb2RlICE9IDQ2ICkgKSB7XG5cbiAgICAgICAgJChcIi50ZXh0YXJlYV9fY291bnRlciAudGV4dGFyZWFfX2NvdW50ZXItdGV4dFwiKS5odG1sKCBsZW5ndGggKTtcblxuICAgICAgICAkKFwiLnRleHRhcmVhX19jb3VudGVyLW1heFwiKS5hZGRDbGFzcyhcInJlZFwiKTtcblxuXG4gICAgfSBlbHNlXHR7XG5cbiAgICAgICAgJChcIi50ZXh0YXJlYV9fY291bnRlci1tYXhcIikucmVtb3ZlQ2xhc3MoXCJyZWRcIik7XG4gICAgICAgICQoXCIudGV4dGFyZWFfX2NvdW50ZXIgLnRleHRhcmVhX19jb3VudGVyLXRleHRcIikuaHRtbCggbGVuZ3RoICk7XG5cbiAgICB9XG5cblxuXG5cbn07XG5cbiQoXCIuZm9ybV9fdGV4dFwiKS5iaW5kKCdrZXl1cCcsIGNvdW50ZXIpO1xuJChcIi5mb3JtX190ZXh0XCIpLmJpbmQoJ2tleWRvd24nLCBjb3VudGVyKTtcblxuXG4vL1BsYWNlaG9sZGVyXG4kKFwiLnBsYWNlaG9sZGVyXCIpLmZvY3VzKGZ1bmN0aW9uKCkge1xuXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIml0YWxpY1wiKTtcblxufSkuYmx1cihmdW5jdGlvbigpIHtcblxuICAgIGlmKCAhJCh0aGlzKS52YWwoKS5sZW5ndGggKSAkKHRoaXMpLmFkZENsYXNzKFwiaXRhbGljXCIpO1xuXG59KTtcblxuLy8gYWNjb3JkXG5cbiQoXCIuc2VydmljZV9fYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICB2YXIgdCA9ICQodGhpcyk7XG5cblxuICAgICQoXCIuc2VydmljZV9fcHJpY2VzXCIpLnN0b3AoKS5zbGlkZVVwKDMwMCk7XG5cbiAgICB0Lm5leHQoXCIuc2VydmljZV9fcHJpY2VzXCIpLnN0b3AoKS5zbGlkZVRvZ2dsZSgzMDAsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiggJCh0aGlzKS5pcyhcIjp2aXNpYmxlXCIpICkgJCh0aGlzKS5jc3MoXCJkaXNwbGF5XCIsIFwiZmxleFwiKTtcblxuICAgIH0pO1xuXG59KTtcblxuLy8gbWFwXG5cbnltYXBzLnJlYWR5KGluaXQpO1xudmFyIG15TWFwLFxuICAgIG15UGxhY2VtYXJrO1xuXG5mdW5jdGlvbiBpbml0KCl7XG4gICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFwXCIsIHtcbiAgICAgICAgY2VudGVyOiBbNDguNzgzOTQzLCA0NC41Nzg4ODhdLFxuICAgICAgICB6b29tOiAxNyxcbiAgICAgICAgY29udHJvbHMgOiBbXVxuICAgIH0pO1xuXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LvQvtC80LDQvdGD0Y4g0YEg0L/QvtC80L7RidGM0Y4g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3QvtCz0L4g0LrQu9Cw0YHRgdCwIFBvbHlsaW5lLlxuICAgIHZhciBteVBvbHlsaW5lID0gbmV3IHltYXBzLlBvbHlsaW5lKFtcbiAgICAgICAgLy8g0KPQutCw0LfRi9Cy0LDQtdC8INC60L7QvtGA0LTQuNC90LDRgtGLINCy0LXRgNGI0LjQvSDQu9C+0LzQsNC90L7QuS5cbiAgICAgICAgWzQ4Ljc4NTYyOCwgNDQuNTc3MzUxXSxcbiAgICAgICAgWzQ4Ljc4NDU2MSwgNDQuNTc5MTY0XSxcbiAgICAgICAgWzQ4Ljc4NDQwOSwgNDQuNTc4OTY1XSxcbiAgICAgICAgWzQ4Ljc4NDE0NiwgNDQuNTc5MzkyXSxcbiAgICAgICAgWzQ4Ljc4Mzg2OCwgNDQuNTc5MDI1XVxuICAgIF0sIHtcbiAgICAgICAgLy8g0J7Qv9C40YHRi9Cy0LDQtdC8INGB0LLQvtC50YHRgtCy0LAg0LPQtdC+0L7QsdGK0LXQutGC0LAuXG4gICAgICAgIC8vINCh0L7QtNC10YDQttC40LzQvtC1INCx0LDQu9GD0L3QsC5cbiAgICAgICAgYmFsbG9vbkNvbnRlbnQ6IFwi0JvQvtC80LDQvdCw0Y8g0LvQuNC90LjRj1wiXG4gICAgfSwge1xuICAgICAgICAvLyDQl9Cw0LTQsNC10Lwg0L7Qv9GG0LjQuCDQs9C10L7QvtCx0YrQtdC60YLQsC5cbiAgICAgICAgLy8g0J7RgtC60LvRjtGH0LDQtdC8INC60L3QvtC/0LrRgyDQt9Cw0LrRgNGL0YLQuNGPINCx0LDQu9GD0L3QsC5cbiAgICAgICAgYmFsbG9vbkNsb3NlQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgLy8g0KbQstC10YIg0LvQuNC90LjQuC5cbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI2ZmMWMyNlwiLFxuICAgICAgICAvLyDQqNC40YDQuNC90LAg0LvQuNC90LjQuC5cbiAgICAgICAgc3Ryb2tlV2lkdGg6IDQsXG4gICAgICAgIC8vINCa0L7RjdGE0YTQuNGG0LjQtdC90YIg0L/RgNC+0LfRgNCw0YfQvdC+0YHRgtC4LlxuICAgICAgICBzdHJva2VPcGFjaXR5OiAwLjlcbiAgICB9KTtcblxuICAgIC8vINCU0L7QsdCw0LLQu9GP0LXQvCDQu9C40L3QuNC4INC90LAg0LrQsNGA0YLRgy5cblxuXG4gICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs0OC43ODM5NDMsIDQ0LjU3ODg4OF0sIHtcbiAgICAgICAgaGludENvbnRlbnQ6ICfQkNCy0YLQvtCU0L7QvycsXG4gICAgICAgIGJhbGxvb25Db250ZW50OiAn0JDQstGC0L7RgdC10YDQstC40YEgXFwg0JzQvtC50LrQsCdcbiAgICB9KTtcblxuICAgIC8vINCf0L7Qu9C30YPQvdC+0Log0LjQt9C80LXQvdC10L3QuNGPINC80LDRgdGI0YLQsNCx0LBcbiAgICBteU1hcC5jb250cm9scy5hZGQoJ3pvb21Db250cm9sJywge1xuICAgICAgICBmbG9hdDogJ25vbmUnLFxuICAgICAgICBwb3NpdGlvbjogeyBsZWZ0OiAxMCwgdG9wOiA0NCB9XG4gICAgfSk7XG4gICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xuICAgIG15TWFwLmdlb09iamVjdHNcbiAgICAgICAgLmFkZChteVBsYWNlbWFyaylcbiAgICAgICAgLmFkZChteVBvbHlsaW5lKTtcbn1cblxuLy8gc21vb3RoIHNjcm9sbFxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmhlYWRlcl9faXRlbS1saW5rJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogICQoaHJlZikub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG59KTtcblxuLy8gYnV0dG9uIHVwXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYnRuID0gJCgnLndyYXBwZXJfX2J1dHRvbicpO1xuXG4gICAgYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICB9LCA1MDApO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciB0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGhlaWdodCA9IHQuaGVpZ2h0KCksXG4gICAgICAgICAgICB0b3AgPSB0LnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIGlmKHRvcCA+IGhlaWdodCkge1xuICAgICAgICAgICAgaWYoIWJ0bi5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgIGJ0bi5zaG93KDMwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiggJCh0aGlzKS5pcyhcIjp2aXNpYmxlXCIpICkgJCh0aGlzKS5jc3MoXCJkaXNwbGF5XCIsIFwiZmxleFwiKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgZWxzZSAgICB7XG4gICAgICAgICAgICBidG4uaGlkZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxufSk7XG5cblxuLy8gZ2FsbGVyeVxuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiI2dhbGxlcnktLXBpYyAucHJldmlld1wiLCBmdW5jdGlvbihlKSB7XG5cbiAgICB2YXIgdCA9ICQodGhpcyk7XG5cbiAgICB2YXIgc3JjID0gdC5hdHRyKFwic3JjXCIpO1xuXG4gICAgdmFyIGN1cnJlbnRJbWcgPSAgJCgnLmdhbGxlcnlfX3BpY3R1cmVzLXBpY1tzcmM9XCInK3NyYysnXCJdJyk7XG5cbiAgICB2YXIgbmV4dCA9IGN1cnJlbnRJbWcucGFyZW50KFwibGlcIikubmV4dChcImxpXCIpLmZpbmQoXCIuZ2FsbGVyeV9fcGljdHVyZXMtcGljXCIpO1xuXG4gICAgaWYoICFuZXh0Lmxlbmd0aCApIHtcbiAgICAgICAgdmFyIG5leHQgPSAkKFwiLmdhbGxlcnlfX3BpY3R1cmVzLXBpYzpmaXJzdC1jaGlsZFwiKTtcbiAgICB9XG5cbiAgICBnb0ltZyggbmV4dC5hdHRyKFwic3JjXCIpICk7XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxufSk7XG5cblxuXG5mdW5jdGlvbiBnb0ltZyggc3JjICkge1xuXG4gICAgdmFyIGdhbGxlcnkgPSAkKFwiI2dhbGxlcnktLXBpY1wiKTtcblxuXG4gICAgLy/QldGB0LvQuCDQvdC10YIg0LPQsNC70LXRgNC10LgsINC00L7QsdCw0LLQu9GP0LXQvFxuICAgIGlmKCAhZ2FsbGVyeS5sZW5ndGggKSB7XG5cblxuICAgICAgICBpZiggJChcImJvZHlcIikuYXBwZW5kKCc8ZGl2IGlkPVwiZ2FsbGVyeS0tcGljXCIgY2xhc3M9XCJmaXhlZFwiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb250YWluZXJfX3BpY1wiPicrXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtdGltZXMtY2lyY2xlIGNsb3NlXCI+PC9pPicrXG4gICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJwcmV2aWV3XCIgLz4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nKSApIHtcblxuICAgICAgICAgICAgdmFyIGdhbGxlcnkgPSAkKFwiI2dhbGxlcnktLXBpY1wiKTtcblxuICAgICAgICAgICAgZ2FsbGVyeS5maW5kKFwiLnByZXZpZXdcIikuYXR0cih7XCJzcmNcIjogc3JjfSk7XG4gICAgICAgICAgICBnYWxsZXJ5LmZhZGVJbigzMDApO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8v0JjQvdCw0YfQtSDQv9GA0L7RgdGC0L4g0L/QvtC60LDQt9GL0LLQsNC10Lwg0Lgg0LzQtdC90Y/QtdC8INGB0YHRi9C70LrRgyDRgyDQv9GA0LXQstGM0Y5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGdhbGxlcnkuZmluZChcIi5wcmV2aWV3XCIpLmF0dHIoe1wic3JjXCI6IHNyY30pO1xuICAgICAgICBnYWxsZXJ5LmZhZGVJbigzMDApO1xuXG4gICAgfVxuXG5cbiAgICAkKFwiYm9keSwgaHRtbFwiKS5jc3Moe1wib3ZlcmZsb3dcIjpcImhpZGRlblwifSk7XG5cblxufVxuXG4kKFwiLmdhbGxlcnlfX3BpY3R1cmVzLXBpY1wiKS5jbGljayhmdW5jdGlvbigpIHtcblxuICAgIHZhciB0ID0gJCh0aGlzKTtcblxuICAgIHZhciBzcmMgPSB0LmF0dHIoXCJzcmNcIik7XG5cbiAgICBnb0ltZyggc3JjICk7XG5cbn0pO1xuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmZpeGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgJChcIiNnYWxsZXJ5LS1waWNcIikuZmFkZU91dCgzMDApO1xuICAgICQoXCJib2R5LCBodG1sXCIpLmNzcyh7XCJvdmVyZmxvd1wiOlwiYXV0b1wifSk7XG5cbn0pO1xuXG4vLyBjb21wYXJpc29uXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnI215SW1hZ2VDb21wYXJlLCAjbXlJbWFnZUNvbXBhcmUxJykuaW1hZ2VzQ29tcGFyZSgpO1xufSk7XG5cbi8vIHNsaWRlciBzZWN0aW9uXG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xufVxuXG4oZnVuY3Rpb24oICQgKXtcblxuICAgICQuZm4ubXlTbGlkZXIgPSBmdW5jdGlvbiggY29udGVudENsYXNzLCBzbGlkZUNsYXNzLCB0aW1lLCBpbnRlcnZhbCApIHtcblxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggKSB7XG5cblxuICAgICAgICAgICAgdmFyIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0LmZpbmQoY29udGVudENsYXNzKTtcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSB0LmZpbmQoc2xpZGVDbGFzcyk7XG5cbiAgICAgICAgICAgIHZhciBwb2ludHNDbGFzcyA9IFwicG9pbnRzXCI7XG4gICAgICAgICAgICB2YXIgcG9pbnRDbGFzcyA9IFwicG9pbnRcIjtcblxuXG4gICAgICAgICAgICAvL9CU0L7QsdCw0LLQu9GP0LXQvCDRgtC+0YfQutC4XG4gICAgICAgICAgICBmdW5jdGlvbiByZW5kZXJQb2ludHMoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggdC5hcHBlbmQoJzxkaXYgY2xhc3M9XCInK3BvaW50c0NsYXNzKydcIj48L2Rpdj4nKSApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gdC5maW5kKFwiLlwiK3BvaW50c0NsYXNzKTtcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZXMuZWFjaChmdW5jdGlvbihpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XCJzbGlkZVwiOiBpfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cy5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiJytwb2ludENsYXNzKydcIiBpdGVtPVwiJytpKydcIj48L3NwYW4+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL9Ch0LvQsNC50LTQtdGAXG4gICAgICAgICAgICBmdW5jdGlvbiBnb2dvKCBuZXh0ICkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHQuZmluZChcIi5hY3RpdmVfc2xpZGVcIik7XG5cbiAgICAgICAgICAgICAgICAvL2FsZXJ0KHNsaWRlQ2xhc3MpXG5cbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IG5leHQgPyBuZXh0IDogYWN0aXZlLm5leHQoc2xpZGVDbGFzcyk7XG5cbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKCBzbGlkZXJJbnRlcnZhbElEICk7XG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG5cblxuXG4gICAgICAgICAgICAgICAgLy/QldGB0LvQuCDRgdC70LDQudC00Ysg0LfQsNC60L7QvdGH0LjQu9C40YHRjFxuICAgICAgICAgICAgICAgIGlmKCAhbmV4dC5sZW5ndGggKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5hbmltYXRlKHtcImxlZnRcIjogMH0sIHRpbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9zbGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdC5maW5kKHNsaWRlQ2xhc3MrXCI6Zmlyc3RcIikuYWRkQ2xhc3MoXCJhY3RpdmVfc2xpZGVcIik7XG5cblxuICAgICAgICAgICAgICAgICAgICB0LmZpbmQoXCIuYWN0aXZlX3BvaW50XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlX3BvaW50XCIpO1xuICAgICAgICAgICAgICAgICAgICB0LmZpbmQoXCIuXCIrcG9pbnRDbGFzcysnOmZpcnN0JykuYWRkQ2xhc3MoXCJhY3RpdmVfcG9pbnRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3RvcCgpLmFuaW1hdGUoe1wibGVmdFwiOiAtbmV4dC5wb3NpdGlvbigpLmxlZnQgfSwgdGltZSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuZXh0LmF0dHIoXCJzbGlkZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUucmVtb3ZlQ2xhc3MoXCJhY3RpdmVfc2xpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVfc2xpZGVcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgdC5maW5kKFwiLmFjdGl2ZV9wb2ludFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9wb2ludFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdC5maW5kKFwiLlwiK3BvaW50Q2xhc3MrJ1tpdGVtPScraSsnXScpLmFkZENsYXNzKFwiYWN0aXZlX3BvaW50XCIpO1xuICAgICAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy/QmNC90YLQtdGA0LLQsNC7INC60LDRgNGD0YHQtdC70LhcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNsaWRlckludGVydmFsKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGdvZ28oIGZhbHNlICk7XG5cblxuICAgICAgICAgICAgICAgIH0sIGludGVydmFsKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2xpZGVySW50ZXJ2YWxJRCA9IHNsaWRlckludGVydmFsKCk7XG5cbiAgICAgICAgICAgIC8v0JLQtdGI0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LHQsNGC0L7QvdGLXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmFycm93X19yaWdodFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmKCAhZmxhZyApIGdvZ28oIGZhbHNlICk7XG5cbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgLy/QktC10YjQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQsdCw0YLQvtC90YtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuYXJyb3dfX2xlZnRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdC5maW5kKFwiLmFjdGl2ZV9zbGlkZVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGFjdGl2ZS5wcmV2KHNsaWRlQ2xhc3MpO1xuXG4gICAgICAgICAgICAgICAgLy8gZ3VcblxuICAgICAgICAgICAgICAgIGlmKCBuZXh0Lmxlbmd0aCAmJiAhZmxhZyApIHtcblxuICAgICAgICAgICAgICAgICAgICBnb2dvKCBuZXh0ICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG5cblxuXG4gICAgICAgICAgICAvL9CS0LXRiNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCx0LDRgtC+0L3Ri1xuICAgICAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5cIitwb2ludHNDbGFzcytcIiAuXCIrcG9pbnRDbGFzcywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgaWYoIF90aGlzLmhhc0NsYXNzKFwiYWN0aXZlX3BvaW50XCIpICkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKCBzbGlkZXJJbnRlcnZhbElEICk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaSA9IF90aGlzLmF0dHIoXCJpdGVtXCIpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSB0LmZpbmQoJ1tzbGlkZT0nKyBpICsnXScpO1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0LmZpbmQoXCIuYWN0aXZlX3NsaWRlXCIpO1xuXG4gICAgICAgICAgICAgICAgYWN0aXZlLnJlbW92ZUNsYXNzKFwiYWN0aXZlX3NsaWRlXCIpO1xuICAgICAgICAgICAgICAgIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVfc2xpZGVcIik7XG5cbiAgICAgICAgICAgICAgICB0LmZpbmQoXCIuYWN0aXZlX3BvaW50XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlX3BvaW50XCIpO1xuICAgICAgICAgICAgICAgIHQuZmluZChcIi5cIitwb2ludENsYXNzKydbaXRlbT0nK2krJ10nKS5hZGRDbGFzcyhcImFjdGl2ZV9wb2ludFwiKTtcblxuICAgICAgICAgICAgICAgIGlmKCAhbmV4dC5sZW5ndGggKSByZXR1cm47XG5cblxuXG5cbiAgICAgICAgICAgICAgICBjb250ZW50LnN0b3AoKS5hbmltYXRlKHtcImxlZnRcIjogLW5leHQucG9zaXRpb24oKS5sZWZ0IH0sIHRpbWUsIGZ1bmN0aW9uKCkge1xuXG5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8v0JfQsNC/0YPRgdC60LDQtdC8INC40L3RgtC10YDQstCw0LtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVySW50ZXJ2YWxJRCA9IHNsaWRlckludGVydmFsKCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy/QldGB0LvQuCDQsdCw0YLQvtC90Ysg0LTQvtCx0LDQstC40LvQuNGB0YwsINC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBINC/0LXRgNCy0L7QuSDQutC90L7Qv9C60LVcbiAgICAgICAgICAgIGlmKCByZW5kZXJQb2ludHMoKSApIHtcblxuICAgICAgICAgICAgICAgIHQuZmluZChcIi5cIitwb2ludHNDbGFzcytcIiAuXCIrcG9pbnRDbGFzcysgXCI6Zmlyc3RcIikuYWRkQ2xhc3MoXCJhY3RpdmVfcG9pbnRcIik7XG4gICAgICAgICAgICAgICAgdC5maW5kKHNsaWRlQ2xhc3MrXCI6Zmlyc3RcIikuYWRkQ2xhc3MoXCJhY3RpdmVfc2xpZGVcIik7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgfTtcbn0pKCBqUXVlcnkgKTtcblxuJChcIiNzbGlkZXJcIikubXlTbGlkZXIoXCIuc2xpZGVyX19saXN0XCIsIFwiLnNsaWRlcl9faXRlbVwiLCAxMDAwLCA0MDAwKTtcbiQoXCIjZmVlZGJhY2tfX3NsaWRlclwiKS5teVNsaWRlcihcIi5mZWVkYmFja19fc2xpZGVyLWxpc3RcIiwgXCIuZmVlZGJhY2tfX3NsaWRlci1pdGVtXCIsIDEwMDAsIDUwMDApO1xuXG5cbi8vIHNtb290aCBzY3JvbGwgdG8gYWRzXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgICQoJy5zbGlkZXJfX2xpbmsnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAgJChocmVmKS5vZmZzZXQoKS50b3AgLSAoJCh3aW5kb3cpLmhlaWdodCgpKSAvIDRcbiAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG59KTtcblxuLy8gc2xpZGVyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
