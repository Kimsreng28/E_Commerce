import{v as t}from"./index-CtQclHPH.js";const s=t("orderHistory",{state:()=>({orderHistory:JSON.parse(localStorage.getItem("orderHistory"))||[]}),actions:{addOrderFromCheckout(o){const e={id:`TXN${Date.now()}`,date:new Date().toLocaleString(),items:o.map(r=>({id:r.id,name:r.name,size:r.size||"N/A",color:r.color||"N/A",price:r.price,quantity:r.quantity,image:r.image||"default-image-url.jpg"}))};this.orderHistory.unshift(e),this.saveToLocalStorage()},saveToLocalStorage(){localStorage.setItem("orderHistory",JSON.stringify(this.orderHistory))}}});export{s as u};
