import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as v,i as r}from"./assets/vendor-77e16229.js";const d=document.querySelector("#datetime-picker"),e=document.querySelector("button[data-start]"),i=document.querySelector("button[data-stop]"),u=document.querySelector("[data-days]"),l=document.querySelector("[data-hours]"),m=document.querySelector("[data-minutes]"),f=document.querySelector("[data-seconds]");let b=0,n=0;const x={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onChange(t){t[0]-Date.now()<=0?(r.destroy(),r.show({title:"Please choose a date in the future",backgroundColor:"#EF4040",timeout:5e3,titleColor:"#fff",titleSize:"16px",iconUrl:"/cross-icon.svg",buttons:[['<button style="background: transparent; padding: 0; margin-left: 30px" width="20" height="20"><img src="/cross.svg"></button>',function(o,s){o.hide({transitionOut:"fadeOutUp"},s,"buttonName")}]],close:!1}),e.classList.add("disable")):(e.classList.remove("disable"),r.destroy(),b=t[0].getTime())}};v("#datetime-picker",x);let h;e.addEventListener("click",L);function L(t){e.classList.contains("disable")||(n=b-Date.now(),h=setInterval(k,1e3))}function k(){if(n<=0){p();return}e.classList.add("disable"),d.setAttribute("disabled",""),i.classList.remove("disable");const{days:t,hours:o,minutes:s,seconds:c}=q(n);u.textContent=a(t),l.textContent=a(o),m.textContent=a(s),f.textContent=a(c),n-=1e3}i.addEventListener("click",p);function p(){clearInterval(h),e.classList.remove("disable"),d.removeAttribute("disabled"),i.classList.add("disable"),u.textContent=l.textContent=m.textContent=f.textContent="00",n=0}function q(t){const y=Math.floor(t/864e5),S=Math.floor(t%864e5/36e5),g=Math.floor(t%864e5%36e5/6e4),C=Math.floor(t%864e5%36e5%6e4/1e3);return{days:y,hours:S,minutes:g,seconds:C}}function a(t){return t.toString().padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
