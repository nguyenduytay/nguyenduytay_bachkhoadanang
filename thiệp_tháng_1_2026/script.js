// ===================================================
// IMAGE GALLERY - Load và hiển thị ảnh động
// ===================================================

/**
 * Danh sách đường dẫn ảnh
 * Thay đổi các đường dẫn này theo ảnh thực tế của bạn
 */
let imageList = [
    "./images/image1.jpg",
    "./images/image2.jpg",
    "./images/image3.jpg",
    "./images/image4.jpg",
    "./images/image5.jpg",
    "./images/image6.jpg",
    "./images/image7.jpg",
    "./images/image8.jpg",
    "./images/image9.jpg",
];

/**
 * Khởi tạo gallery khi DOM đã load xong
 */
document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector(".image-container");

    // Kiểm tra xem container có tồn tại không
    if (!imageContainer) {
        console.error("Không tìm thấy .image-container trong HTML!");
        return;
    }

    // Tạo và thêm các ảnh vào container
    imageList.forEach((image, index) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("image");
        imageElement.style.backgroundImage = `url(${image})`;

        // Thêm animation delay cho mỗi ảnh (hiệu ứng stagger)
        imageElement.style.animationDelay = `${index * 0.1}s`;

        imageContainer.appendChild(imageElement);
    });

    console.log(`✅ Đã load ${imageList.length} ảnh vào gallery`);

    // ===================================================
    // DRAG TO SCROLL - Kéo chuột để cuộn gallery
    // ===================================================

    let isDown = false;
    let startX;
    let scrollLeft;

    /**
     * Bắt đầu kéo khi nhấn chuột
     */
    imageContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        imageContainer.style.cursor = 'grabbing';
        startX = e.pageX - imageContainer.offsetLeft;
        scrollLeft = imageContainer.scrollLeft;
    });

    /**
     * Dừng kéo khi chuột rời khỏi container
     */
    imageContainer.addEventListener('mouseleave', () => {
        isDown = false;
        imageContainer.style.cursor = 'grab';
    });

    /**
     * Dừng kéo khi thả chuột
     */
    imageContainer.addEventListener('mouseup', () => {
        isDown = false;
        imageContainer.style.cursor = 'grab';
    });

    /**
     * Cuộn gallery khi di chuyển chuột (đang kéo)
     */
    imageContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - imageContainer.offsetLeft;
        const walk = (x - startX) * 2; // Tốc độ scroll x2
        imageContainer.scrollLeft = scrollLeft - walk;
    });

    // Đặt cursor mặc định
    imageContainer.style.cursor = 'grab';

    // ===================================================
    // MUSIC PLAYER - Trình phát nhạc floating
    // ===================================================

    const bgMusic = document.getElementById("bgMusic");
    const musicToggleBtn = document.getElementById("musicToggleBtn");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const musicBars = document.getElementById("musicBars");
    const musicNoteIcon = document.getElementById("musicNoteIcon");

    if (bgMusic && musicToggleBtn) {
        let isPlaying = false;

        const toggleMusic = () => {
            if (isPlaying) {
                bgMusic.pause();
                playPauseBtn.textContent = "play_arrow";
                musicBars.classList.remove("playing");
                musicNoteIcon.classList.remove("animate-spin");
            } else {
                bgMusic.play().catch(err => {
                    console.error("Lỗi khi phát nhạc:", err);
                    alert("Hãy nhấn lại nút Play một lần nữa để nghe nhạc bạn nhé! (Chính sách tự động phát của trình duyệt)");
                });
                playPauseBtn.textContent = "pause";
                musicBars.classList.add("playing");
                musicNoteIcon.classList.add("animate-spin");
            }
            isPlaying = !isPlaying;
        };

        musicToggleBtn.addEventListener("click", toggleMusic);

        bgMusic.addEventListener("ended", () => {
            isPlaying = false;
            playPauseBtn.textContent = "play_arrow";
            musicBars.classList.remove("playing");
            musicNoteIcon.classList.remove("animate-spin");
        });
    }
});