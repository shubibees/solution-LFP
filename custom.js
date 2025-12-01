$(document).ready(function () {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4;
  var syncedSecondary = true;

  /* -------------------------
       MAIN CAROUSEL
    -------------------------- */
  sync1
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: false,
      autoplay: false,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: [
        '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width:1px;stroke:#000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
        '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width:1px;stroke:#000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>',
      ],
    })
    .on("changed.owl.carousel", syncPosition);

  /* -------------------------
       THUMBNAIL CAROUSEL
    -------------------------- */
  sync2
    .on("initialized.owl.carousel", function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: true,
      nav: false,
      margin: 20,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: slidesPerPage,
      responsiveRefreshRate: 100,
    })
    .on("changed.owl.carousel", syncPosition2);

  /* -------------------------
       SYNC MAIN → THUMBNAILS
    -------------------------- */
  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) current = count;
    if (current > count) current = 0;

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");

    var start = sync2.find(".owl-item.active").first().index();
    var end = sync2.find(".owl-item.active").last().index();

    if (current > end) {
      sync2.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      sync2.data("owl.carousel").to(current - (slidesPerPage - 1), 100, true);
    }
  }

  /* -------------------------
       SYNC THUMBNAILS → MAIN
    -------------------------- */
  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data("owl.carousel").to(number, 300, true);
    }
  }

  /* -------------------------
       CLICK THUMBNAILS
    -------------------------- */
  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data("owl.carousel").to(number, 300, true);
  });

  /* -------------------------
       COUNTER SLIDER
    -------------------------- */
  $(".slider")
    .on("initialized.owl.carousel changed.owl.carousel", function (e) {
      if (!e.namespace) return;

      $(".counter .count").text(
        e.relatedTarget.relative(e.item.index) + 1 + "/" + e.item.count,
      );
    })
    .owlCarousel({
      items: 2,
      loop: true,
      margin: 5,
      autoplay: true,
      nav: true,
      navContainer: ".counter .nav", // ← MOVE NAV HERE
      navText: ["", ""],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        768: {
          items: 1,
        },
        1000: {
          items: 2,
        },
        1500: {
          items: 3,
        },
      },
    });
  $(".blogslider")
    .on("initialized.owl.carousel changed.owl.carousel", function (e) {
      if (!e.namespace) return;

      $(".blogscounter .count").text(
        e.relatedTarget.relative(e.item.index) + 1 + "/" + e.item.count,
      );
    })
    .owlCarousel({
      items: 2,
      loop: true,
      margin: 5,
      autoplay: true,
      nav: true,
      navContainer: ".blogscounter .nav", // ← MOVE NAV HERE
      navText: ["", ""],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });
  $(".menutoogle").click(function () {
    $(".menutoogle").toggleClass("close");
    $(".nav").toggleClass("active");
  });
});
