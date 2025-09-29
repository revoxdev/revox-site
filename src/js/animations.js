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
  // Add CSS for responsive font sizes and split text
  const style = document.createElement("style");
  style.textContent = `

   
  `;
  document.head.appendChild(style);

  // SplitType for heading animations
  if (document.querySelector(".heading-st")) {
    let typeSplit = new SplitType(".heading-st", {
      types: "words, chars",
      tagName: "span",
    });
  }
});

// jQuery-based animations
$(document).ready(function () {
  // Ensure SplitType elements exist
  if ($(".heading-st").length) {
    let typeSplit = new SplitType(".heading-st", {
      types: "words,chars",
      tagName: "span",
    });
  }

  $(".heading-wrap").each(function () {
    let headings = $(this).find(".heading-st");
    let tl = gsap.timeline({ repeat: -1 });

    // Set the wrapper to visible and hide all headings initially
    tl.set($(this), { opacity: 1 });
    tl.set(headings, { opacity: 0 });

    // Show first heading immediately
    tl.set(headings.eq(0), { opacity: 1 });

    headings.each(function (index) {
      let currentHeading = $(this);

      if (index === 0) {
        // First heading - animate in from start
        tl.from(
          currentHeading.find(".char"),
          {
            yPercent: 90,
            stagger: { amount: 0.5 },
            duration: 0.5,
            ease: "power3.out",
          },
          0
        );
      } else {
        // Other headings - show and animate in
        tl.set(currentHeading, { opacity: 1 }, ">");
        tl.from(
          currentHeading.find(".char"),
          {
            yPercent: 90,
            stagger: { amount: 0.5 },
            duration: 0.5,
            ease: "power3.out",
          },
          "<0.1"
        );
      }

      if (index < headings.length - 1) {
        // Animate out (except for last heading)
        tl.to(currentHeading.find(".char"), {
          delay: 2.5,
          yPercent: -90,
          stagger: { amount: 0.5 },
          duration: 0.5,
          ease: "power3.in",
        });
        tl.set(currentHeading, { opacity: 0 });
      } else {
        // Last heading - animate out before loop
        tl.to(currentHeading.find(".char"), {
          delay: 2.5,
          yPercent: -90,
          stagger: { amount: 0.5 },
          duration: 0.5,
          ease: "power3.in",
        });
        tl.set(currentHeading, { opacity: 0 });
      }
    });
  });

  // Ensure Splide is initialized only if the element exists
  if ($(".splide").length) {
    new Splide(".splide", {
      perPage: 3,
      perMove: 1,
      focus: 0,
      type: "slide",
      gap: "20px",
      arrows: "slider",
      pagination: "slider",
      speed: 600,
      dragAngleThreshold: 30,
      autoWidth: false,
      rewind: false,
      rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: false,
      breakpoints: {
        991: { perPage: 2, gap: "20px" },
        767: { perPage: 1, gap: "20px" },
        479: { perPage: 1.2, gap: "20px" },
      },
    }).mount();
  }

  // Ensure Slick is initialized only if the .wrapper exists
  if ($(".wrapper").length) {
    var slider = $(".wrapper").slick({
      accessibility: true,
      slide: "div",
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
      prevArrow: $(".slide-prev"),
      nextArrow: $(".slide-next"),
    });

    var Timer = setInterval(function () {
      if (slider.slick("slickCurrentSlide") == 4) {
        slider.slick("slickSetOption", "speed", 1200, true);
        slider.slick("slickGoTo", 0);
        slider.slick("slickSetOption", "speed", 500, true);
      } else {
        slider.slick("slickSetOption", "speed", 500, true);
        slider.slick("slickNext");
      }
    }, 8000);

    $(document).on("keydown", function (e) {
      if (e.key === "ArrowLeft") $(".wrapper").slick("slickPrev");
      if (e.key === "ArrowRight") $(".wrapper").slick("slickNext");
    });

    slider.on("afterChange", function () {
      clearInterval(Timer);
      Timer = setInterval(function () {
        if (slider.slick("slickCurrentSlide") == 4) {
          slider.slick("slickSetOption", "speed", 1200, true);
          slider.slick("slickGoTo", 0);
          slider.slick("slickSetOption", "speed", 500, true);
        } else {
          slider.slick("slickSetOption", "speed", 500, true);
          slider.slick("slickNext");
        }
      }, 8000);
    });
  }

  // Progress bar function
  function progressBar() {
    var slickSlide = document.querySelectorAll(".slick-dots li");
    var slickSlideButton = document.querySelectorAll(".slick-dots li button");
    for (let i = 0; i < slickSlide.length; i++) {
      if (slickSlide[i].classList.contains("slick-active")) break;
      if (slickSlideButton[i].style.width !== "100%")
        slickSlideButton[i].style.width = "100%";
    }
    for (let i = slickSlide.length - 1; i > 0; i--) {
      if (slickSlide[i].classList.contains("slick-active")) break;
      if (slickSlideButton[i].style.width !== "0px")
        slickSlideButton[i].style.width = "0";
    }
  }
  setInterval(progressBar, 10);
});
