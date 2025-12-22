

const container = document.getElementById("snow-container");
const snowIcons = ["❄", "❅", "❆", "✻"];

for (let i = 0; i < 200; i++) {
    const snow = document.createElement("div");
    snow.className = "snowflake";

    // Chọn icon ngẫu nhiên
    snow.innerText = snowIcons[Math.floor(Math.random() * snowIcons.length)];

    // Các thông số ngẫu nhiên
    const size = Math.random() * 15 + 10 + "px";
    const opacity = Math.random() * 0.5 + 0.5;
    const duration = Math.random() * 5 + 5 + "s";
    const delay = Math.random() * 5 + "s";
    const left = Math.random() * 100 + "vw";

    // Gán vào CSS variables để không bị đè bởi animation transform
    snow.style.setProperty('--size', size);
    snow.style.setProperty('--opacity', opacity);
    snow.style.setProperty('--duration', duration);
    snow.style.left = left;
    snow.style.animationDelay = delay;

    container.appendChild(snow);
}
