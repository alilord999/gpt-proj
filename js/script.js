const input = document.querySelector('.input-wrapper input');
const sendBtn = document.querySelector('.send-btn');
const chatBox = document.getElementById('chatBox');

// ۱. لود کردن چت‌های قبلی
let chatHistory = JSON.parse(localStorage.getItem('myChatHistory')) || [];
renderHistory();

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

function sendMessage() {
    const text = input.value;
    if (text.trim() !== "") {
        // اضافه کردن پیام کاربر به آرایه
        chatHistory.push({ role: 'user', content: text });
        
        // ذخیره در حافظه و نمایش
        saveToLocalStorage();
        addMessageToUI('user', text); 
        
        input.value = "";

        // پاسخ هوش مصنوعی
        setTimeout(() => {
            typeAiResponse("من در حال یادگیری هستم و به زودی به پاسخ‌های واقعی مجهز می‌شوم!");
        }, 600);
    }
}

function typeAiResponse(fullText) {
    const aiDiv = document.createElement('div');
    aiDiv.className = 'message ai';
    chatBox.appendChild(aiDiv);
    
    let index = 0;
    const typingInterval = setInterval(() => {
        aiDiv.textContent += fullText[index];
        index++;
        
        if (index === fullText.length) {
            clearInterval(typingInterval);
            // حالا که تایپ تمام شد، در تاریخچه ذخیره کن
            chatHistory.push({ role: 'ai', content: fullText });
            saveToLocalStorage();
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 40);
}

// تابع کمکی برای اضافه کردن تک‌پیام به صفحه (بدون رندر کل تاریخچه)
function addMessageToUI(role, content) {
    const div = document.createElement('div');
    div.className = `message ${role}`;
    div.textContent = content;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveToLocalStorage() {
    localStorage.setItem('myChatHistory', JSON.stringify(chatHistory));
}

function renderHistory() {
    chatBox.innerHTML = "";
    chatHistory.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message ${msg.role}`;
        div.textContent = msg.content;
        chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}
