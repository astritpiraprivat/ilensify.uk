const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open))})}

document.querySelectorAll("[data-demo-form]").forEach(form=>{
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const success=form.querySelector(".form-success");
    if(success)success.classList.add("visible");
  });
});

const filters=[...document.querySelectorAll(".filter")];
const products=[...document.querySelectorAll(".product-card")];
const resultCount=document.querySelector("#result-count");
function applyFilter(category){
  let visible=0;
  products.forEach(product=>{
    const show=category==="all"||product.dataset.category===category;
    product.classList.toggle("hidden",!show);
    if(show)visible++;
  });
  filters.forEach(button=>button.classList.toggle("active",button.dataset.filter===category));
  if(resultCount)resultCount.textContent=visible;
}
if(filters.length){
  filters.forEach(button=>button.addEventListener("click",()=>applyFilter(button.dataset.filter)));
  const requested=new URLSearchParams(location.search).get("category");
  applyFilter(["lenses","coatings","frames"].includes(requested)?requested:"all");
}

const authTabs=[...document.querySelectorAll(".auth-tab")];
const authBox=document.querySelector(".auth-box");
if(authTabs.length&&authBox){
  authTabs.forEach(tab=>tab.addEventListener("click",()=>{
    const signup=tab.dataset.auth==="signup";
    authTabs.forEach(item=>item.classList.toggle("active",item===tab));
    authBox.classList.toggle("signup-mode",signup);
    document.querySelector("#auth-title").textContent=signup?"Join My iLensify.":"Welcome back.";
    document.querySelector("#auth-subtitle").textContent=signup?"Request a professional trade account.":"Sign in to access your iLensify trade account.";
    document.querySelector(".auth-submit").firstChild.textContent=signup?"Request account ":"Sign in ";
  }));
}
document.querySelectorAll(".show-password").forEach(button=>button.addEventListener("click",()=>{
  const input=button.previousElementSibling;
  const reveal=input.type==="password";
  input.type=reveal?"text":"password";
  button.textContent=reveal?"Hide":"Show";
}));
