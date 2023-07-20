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
      autoplaySpeed: 880,
      autoplay: true,
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
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="news.html">News</a>
                </li>
                <li>
                  <a href="exhibitions.html">Exhibitions</a>
                </li>
                <li>
                  <a href="library.html">Museum library</a>
                </li>
                <li>
                  <a href="support.html">Visitor support</a>
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

// Handle Marquee
$(".marquee__main").marquee({
  duration: 25000,
  delayBeforeStart: 0,
  direction: "right",
  duplicated: true,
  pauseOnHover: true,
});
