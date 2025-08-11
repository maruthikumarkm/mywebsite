document.addEventListener("DOMContentLoaded", () => {
            // Modern Geometric Wireframe Background Generator
            function createGeometricBackground() {
                const trianglesContainer = document.getElementById("triangles-container");

                // Create geometric lines container
                const geometricLines = document.createElement("div");
                geometricLines.className = "geometric-lines";
                trianglesContainer.appendChild(geometricLines);

                // Create wireframe shapes
                const wireframeShapes = [
                    { class: "wireframe-circle-1", element: "div" },
                    { class: "wireframe-circle-2", element: "div" },
                    { class: "wireframe-square", element: "div" },
                ];

                wireframeShapes.forEach((shape) => {
                    const element = document.createElement(shape.element);
                    element.className = `wireframe-shape ${shape.class}`;
                    trianglesContainer.appendChild(element);
                });

                // Create floating dots
                const floatingDotsContainer = document.createElement("div");
                floatingDotsContainer.className = "floating-dots";

                for (let i = 1; i <= 3; i++) {
                    const dot = document.createElement("div");
                    dot.className = `floating-dot floating-dot-${i}`;
                    floatingDotsContainer.appendChild(dot);
                }

                trianglesContainer.appendChild(floatingDotsContainer);

                // Add mouse interaction effect for wireframes (simplified for mobile)
                let mouseInteractionEnabled = window.innerWidth > 768;
                
                if (mouseInteractionEnabled) {
                    document.addEventListener("mousemove", (e) => {
                        const mouseX = e.clientX / window.innerWidth;
                        const mouseY = e.clientY / window.innerHeight;

                        const wireframes = document.querySelectorAll(".wireframe-shape");
                        wireframes.forEach((wireframe, index) => {
                            const speed = ((index % 3) + 1) * 0.01;
                            const x = (mouseX - 0.5) * 10 * speed;
                            const y = (mouseY - 0.5) * 10 * speed;

                            wireframe.style.transform += ` translate(${x}px, ${y}px)`;
                        });
                    });
                }
            }

            // Initialize geometric background
            createGeometricBackground();

            // Smooth scrolling for navigation links
            const navLinks = document.querySelectorAll("nav a");
            navLinks.forEach((link) => {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute("href");
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }
                });
            });

            // Intersection Observer for fade-in animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");

                        // Animate skill progress bars when skills section comes into view
                        if (entry.target.id === "skills") {
                            animateSkillBars();
                        }
                    }
                });
            }, observerOptions);

            // Observe all sections
            const sections = document.querySelectorAll("section");
            sections.forEach((section) => {
                observer.observe(section);
            });

            function animateSkillBars() {
                const progressBars = document.querySelectorAll(".skill-progress-bar");
                progressBars.forEach((bar, index) => {
                    const width = bar.getAttribute("data-width");
                    const percentageElement = bar.parentElement.nextElementSibling;
                    
                    percentageElement.textContent = "0%";
                    
                    setTimeout(() => {
                        bar.style.width = width + "%";
                        
                        let currentPercentage = 0;
                        const targetPercentage = parseInt(width);
                        const increment = targetPercentage / 60; // 60 frames for smooth animation
                        
                        const percentageAnimation = setInterval(() => {
                            currentPercentage += increment;
                            if (currentPercentage >= targetPercentage) {
                                currentPercentage = targetPercentage;
                                clearInterval(percentageAnimation);
                            }
                            percentageElement.textContent = Math.round(currentPercentage) + "%";
                        }, 25); // Update every 25ms for smooth animation
                        
                    }, 200 + (index * 100)); // Stagger animation for each skill
                });
            }

            // Add click effect to buttons
            const buttons = document.querySelectorAll(".button, .project-btn, .connect-button");
            buttons.forEach((button) => {
                button.addEventListener("click", function (e) {
                    const ripple = document.createElement("span");
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.width = ripple.style.height = size + "px";
                    ripple.style.left = x + "px";
                    ripple.style.top = y + "px";
                    ripple.classList.add("ripple");

                    this.appendChild(ripple);

                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });

            // Add loading animation
            window.addEventListener("load", () => {
                document.body.classList.add("loaded");
            });

            // Add contact form functionality
            const connectButton = document.querySelector(".connect-button");
            if (connectButton) {
                connectButton.addEventListener("click", () => {
                    const contactSection = document.querySelector("#contact");
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                });
            }

            // Optimize animations for mobile
            function optimizeForMobile() {
                if (window.innerWidth <= 768) {
                    // Reduce animation complexity on mobile
                    const wireframes = document.querySelectorAll(".wireframe-shape");
                    wireframes.forEach(wireframe => {
                        wireframe.style.animationDuration = "30s";
                    });
                    
                    const dots = document.querySelectorAll(".floating-dot");
                    dots.forEach(dot => {
                        dot.style.animationDuration = "15s";
                    });
                }
            }

            optimizeForMobile();

            // Re-optimize on resize
            window.addEventListener("resize", optimizeForMobile);
        });
