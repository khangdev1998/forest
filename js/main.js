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
    let menuMobile = $("#menuMobile");
    let overlayShadow = $("#overlay");
    const body = $("body");

    if (menuMobile.length === 0) {
      menuMobile = $("<div>", { id: "menuMobile" }).appendTo("body");
      overlayShadow = $("<div>", { id: "overlay" }).appendTo("body");
      menuMobile.css("transform", "translateX(-100%)");

      menuMobile.html(`
        <div id="menuContent">
            <i class="menuMobile__close fas fa-times"></i>
            <ul class="menuMobile__list">
                <li>
                    <a href="about.html">
                        <img src="./images/menu-icon-1.png" alt="this-is-icon" />About
                    </a>
                </li>
                <li>
                    <a href="news.html">
                        <img src="./images/menu-icon-2.png" alt="this-is-icon" />News
                    </a>
                </li>
                <li>
                    <a href="exhibitions.html">
                        <img src="./images/menu-icon-3.png" alt="this-is-icon" />EXHIBITIONS
                    </a>
                </li>
                <li>
                    <a href="library.html">
                        <img src="./images/menu-icon-4.png" alt="this-is-icon" />MUSEUM LIBRARY
                    </a>
                </li>
                <li>
                        <a href="support.html">
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

      // Wait Animation When Click
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          menuMobile.addClass("show");
          overlayShadow.addClass("show");
          body.css("overflow", "hidden");
        });
      });

      // Handle Close Menu & Overlay
      $(".menuMobile__close, #overlay").on("click", function () {
        menuMobile.removeClass("show");
        overlayShadow.removeClass("show");
        body.css("overflow", "auto");
      });
    } else {
      menuMobile.addClass("show");
      overlayShadow.addClass("show");
      body.css("overflow", "hidden");
    }
  }

  // Handle Up Top Page
  const upTop = document.getElementById("up-top");

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
  // Tối ưu hoá delay scroll giúp tài nguyên không quá tải

  window.addEventListener(
    "scroll",
    debounceFn(function () {
      const scrollY = window.pageYOffset;

      if (scrollY > 100) {
        upTop.classList.add("active");
      } else {
        upTop.removeAttribute("class");
      }
      upTop.onclick = function () {
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
    }, 100)
  );

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
