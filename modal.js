/*modal.js*/

const modalStructure = `
<div class="dorar-modal">
  <div class="dorar-modal-content">
    <div class="dorar-modal-header">
      <div class="close">&times;</div>
      <h2>تحقق من صحة الحديث</h2>
    </div>
    <div class="dorar-modal-body">
      <p style="color: red;">لا يوجد</p></div>
    <div class="dorar-modal-footer">
      <h3>نعتمد في البحث بموقع <a href="https://dorar.net">الدرر السنية</a></h3>
      <small>مبرمج: <a href="http://blog.ihfazh.com">محمد احفظ الله الاندنيسي</a> | <a href="http://github.com/ihfazhillah/dorar-chrome-ext">شاركنا في البرمجة</a> | مفتوح المصدر</small>
    </div>
  </div>
</div>
`;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  const font = document.createElement("link");
  font.href = "https://fonts.googleapis.com/css?family=Amiri";
  font.rel = "stylesheet";
  font.type = "text/css";
  font.id = "dorar-font";
  document.head.appendChild(font);

  switch (message.type) {
    case "createModal":
      var modalStruc = document.createElement("div");

      modalStruc.innerHTML = modalStructure;
      document.body.insertAdjacentElement("afterbegin", modalStruc);

      const close = document.querySelector(".dorar-modal .close");
      const modal = document.querySelector(".dorar-modal");

      close.onclick = function() {
        modal.remove();
        document.querySelector("#dorar-font").remove();
      };

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.remove();
          document.querySelector("#dorar-font").remove();
        }
      };

      break;
    case "openModal":
      document.querySelector(".dorar-modal").style = "display:block";
      break;
    case "sendProcess":
      document.querySelector(".dorar-modal-body").innerHTML =
        "<p style='color:red;'>جاري عملية البحث....</p>";
      break;

    case "displayResult":
      document.querySelector(".dorar-modal-body").innerHTML = message.content
        ? message.content
        : "<p style='color:red;'>عذرا, لم نجد أي ناتجة</p>";
      break;
    default:
      alert("hello world");
  }
});
