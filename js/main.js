/* ========================================
   JAPAN BASEBALL TOURS — main.js  (v2)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Navbar scroll ───────────────── */
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 70);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── 2. Mobile hamburger ────────────── */
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ── 3. Smooth scroll ───────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = navbar.offsetHeight + 20;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        });
    });

    /* ── 4. Scroll reveal ───────────────── */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('visible'), +delay);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Experience cards stagger
    document.querySelectorAll('.exp-card').forEach((el, i) => {
        el.dataset.delay = i * 80;
        revealObs.observe(el);
    });

    // Generic reveal class
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // Section heads
    document.querySelectorAll('.section-head, .service-inner, .who-grid, .booking-steps, .principles-grid, .team-grid, .contact-grid').forEach(el => {
        el.classList.add('reveal');
        revealObs.observe(el);
    });

    /* ── 5. Count-up numbers ────────────── */
    const countObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.stat-num[data-count]').forEach(el => {
                const end = +el.dataset.count;
                const dur = 1800;
                const step = end / (dur / 16);
                let cur = 0;
                const t = setInterval(() => {
                    cur = Math.min(cur + step, end);
                    el.textContent = Math.floor(cur);
                    if (cur >= end) clearInterval(t);
                }, 16);
            });
            countObs.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    const serviceSection = document.querySelector('.service');
    if (serviceSection) countObs.observe(serviceSection);

    /* ── 6. Itinerary day switcher ──────── */
    const dayBtns   = document.querySelectorAll('.itin-day-btn');
    const panels    = document.querySelectorAll('.itin-panel');

    dayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const day = btn.dataset.day;

            dayBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            panels.forEach(p => p.classList.remove('active'));
            const target = document.querySelector(`.itin-panel[data-panel="${day}"]`);
            if (target) target.classList.add('active');
        });
    });

    /* ── 7. Hero subtle parallax ────────── */
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            heroImg.style.transform = `scale(1.04) translateY(${window.pageYOffset * 0.18}px)`;
        }, { passive: true });
    }

    /* ── 8. Contact form → API ──────────── */
    const form       = document.getElementById('contactForm');
    const submitBtn  = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

            const fd = new FormData(form);
            const data = Object.fromEntries(fd.entries());

            try {
                await fetch('tables/inquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name:   data.firstName,
                        last_name:    data.lastName,
                        email:        data.email,
                        tour_type:    data.tourType,
                        group_size:   data.groupSize,
                        travel_date:  data.travelDate || '',
                        message:      data.message || '',
                        notify_email: 'hello@japan-adventures.co',
                        submitted_at: new Date().toISOString()
                    })
                });
                // Mailto fallback — sends data to hello@japan-adventures.co
                const subject = encodeURIComponent('New Tour Inquiry from ' + data.firstName + ' ' + data.lastName);
                const body = encodeURIComponent(
                    'Name: ' + data.firstName + ' ' + data.lastName + '\n' +
                    'Email: ' + data.email + '\n' +
                    'Tour Type: ' + (data.tourType || '-') + '\n' +
                    'Group Size: ' + (data.groupSize || '-') + '\n' +
                    'Travel Date: ' + (data.travelDate || '-') + '\n\n' +
                    'Message:\n' + (data.message || '-')
                );
                window.location.href = 'mailto:hello@japan-adventures.co?subject=' + subject + '&body=' + body;
            } catch (err) {
                console.warn('API note:', err);
            }

            // Show success regardless (fallback)
            form.style.display = 'none';
            successMsg.style.display = 'flex';
        });
    }

    /* ── 9. Brochure Modal ──────────────── */
    const modalOverlay    = document.getElementById('brochure-modal');
    const modalClose      = document.getElementById('modalClose');
    const brochureForm    = document.getElementById('brochureForm');
    const brochureSubmit  = document.getElementById('brochureSubmitBtn');
    const brochureSuccess = document.getElementById('brochureSuccess');

    // Open modal from both buttons
    ['brochureBtn1', 'brochureBtn2'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', e => {
                e.preventDefault();
                modalOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Close on X button
    modalClose?.addEventListener('click', closeModal);

    // Close on overlay click (outside box)
    modalOverlay?.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) closeModal();
    });

    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Brochure form submit
    brochureForm?.addEventListener('submit', async e => {
        e.preventDefault();
        brochureSubmit.disabled = true;
        brochureSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

        const fd = new FormData(brochureForm);
        const data = Object.fromEntries(fd.entries());

        try {
            await fetch('tables/brochure_requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name:       data.brochureName,
                    email:      data.brochureEmail,
                    interest:   data.brochureInterest || '',
                    requested_at: new Date().toISOString()
                })
            });
        } catch (err) {
            console.warn('Brochure API note:', err);
        }

        brochureForm.querySelector('.brochure-form-row').style.display = 'none';
        brochureForm.querySelector('select').style.display = 'none';
        brochureSubmit.style.display = 'none';
        brochureSuccess.style.display = 'flex';
    });

    /* ── 10. Booking step hover polish ───── */
    document.querySelectorAll('.booking-step').forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.style.transition = 'all .25s ease';
        });
    });

    /* ── 10. Who card shimmer on load ───── */
    document.querySelectorAll('.who-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity .7s ease ${i * 150}ms, transform .7s ease ${i * 150}ms`;

        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    obs.unobserve(card);
                }
            });
        }, { threshold: 0.12 });
        obs.observe(card);
    });

});
