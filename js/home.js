$(document).ready(function () {
  // Handle show video
  const video = document.getElementById("myVideo");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observerCallback = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(video);

  // Scroll Page Effect Section
  let hasAnimatedHeader = false;
  let scrollPastHeader = false;
  let animatedSections = {};

  $("#fullpage").fullpage({
    paddingTop: "62.5284" + "px",
    onLeave: function (origin, destination, direction) {
      const isResponsive = window.innerWidth < 1599;
      const sectionId = destination.anchor;
      if (!isResponsive) {
        // Áp dụng hiệu ứng GSAP tại đây
        function headingAnimated(section) {
          const heading = $(`${section} .heading`);
          gsap.set(heading, { opacity: 0, rotationY: -90 });
          gsap.to(heading, {
            opacity: 1,
            rotationY: 0,
            duration: 1.6,
            delay: 0.5, // thêm delay 0.5 giây
            ease: "power2.out",
          });
        }
        function descriptionAnimated(element) {
          gsap.from(`${element}`, {
            opacity: 0,
            y: 100, // Di chuyển phần tử xuống 100px so với vị trí ban đầu
            duration: 1.4,
            ease: "power2.out",
          });
        }
        function slideInFrom(element, direction) {
          let delay = 0;
          // Lặp qua mỗi mục và áp dụng hiệu ứng animation
          $(`${element}`).each(function () {
            gsap.from($(this), {
              x: direction, // Di chuyển mục từ trái sang 100px so với vị trí ban đầu
              opacity: 0,
              duration: 1.2,
              ease: "power2.out",
              delay: delay,
            });
            delay += 0.3; // Tăng thời gian trễ cho mỗi mục tiếp theo
          });
        }
        if (!animatedSections[sectionId]) {
          if (sectionId === "section2") {
            headingAnimated(".forest");
            descriptionAnimated(".forest__description");
          }
          if (sectionId === "section3") {
            headingAnimated(".exhibition");
            descriptionAnimated(".exhibition__item-desc");
          }
          if (sectionId === "section4") {
            descriptionAnimated(".news__tab");
            headingAnimated(".news");

            let newsItems = $(".news__content-item");
            newsItems.each(function (index, item) {
              // Thiết lập ban đầu cho mỗi item: ẩn nó và dịch chuyển xuống một khoảng cách nhất định
              gsap.set(item, {
                opacity: 0,
                y: 50,
              });
              // Tạo một hiệu ứng xuất hiện mượt mà cho mỗi item khi nó xuất hiện trong viewport
              gsap.to(item, {
                opacity: 1,
                y: 0,
                delay: index * 0.3, // Thêm một khoảng trễ giữa mỗi item để tạo hiệu ứng tuần tự
                duration: 1.5, // Thời gian diễn ra của hiệu ứng
                ease: "power3.out", // Loại easing cho hiệu ứng mượt mà
              });
            });
          }
          if (sectionId === "section5") {
            headingAnimated(".support");
            slideInFrom(".support__column", 100);
          }
          if (sectionId === "section6") {
            headingAnimated(".library");
            descriptionAnimated(".library__desc");
            slideInFrom(".library__wrapper-item", -100);
          }
          if (sectionId === "section7") {
            $(".footer__copyright-line").css(
              "animation",
              "expandLine 4s forwards"
            );
            gsap.from(".footer__wrapper-item", {
              opacity: 0,
              y: 50, // Move items up by 50 pixels initially
              stagger: 0.3, // Delay of 0.3 seconds between each item
              duration: 1, // Duration of the animation
              ease: "Power4.out", // Ease type
            });

            // Lấy tất cả các footer slider items
            let sliderItems = $(".footer__slider-item");

            // Thiết lập ban đầu cho mỗi item: ẩn nó và thiết lập góc xoay cho hiệu ứng lật
            gsap.set(sliderItems, {
              opacity: 0,
              rotationX: -90,
            });

            // Tạo hiệu ứng lật 3D từ dưới lên trên cho mỗi item khi nó xuất hiện trong viewport
            let animations = []; // mảng chứa tất cả animations
            sliderItems.each(function (index, item) {
              animations.push(
                gsap.to(item, {
                  opacity: 1,
                  rotationX: 0,
                  transformOrigin: "center bottom",
                  delay: index * 0.1, // Thêm một khoảng trễ giữa mỗi item để tạo hiệu ứng tuần tự
                  duration: 1.5, // Thời gian diễn ra của hiệu ứng
                  ease: "power3.out", // Loại easing cho hiệu ứng mượt mà
                })
              );
            });
          }

          animatedSections[sectionId] = true; // Đánh dấu section đã được animate
        }
      }
    },
    afterRender: function () {
      fullpage_api.setAllowScrolling(false);
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
        autoplayTimeout: 6850,
        mouseDrag: false,
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
      const sectionId = destination.item.id;
      function endLoader() {
        $("#loader-wrapper").hide();
        $("#wrapper").fadeIn(880);
        // Handle Marquee
        $(".marquee__main").marquee({
          duration: 25000,
          delayBeforeStart: 0,
          direction: "right",
          duplicated: true,
          pauseOnHover: true,
        });
      }
      if (
        sectionId === "section-header" &&
        !hasAnimatedHeader &&
        !scrollPastHeader &&
        !/Mobi|Android|iP(ad|hone|od)/i.test(navigator.userAgent)
      ) {
        hasAnimatedHeader = true;
        const tl = gsap.timeline({
          onStart: function () {
            console.log("test1");
          },
          onComplete: function () {
            console.log("test2");
          },
        });

        window.onload = function () {
          gsap.to("#loader-wrapper", {
            duration: 1.4,
            opacity: 0,
            onComplete: function () {
              endLoader();
            },
          });

          // Check if '.owl-dots' exists
          let checkExist = setInterval(function () {
            if ($(".owl-dots").length) {
              clearInterval(checkExist);

              tl.from(".slider-main__content", {
                duration: 2,
                rotationY: 180,
                opacity: 0,
              })
                .add([
                  gsap.from(".owl-dots", {
                    duration: 1.2,
                    opacity: 0,
                  }),
                  gsap.from(".slider-main__link", {
                    duration: 1.4,
                    opacity: 0,
                    ease: "power1.out",
                  }),
                ])
                .add([
                  gsap.from(".wrapper-second", {
                    duration: 1.2,
                    rotationX: 180,
                    opacity: 0,
                  }),
                  gsap.from(".marquee", {
                    y: window.innerHeight,
                    duration: 1.8,
                    opacity: 0,
                    ease: "bounce.back.out",
                  }),
                ])
                .add([
                  gsap.from(".hotline", {
                    x: window.innerWidth,
                    duration: 1,
                    opacity: 0,
                  }),
                  gsap.from("#fp-nav", {
                    x: window.innerWidth,
                    duration: 1,
                    opacity: 0,
                    onComplete: function () {
                      fullpage_api.setAllowScrolling(true);
                    },
                  }),
                ]);
            }
          }, 120); // check every 120ms
        };
      } else if (sectionId !== "section-header") {
        scrollPastHeader = true;
        fullpage_api.setAllowScrolling(true);
      } else if (/Mobi|Android|iP(ad|hone|od)/i.test(navigator.userAgent)) {
        window.onload = function () {
          endLoader();
        };
      }

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
      const sections = document.querySelectorAll(".section:not(:first-child)");

      if (isResponsive) {
        for (let i = 0; i < sections.length; i++) {
          sections[i].style.padding = "68px 0";
        }
      } else {
        for (let i = 0; i < sections.length; i++) {
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
      const activeContent = tabContent.eq(index).addClass("active");

      const images = activeContent.find(".news__content-item");
      images.each(function (i) {
        $(this)
          .css("opacity", "0")
          .delay(i * 200)
          .animate({ opacity: "1" }, 1000);
      });
    });
  });

  // Slider Events
  const btnNext =
    '<img class="footer__slider-icon" src="./images/slider-next.png" alt="this-is-icon">';
  const btnPrev =
    '<img class="footer__slider-icon" src="./images/slider-prev.png" alt="this-is-icon">';
  $(".events__carousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    smartSpeed: 850,
    autoplaySpeed: 850,
    nav: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4800,
    dots: false,
    navText: [btnPrev, btnNext],
    stagePadding: 10,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });
});
