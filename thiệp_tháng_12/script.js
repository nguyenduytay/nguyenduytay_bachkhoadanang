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
  snow.style.setProperty("--size", size);
  snow.style.setProperty("--opacity", opacity);
  snow.style.setProperty("--duration", duration);
  snow.style.left = left;
  snow.style.animationDelay = delay;

  container.appendChild(snow);
}

/*cây thông*/

const treeContainer = document.getElementById("tree-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, 400 / 500, 0.1, 1000);
camera.position.set(0, 12, 40);
camera.lookAt(0, 10, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(200, 300);
treeContainer.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const points = [];

const height = 30;
const maxRadius = 12;
const count = 4000;

for (let i = 0; i < count; i++) {
  const y = Math.random() * height;
  const r = maxRadius * (1 - y / height);
  const angle = Math.random() * Math.PI * 2;

  points.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
}

geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

const material = new THREE.PointsMaterial({
  color: 0x00ff66,
  size: 0.3,
  transparent: true,
  opacity: 0.95,
});

const tree = new THREE.Points(geometry, material);
scene.add(tree);

function animate() {
  requestAnimationFrame(animate);
  tree.rotation.y += 0.003;
  renderer.render(scene, camera);
}

animate();

/*thư tay*/
function openLetter() {
  const letterContainer = document.querySelector(
    ".relative.cursor-pointer.group"
  );
  const letterContent = document.getElementById("letterContent");

  // Toggle class mở thư
  letterContainer.classList.toggle("letter-open");

  if (letterContainer.classList.contains("letter-open")) {
    // Khi mở thư
    letterContent.style.transform = "translateY(0)";
    letterContent.style.opacity = "1";
    letterContent.style.pointerEvents = "auto";

    // Thêm hiệu ứng viết chữ
    const paragraphs = letterContent.querySelectorAll(".font-handwriting p");
    paragraphs.forEach((p, index) => {
      p.style.animation = `typing ${
        2 + index * 0.5
      }s steps(40, end), blink-caret 0.75s step-end infinite`;
      p.style.overflow = "hidden";
      p.style.borderRight = "2px solid #e53e3e";
      p.style.whiteSpace = "nowrap";
      p.style.width = "0";

      setTimeout(() => {
        p.style.width = "100%";
      }, index * 500);

      setTimeout(() => {
        p.style.borderRight = "none";
        p.style.whiteSpace = "normal";
      }, (2 + index * 0.5) * 1000);
    });
  } else {
    // Khi đóng thư
    letterContent.style.transform = "translateY(-100%)";
    letterContent.style.opacity = "0";
    letterContent.style.pointerEvents = "none";
  }
}

// Tự động mở thư sau 2 giây
setTimeout(() => {
  openLetter();
}, 2000);
