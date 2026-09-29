// Interactive Hotspots Data
const hotspots = [
    {
        title: "University Center & Dining",
        category: "Campus Hub",
        desc: "The heart of freshman campus life! Features incredible dining halls with Manhattan skyline views, student study lounges, and residence halls.",
        image: "https://images.unsplash.com/photo-1671761262836-459c0a27c4a5?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "https://www.stevens.edu/campus-life/hoboken-and-nyc"
    },
    {
        title: "Hoboken PATH Station",
        category: "Transit to NYC",
        desc: "Just a 10-minute walk from dorms! Hop on the PATH train and arrive in Greenwich Village or World Trade Center in Manhattan in under 10 minutes.",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
        link: "https://www.stevens.edu/campus-life/hoboken-and-nyc"
    },
    {
        title: "Washington Street Eats",
        category: "Food & Nightlife",
        desc: "Hoboken's famous main strip! Packed with world-renowned pizza spots (Fiore's, Benny Tudino's), coffee shops, and late-night freshman food spots.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000",
        link: "https://www.stevens.edu/campus-life/hoboken-and-nyc"
    },
    {
        title: "Babbio Center & Gateway Complex",
        category: "Academics & Labs",
        desc: "Home to state-of-the-art computer science labs, trading rooms with real-time Bloomberg terminals, and engineering fabrication spaces.",
        image: "https://images.unsplash.com/photo-1581093449818-2655b2467fd6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "https://www.stevens.edu/academics"
    }
];

// Freshman Pro-Tips array for Attila the Duck
let duckTips = [
    "Pier A Park in Hoboken has the absolute best sunset view of the NYC skyline!",
    "Get Benny Tudino's pizza on Washington Street—a single slice is bigger than your face!",
    "The Samuel C. Williams Library has quiet study pods on the top floor with Hudson River views.",
    "Always carry your DuckCard (student ID) for free entrance to campus events and athletic games!",
    "Take advantage of Stevens Career Fairs in your freshman year—hundreds of tech companies recruit right on campus!"
];

let welcomeModalObj;

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
    welcomeModalObj = new bootstrap.Modal(document.getElementById('welcomeModal'));
    
    // Check if name is already stored
    const savedName = localStorage.getItem('stevensStudentName');
    if (!savedName) {
        welcomeModalObj.show();
    } else {
        updatePagePersonalization(savedName, localStorage.getItem('stevensStudentMajor') || 'Computer Science');
    }

    // Initialize Program Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'btn-danger');
                b.classList.add('btn-outline-secondary');
            });
            this.classList.add('active', 'btn-danger');
            this.classList.remove('btn-outline-secondary');

            const filter = this.getAttribute('data-filter');
            const items = document.querySelectorAll('.program-item');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    calculateTuition();
});

// Open Welcome Modal manually
function openNameModal() {
    welcomeModalObj.show();
}

// Save Student Info from Modal
function saveStudentInfo(event) {
    event.preventDefault();
    const nameInput = document.getElementById('modalStudentName').value.trim();
    const majorInput = document.getElementById('modalStudentMajor').value;

    if (nameInput) {
        localStorage.setItem('stevensStudentName', nameInput);
        localStorage.setItem('stevensStudentMajor', majorInput);
        updatePagePersonalization(nameInput, majorInput);
        welcomeModalObj.hide();
    }
}

// Update DOM with personal information
function updatePagePersonalization(name, major) {
    document.getElementById('heroStudentName').innerText = name;
   document.getElementById('bannerGreeting').innerHTML = `Welcome, ${name}! <img src="DUCKYYY.png" alt="Attila the Duck" class="banner-duck">`;
    document.getElementById('bannerMajorText').innerText = `Interested in ${major}? Check out top programs below!`;
    
    // Customize Duck Tip
    duckTips.unshift(`Hey ${name}! Since you're interested in ${major}, make sure to check out our hands-on freshman lab projects!`);
    document.getElementById('attilaTipText').innerText = duckTips[0];
}

// Select Campus Hotspot
function selectHotspot(index) {
    const spot = hotspots[index];
    document.getElementById('mapSpotTitle').innerText = spot.title;
    document.getElementById('mapSpotCategory').innerText = spot.category;
    document.getElementById('mapSpotDesc').innerText = spot.desc;
    document.getElementById('mapHotspotImage').src = spot.image;
    document.getElementById('mapSpotLink').href = spot.link;

    // Update active list button
    const listItems = document.querySelectorAll('#mapHotspotList button');
    listItems.forEach((item, idx) => {
        if (idx === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Calculate Tuition Estimate
function calculateTuition() {
    const tuition = parseInt(document.getElementById('calcStudentType').value) || 60900;
    const housing = parseInt(document.getElementById('calcHousing').value) || 0;
    const aid = parseInt(document.getElementById('calcAidRange').value) || 0;

    document.getElementById('aidRangeValue').innerText = '$' + aid.toLocaleString();
    
    const total = tuition + housing - aid;
    document.getElementById('calcFinalCost').innerText = '$' + Math.max(0, total).toLocaleString();
}

// Toggle Floating Attila Bubble
function toggleAttilaBubble() {
    const bubble = document.getElementById('attilaBubble');
    if (bubble.style.display === 'none') {
        bubble.style.display = 'block';
    } else {
        bubble.style.display = 'none';
    }
}

// Get New Duck Tip
function getNewDuckTip() {
    const randomIndex = Math.floor(Math.random() * duckTips.length);
    document.getElementById('attilaTipText').innerText = duckTips[randomIndex];
}