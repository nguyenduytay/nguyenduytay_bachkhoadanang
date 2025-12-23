// Invitation Card Navigation
function openCard20_10() {
  window.location.href = "thiệp_20_10/index.html";
}
function openCardMonth_10() {
  window.location.href = "thiệp_tháng_10/index.html";
}
function openCardMonth_11() {
  window.location.href = "thiệp_tháng_11/index.html";
}
function openCardMonth_12() {
  window.location.href = "thiệp_tháng_12/index.html";
}

// Profile Card Toggle
(function () {
  const link = document.getElementById("profileLink");
  const img = document.getElementById("profileImage");
  const card = document.getElementById("profileCard");
  const closeBtn = document.getElementById("closeProfile");

  let isProfileImageLoaded = false;

  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (card.style.display === "block") {
      card.style.display = "none";
      img.src = "./image/monkey_close.png";
      isProfileImageLoaded = false;
    } else {
      card.style.display = "block";
      img.src = "./image/monkey_show.png";
      isProfileImageLoaded = true;
    }
  });

  closeBtn.addEventListener("click", () => {
    card.style.display = "none";
    img.src = "./image/monkey_close.png";
    isProfileImageLoaded = false;
  });

  // Đóng khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (
      isProfileImageLoaded &&
      !card.contains(e.target) &&
      e.target !== link &&
      e.target !== img
    ) {
      card.style.display = "none";
      img.src = "./image/monkey_close.png";
      isProfileImageLoaded = false;
    }
  });

  // Tắt khi nhấn Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      card.style.display = "none";
      img.src = "./image/monkey_close.png";
      isProfileImageLoaded = false;
    }
  });
})();

// Khởi tạo Password Modal Component
document.addEventListener("DOMContentLoaded", function () {
  // Cấu hình password modal
  initPasswordModal({
    passwords: {
      thang12: "23072004",
      thang11: "23072004",
      thang10: "23072004",
      ngay_20_10: "23072004",
    },
    onSuccess: function (cardType) {
      // Xử lý khi mật khẩu đúng
      if (cardType === "thang12") {
        openCardMonth_12();
      } else if (cardType === "thang11") {
        openCardMonth_11();
      } else if (cardType === "thang10") {
        openCardMonth_10();
      } else if (cardType === "20_10") {
        openCard20_10();
      } else if (cardType === "thang11") {
        openCardMonth_11();
      }
    },
    onCancel: function () {
      // Xử lý khi hủy (có thể thêm logic nếu cần)
      console.log("Password modal cancelled");
    },
  });
});

// Function mở thiệp tháng 10 (placeholder)
function openCard() {
  // Thay thế bằng đường dẫn thực tế đến thiệp tháng 10
  alert("Thiệp sẽ được mở ở đây!");
  // window.location.href = "thiệp_tháng_10/index.html";
}

// ===== PASSWORD MODAL JAVASCRIPT =====
/**
 * Password Modal Component - Tái sử dụng
 * Sử dụng: initPasswordModal() để khởi tạo
 */

// Biến toàn cục
let currentCardType = "";
let passwordConfig = {
  passwords: {
    thang11: "23072004",
    thang10: "23072004",
    ngay_20_10: "23072004",
  },
  onSuccess: null, // Callback function khi mật khẩu đúng
  onCancel: null, // Callback function khi hủy
};

/**
 * Khởi tạo Password Modal
 * @param {Object} config - Cấu hình
 * @param {Object} config.passwords - Object chứa mật khẩu cho từng loại
 * @param {Function} config.onSuccess - Callback khi mật khẩu đúng
 * @param {Function} config.onCancel - Callback khi hủy
 */
function initPasswordModal(config = {}) {
  // Merge config với default
  passwordConfig = {
    ...passwordConfig,
    ...config,
  };

  // Thêm event listeners
  setupEventListeners();
}

/**
 * Hiển thị modal nhập mật khẩu
 * @param {string} cardType
 */
function showPasswordModal(cardType) {
  currentCardType = cardType;
  const modal = document.getElementById("passwordModal");
  const passwordInput = document.getElementById("passwordInput");
  const errorDiv = document.getElementById("passwordError");

  if (!modal || !passwordInput || !errorDiv) {
    console.error("Password modal elements not found!");
    return;
  }

  modal.style.display = "block";
  passwordInput.value = "";
  errorDiv.textContent = "";
  passwordInput.focus();
}

/**
 * Đóng modal nhập mật khẩu
 */
function closePasswordModal() {
  const modal = document.getElementById("passwordModal");
  if (modal) {
    modal.style.display = "none";
  }
  currentCardType = "";

  // Gọi callback nếu có
  if (
    passwordConfig.onCancel &&
    typeof passwordConfig.onCancel === "function"
  ) {
    passwordConfig.onCancel();
  }
}

/**
 * Kiểm tra mật khẩu
 */
function checkPassword() {
  const passwordInput = document.getElementById("passwordInput");
  const errorDiv = document.getElementById("passwordError");

  if (!passwordInput || !errorDiv) {
    console.error("Password input or error div not found!");
    return;
  }

  const password = passwordInput.value.trim();
  const correctPassword = passwordConfig.passwords[currentCardType];

  if (password === correctPassword) {
    // Mật khẩu đúng
    errorDiv.textContent = "";
    errorDiv.style.color = "#27ae60";
    errorDiv.textContent = "✅ Mật khẩu đúng! Đang chuyển hướng...";

    setTimeout(() => {
      // Gọi callback success nếu có
      if (
        passwordConfig.onSuccess &&
        typeof passwordConfig.onSuccess === "function"
      ) {
        passwordConfig.onSuccess(currentCardType);
      }
      closePasswordModal();
    }, 1000);
  } else {
    // Mật khẩu sai
    errorDiv.style.color = "#e74c3c";
    errorDiv.textContent = "❌ Mật khẩu không đúng! Vui lòng thử lại.";
    passwordInput.value = "";
    passwordInput.focus();

    // Hiệu ứng shake
    passwordInput.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      passwordInput.style.animation = "";
    }, 500);
  }
}

/**
 * Thiết lập event listeners
 */
function setupEventListeners() {
  const modal = document.getElementById("passwordModal");
  const passwordInput = document.getElementById("passwordInput");

  if (!modal || !passwordInput) return;

  // Đóng modal khi click ra ngoài
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closePasswordModal();
    }
  });

  // Đóng modal khi nhấn Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closePasswordModal();
    }
  });

  // Xử lý Enter key
  passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });
}

/**
 * Cập nhật mật khẩu cho một loại thiệp
 * @param {string} cardType - Loại thiệp
 * @param {string} password - Mật khẩu mới
 */
function updatePassword(cardType, password) {
  passwordConfig.passwords[cardType] = password;
}

/**
 * Thêm mật khẩu cho loại thiệp mới
 * @param {string} cardType - Loại thiệp
 * @param {string} password - Mật khẩu
 */
function addPassword(cardType, password) {
  passwordConfig.passwords[cardType] = password;
}

/**
 * Xóa mật khẩu cho một loại thiệp
 * @param {string} cardType - Loại thiệp
 */
function removePassword(cardType) {
  delete passwordConfig.passwords[cardType];
}

/**
 * Lấy danh sách tất cả loại thiệp có mật khẩu
 * @returns {Array} Mảng các loại thiệp
 */
function getAvailableCardTypes() {
  return Object.keys(passwordConfig.passwords);
}

/**
 * Kiểm tra xem loại thiệp có mật khẩu không
 * @param {string} cardType - Loại thiệp
 * @returns {boolean} True nếu có mật khẩu
 */
function hasPassword(cardType) {
  return cardType in passwordConfig.passwords;
}
function checkMonth() {
  const input = document.getElementById("check_month");
  const value = input.value.trim();
  const cards = document.querySelectorAll(".card-invitation");

  let found = false;

  cards.forEach((card) => {
    const month = card.getAttribute("data-month");

    if (month === value) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!found && value !== "") {
    alert("Không có thiệp cho thời gian này 💔");
  }
}

document.getElementById("check_month").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkMonth();
});

const label = document.getElementById("typing-label");

const text = "Nhập tháng và năm\n(ví dụ: 11/2025)\nđể mở thiệp 💌";

let i = 0;

function typeLabel() {
  if (i <= text.length) {
    label.innerHTML = text.slice(0, i).replace(/\n/g, "<br>");
    i++;
  } else {
    setTimeout(() => (i = 0), 2000);
  }
}

setInterval(typeLabel, 80);
