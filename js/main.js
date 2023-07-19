$(document).ready(function () {
  // Adding click listener to the overlay and close icon
  $(document).on("click", ".btnMenu, .btnMenu2", function (e) {
    showMenu();
  });
  $(document).on("click", "#overlay, .menuMobile__close", function () {
    $("#menuMobile").removeClass("show");
    $("#overlay").removeClass("show");
  });

  function showMenu() {
    let menu = $("#menuMobile");

    if (menu.length === 0) {
      menu = $("<div>", { id: "menuMobile" }).appendTo("body");
      $("<div>", { id: "overlay" }).appendTo("body");
      menu.css("transform", "translateX(-100%)");

      menu.html(`
        <div id="menuContent">
            <i class="menuMobile__close fas fa-times"></i>
            <ul class="menuMobile__list">
                <li>
                    <a href="#!">
                        <img src="./images/menu-icon-1.png" alt="this-is-icon" />About
                    </a>
                </li>
                <li>
                    <a href="#!">
                        <img src="./images/menu-icon-2.png" alt="this-is-icon" />News
                    </a>
                </li>
                <li>
                    <a href="#!">
                        <img src="./images/menu-icon-3.png" alt="this-is-icon" />EXHIBITIONS
                    </a>
                </li>
                <li>
                    <a href="#!">
                        <img src="./images/menu-icon-4.png" alt="this-is-icon" />MUSEUM LIBRARY
                    </a>
                </li>
                <li>
                        <a href="#!">
                            <img src="./images/menu-icon-5.png" alt="this-is-icon" />VISITOR SUPPORT
                        </a>
                    </li>
                    <li>
                        <a href="#!">
                            <img src="./images/menu-icon-6.png" alt="this-is-icon" />DATABASE
                        </a>
                    </li>
                </ul>
            </div>`);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          menu.addClass("show");
          $("#overlay").addClass("show");
          $("html").css("overflow-y", "hidden");
        });
      });

      // Handle Close Menu & Overlay
      $(".menuMobile__close, #overlay").on("click", function () {
        menu.removeClass("show");
        $("#overlay").removeClass("show");
        $("html").css("overflow-y", "auto");
      });
    } else {
      menu.toggleClass("show");
      $("#overlay").toggleClass("show");
      $("html").css("overflow-y", "hidden");
    }
  }

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

  // // Handle Scroll window Show Uptop
  // const upTop = $("#up-top");
  // function debounceFn(func, wait, immediate) {
  //   let timeout;
  //   return function () {
  //     let context = this,
  //       args = arguments;
  //     let later = function () {
  //       timeout = null;
  //       if (!immediate) func.apply(context, args);
  //     };
  //     let callNow = immediate && !timeout;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //     if (callNow) func.apply(context, args);
  //   };
  // }
  // $(window).scroll(
  //   debounceFn(function () {
  //     const scrollY = window.pageYOffset;
  //     scrollY > 400 ? upTop.addClass("active") : upTop.removeClass("active");
  //   }, 100)
  // );

  // upTop.click(function () {
  //   $("html, body").animate({ scrollTop: 0 }, "slow");
  // });

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
        margin: 0,
        dots: true,
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

      // Handle Up Top Page
      const upTopButton = $("#up-top");
      if (destination.index !== 0) {
        upTopButton.css({
          opacity: 1,
          visibility: "visible",
        });

        upTopButton.on("click", function () {
          $.fn.fullpage.moveTo(1);
        });
      } else {
        upTopButton.removeAttr("style");
      }

      // Handle Show Menu Scroll Page
      const menuHTML = `
      <div class="menu">
        <div class="container">
          <div class="menu__wrapper">
            <a href="index.html" class="menu__wrapper-logo">
              <img src="./images/logo.png" alt="this-is-logo" />
            </a>

            <img src="./images/bars.svg" alt="" class="btnMenu2" />
            <div class="menu__wrapper-list">
              <ul>
                <li>
                  <a href="#!">About</a>
                </li>
                <li>
                  <a href="#!">News</a>
                </li>
                <li>
                  <a href="#!">Exhibitions</a>
                </li>
                <li>
                  <a href="#!">Museum library</a>
                </li>
                <li>
                  <a href="#!">Visitor support</a>
                </li>
                <li>
                  <a href="#!">Database</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
`;
      if (destination.index >= 1) {
        if ($(".menu").length === 0) {
          $("body").append(menuHTML);
        }
        $(".header").fadeOut();
          $(".menu").addClass("active");
      } else {
        $(".header").fadeIn();
        $(".menu").removeClass("active");
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
