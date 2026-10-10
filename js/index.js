// main.js - Enhanced JavaScript for K.G. Bhut & Associates Website

// Add 'js-enabled' class to <html> to trigger JS-dependent CSS
document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", function () {
  try {
    // Mobile menu toggle (independent of GSAP)
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
      // Close mobile menu when a link inside it is clicked
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }

    // FAQ toggle functionality (independent of GSAP)
    document.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", function () {
        const answer = this.nextElementSibling;
        const icon = this.querySelector("svg");
        if (answer && answer.classList.contains("hidden")) {
          answer.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        } else if (answer) {
          answer.classList.add("hidden");
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      });
    });

    // Section heading / subheading scroll-in animation (all pages)
    const scrollAnimatedElements = document.querySelectorAll(
      ".section-heading, .section-subheading",
    );
    if (scrollAnimatedElements.length > 0 && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.25,
        },
      );

      scrollAnimatedElements.forEach((el) => observer.observe(el));
    }

    // GSAP is loaded lazily and only when animation targets exist.
    const shouldLoadGsap = !!document.querySelector(
      ".hero-content, .about-preview, .services-preview, .case-study-section, .company-overview, .industry-expertise, .industry-card, .contact-card, #parallax-bg, .counter",
    );

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

    function runGsapAnimations() {
      if (typeof gsap === "undefined") return;
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Hero content fade-in animation (for pages with .hero-content)
      if (document.querySelector(".hero-content")) {
        gsap.to(".hero-content", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Homepage specific animations
      if (document.querySelector(".hero-section")) {
        if (document.querySelector(".about-preview")) {
          gsap.to(".about-preview", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-preview",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
        if (document.querySelector(".services-preview")) {
          gsap.to(".service-card", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-preview",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
        if (document.querySelector(".case-study-section")) {
          gsap.to(".case-study-card", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".case-study-section",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      // About page animations
      if (window.location.pathname.includes("about.html")) {
        if (document.querySelector(".company-overview")) {
          gsap.to(".company-overview", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".company-overview",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
        if (document.querySelector(".industry-expertise")) {
          gsap.to(".industry-expertise", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".industry-expertise",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      // Services page animations
      if (window.location.pathname.includes("services.html")) {
        if (document.querySelector(".industry-card")) {
          gsap.to(".industry-card", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".industry-card",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      // Contact page animations
      if (window.location.pathname.includes("contact.html")) {
        if (document.querySelector(".contact-card")) {
          gsap.to(".contact-card", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-card",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      // Parallax effect for hero backgrounds
      if (document.querySelector("#parallax-bg")) {
        gsap.to("#parallax-bg", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: "#parallax-bg",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Counter animations
      const counters = document.querySelectorAll(".counter");
      if (counters.length > 0) {
        counters.forEach((counter) => {
          const finalValue = parseInt(counter.textContent);
          if (!isNaN(finalValue)) {
            gsap.fromTo(
              counter,
              { textContent: 0 },
              {
                textContent: finalValue,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: counter,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        });
      }

      // Card hover animations (move up slightly on mouse enter)
      document
        .querySelectorAll(
          ".service-card, .feature-card, .location-card, .contact-card, .industry-card, .pricing-card",
        )
        .forEach((card) => {
          card.addEventListener("mouseenter", function () {
            gsap.to(this, { y: -10, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener("mouseleave", function () {
            gsap.to(this, { y: 0, duration: 0.3, ease: "power2.out" });
          });
        });
    }

    async function initGsapDeferred() {
      if (!shouldLoadGsap) return;
      if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        runGsapAnimations();
        return;
      }
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
        );
        runGsapAnimations();
      } catch (err) {
        console.warn("GSAP failed to load, continuing without animations", err);
      }
    }

    const queueGsapLoad = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(initGsapDeferred, { timeout: 1500 });
      } else {
        setTimeout(initGsapDeferred, 300);
      }
    };

    if (document.readyState === "complete") {
      queueGsapLoad();
    } else {
      window.addEventListener("load", queueGsapLoad, { once: true });
    }

    // Home page testimonial slider
    const testimonialText = document.getElementById("testimonial-text");
    const testimonialName = document.getElementById("testimonial-name");
    const testimonialRole = document.getElementById("testimonial-role");
    const testimonialImage = document.getElementById("testimonial-image");
    const testimonialStars = document.getElementById("testimonial-stars");
    const prevBtn = document.getElementById("testimonial-prev");
    const nextBtn = document.getElementById("testimonial-next");

    if (
      testimonialText &&
      testimonialName &&
      testimonialRole &&
      testimonialImage &&
      testimonialStars &&
      prevBtn &&
      nextBtn
    ) {
      const testimonials = [
        {
          name: "Apurva Singh",
          role: "Software Developer, Bengaluru",
          text: "Khushbu is very experienced in her work. Explains things clearly and always gives positive results and gains. One of the best experiences I've had. Handled my ITR filing with utmost accuracy, guided me throughout, and was always available for clarifications. Her expertise and supportive nature make her highly trustworthy. Highly recommend her.",
          image: "./images/about.jpg",
          rating: 5,
        },
        {
          name: "Bhaskar Kumar",
          role: "Security Consultant, Gurugram",
          text: "Got seamless support for Personalised tax planning and ITR filing. Thanks a lot!",
          image: "./images/about.jpg",
          rating: 5,
        },
        {
          name: "Vivek Patel",
          role: "Product Engineer, Pune",
          text: "Exceptional service and attention to detail. They handle all our compliance requirements efficiently, allowing us to focus on growing our business.",
          image: "./images/about.jpg",
          rating: 5,
        },
      ];

      let currentTestimonialIndex = 0;

      function renderTestimonial(index) {
        const item = testimonials[index];
        testimonialText.innerHTML = `&ldquo;${item.text}&rdquo;`;
        testimonialName.textContent = item.name;
        testimonialRole.textContent = item.role;
        testimonialImage.src = item.image;

        // Build star rating
        const maxStars = 5;
        let starsHtml = "";
        for (let i = 1; i <= maxStars; i++) {
          const extraClass =
            i <= item.rating ? "text-yellow-400" : "text-gray-300";
          starsHtml += `
            <svg class="w-4 h-4 ${extraClass}" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>`;
        }
        testimonialStars.innerHTML = starsHtml;
      }

      renderTestimonial(currentTestimonialIndex);

      prevBtn.addEventListener("click", () => {
        currentTestimonialIndex =
          (currentTestimonialIndex - 1 + testimonials.length) %
          testimonials.length;
        renderTestimonial(currentTestimonialIndex);
      });

      nextBtn.addEventListener("click", () => {
        currentTestimonialIndex =
          (currentTestimonialIndex + 1) % testimonials.length;
        renderTestimonial(currentTestimonialIndex);
      });
    }

    // Case studies slider (single centered card, no dragging)
    const caseTitle = document.getElementById("case-title");
    const caseDescription = document.getElementById("case-description");
    const caseHighlight = document.getElementById("case-highlight");
    const caseTag = document.getElementById("case-tag");
    const caseImage = document.getElementById("case-image");
    const casePrev = document.getElementById("case-prev");
    const caseNext = document.getElementById("case-next");
    const caseProgress = document.getElementById("case-progress");

    if (
      caseTitle &&
      caseDescription &&
      caseHighlight &&
      caseTag &&
      caseImage &&
      casePrev &&
      caseNext &&
      caseProgress
    ) {
      const caseStudies = [
        {
          tag: "Case Study",
          title: "Manufacturing Company Tax Optimization",
          description:
            "Helped a mid-size manufacturing company reduce their tax liability by 35% through strategic planning and compliance optimization.",
          highlight: "35% Tax Savings",
          image: "./images/case-studies-1.jpg",
        },
        {
          tag: "Case Study",
          title: "Startup Financial Structuring",
          description:
            "Assisted a tech startup in setting up robust financial systems and securing funding through investor-ready financial statements.",
          highlight: "₹2Cr Funding Secured",
          image: "./images/case-studies-2.jpg",
        },
        {
          tag: "Case Study",
          title: "Multi-Location GST Compliance",
          description:
            "Implemented a centralized GST compliance framework for a multi-location retailer, reducing filing errors and penalties significantly.",
          highlight: "Zero Penalties in 2 Years",
          image: "./images/case-studies-1.jpg",
        },
      ];

      let currentCaseIndex = 0;
      let autoCaseTimer = null;

      function renderCase(index) {
        const item = caseStudies[index];
        caseTag.textContent = item.tag;
        caseTitle.textContent = item.title;
        caseDescription.textContent = item.description;
        caseHighlight.textContent = item.highlight;
        caseImage.src = item.image;

        const segment = 100 / caseStudies.length;
        const width = segment * (index + 1);
        caseProgress.style.width = `${width}%`;
      }

      function startAutoCaseSlider() {
        if (autoCaseTimer) {
          clearInterval(autoCaseTimer);
        }
        autoCaseTimer = setInterval(() => {
          currentCaseIndex = (currentCaseIndex + 1) % caseStudies.length;
          renderCase(currentCaseIndex);
        }, 6000);
      }

      renderCase(currentCaseIndex);
      startAutoCaseSlider();

      casePrev.addEventListener("click", () => {
        currentCaseIndex =
          (currentCaseIndex - 1 + caseStudies.length) % caseStudies.length;
        renderCase(currentCaseIndex);
        startAutoCaseSlider();
      });

      caseNext.addEventListener("click", () => {
        currentCaseIndex = (currentCaseIndex + 1) % caseStudies.length;
        renderCase(currentCaseIndex);
        startAutoCaseSlider();
      });
    }
  } catch (error) {
    console.error("JavaScript error:", error);
    // Fallback: show all content if JS fails
    document.documentElement.classList.remove("js-enabled");
    document.body.style.opacity = "1";
    document.body.style.visibility = "visible";
  }
});

// Page load animation
window.addEventListener("load", function () {
  try {
    if (typeof gsap !== "undefined") {
      gsap.from("body", { opacity: 0, duration: 0.5, ease: "power2.out" });
    }
  } catch (error) {
    console.error("Load animation error:", error);
    document.body.style.opacity = "1";
  }
});

// GSAP loading fallback
window.addEventListener("error", function (e) {
  if (e.filename && e.filename.includes("gsap")) {
    console.warn("GSAP failed to load, showing content without animations");
    document.body.style.opacity = "1";
    document.body.style.visibility = "visible";
    document.documentElement.classList.remove("js-enabled");
  }
});
