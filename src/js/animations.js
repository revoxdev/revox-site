import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Splide } from "@splidejs/splide";
import $ from "jquery";
import "slick-carousel";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // CSS for flowing opacity animation with proper word wrapping
  const style = document.createElement("style");
  style.textContent = `
    .split-word {
      word-break: normal; /* Normal word breaking */
      overflow-wrap: normal; /* Don't break words */
      white-space: normal; /* Allow normal wrapping */
      hyphens: none; /* No hyphenation */
    }
    .split-word .word {
      display: inline-block; /* Keep words together */
      white-space: nowrap; /* Don't break within words */
    }
    .split-word .char {
      display: inline; /* Characters within words stay inline */
      color: #ffffff; /* White text */
      opacity: 0.2; /* Start with low opacity */
    }
  `;
  document.head.appendChild(style);

  // Flowing character opacity animation
  function runSplit() {
    console.log("Running flowing opacity animation...");

    const splitElements = document.querySelectorAll(".split-word");
    if (splitElements.length === 0) {
      console.log("No .split-word elements found");
      return;
    }

    splitElements.forEach((element) => {
      // Split text into words and characters for proper wrapping
      const typeSplit = new SplitType(element, {
        types: "words, chars",
      });

      const chars = element.querySelectorAll(".char");
      console.log("Found chars:", chars.length);

      // Reversible opacity animation 0.2 ↔ 1.0
      gsap.fromTo(
        chars,
        {
          opacity: 0.2, // Start state
        },
        {
          opacity: 1, // End state
          duration: 0.05, // Slower animation
          stagger: 0.08, // More delay between characters
          ease: "steps(1)",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 0%",
            scrub: 1, // Enables reverse on scroll up
            markers: false,
          },
        }
      );
    });
  }

  // Initialize existing animations and features from index.astro
  function initializeExistingAnimations() {
    // SplitType for heading animations
    if (document.querySelector(".heading-st")) {
      let typeSplit = new SplitType(".heading-st", { types: "words, chars", tagName: "span" });
    }

    // jQuery-based animations
    $(document).ready(function () {
      // Ensure SplitType elements exist
      if ($('.heading-st').length) {
        let typeSplit = new SplitType(".heading-st", { types: "words,chars", tagName: "span" });
      }

      $(".heading-wrap").each(function () {
        let headings = $(this).find(".heading-st");
        let tl = gsap.timeline({ repeat: -1 });
        tl.set($(this), { opacity: 1 });

        headings.each(function (index) {
          if (index > 0) {
            tl.from($(this).find(".char"), {
              yPercent: 90,
              stagger: { amount: 0.5 },
              duration: 0.5,
              ease: "power3.out"
            }, "<0.4");
          }
          if (index < headings.length - 1) {
            tl.to($(this).find(".char"), {
              delay: 3,
              yPercent: -90,
              stagger: { amount: 0.5 },
              duration: 0.5,
              ease: "power3.in"
            });
          }
        });
      });

      // Initialize Splide
      if ($('.splide').length) {
        new Splide('.splide', {
          perPage: 3,
          perMove: 1,
          focus: 0,
          type: 'slide',
          gap: '20px',
          arrows: 'slider',
          pagination: 'slider',
          speed: 600,
          dragAngleThreshold: 30,
          autoWidth: false,
          rewind: false,
          rewindSpeed: 400,
          waitForTransition: false,
          updateOnMove: true,
          trimSpace: false,
          breakpoints: {
            991: { perPage: 2, gap: '20px' },
            767: { perPage: 1, gap: '20px' },
            479: { perPage: 1.2, gap: '20px' }
          }
        }).mount();
      }

      // Initialize Slick Carousel
      if ($('.wrapper').length) {
        var slider = $('.wrapper').slick({
          accessibility: true,
          slide: 'div',
          dots: true,
          centerMode: true,
          infinite: false,
          arrows: true,
          touchMove: true,
          speed: 500,
          variableWidth: true,
          slidesToShow: 1,
          focusOnSelect: true,
          pauseOnFocus: false,
          pauseOnHover: false,
          prevArrow: $('.slide-prev'),
          nextArrow: $('.slide-next')
        });

        var Timer = setInterval(function () {
          if (slider.slick('slickCurrentSlide') == 4) {
            slider.slick('slickSetOption', 'speed', 1200, true);
            slider.slick('slickGoTo', 0);
            slider.slick('slickSetOption', 'speed', 500, true);
          } else {
            slider.slick('slickSetOption', 'speed', 500, true);
            slider.slick('slickNext');
          }
        }, 8000);

        $(document).on('keydown', function (e) {
          if (e.keyCode == 37) $('.wrapper').slick('slickPrev');
          if (e.keyCode == 39) $('.wrapper').slick('slickNext');
        });

        slider.on('afterChange', function () {
          clearInterval(Timer);
          Timer = setInterval(function () {
            if (slider.slick('slickCurrentSlide') == 4) {
              slider.slick('slickSetOption', 'speed', 1200, true);
              slider.slick('slickGoTo', 0);
              slider.slick('slickSetOption', 'speed', 500, true);
            } else {
              slider.slick('slickSetOption', 'speed', 500, true);
              slider.slick('slickNext');
            }
          }, 8000);
        });
      }

      // Progress bar function
      function progressBar() {
        var slickSlide = document.querySelectorAll(".slick-dots li");
        var slickSlideButton = document.querySelectorAll(".slick-dots li button");
        for (let i = 0; i < slickSlide.length; i++) {
          if (slickSlide[i].classList.contains('slick-active')) break;
          if (slickSlideButton[i].style.width !== "100%") slickSlideButton[i].style.width = "100%";
        }
        for (let i = slickSlide.length - 1; i > 0; i--) {
          if (slickSlide[i].classList.contains('slick-active')) break;
          if (slickSlideButton[i].style.width !== "0px") slickSlideButton[i].style.width = "0";
        }
      }
      setInterval(progressBar, 10);
    });
  }

  // Run split text animation
  setTimeout(() => {
    if (document.querySelector(".split-word")) {
      console.log("Found .split-word elements, running color animation");
      runSplit();
    } else {
      console.log("No .split-word elements found");
    }
  }, 100);

  // Initialize existing animations
  initializeExistingAnimations();
});