// ===================================================
// NAVIGATION FUNCTIONS - Điều hướng đến các trang thiệp
// ===================================================

/**
 * Mở thiệp ngày 20/10
 */
function openCard20_10() {
  window.location.href = "thiệp_20_10/index.html";
}

/**
 * Mở thiệp tháng 10/2025
 */
function openCardMonth_10() {
  window.location.href = "thiệp_tháng_10/index.html";
}

/**
 * Mở thiệp tháng 11/2025
 */
function openCardMonth_11() {
  window.location.href = "thiệp_tháng_11/index.html";
}

/**
 * Mở thiệp tháng 12/2025
 */
function openCardMonth_12() {
  window.location.href = "thiệp_tháng_12/index.html";
}

/**
 * Mở thiệp tháng 1/2026
 */
function openCardMonth_1_2026() {
  window.location.href = "thiệp_tháng_1_2026/index.html";
}

// ===================================================
// PROFILE CARD - Quản lý hiển thị thông tin profile
// ===================================================

(function () {
  const link = document.getElementById("profileLink");
  const img = document.getElementById("profileImage");
  const card = document.getElementById("profileCard");
  const closeBtn = document.getElementById("closeProfile");

  let isProfileImageLoaded = false;

  /**
   * Toggle hiển thị profile card khi click vào avatar
   */
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

  /**
   * Đóng profile card khi click nút close
   */
  closeBtn.addEventListener("click", () => {
    card.style.display = "none";
    img.src = "./image/monkey_close.png";
    isProfileImageLoaded = false;
  });

  /**
   * Đóng profile card khi click ra ngoài
   */
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

  /**
   * Đóng profile card khi nhấn phím Esc
   */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      card.style.display = "none";
      img.src = "./image/monkey_close.png";
      isProfileImageLoaded = false;
    }
  });
})();

// ===================================================
// PASSWORD MODAL COMPONENT - Quản lý modal nhập mật khẩu
// ===================================================

// Biến toàn cục cho password modal
let currentCardType = "";
let passwordConfig = {
  passwords: {
    thang1_2026: "23072004",
    thang12: "23072004",
    thang11: "23072004",
    thang10: "23072004",
    ngay_20_10: "23072004",
  },
  onSuccess: null, // Callback function khi mật khẩu đúng
  onCancel: null, // Callback function khi hủy
};

/**
 * Khởi tạo Password Modal với cấu hình tùy chỉnh
 * @param {Object} config - Cấu hình modal
 * @param {Object} config.passwords - Object chứa mật khẩu cho từng loại thiệp
 * @param {Function} config.onSuccess - Callback khi mật khẩu đúng (nhận cardType)
 * @param {Function} config.onCancel - Callback khi hủy modal
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
 * Hiển thị modal nhập mật khẩu cho thiệp cụ thể
 * @param {string} cardType - Loại thiệp (vd: "thang10", "thang11", "thang1_2026")
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

  modal.style.display = "flex";
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
 * Kiểm tra mật khẩu người dùng nhập vào
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
    // Mật khẩu đúng - hiển thị thông báo success
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
    // Mật khẩu sai - hiển thị lỗi và shake effect
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
 * Thiết lập các event listeners cho password modal
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

  // Xử lý Enter key để submit password
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
 * @returns {Array<string>} Mảng các loại thiệp
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

// ===================================================
// MONTH CHECKER - Kiểm tra và hiển thị thiệp theo tháng
// ===================================================

/**
 * Kiểm tra tháng và hiển thị thiệp tương ứng
 */
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

// ===================================================
// TYPING EFFECT - Hiệu ứng gõ chữ cho label hướng dẫn
// ===================================================

const label = document.getElementById("typing-label");
const text = "Nhập tháng và năm\n(ví dụ: 11/2025)\nđể mở thiệp 💌";
let i = 0;

/**
 * Hiệu ứng typing animation cho label
 */
function typeLabel() {
  if (i <= text.length) {
    label.innerHTML = text.slice(0, i).replace(/\n/g, "<br>");
    i++;
  } else {
    setTimeout(() => (i = 0), 2000);
  }
}

// ===================================================
// INITIALIZATION - Khởi tạo khi DOM đã load
// ===================================================

document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo password modal với cấu hình
  initPasswordModal({
    passwords: {
      thang1_2026: "23072004",
      thang12: "23072004",
      thang11: "23072004",
      thang10: "23072004",
      ngay_20_10: "23072004",
    },
    onSuccess: function (cardType) {
      // Xử lý khi mật khẩu đúng - điều hướng đến thiệp tương ứng
      switch (cardType) {
        case "thang1_2026":
          openCardMonth_1_2026();
          break;
        case "thang12":
          openCardMonth_12();
          break;
        case "thang11":
          openCardMonth_11();
          break;
        case "thang10":
          openCardMonth_10();
          break;
        case "ngay_20_10":
          openCard20_10();
          break;
        default:
          console.warn("Unknown card type:", cardType);
      }
    },
    onCancel: function () {
      console.log("Password modal cancelled");
    },
  });

  // Event listener cho Enter key trong input tháng
  const checkMonthInput = document.getElementById("check_month");
  if (checkMonthInput) {
    checkMonthInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkMonth();
    });
  }

  // Khởi động typing effect
  setInterval(typeLabel, 80);
});
