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

    // ==========================================================================
    // 3. ระบบเอฟเฟกต์ฝนตกสามมิติในพื้นหลัง (Premium 3D Parallax Rain Animation)
    // ==========================================================================
    const canvas = document.getElementById('rain-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const raindrops = [];
        const raindropCount = 120;
        const splashes = [];

        class Splash {
            constructor(x, y, speedY) {
                this.x = x;
                this.y = y;
                this.vx = Math.random() * 3 - 1.5;
                this.vy = -Math.random() * speedY * 0.25 - 1;
                this.life = 1.0;
                this.decay = Math.random() * 0.08 + 0.05;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.2; // Gravity
                this.life -= this.decay;
            }

            draw() {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.life * 0.35})`;
                ctx.lineWidth = 0.8;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.vx * 0.5, this.y + this.vy * 0.5);
                ctx.stroke();
            }
        }

        class Raindrop {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : -35;
                this.depth = Math.floor(Math.random() * 3);
                
                if (this.depth === 0) { // Background
                    this.length = Math.random() * 8 + 6;
                    this.speed = Math.random() * 3 + 4;
                    this.opacity = Math.random() * 0.08 + 0.04;
                    this.lineWidth = 0.5;
                } else if (this.depth === 1) { // Midground
                    this.length = Math.random() * 16 + 10;
                    this.speed = Math.random() * 5 + 8;
                    this.opacity = Math.random() * 0.15 + 0.08;
                    this.lineWidth = 1.0;
                } else { // Foreground
                    this.length = Math.random() * 24 + 16;
                    this.speed = Math.random() * 7 + 13;
                    this.opacity = Math.random() * 0.22 + 0.12;
                    this.lineWidth = 1.5;
                }
                this.wind = -1.2; // Gentle breeze to the left
            }

            update() {
                this.y += this.speed;
                this.x += this.wind;
                
                if (this.y > height) {
                    if (this.depth > 0 && splashes.length < 40) {
                        splashes.push(new Splash(this.x, height - 2, this.speed));
                    }
                    this.reset(false);
                } else if (this.x < -20 || this.x > width + 20) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.lineWidth = this.lineWidth;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.wind * 0.6, this.y + this.length);
                ctx.stroke();
            }
        }

        for (let i = 0; i < raindropCount; i++) {
            raindrops.push(new Raindrop());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Render rain
            raindrops.forEach(drop => {
                drop.update();
                drop.draw();
            });

            // Update and render splashes
            for (let i = splashes.length - 1; i >= 0; i--) {
                const s = splashes[i];
                s.update();
                if (s.life <= 0) {
                    splashes.splice(i, 1);
                } else {
                    s.draw();
                }
            }
            
            requestAnimationFrame(animate);
        }

        animate();
    }

    // ==========================================================================
    // 4. ระบบควบคุมการซูมและการเลื่อนแผนที่เวกเตอร์ (SVG Map Zoom & Pan Controls)
    // ==========================================================================
    const svgMap = document.querySelector('.custom-southern-map');
    const mapWrapper = document.querySelector('.map-wrapper');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');

    if (svgMap && mapWrapper && zoomInBtn && zoomOutBtn && zoomResetBtn) {
        // Base viewBox parameters
        const baseMinX = -270;
        const baseMinY = -120;
        const baseWidth = 740;
        const baseHeight = 1140;

        let currentScale = 1.0;
        const scaleStep = 0.15;
        const minScale = 0.4;  // Max zoom in
        const maxScale = 1.5;  // Max zoom out

        // Current viewBox state (updates on zoom and pan)
        let curMinX = baseMinX;
        let curMinY = baseMinY;

        function updateViewBox() {
            const curWidth = baseWidth * currentScale;
            const curHeight = baseHeight * currentScale;
            svgMap.setAttribute('viewBox', `${curMinX} ${curMinY} ${curWidth} ${curHeight}`);
        }

        // --- Zoom Logic ---
        function zoom(direction) {
            const oldWidth = baseWidth * currentScale;
            const oldHeight = baseHeight * currentScale;
            
            // Calculate current center in viewBox space
            const centerX = curMinX + oldWidth / 2;
            const centerY = curMinY + oldHeight / 2;

            if (direction === 'in') {
                currentScale = Math.max(minScale, currentScale - scaleStep);
            } else {
                currentScale = Math.min(maxScale, currentScale + scaleStep);
            }

            const newWidth = baseWidth * currentScale;
            const newHeight = baseHeight * currentScale;

            // Recalculate curMinX and curMinY to keep the center constant
            curMinX = centerX - newWidth / 2;
            curMinY = centerY - newHeight / 2;

            updateViewBox();
        }

        zoomInBtn.addEventListener('click', () => zoom('in'));
        zoomOutBtn.addEventListener('click', () => zoom('out'));

        zoomResetBtn.addEventListener('click', () => {
            currentScale = 1.0;
            curMinX = baseMinX;
            curMinY = baseMinY;
            updateViewBox();
        });

        // --- Pan / Drag Logic ---
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let startMinX = 0;
        let startMinY = 0;

        mapWrapper.addEventListener('mousedown', (e) => {
            // Only drag if left click is used, and not clicking interactive buttons or pins
            if (e.button !== 0 || e.target.closest('.map-controls') || e.target.closest('.map-pin')) return;
            
            isDragging = true;
            mapWrapper.style.cursor = 'grabbing';
            startX = e.clientX;
            startY = e.clientY;
            startMinX = curMinX;
            startMinY = curMinY;
            
            // Prevent text selection during drag
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // Scale screen pixels to SVG viewBox units
            const rect = svgMap.getBoundingClientRect();
            const curWidth = baseWidth * currentScale;
            const curHeight = baseHeight * currentScale;
            
            const scaleX = curWidth / rect.width;
            const scaleY = curHeight / rect.height;

            curMinX = startMinX - dx * scaleX;
            curMinY = startMinY - dy * scaleY;

            updateViewBox();
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                mapWrapper.style.cursor = 'grab';
            }
        });

        mapWrapper.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                mapWrapper.style.cursor = 'grab';
            }
        });
    }
});