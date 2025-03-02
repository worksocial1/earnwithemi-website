// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips and popovers
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // EMI Calculator
    const emiCalculator = {
        loanAmount: document.getElementById('loanAmount'),
        interestRate: document.getElementById('interestRate'),
        loanTenure: document.getElementById('loanTenure'),
        calculateBtn: document.getElementById('calculateEMI'),
        emiResult: document.getElementById('emiResult'),
        totalAmount: document.getElementById('totalAmount'),
        totalInterest: document.getElementById('totalInterest'),

        initialize: function() {
            if (this.calculateBtn) {
                this.calculateBtn.addEventListener('click', () => this.calculateEMI());
            }
        },

        calculateEMI: function() {
            const p = parseFloat(this.loanAmount.value);
            const r = parseFloat(this.interestRate.value) / (12 * 100);
            const n = parseFloat(this.loanTenure.value) * 12;

            if (p && r && n) {
                const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
                const totalAmt = emi * n;
                const totalInt = totalAmt - p;

                this.emiResult.innerHTML = `₹${emi.toFixed(2)}`;
                this.totalAmount.innerHTML = `₹${totalAmt.toFixed(2)}`;
                this.totalInterest.innerHTML = `₹${totalInt.toFixed(2)}`;
            }
        }
    };

    // Contact Form Validation
    const contactForm = {
        form: document.getElementById('contactForm'),
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        message: document.getElementById('message'),

        initialize: function() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }
        },

        validateEmail: function(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        validatePhone: function(phone) {
            return /^[0-9]{10}$/.test(phone);
        },

        handleSubmit: function(e) {
            e.preventDefault();
            let isValid = true;
            let errorMessage = '';

            if (!this.name.value.trim()) {
                isValid = false;
                errorMessage += 'Name is required.\n';
            }

            if (!this.validateEmail(this.email.value)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }

            if (!this.validatePhone(this.phone.value)) {
                isValid = false;
                errorMessage += 'Please enter a valid 10-digit phone number.\n';
            }

            if (!this.message.value.trim()) {
                isValid = false;
                errorMessage += 'Message is required.\n';
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                this.form.reset();
            } else {
                alert(errorMessage);
            }
        }
    };

    // Product Filter
    const productFilter = {
        filters: document.querySelectorAll('.product-filter'),
        products: document.querySelectorAll('.product-card'),

        initialize: function() {
            if (this.filters.length) {
                this.filters.forEach(filter => {
                    filter.addEventListener('click', (e) => this.filterProducts(e));
                });
            }
        },

        filterProducts: function(e) {
            const category = e.target.dataset.category;
            
            this.products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    };

    // Scroll Animation
    const scrollAnimation = {
        elements: document.querySelectorAll('.fade-in'),

        initialize: function() {
            window.addEventListener('scroll', () => this.checkView());
        },

        checkView: function() {
            const triggerBottom = window.innerHeight * 0.8;

            this.elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < triggerBottom) {
                    element.classList.add('show');
                }
            });
        }
    };

    // Navbar Scroll Effect
    const navbar = {
        nav: document.querySelector('.navbar'),

        initialize: function() {
            if (this.nav) {
                window.addEventListener('scroll', () => this.handleScroll());
            }
        },

        handleScroll: function() {
            if (window.scrollY > 100) {
                this.nav.classList.add('navbar-scrolled');
            } else {
                this.nav.classList.remove('navbar-scrolled');
            }
        }
    };

    // Initialize all components
    emiCalculator.initialize();
    contactForm.initialize();
    productFilter.initialize();
    scrollAnimation.initialize();
    navbar.initialize();
});

// Loan Calculator Helper Functions
function formatCurrency(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(number);
}

function updateRangeValue(inputId, displayId) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    if (input && display) {
        display.textContent = input.value;
    }
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
