document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. ระบบสไลด์ภาพพื้นหลังแบนเนอร์อัตโนมัติแบบเลเยอร์ (Dynamic Layer Crossfade)
    // ==========================================================================
    const images = [
        'image/เกาะพยาม.webp', 
        'image/ดอยตาปัง.webp', 
        'image/เมืองเก่าภูเก็ต.webp', 
        'image/หาดสมิหลา.webp'
    ];

    let currentIndex = 0;
    const banner = document.querySelector('.welcome-banner');
    const dots = document.querySelectorAll('.carousel-dots .dot-item');

    // สั่งสร้างแผ่นภาพพื้นหลังซ้อนกันไว้ล่วงหน้าตามรายชื่อรูปภาพ
    if (banner && images.length > 0) {
        images.forEach((imgUrl, index) => {
            const bgDiv = document.createElement('div');
            // รูปแรกสุด (index 0) ให้แสดงทันทีเมื่อเปิดหน้าเว็บ
            bgDiv.className = `banner-bg-slide ${index === 0 ? 'active' : ''}`;
            bgDiv.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.1) 100%), url('${imgUrl}')`;
            banner.appendChild(bgDiv);
        });
    }

    // ดึงแผ่นป้ายทั้งหมดที่เพิ่งสร้างเสร็จมาเก็บไว้ควบคุมการเปิด-ปิด Opacity
    const bgSlides = document.querySelectorAll('.banner-bg-slide');

    // ฟังก์ชันสำหรับสลับแผ่นป้ายภาพและจุดสถานะ
    function updateBanner(index) {
        // สลับเอฟเฟกต์การ Fade ชัด-จาง ของรูปภาพ
        bgSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // อัปเดตสถานะของจุดสไลด์ไข่ปลา
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // ฟังก์ชันเลื่อนไปรูปถัดไป และวนลูปกลับมารูปแรก
    function nextImage() {
        if (images.length > 0) {
            currentIndex = (currentIndex + 1) % images.length;
            updateBanner(currentIndex);
        }
    }

    // เริ่มต้นระบบตั้งเวลาออโต้สไลด์ทุกๆ 5 วินาที
    let slideInterval = setInterval(nextImage, 5000);

    // รองรับการคลิกที่จุดสไลด์เพื่อเปลี่ยนรูปด้วยตัวเอง
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateBanner(currentIndex);
            
            // รีเซ็ตตัวนับเวลาใหม่เมื่อผู้ใช้กดคลิกเอง
            clearInterval(slideInterval);
            slideInterval = setInterval(nextImage, 5000);
        });
    });


    // ==========================================================================
    // 2. ฟังก์ชันจำลองการกด Check-in (คงเดิมไว้)
    // ==========================================================================
    const checkinBtn = document.getElementById('checkin-btn');
    if (checkinBtn) {
        checkinBtn.addEventListener('click', () => {
            alert('🎉 ยินดีด้วย! คุณทำการเช็กอินที่ พังงา เรียบร้อยแล้ว ได้รับแสตมป์ใหม่เรียบร้อย!');
        });
    }
    
});