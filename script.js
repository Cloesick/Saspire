
// Language dropdown toggle
(function(){
    var btn=document.getElementById('langBtn'),menu=document.getElementById('langMenu');
    if(btn&&menu){
        btn.addEventListener('click',function(e){
            e.stopPropagation();
            var open=!menu.classList.contains('hidden');
            menu.classList.toggle('hidden');
            btn.setAttribute('aria-expanded', String(!open));
        });
        document.addEventListener('click',function(){
            menu.classList.add('hidden');
            btn&&btn.setAttribute('aria-expanded','false');
        });
    }
})();

// Browser language auto-detection (first visit only, sessionStorage-gated)
if(!sessionStorage.getItem('langDetected')){
    sessionStorage.setItem('langDetected','1');
    var _lang=(navigator.language||'').toLowerCase();
    var _path=window.location.pathname;
    if(_lang.startsWith('nl')&&!_path.startsWith('/nl'))window.location.href='/nl/';
    else if(_lang.startsWith('fr')&&!_path.startsWith('/fr'))window.location.href='/fr/';
    else if(_lang.startsWith('de')&&!_path.startsWith('/de'))window.location.href='/de/';
    else if(_lang.startsWith('es')&&!_path.startsWith('/es'))window.location.href='/es/';
    else if(_lang.startsWith('pt')&&!_path.startsWith('/pt'))window.location.href='/pt/';
}

document.addEventListener("DOMContentLoaded", function () {
    // --- Cookie Consent Banner ---
    const cookieBanner = document.getElementById("cookie-banner");
    const cookieAccept = document.getElementById("cookie-accept");
    const cookieDecline = document.getElementById("cookie-decline");

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieConsent");

    if (!cookieChoice && cookieBanner) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.remove("translate-y-full");
        }, 1000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener("click", () => {
            localStorage.setItem("cookieConsent", "accepted");
            cookieBanner.classList.add("translate-y-full");
            if (typeof gtag === "function") {
                gtag("consent", "update", {
                    analytics_storage: "granted",
                    ad_storage: "granted",
                    ad_user_data: "granted",
                    ad_personalization: "granted",
                });
            }
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener("click", () => {
            localStorage.setItem("cookieConsent", "declined");
            cookieBanner.classList.add("translate-y-full");
            if (typeof gtag === "function") {
                gtag("consent", "update", {
                    analytics_storage: "denied",
                    ad_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                });
            }
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        if (question && answer) {
            question.addEventListener("click", () => {
                // Close other open items
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.querySelector(".faq-answer")?.classList.add("hidden");
                        otherItem.querySelector(".faq-icon")?.classList.remove("rotate-180");
                    }
                });

                // Toggle current item
                answer.classList.toggle("hidden");
                icon?.classList.toggle("rotate-180");
            });
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

    // --- Sticky Navigation ---
    const header = document.getElementById("main-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("nav-sticky");
            } else {
                header.classList.remove("nav-sticky");
            }
        });
    }

    // --- Animate on Scroll ---
    const animatedElements = document.querySelectorAll(".fade-in-up-on-scroll");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-up");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 },
    );

    animatedElements.forEach((el) => {
        observer.observe(el);
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll(".counter");
    const speed = 200; // The lower the slower
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;

        counters.forEach((counter) => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        countersAnimated = true;
    };

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 },
    );

    counters.forEach((c) => counterObserver.observe(c));

    // --- Contact Form Submission with Formspree ---
    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("form-success-message");
    const errorMessage = document.getElementById("form-error-message");

    if (contactForm)
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Basic validation
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!firstName || !lastName || !email || !message) {
                alert("Please fill out all required fields.");
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Submit to Formspree
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    contactForm.style.display = "none";
                    successMessage.classList.remove("hidden");
                    errorMessage.classList.add("hidden");
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ event: "contact_form_submit" });
                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                console.error("Form submission error:", error);
                errorMessage.classList.remove("hidden");
                successMessage.classList.add("hidden");
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });

    // --- Tawk.to Live Chat ---
    var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/6a19cc06be64d31c346104f3/1jpqc9unj";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
    })();

    // --- GTM Conversion Events ---
    // Track "Schedule Call" clicks
    document.querySelectorAll('a[href*="calendly"], a[href*="#schedule"]').forEach((link) => {
        link.addEventListener("click", () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "schedule_call_click" });
        });
    });

    // Track pricing page view
    if (window.location.pathname.includes("pricing")) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "pricing_page_view" });
    }

    // Track blog post view
    if (window.location.pathname.includes("/blog/") && window.location.pathname !== "/blog/" && window.location.pathname !== "/blog/index.html") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "blog_post_view", blog_path: window.location.pathname });
    }

    // ── PoC card hover-video ──────────────────────────────────────────────────
    // For each card in the cases grid that has an /images/poc/*.jpeg,
    // inject a <video> overlay. Video plays on hover, pauses+resets on leave.
    // Videos live at /videos/poc/{slug}.mp4 — cards degrade silently if missing.
    document.querySelectorAll('a.group[href*="antwerp-poc-portfolio"]').forEach(function(card) {
        var img = card.querySelector('img[src*="/images/poc/"]');
        if (!img) return;

        // derive slug from image filename, e.g. /images/poc/helios.jpeg → helios
        var slug = img.src.split('/images/poc/')[1].replace(/\.[^.]+$/, '');

        var wrap = img.parentElement;
        wrap.style.position = 'relative';

        var vid = document.createElement('video');
        vid.src = '/videos/poc/' + slug + '.mp4';
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.preload = 'none';
        vid.setAttribute('aria-hidden', 'true');
        vid.style.cssText = [
            'position:absolute', 'inset:0', 'width:100%', 'height:100%',
            'object-fit:cover', 'opacity:0',
            'transition:opacity 0.35s ease', 'pointer-events:none'
        ].join(';');
        wrap.appendChild(vid);

        card.addEventListener('mouseenter', function() {
            vid.style.opacity = '1';
            vid.play().catch(function(){});
        });
        card.addEventListener('mouseleave', function() {
            vid.style.opacity = '0';
            vid.pause();
            vid.currentTime = 0;
        });
    });
    // ── end hover-video ───────────────────────────────────────────────────────
});
