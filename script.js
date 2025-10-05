document.addEventListener('DOMContentLoaded', () => {
    let currentPageIndex = 0;
    const totalPages = 12;
    const pages = document.querySelectorAll('.page');
    const storybook = document.getElementById('storybook');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentPageSpan = document.getElementById('current-page');
    const viewScienceBtn = document.getElementById('view-science-btn');
    const sciencePopup = document.getElementById('science-popup');
    const closeBtn = document.querySelector('.close-btn');

    // Science content for each page
    const scienceContent = {
        0: {
            title: "Welcome to Space Weather Science!",
            content: "This story teaches about <strong>space weather</strong> - the conditions in space that can affect Earth and our technology. Solar flares and coronal mass ejections are real phenomena that space weather scientists monitor every day!"
        },
        1: {
            title: "The International Space Station (ISS)",
            content: "The <strong>ISS</strong> orbits Earth at about 408 km altitude, traveling at 27,600 km/h! It's visible from Earth because it reflects sunlight. The ISS is particularly vulnerable to space radiation, which is why astronauts have shielded areas to retreat to during solar storms."
        },
        2: {
            title: "Solar Radiation Detection",
            content: "Space agencies monitor the Sun 24/7 using satellites. When a <strong>solar flare</strong> occurs, we get about 8 minutes warning (the time it takes light to travel from Sun to Earth) before the radiation arrives. This gives astronauts time to seek shelter!"
        },
        3: {
            title: "Solar Flares vs Coronal Mass Ejections",
            content: "<strong>Solar flares</strong> are intense bursts of radiation that travel at light speed. <strong>CMEs</strong> are massive clouds of magnetized particles that travel much slower (1-4 days to reach Earth) but carry much more energy and can cause bigger disruptions."
        },
        4: {
            title: "Space Radiation Protection",
            content: "The ISS has special <strong>radiation shielding</strong> areas where astronauts can shelter during solar particle events. These areas have extra materials to block harmful radiation. Astronauts also wear dosimeters to measure their radiation exposure."
        },
        5: {
            title: "Earth's Magnetic Shield",
            content: "Earth's <strong>magnetosphere</strong> is created by our planet's magnetic field. It deflects most of the solar wind and charged particles. When a large CME hits, it compresses and disturbs this field, creating a <strong>geomagnetic storm</strong>."
        },
        6: {
            title: "Ionospheric Disruptions",
            content: "The <strong>ionosphere</strong> is a layer of Earth's atmosphere (80-600 km up) filled with charged particles. Solar storms energize these particles, which can bend, absorb, or scatter radio signals, causing GPS and communication problems."
        },
        7: {
            title: "Geomagnetically Induced Currents (GICs)",
            content: "When the magnetosphere is disturbed, it creates changing magnetic fields that induce electrical currents in long conductors on Earth's surface. These <strong>GICs</strong> can flow through power lines, pipelines, and railways, potentially damaging equipment."
        },
        8: {
            title: "GPS and Precision Agriculture",
            content: "Modern farming relies on <strong>precision GPS</strong> for straight rows, optimal seed spacing, and efficient fertilizer use. Solar storms can disrupt GPS signals by affecting radio wave propagation through the ionosphere, reducing accuracy from centimeters to meters."
        },
        9: {
            title: "Magnetic Field Lines and Particle Funneling",
            content: "Earth's magnetic field lines act like invisible highways, guiding charged particles toward the polar regions. This natural 'funnel' system protects most of Earth while directing the particles to where they can create beautiful light shows!"
        },
        10: {
            title: "Aurora Formation",
            content: "<strong>Auroras</strong> occur when solar particles collide with gases in our atmosphere (80-300 km high). Oxygen creates green and red lights, while nitrogen produces blue and purple. The <strong>Aurora Borealis</strong> (north) and <strong>Aurora Australis</strong> (south) are Earth's way of safely dissipating solar energy!"
        },
        11: {
            title: "Space Weather Monitoring",
            content: "Scientists use satellites, ground-based magnetometers, and computer models to predict space weather. Organizations like NOAA's Space Weather Prediction Center issue forecasts and warnings to protect astronauts, satellites, power grids, and aviation. Space weather is a real and important field of study!"
        }
    };

    // Update page counter and navigation buttons
    function updateNavigation() {
        currentPageSpan.textContent = currentPageIndex + 1;
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === totalPages - 1;
    }

    // Navigate to specific page
    function goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            currentPageIndex = pageIndex;
            const pageHeight = storybook.clientHeight;
            storybook.scrollTo({
                top: pageIndex * pageHeight,
                behavior: 'smooth'
            });
            updateNavigation();
        }
    }

    // Previous page
    prevBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            goToPage(currentPageIndex - 1);
        }
    });

    // Next page
    nextBtn.addEventListener('click', () => {
        if (currentPageIndex < totalPages - 1) {
            goToPage(currentPageIndex + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentPageIndex > 0) goToPage(currentPageIndex - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentPageIndex < totalPages - 1) goToPage(currentPageIndex + 1);
        } else if (e.key === 'Escape' && sciencePopup.style.display === 'flex') {
            closeSciencePopup();
        }
    });

    // Handle scroll events to update current page
    let scrollTimeout;
    storybook.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const pageHeight = storybook.clientHeight;
            const newPageIndex = Math.round(storybook.scrollTop / pageHeight);
            if (newPageIndex !== currentPageIndex && newPageIndex >= 0 && newPageIndex < totalPages) {
                currentPageIndex = newPageIndex;
                updateNavigation();
            }
        }, 100);
    });

    // Science popup functionality
    function showScienceContent() {
        const content = scienceContent[currentPageIndex];
        document.getElementById('science-content-title').textContent = content.title;
        document.getElementById('science-content-text').innerHTML = content.content;
        sciencePopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeSciencePopup() {
        sciencePopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Science button event
    viewScienceBtn.addEventListener('click', showScienceContent);

    // Close science popup
    closeBtn.addEventListener('click', closeSciencePopup);

    // Close popup when clicking outside
    sciencePopup.addEventListener('click', (e) => {
        if (e.target === sciencePopup) {
            closeSciencePopup();
        }
    });

    // Initialize
    updateNavigation();
    setupCoverImage();
});

// Handle cover image loading
function setupCoverImage() {
    const coverImg = document.getElementById('cover-img');
    const coverBgContainer = document.querySelector('.cover-background-image');
    
    if (coverImg && coverBgContainer) {
        // Handle image load error (if image doesn't exist)
        coverImg.addEventListener('error', function() {
            coverBgContainer.style.display = 'none';
            console.log('Cover image not found - using gradient background only');
        });
        
        // Handle successful image load
        coverImg.addEventListener('load', function() {
            coverImg.style.opacity = '0.4';
            console.log('Cover image loaded successfully');
        });
        
        // Check if image exists immediately
        if (coverImg.complete) {
            if (coverImg.naturalWidth === 0) {
                coverBgContainer.style.display = 'none';
            } else {
                coverImg.style.opacity = '0.4';
            }
        }
    }
}
