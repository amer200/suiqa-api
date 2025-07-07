const io = require("socket.io-client");

const socket = io("http://localhost:5000", {
    transports: ["websocket"]
});

const TEST_CHAT_ID = "686b92d5bb7f7c40130c3ceb"
const TEST_USER_ID = "6863cb7b8479b5948901233a"

socket.on("connect", () => {
    console.log("🟢 Connected to server");

    // الانضمام لغرفة الشات
    socket.emit("joinChat", TEST_CHAT_ID);
    console.log("🚪 Joined Chat Room:", TEST_CHAT_ID);

    // إرسال رسالة تجريبية
    socket.emit("sendMessage", {
        chatId: TEST_CHAT_ID,
        sender: TEST_USER_ID,
        content: "Hello from test client 🚀"
    });

    // استقبال تأكيد الإرسال
    socket.on("messageSent", (msg) => {
        console.log("✅ Message sent:", msg);
    });

    // استقبال رسالة جديدة
    socket.on("receiveMessage", (msg) => {
        console.log("📥 New message received:", msg);
    });

    // لو في خطأ
    socket.on("errorMessage", (err) => {
        console.log("❌ Error:", err);
    });
});