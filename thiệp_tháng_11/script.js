function spinWheel() {
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');
    const button = document.getElementById('spinButton');

    const prizes = [
        {
            title: "Trời xanh mây trắng nắng vàng <br> Hỏi em đây đã sẵn sàng yêu chưa?",
            image: "./image/anh-meme-1.webp"
        },
        {
            title: "Gặp em anh bỗng muốn thờ <br> Vừa thờ ích thích vừa thờ ương thương.",
            image: "./image/anh-meme-2.webp"
        },
        {
            title: "Cho anh liều thuốc an thần <br> Giữ tim ổn định khi gần bên em.",
            image: "./image/anh-meme-3.webp"
        },
        {
            title: "Hè về nắng nóng cháy da <br> Bên ai cũng nóng hay là bên anh",
            image: "./image/anh-meme-4.webp"
        },
        // {
        //     title: "Đường vào tim em hơi nhiều lối <br> Nếu em bối rối, anh dẫn tiếp theo.",
        //     image: "./image/anh-meme-5.webp"
        // },
        {
            title: "Anh đây vốn chẳng nhớ đường <br> Năm lần bảy lượt phượt vào tim em.",
            image: "./image/anh-meme-6.webp"
        },
        {
            title: "Anh đây chẳng thích la cà <br> Anh đây chỉ thích mặn mà bên em.",
            image: "./image/anh-meme-7.webp"
        },
        {
            title: "Em ơi gió lạnh gần kề <br> Mau mau thu xếp mà về bên anh.",
            image: "./image/anh-meme-8.webp"
        },
        {
            title: "Đố ai quét sạch lá rừng <br> Đố ai bảo được anh ngừng yêu em.",
            image: "./image/anh-meme-9.webp"
        },
        {
            title: "Mặt tròn như cái quạt mo <br> Anh nào vớ được ấm no cả đời.",
            image: "./image/anh-meme-10.webp"
        },
        {
            title: "Người ta vá áo bằng kim <br> Em cho anh hỏi vá tim bằng gì?",
            image: "./image/anh-meme-11.webp"
        },
        // {
        //     title: "Em là cô gái thích màu trắng <br> Anh ngược đường, ngược nắng để yêu em.",
        //     image: "./image/anh-meme-12.webp"
        // },
        {
            title: "Nhìn em anh thấy lờ mờ <br> Tưởng là say rượu ai ngờ say em.",
            image: "./image/anh-meme-13.webp"
        },
        {
            title: "Anh mua một cốc trà đào <br> Tiện thể anh hỏi lối vào tim em.",
            image: "./image/anh-meme-14.webp"
        },
        {
            title: "Đâu cần phải tặng đóa hồng <br> Yêu em dẫu có xương rồng cũng cam.",
            image: "./image/anh-meme-15.webp"
        },
        {
            title: "Anh đây chẳng thích hoa đào <br> Anh đây chỉ thích ngọt ngào với em.",
            image: "./image/anh-meme-16.webp"
        },
        {
            title: "Anh đây vốn chẳng thích thơ <br> Thương em nên mới ngẩn ngơ đợi chờ.",
            image: "./image/anh-meme-17.webp"
        },
        {
            title: "Mời em ngồi xuống uống trà <br> Dạo này ế quá hay là yêu nhau?",
            image: "./image/anh-meme-.webp"
        },
        {
            title: "Nhân gian vốn lắm bộn bề <br> Thôi thì bỏ hết mà về bên anh.",
            image: "./image/anh-meme-1.webp"
        },
        // {
        //     title: "Soái ca là của ngôn tình <br> Còn anh thì chỉ của mình em thôi.",
        //     image: "./image/anh-meme-2.webp"
        // },
        {
            title: "Thiếu 500 thì tròn 1 củ <br> Thêm em nữa là ta đủ 1 đôi.",
            image: "./image/anh-meme-3.webp"
        },
        {
            title: "Cá chép là để om dưa <br> Tim anh là để đón đưa em vào.",
            image: "./image/anh-meme-4.webp"
        },
        {
            title: "Bắc Đẩu đã có Nam Tào <br> Còn em đã có anh hay chưa?",
            image: "./image/anh-meme-5.webp"
        },
        {
            title: "Em ơi, anh bảo cái này <br> Yêu ai cũng vậy hay là yêu anh?",
            image: "./image/anh-meme-6.webp"
        },
        {
            title: "Ba mươi cùng đón giao thừa <br> Ra giêng mình cưới là vừa em ha.",
            image: "./image/anh-meme-7.webp"
        },
        // {
        //     title: "Nắng kia làm má em hồng <br> Anh ơi, anh muốn làm chồng em không?",
        //     image: "./image/anh-meme-8.webp"
        // },
        {
            title: "Ngày tháng đẹp biết bao nhiêu <br> Hẹn nhau một tách trà chiều đi em.",
            image: "./image/anh-meme-9.webp"
        },
        {
            title: "Thời tiết trái gió trở trời <br> Trái tim lỡ nhịp cả đời thương em.",
            image: "./image/anh-meme-10.webp"
        },
        {
            title: "Đố ai đếm được lá rừng <br> Đố ai khuyên được anh ngừng yêu em.",
            image: "./image/anh-meme-11.webp"
        },
        {
            title: "Em ơi nắng gió tại trời <br> Thương em là chuyện cả đời của anh.",
            image: "./image/anh-meme-12.webp"
        }
    ];


    let isSpinning = false;
    let currentRotation = 0;
    button.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        result.textContent = '';

        // quay wheel (vẫn có hiệu ứng)
        const randomSpin = 360 * (3 + Math.floor(Math.random() * 3)) + Math.floor(Math.random() * 360);
        currentRotation += randomSpin;
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            // random index từ toàn bộ mảng prizes
            const index = Math.floor(Math.random() * prizes.length);

            result.innerHTML =
                `
            <strong class="block text-center">${prizes[index].title}</strong>
            <img src="${prizes[index].image}" 
                 alt="${prizes[index].title}" 
                 class="mx-auto mt-2 w-full max-h-48 object-cover rounded-lg"/>
            `;
            isSpinning = false;
        }, 4200);
    });

}