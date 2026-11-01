
const translations = {
  uk: {
    nav_home:"Головна", nav_about:"Про нас", nav_services:"Послуги", nav_portfolio:"Портфоліо", nav_contacts:"Контакти", nav_cta:"Обговорити подію",
    footer_tag:"Події, які залишаються у серці.", footer_rights:"Усі права захищені.", footer_dev:"Сайт розроблено Valeria Kovalenko",
    contact:"Зв'язатися", learn:"Дізнатися більше", view:"Переглянути всі послуги", portfolio_btn:"Дивитися портфоліо",
    form_send:"Надіслати заявку", form_note:"Після натискання відкриється ваша поштова програма з підготовленим листом. Заявка не надсилається автоматично."
  },
  en: {
    nav_home:"Home", nav_about:"About", nav_services:"Services", nav_portfolio:"Portfolio", nav_contacts:"Contact", nav_cta:"Plan your event",
    footer_tag:"Events that stay in your heart.", footer_rights:"All rights reserved.", footer_dev:"Website designed by Valeria Kovalenko",
    contact:"Get in touch", learn:"Learn more", view:"Explore all services", portfolio_btn:"View portfolio",
    form_send:"Send an enquiry", form_note:"Your email app will open with a pre-filled message. The form does not send automatically."
  }
};
let currentLang = localStorage.getItem("ve-lang") || "uk";
function applyLanguage(lang){
  currentLang=lang; localStorage.setItem("ve-lang",lang);
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;
    if(translations[lang] && translations[lang][key]) el.textContent=translations[lang][key];
  });
  document.querySelectorAll("[data-uk][data-en]").forEach(el=>{
    el.textContent=el.dataset[lang];
  });
  document.querySelectorAll(".lang-btn").forEach(b=>b.textContent=lang==="uk"?"EN":"УКР");
}
document.addEventListener("DOMContentLoaded",()=>{
  applyLanguage(currentLang);
  const toggle=document.querySelector(".lang-btn");
  if(toggle) toggle.addEventListener("click",()=>applyLanguage(currentLang==="uk"?"en":"uk"));
  const menu=document.querySelector(".menu-btn"), nav=document.querySelector(".nav");
  if(menu && nav) menu.addEventListener("click",()=>nav.classList.toggle("open"));
  document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav?.classList.remove("open")));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  document.querySelectorAll(".gallery-item").forEach(item=>item.addEventListener("click",()=>{
    const box=document.querySelector(".lightbox"), img=box.querySelector("img");
    img.src=item.querySelector("img").src; box.classList.add("open");
  }));
  const box=document.querySelector(".lightbox");
  if(box){box.querySelector("button").addEventListener("click",()=>box.classList.remove("open"));box.addEventListener("click",e=>{if(e.target===box)box.classList.remove("open")});}
  const form=document.querySelector("#enquiry-form");
  if(form) form.addEventListener("submit",e=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const data=new FormData(form);
    const subject=encodeURIComponent("Заявка з сайту V EVENTS");
    const body=encodeURIComponent(
      `Ім'я: ${data.get("name")}\nТелефон: ${data.get("phone")}\nEmail: ${data.get("email")}\nТип події: ${data.get("event")}\nДата: ${data.get("date")||"Не вказано"}\nКількість гостей: ${data.get("guests")||"Не вказано"}\nБюджет: ${data.get("budget")||"Не вказано"}\nПобажання: ${data.get("message")||"—"}`
    );
    document.querySelector("#form-status").textContent=currentLang==="uk"?"Відкриваємо поштову програму…":"Opening your email app…";
    window.location.href=`mailto:val2007eria@gmail.com?subject=${subject}&body=${body}`;
  });
});
