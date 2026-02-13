/* =========================
   LOADER CONTROL
========================= */
function hideLoader() {
    const loader = document.getElementById( "loader" );
    if (!loader) return;

    loader.style.transition = "opacity .8s ease";
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => loader.remove(), 800);
}

/* Sai assim que o DOM estiver pronto */
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(hideLoader, 800);
});

/* Fallback absoluto (se algo der errado) */
setTimeout(hideLoader, 3000);

/* =========================
   LEAVES / WIND SYSTEM
========================= */

const leavesLayer = document.querySelector(".leaves-layer");

const leafImages = [
    "/img/leaves/leaf1.png",
    "/img/leaves/leaf2.png",
    "/img/leaves/leaf3.png"
];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createLeaf(speedMultiplier = 1) {
    const leaf = document.createElement("img");
    leaf.src = leafImages[Math.floor(Math.random() * leafImages.length)];
    leaf.className = "leaf";

    const size = random(18, 50);
    const startY = random(-10, 110);
    const duration = random(25, 45) / speedMultiplier;
    const rotation = random(360, 720);
    const drift = random(-80, 120);

    leaf.style.width = size + "px";
    leaf.style.top = startY + "vh";
    leaf.style.left = "-10vw";
    leaf.style.opacity = random(0.2, 0.6);
    leaf.style.transition = `transform ${duration}s linear`;

    leavesLayer.appendChild(leaf);

    requestAnimationFrame(() => {
        leaf.style.transform = `
            translateX(120vw)
            translateY(${drift}px)
            rotate(${rotation}deg)
        `;
    });

    setTimeout(() => leaf.remove(), duration * 1000);
}

/* =========================
   CONTINUOUS WIND
========================= */
setInterval(() => {
    createLeaf(1);
}, 1800);

/* =========================
   WIND GUSTS (RAJADAS)
========================= */
setInterval(() => {
    const burst = Math.floor(random(3, 6));
    for (let i = 0; i < burst; i++) {
        setTimeout(() => createLeaf(1.4), i * 200);
    }
}, 12000);

const modal = document.getElementById("descricaoModal");
const closeModal = document.getElementById("closeModal");

// Footer clicável
document.querySelector(".footer").addEventListener("click", () => {
    modal.classList.add("active");
});

// Fechar no X
closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Fechar clicando fora
modal.addEventListener("click", (e) => {
    if (e.target === +modal) {
        modal.classList.remove("active");
    }
});
