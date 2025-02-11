// جلب النموذجين من الصفحة
let registerForm = document.getElementById("case-form");
let loginForm = document.getElementById("Login-form");

// إخفاء نموذج تسجيل الدخول في البداية
loginForm.style.display = "none";

// جلب الحسابات المسجلة مسبقًا أو تهيئة مصفوفة فارغة
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

// ✅ تسجيل حساب جديد
registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // منع تحديث الصفحة

    // الحصول على القيم المدخلة من المستخدم
    let UserName = document.getElementById("username").value;
    let UserEmail = document.getElementById("email").value;
    let Password = document.getElementById("password").value;

    // التحقق إذا كان الإيميل مسجلاً مسبقًا
    let existingAccount = accounts.find(acc => acc.email === UserEmail);
    if (existingAccount) {
        alert("⚠️ هذا البريد الإلكتروني مسجل مسبقًا!");
        return;
    }

    // إنشاء حساب جديد مع بيانات فارغة للمستخدم
    let newAccount = { name: UserName, email: UserEmail, password: Password, tasks: [] };
    accounts.push(newAccount);

    // حفظ الحسابات في localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // إخفاء نموذج التسجيل وإظهار نموذج تسجيل الدخول
    registerForm.style.display = "none";
    loginForm.style.display = "block";

    alert("✅ تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.");
});

// ✅ التحكم في عرض النماذج عند الضغط على الروابط
document.getElementById("aLink-Login").addEventListener("click", function (event) {
    event.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
});

document.getElementById("aLink-SignUp").addEventListener("click", function (event) {
    event.preventDefault();
    registerForm.style.display = "block";
    loginForm.style.display = "none";
});

// ✅ تسجيل الدخول
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // منع تحديث الصفحة

    // الحصول على القيم المدخلة من المستخدم
    let enteredEmail = document.getElementById("Login-email").value;
    let enteredPassword = document.getElementById("Login-password").value;

    // البحث عن الحساب المطابق في localStorage
    let foundAccount = accounts.find(acc => acc.email === enteredEmail && acc.password === enteredPassword);

    if (foundAccount) {
        // حفظ بيانات المستخدم الحالي في localStorage
        localStorage.setItem("currentUser", JSON.stringify(foundAccount));

        alert("✅ تم تسجيل الدخول بنجاح!");
        window.location.href = "/Dashboard/dashborad.html";
    } else {
        document.getElementById("error-message").textContent = "❌ البيانات غير صحيحة!";
    }
});
