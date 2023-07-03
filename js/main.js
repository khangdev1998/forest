$(document).ready(function () {
  // Handle Click Move tab
  const tabItem = $(".news__tab-item");
  const tabContent = $(".news__content-pane");

  tabItem.each(function (index) {
    $(this).on("click", function () {
      $(".news__tab-item.active").removeClass("active");
      $(this).addClass("active");

      tabContent.removeClass("active");
      var activeContent = tabContent.eq(index).addClass("active");

      var images = activeContent.find(".news__content-item");
      images.each(function (i) {
        $(this)
          .css("opacity", "0")
          .delay(i * 200)
          .animate({ opacity: "1" }, 1000);
      });
    });
  });

  // Handle Scroll window Show Uptop
  const upTop = $("#up-top");
  function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  $(window).scroll(
    debounceFn(function () {
      const scrollY = window.pageYOffset;
      scrollY > 400 ? upTop.addClass("active") : upTop.removeClass("active");
    }, 100)
  );

  upTop.click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  // Hanld Count Number
  let completed = false;
  const counters = $(".counter");

  counters.text("0");

  function countNumbers() {
    if (!completed) {
      const countersQuantity = counters.length;
      let counter = [];

      for (let i = 0; i < countersQuantity; i++) {
        counter[i] = parseInt(counters[i].dataset.count); // Using dataset to get data-count attribute value
      }

      const count = function (start, value, id) {
        let localStart = start;
        const intervalId = setInterval(function () {
          if (localStart < value) {
            localStart++;
            counters[id].innerHTML = localStart;
          } else {
            clearInterval(intervalId);
          }
        }, 40);
      };

      for (let j = 0; j < countersQuantity; j++) {
        count(0, counter[j], j);
      }

      completed = true;
    }
  }

  // Slider Footer
  const sliderNext =
    '<img class="footer__slider-icon" src="./images/slider-next.png" alt="this-is-icon">';
  const sliderPrev =
    '<img class="footer__slider-icon" src="./images/slider-prev.png" alt="this-is-icon">';

  $(".footer__slider").owlCarousel({
    navText: [sliderPrev, sliderNext],
    loop: true,
    dots: false,
    margin: 20,
    nav: true,
    autoplay: true,
    smartSpeed: 650,
    autoplaySpeed: 850,
    autoplayTimeout: 4500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 7,
      },
    },
  });

  // Scroll Page Effect Section
  $("#fullpage").fullpage({
    anchors: [
      "section1",
      "section2",
      "section3",
      "section4",
      "section5",
      "section6",
      "section7",
    ],
    afterLoad: function (origin, destination, direction) {
      if (destination.anchor == "section2") {
        countNumbers();
      }
    },
    navigation: true, // để bật navigation dots
    navigationPosition: "right", // để đặt vị trí của navigation dots (bên phải hoặc bên trái)
    navigationTooltips: ["HEADER", "VIETNAM FOREST RESOURCES MUSEUM", "EXHIBITION ROOM", "NEWS", "SUPPORT FOR VISITORS", "LIBRARY", "FOOTER"], // để thêm các tooltips cho từng dot
    showActiveTooltip: true, // để hiển thị tooltips cho dot hiện tại,
    responsiveWidth: 1599,
    afterResponsive: function (isResponsive) {},
  });
});
