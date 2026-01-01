// ۱. تنظیمات و اجرای انیمیشن رادار در پس‌زمینه
const canvas = document.getElementById('radarCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let angle = 0;

function drawRadar() {
    // ایجاد اثر محو شدن تدریجی برای دنباله رادار
    ctx.fillStyle = 'rgba(18, 18, 18, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.max(canvas.width, canvas.height) * 0.8;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    // طراحی خط رادار
    const gradient = ctx.createLinearGradient(0, 0, radius, 0);
    gradient.addColorStop(0, 'rgba(16, 163, 127, 0.5)');
    gradient.addColorStop(1, 'rgba(16, 163, 127, 0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);
    ctx.stroke();

    ctx.restore();

    angle += 0.01;
    requestAnimationFrame(drawRadar);
}

// شروع انیمیشن رادار
drawRadar();

// ==========================================
// ۲. مدیریت اسلایدر نظرات (اتوماتیک)
// ==========================================
const slider = document.getElementById('reviewSlider');
let currentGroup = 0;
const totalGroups = 3; // تعداد گروه‌های دوتایی ما

function autoSlide() {
    if (!slider) return; // اگر اسلایدر در صفحه نبود خطا ندهد

    currentGroup++;
    if (currentGroup >= totalGroups) {
        currentGroup = 0;
    }

    // جابه‌جایی بر اساس درصد (منفی به خاطر جهت LTR در Wrapper)
    const offset = currentGroup * -33.333;
    slider.style.transform = `translateX(${offset}%)`;
}

// هر ۵ ثانیه یک‌بار اسلاید عوض شود
setInterval(autoSlide, 5000);