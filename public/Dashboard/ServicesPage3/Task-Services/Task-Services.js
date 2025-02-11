document.addEventListener("DOMContentLoaded", function () {
    // 🔹 استرجاع البريد الإلكتروني للمستخدم من localStorage
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // ❌ التأكد أن المستخدم مسجل الدخول، وإلا يتم إعادته إلى صفحة تسجيل الدخول
    if (!currentUser || !currentUser.email) {
        window.location.href = "/Home/Index.html";
        return;
    }

    // ✅ إنشاء مفتاح تخزين فريد لكل مستخدم بناءً على البريد الإلكتروني
    let tasksKey = "tasks_" + currentUser.email;

    // 🔹 الحصول على العناصر من HTML
    let addTaskBtn = document.getElementById("Add-Task");
    let taskInput = document.getElementById("Reading-Task");
    let taskList = document.querySelector("#Task"); // العنصر الذي يحتوي على المهام

    // ✅ استرجاع المهام الخاصة بالمستخدم أو إنشاء مصفوفة جديدة
    let tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];

    // ✅ دالة لتحديث عرض المهام في القائمة
    function renderTasks() {
        taskList.innerHTML = ""; // مسح القائمة قبل إعادة عرضها
        tasks.forEach((task, index) => {
            let li = document.createElement("li");
            li.textContent = task;

            // 🗑️ زر لحذف المهمة
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.addEventListener("click", function () {
                removeTask(index);
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // ✅ دالة لإضافة مهمة جديدة
    addTaskBtn.addEventListener("click", function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        let taskValue = taskInput.value.trim();
        if (taskValue !== "") {
            tasks.push(taskValue); // إضافة المهمة للمصفوفة
            localStorage.setItem(tasksKey, JSON.stringify(tasks)); // تحديث البيانات في localStorage
            renderTasks(); // تحديث الواجهة
            taskInput.value = ""; // تفريغ الإدخال
        }
    });

    // ✅ دالة لحذف مهمة
    function removeTask(index) {
        tasks.splice(index, 1); // حذف المهمة من المصفوفة
        localStorage.setItem(tasksKey, JSON.stringify(tasks)); // تحديث التخزين
        renderTasks(); // إعادة تحديث القائمة
    }

    // ✅ تحميل المهام عند فتح الصفحة
    renderTasks();

    // 🔹 زر الرجوع إلى صفحة المستخدم
    document.getElementById('returnToLoginPage').addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = "/Dashboard/dashborad.html";
    });

    // 🔹 زر تسجيل الخروج
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("currentUser"); // مسح بيانات المستخدم الحالي فقط
        window.location.href = "/Home/Index.html"; // إعادة التوجيه إلى صفحة تسجيل الدخول
    });
});
