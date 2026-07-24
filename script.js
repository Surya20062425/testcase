gsap.registerPlugin(TextPlugin);

// 1. Particle Background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(230, 195, 106, 0.5)";
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

// 2. Custom Cursor
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
});

// 3. Intro Timeline
const introTL = gsap.timeline();
introTL.to("#intro-text", { duration: 2, text: "Hi...", delay: 1 })
       .to("#intro-text", { duration: 1, opacity: 0, delay: 1 })
       .to("#intro-text", { duration: 2, text: "Hey, Birthday Star ❤️", opacity: 1 })
       .to("#intro-text", { duration: 1, opacity: 0, delay: 1 })
       .to("#intro-text", { duration: 2, text: "I have something special for you...", opacity: 1 })
       .to("#start-btn", { duration: 1, opacity: 1, visibility: 'visible', y: -20 });

// 4. Scene Navigation
const scenes = document.querySelectorAll('.scene');
let currentScene = 0;

function nextScene() {
    const outTL = gsap.timeline();
    outTL.to(scenes[currentScene], { opacity: 0, duration: 1.5, ease: "power2.inOut", onComplete: () => {
        scenes[currentScene].classList.remove('active');
        currentScene++;
        scenes[currentScene].classList.add('active');
        playScene(currentScene);
    }});
}

function playScene(index) {
    const scene = scenes[index];
    gsap.to(scene, { opacity: 1, duration: 1.5, ease: "power2.inOut" });

    if (scene.id === 'scene-memories') {
        gsap.from(".photo-card", { opacity: 0, y: 100, stagger: 0.3, duration: 1.5, rotation: 0 });
    }

    if (scene.id === 'scene-letter') {
        gsap.to("#letter-text", {
            duration: 10,
            text: "Dear Alex, <br><br> Another year of magic, another year of you being incredible. I wanted to make something that feels as special as our friendship. You deserve the world and all the stars in it... <br><br> Happy Birthday.",
            ease: "none"
        });
    }
}

// 5. Password Logic
document.getElementById('chest-pass').addEventListener('input', (e) => {
    if (e.target.value === '2006') { // Change to your year
        gsap.to(".chest-lid", { y: -50, rotationX: -110, duration: 2, ease: "power4.out" });
        gsap.to(".bg-overlay", { background: "radial-gradient(circle, rgba(230,195,106,0.4) 0%, transparent 70%)", duration: 2 });
        setTimeout(nextScene, 2500);
    } else if (e.target.value.length === 4) {
        gsap.to(".chest-container", { x: 10, repeat: 5, yoyo: true, duration: 0.1 });
        document.getElementById('chest-error').innerText = "Not the secret year... ❤️";
    }
});

// 6. Birthday Celebration
function playCelebration() {
    const tl = gsap.timeline();
    tl.to("#hb-1", { opacity: 1, scale: 1.2, duration: 1 })
      .to("#hb-1", { opacity: 0, scale: 2, duration: 1 })
      .to("#hb-2", { opacity: 1, scale: 1.2, duration: 1 })
      .to("#hb-2", { opacity: 0, scale: 2, duration: 1 })
      .to("#hb-3", { opacity: 1, scale: 1.5, duration: 2, ease: "elastic.out(1, 0.3)" })
      .to(".wish-section", { opacity: 1, visibility: 'visible', duration: 1 });
}

// Wish Interaction
document.getElementById('wish-btn').addEventListener('click', () => {
    gsap.to(".flame", { opacity: 0, scale: 0, duration: 1 });
    gsap.to("body", { backgroundColor: "#000", duration: 3 });
    setTimeout(nextScene, 3000);
});

// Event Listeners
document.getElementById('start-btn').addEventListener('click', nextScene);
document.querySelectorAll('.next-btn').forEach(btn => btn.addEventListener('click', nextScene));

// Init
initParticles();
animateParticles();