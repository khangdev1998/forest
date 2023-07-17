$(document).ready(function () {
  $(".btnMenu").click(function (e) {
    $(".header__menu").addClass("active");
    fullpage_api.setAllowScrolling(false);

    $(".header__menu-close").click(function () {
      $(".header__menu").removeClass("active");
      fullpage_api.setAllowScrolling(true);
    });
  });

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
        items: 2,
        margin: 12,
      },
      600: {
        items: 4,
      },
      1025: {
        items: 7,
      },
    },
  });

  // Scroll Page Effect Section
  $("#fullpage").fullpage({
    afterRender: function () {
      $(".slider-main").owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        margin: 0,
        autoplaySpeed: 1500,
        autoplay: false,
        smartSpeed: 850,
        autoplayHoverPause: true,
        autoplayTimeout: 4800,
      });
    },
    autoScrolling: true,
    scrollHorizontally: true,
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
      // Hanld Count Number
      if (destination.anchor == "section2") {
        countNumbers();
      }

      // Handle Show Menu Scroll Page
      if (destination.index >= 1) {
        $(".menu").addClass("active");
        $(".header").fadeOut();
      } else {
        $(".menu").removeClass("active");
        $(".header").fadeIn();
      }
    },
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: [
      "HEADER",
      "VIETNAM FOREST RESOURCES MUSEUM",
      "EXHIBITION ROOM",
      "NEWS",
      "SUPPORT FOR VISITORS",
      "LIBRARY",
      "FOOTER",
    ],
    showActiveTooltip: true,
    responsiveWidth: 1599,
    responsiveHeight: null,
    afterResponsive: function (isResponsive) {
      var sections = document.querySelectorAll(".section:not(:first-child)");

      if (isResponsive) {
        for (var i = 0; i < sections.length; i++) {
          sections[i].style.padding = "68px 0";
        }
      } else {
        for (var i = 0; i < sections.length; i++) {
          sections[i].style.padding = null;
        }
      }
    },
  });

  // Gọi fullpage_api.reBuild() sau khi trang đã tải
  fullpage_api.reBuild();

  $(".marquee__main").marquee({
    duration: 25000,
    delayBeforeStart: 0,
    direction: "right",
    duplicated: true,
    pauseOnHover: true,
  });

  // Check Validation Email footer
  $(".footer__wrapper-form a").click(function (event) {
    event.preventDefault();

    const email = $('.footer__wrapper-form input[type="email"]');

    if (!email.val()) {
      alert("Vui lòng không để trống trường này !");
      return false;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email.val())) {
      alert("Trường này phải là một email hợp lệ !");
      return false;
    }

    alert(
      "Gửi thông tin thành công. Chúng tôi sẽ liên hệ với bạn qua thông tin bạn đã cung cấp. Xin cảm ơn !"
    );
    email.val("");
  });
});
