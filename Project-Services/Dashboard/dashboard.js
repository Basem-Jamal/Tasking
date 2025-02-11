// 🔄 جلب بيانات المستخدم من localStorage
let UserName = localStorage.getItem("UserName");
let UserEmail = localStorage.getItem("UserEmail");


window.addEventListener('load' , function(){
//  عرض البيانات على الصفحة
if (UserName && UserEmail) {

    // بعد تحميل الصفحة، إضافة الكلاس "show" لعرض العنصر
    document.getElementById("user-info").classList.add("show");
    // إضافة النص داخل العنصر
    
    document.getElementById("content").style.display="none";
    document.getElementById("user-info").textContent =  " هلا " + UserName;

    

} else {
    // 🔄 في حال لم يكن هناك بيانات، يتم توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = "index.html"; 
}

});

document.getElementById('returnToLoginPage').addEventListener('click' , function(event){

    event.stopPropagation(); // يمنع انتشار الحدث لعناصر أخرى
    window.location.href = "/Home/Index.html"; 

});

