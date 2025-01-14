import{B as J}from"./Breadcrumb_Component-Co-8O1x_.js";import{B as V}from"./Button_Component-BslC29Dg.js";import{_ as M,c as F,f as l,g as r,s as t,t as d,u as G,B as x,a as y,w as z,v as E,x as D,j as h,k as j,T as Q,F as A,m as I,l as _,C as S,I as R,D as L,A as Y,z as K,o as X,q as B,G as W}from"./index-CM7MdMiN.js";import{u as H,N as Z}from"./Navbar_Component-CWWY1Zf6.js";import{F as tt}from"./Footer_Component-JhSoATJ7.js";import{u as T}from"./useCheckOut-CzYeXUmz.js";import{u as et}from"./useOrderHistory-CR-M07jS.js";import{L as ot}from"./LoadingView-D8r7OzeQ.js";import"./useUserSignupStore-u2h-RB6q.js";const nt={name:"CheckOutItem_Component",props:{id:Number,imageProduct:String,nameProduct:String,sizeProduct:Array,colorProduct:Array,priceProduct:Number,quantity:{type:Number,default:1}},setup(a){return{totalPrice:F(()=>a.priceProduct*a.quantity)}}},st={class:"cartCheck"},at={class:"image"},ct=["src"],lt={class:"detail"},rt={class:"set"},it={class:"name"},dt={class:"size"},ut={key:0,class:"color"},mt={class:"price"},pt={class:"quantity"},_t={class:"quantityProduct"},ht={class:"number"};function yt(a,e,s,o,c,u){return l(),r("div",st,[t("div",at,[t("img",{src:s.imageProduct,alt:""},null,8,ct)]),t("div",lt,[t("div",rt,[t("div",it,[t("p",null,d(s.nameProduct),1)]),t("div",dt,[t("p",null,"Size: "+d(s.sizeProduct),1)]),s.colorProduct?(l(),r("div",ut,[e[0]||(e[0]=t("p",null,"Color:",-1)),t("div",{class:"colorDisplay",style:G({backgroundColor:s.colorProduct})},null,4)])):x("",!0),t("div",mt,[t("p",null,"$"+d(o.totalPrice),1)])]),t("div",pt,[t("div",_t,[t("div",ht,[t("p",null,"x"+d(s.quantity),1)])])])])])}const vt=M(nt,[["render",yt],["__scopeId","data-v-76a43de3"]]),Ct={name:"ConfirmSum_Component",props:{titleSummary:{type:String,default:"Confirmed Payment"}},setup(){const a=H(),e=F(()=>a.getSubtotal),s=y(parseFloat(localStorage.getItem("discountPrice"))||0),o=.25,c=F(()=>e.value+o-s.value);return z(s,u=>{u<=0&&localStorage.setItem("discountPrice","0")}),{subtotalPrice:e,discountPrice:s,shippingPrice:o,totalPrice:c}}},gt={class:"priceSummary"},Pt={class:"titleSummary"},ft={class:"subtotalPrice"},bt={class:"shipping"},kt={class:"discount"},St={key:0,class:"negative"},wt={key:1},Lt={class:"totalPrice"};function Nt(a,e,s,o,c,u){return l(),r("div",gt,[t("div",Pt,[t("p",null,d(s.titleSummary),1)]),t("div",ft,[e[0]||(e[0]=t("p",null,"Subtotal:",-1)),t("p",null,"$"+d(o.subtotalPrice.toFixed(2)),1)]),e[4]||(e[4]=t("div",{class:"hr"},[t("hr")],-1)),t("div",bt,[e[1]||(e[1]=t("p",null,"Shipping:",-1)),t("p",null,"$"+d(o.shippingPrice.toFixed(2)),1)]),e[5]||(e[5]=t("div",{class:"hr"},[t("hr")],-1)),t("div",kt,[e[2]||(e[2]=t("p",null,"Discount:",-1)),o.discountPrice>0?(l(),r("p",St," - $"+d(o.discountPrice.toFixed(2)),1)):(l(),r("p",wt,"$0.00"))]),e[6]||(e[6]=t("div",{class:"hr"},[t("hr")],-1)),t("div",Lt,[e[3]||(e[3]=t("p",null,"Total:",-1)),t("p",null,"$"+d(o.totalPrice.toFixed(2)),1)])])}const Ft=M(Ct,[["render",Nt],["__scopeId","data-v-2d2b137c"]]),xt=E("locationStore",{state:()=>({locations:JSON.parse(localStorage.getItem("locations"))||[],selectedLocation:null}),actions:{addLocation(a){this.locations.push(a),this.saveToLocalStorage()},setSelectedLocation(a){this.selectedLocation=a},saveToLocalStorage(){localStorage.setItem("locations",JSON.stringify(this.locations))}}}),Mt={name:"Location_Component",components:{Button_Component:V},emits:["update:location"],setup(a,{emit:e}){const s=xt(),o=y(!1),c=y({fullName:"",streetAddress:"",apartment:"",city:"",phoneNumber:""}),u=F(()=>s.locations);return{showDropdown:o,newLocation:c,locations:u,toggleDropdown:()=>{o.value=!o.value},addLocation:()=>{const{fullName:v,streetAddress:P,apartment:f,city:b,phoneNumber:N}=c.value;if(!v||!P||!b||!N){alert("Please fill in all required fields.");return}s.addLocation({fullName:v,streetAddress:P,apartment:f||"",city:b,phoneNumber:N,selected:!1}),c.value={fullName:"",streetAddress:"",apartment:"",city:"",phoneNumber:""},o.value=!1},formatAddress:v=>{const{streetAddress:P,apartment:f,city:b}=v;return`${P}${f?`, ${f}`:""}, ${b}`},selectLocation:v=>{u.value.forEach((f,b)=>{f.selected=b===v});const P=u.value[v];s.selectedLocation=P,e("update:location",P)}}}},Dt={key:0,class:"material-icons"},At={class:"dropdown"},It={class:"inputName"},Vt={class:"inputAddress"},Ot={class:"inputFloor"},qt={class:"inputCity"},Bt={class:"inputNumberPhone"},Tt={class:"buttonAdd"},$t=["onClick"],Ut={class:"show"},zt={class:"material-icons"};function Et(a,e,s,o,c,u){const m=_("Button_Component");return l(),r("div",{class:D(["location",{expanded:o.showDropdown}])},[e[13]||(e[13]=t("div",{class:"title"},[t("p",null,"Location for shipping")],-1)),e[14]||(e[14]=t("hr",null,null,-1)),t("div",{class:"add",onClick:e[0]||(e[0]=(...n)=>o.toggleDropdown&&o.toggleDropdown(...n))},[o.showDropdown?x("",!0):(l(),r("span",Dt," add ")),o.showDropdown?(l(),r("span",{key:1,class:D(["material-icons",{rotated:o.showDropdown}])}," keyboard_arrow_down ",2)):x("",!0),e[6]||(e[6]=t("p",null,"Add new locations",-1))]),h(Q,{name:"dropdown"},{default:j(()=>[S(t("div",At,[t("div",It,[e[7]||(e[7]=t("p",null,"Full Name",-1)),S(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=n=>o.newLocation.fullName=n)},null,512),[[L,o.newLocation.fullName]])]),t("div",Vt,[e[8]||(e[8]=t("p",null,"Street Address",-1)),S(t("input",{type:"text","onUpdate:modelValue":e[2]||(e[2]=n=>o.newLocation.streetAddress=n)},null,512),[[L,o.newLocation.streetAddress]])]),t("div",Ot,[e[9]||(e[9]=t("p",null,"Apartment, floor, etc. (optional)",-1)),S(t("input",{type:"text","onUpdate:modelValue":e[3]||(e[3]=n=>o.newLocation.apartment=n)},null,512),[[L,o.newLocation.apartment]])]),t("div",qt,[e[10]||(e[10]=t("p",null,"Town/City",-1)),S(t("input",{type:"text","onUpdate:modelValue":e[4]||(e[4]=n=>o.newLocation.city=n)},null,512),[[L,o.newLocation.city]])]),t("div",Bt,[e[11]||(e[11]=t("p",null,"Phone Number",-1)),S(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=n=>o.newLocation.phoneNumber=n)},null,512),[[L,o.newLocation.phoneNumber]])]),t("div",Tt,[h(m,{"name-button":"Add","color-button":"#FFFFFF","background-color-button":"#564949","height-button":"40px","width-button":"115px",onClick:o.addLocation},null,8,["onClick"])])],512),[[R,o.showDropdown]])]),_:1}),(l(!0),r(A,null,I(o.locations,(n,p)=>(l(),r("div",{class:D(["showLocation",{selected:n.selected}]),key:p,onClick:g=>o.selectLocation(p)},[t("div",Ut,[e[12]||(e[12]=t("span",{class:"material-icons"},"home",-1)),t("p",null,d(o.formatAddress(n)),1)]),t("span",zt,d(n.selected?"check_circle":"radio_button_unchecked"),1)],10,$t))),128))],2)}const jt=M(Mt,[["render",Et],["__scopeId","data-v-59681128"]]),$="/assets/card-Ca2jl0RY.png",U="/assets/visa-afyQHn1c.png",Ht=E("paymentStore",{state:()=>({payments:JSON.parse(localStorage.getItem("payments"))||[],selectedPayment:null}),actions:{addPayment(a){this.payments.push(a),this.saveToLocalStorage()},setSelectedPayment(a){this.selectedPayment=a},saveToLocalStorage(){localStorage.setItem("payments",JSON.stringify(this.payments))}}}),Jt={name:"Payment_Component",components:{Button_Component:V},props:{paymentMethod:String},setup(a,{emit:e}){const s=Ht(),o=y([{name:"Visa",icon:U},{name:"MasterCard",icon:$},{name:"ABA",icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUIHKcKRFtUDWjJ2A0SHGyDvzcXhkCfy7m9WfpiUn23JRSGccFqF_0g9G7qS7_3ePLerM&usqp=CAU"},{name:"ACLEDA",icon:"https://ibccambodia.com/wp-content/uploads/2021/02/ACLEDA-Logo-Existing-New-one-07-2-e1613988422171.png"}]),c=y(null),u={ABA:"https://i.ibb.co/t3fpgxv/photo-2024-12-01-18-21-24.jpg",ACLEDA:"https://i.ibb.co/tKnK4T8/photo-2024-12-01-18-21-18.jpg"},m=i=>u[i]||"https://via.placeholder.com/150x150",n=y({name:"",cardNumber:"",expiry:"",cvv:""}),p=F(()=>s.payments),g=y(null);return{paymentMethods:o,selectedPaymentMethod:c,getQrCode:m,cardDetails:n,savedCards:p,selectedCard:g,togglePaymentMethod:i=>{c.value===i.name?c.value=null:c.value=i.name,e("update:paymentMethod",c.value)},toggleSavedCard:i=>{g.value===i?(g.value=null,s.selectedPayment=null):(g.value=i,s.selectedPayment=i,c.value=i.type),e("update:paymentMethod",c.value)},getCardIcon:i=>i==="Visa"?U:i==="MasterCard"?$:null,addCard:()=>{const{name:i,cardNumber:k,expiry:O,cvv:C}=n.value;if(!i||!k||!O||!C){alert("Please fill in all the card details.");return}const q={type:c.value,name:i,cardNumber:k,expiry:O,cvv:C};s.addPayment(q),alert(`Card for ${i} added successfully!`),n.value={name:"",cardNumber:"",expiry:"",cvv:""},c.value=null},maskCardNumber:i=>i.replace(/\d(?=\d{4})/g,"*")}}},Gt={class:"location"},Qt={class:"method"},Rt=["onClick"],Yt=["src","alt"],Kt={class:"details"},Xt={key:0,class:"card-details"},Wt={class:"titleCard"},Zt={class:"inputName"},te={class:"inputCardNumber"},ee={class:"inputExpired"},oe={class:"inputCVV"},ne={class:"buttonAdd"},se={key:1,class:"qr-code"},ae=["src"],ce={class:"showCard"},le=["onClick"],re={class:"detailCard"},ie=["src"],de={class:"material-icons"};function ue(a,e,s,o,c,u){const m=_("Button_Component");return l(),r("div",Gt,[e[10]||(e[10]=t("div",{class:"title"},[t("p",null,"Select Payment Method")],-1)),e[11]||(e[11]=t("hr",null,null,-1)),t("div",Qt,[(l(!0),r(A,null,I(o.paymentMethods,(n,p)=>(l(),r("div",{class:D(["payment-option",{selected:o.selectedPaymentMethod===n.name}]),key:p,onClick:g=>o.togglePaymentMethod(n)},[t("img",{src:n.icon,alt:n.name},null,8,Yt),t("p",null,d(n.name),1)],10,Rt))),128))]),t("div",Kt,[(o.selectedPaymentMethod==="Visa"||o.selectedPaymentMethod==="MasterCard")&&!o.selectedCard?(l(),r("div",Xt,[t("div",Wt,[t("p",null,[e[4]||(e[4]=Y(" Add a New Card for ")),t("span",null,d(o.selectedPaymentMethod),1)])]),t("div",Zt,[e[5]||(e[5]=t("p",null,"Name on Card",-1)),S(t("input",{type:"text",placeholder:"Enter name","onUpdate:modelValue":e[0]||(e[0]=n=>o.cardDetails.name=n)},null,512),[[L,o.cardDetails.name]])]),t("div",te,[e[6]||(e[6]=t("p",null,"Card Number",-1)),S(t("input",{type:"text",placeholder:"Enter card number","onUpdate:modelValue":e[1]||(e[1]=n=>o.cardDetails.cardNumber=n)},null,512),[[L,o.cardDetails.cardNumber]])]),t("div",ee,[e[7]||(e[7]=t("p",null,"Expiry Date",-1)),S(t("input",{type:"text",placeholder:"MM/YY","onUpdate:modelValue":e[2]||(e[2]=n=>o.cardDetails.expiry=n)},null,512),[[L,o.cardDetails.expiry]])]),t("div",oe,[e[8]||(e[8]=t("p",null,"CVV",-1)),S(t("input",{type:"text",placeholder:"CVV","onUpdate:modelValue":e[3]||(e[3]=n=>o.cardDetails.cvv=n)},null,512),[[L,o.cardDetails.cvv]])]),t("div",ne,[h(m,{"name-button":"Add Card","color-button":"#FFFFFF","background-color-button":"#564949","height-button":"40px","width-button":"115px",onClick:o.addCard},null,8,["onClick"])])])):x("",!0),o.selectedPaymentMethod==="ABA"||o.selectedPaymentMethod==="ACLEDA"?(l(),r("div",se,[t("p",null," Scan the QR Code below to proceed with payment "+d(o.selectedPaymentMethod)+": ",1),t("img",{src:o.getQrCode(o.selectedPaymentMethod),alt:"QR Code"},null,8,ae)])):x("",!0)]),t("div",ce,[e[9]||(e[9]=t("p",null,"Your Cards",-1)),(l(!0),r(A,null,I(o.savedCards,(n,p)=>(l(),r("div",{key:p,class:D(["saved-card",{selected:o.selectedCard===n}]),onClick:g=>o.toggleSavedCard(n)},[t("div",re,[t("img",{src:o.getCardIcon(n.type),alt:"Card Icon",class:"card-icon"},null,8,ie),t("p",null,"Card Number: "+d(o.maskCardNumber(n.cardNumber)),1)]),t("span",de,d(o.selectedCard===n?"check_circle":"radio_button_unchecked"),1)],10,le))),128))])])}const me=M(Jt,[["render",ue],["__scopeId","data-v-df3eab1f"]]),pe={name:"PaymentSuccess_Component",components:{Button_Component:V},props:{totalPrice:{type:[String,Number],required:!0},paymentMethod:{type:String,required:!0},transactionId:{type:String,required:!0},transactionDate:{type:String,required:!0}},methods:{goToOrderHistory(){this.$router.push("/order")}}},_e={class:"paymentAlert"},he={class:"info"},ye={class:"totalPrice"},ve={class:"paymentMethod"},Ce={class:"transactionId"},ge={class:"transactionDate"},Pe={class:"btn"},fe={class:"history"};function be(a,e,s,o,c,u){const m=_("Button_Component"),n=_("router-link");return l(),r("div",_e,[e[0]||(e[0]=K('<div class="success-animation" data-v-68424c60><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" data-v-68424c60><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" data-v-68424c60></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" data-v-68424c60></path></svg></div><p class="success-message" data-v-68424c60>Payment successful!</p><div class="thank" data-v-68424c60> Thank you for your payment. Your order has been processed successfully. </div>',3)),t("div",he,[t("p",ye,"Amount: $"+d(s.totalPrice.toFixed(2)),1),t("p",ve,"Payment Method: "+d(s.paymentMethod),1),t("p",Ce,"Transaction ID: "+d(s.transactionId),1),t("p",ge,"Transaction Date: "+d(s.transactionDate),1)]),t("div",Pe,[h(n,{to:"/order"},{default:j(()=>[t("div",fe,[h(m,{"name-button":"View Order History","width-button":"200px","height-button":"50px","background-color-button":"#564949","color-button":"#FFFFFF"})])]),_:1})])])}const ke=M(pe,[["render",be],["__scopeId","data-v-68424c60"]]),Se={name:"CheckOutView",components:{Navbar_Component:Z,Breadcrumb_Component:J,Location_Component:jt,PaymentMethod_Component:me,Footer_Component:tt,Button_Component:V,LoadingView:ot,PaymentSuccess_Component:ke,ConfirmSum_Component:Ft,CheckOutItem_Component:vt},setup(){const a=H(),e=T(),s=et(),o=y(!0),c=y(!1),u=y(null),m=y(null),n=y("TXN123456789"),p=y(new Date().toLocaleString()),g=F(()=>a.getSubtotal),v=y(parseFloat(localStorage.getItem("discountPrice"))||0),P=.25,f=F(()=>g.value+P-v.value);z(v,C=>{C<=0&&localStorage.setItem("discountPrice","0")}),X(()=>{setTimeout(()=>{o.value=!1},1e3)});const b=C=>{console.log("Selected Location:",C),m.value=C},N=C=>{console.log("Selected Payment Method:",C),u.value=C},i=()=>{localStorage.setItem("discountPrice","0")};return{isLoading:o,isPaymentSuccess:c,selectedPaymentMethod:u,transactionId:n,transactionDate:p,updateLocation:b,updatePaymentMethod:N,handlePayNow:()=>{if(!u.value){alert("Please select a payment method.");return}if(!m.value){alert("Please select a shipping location.");return}const C=Array.isArray(e.checkOut)?e.checkOut:Object.values(e.checkOut);console.log("CheckOut Items: ",C),c.value=!0,i(),n.value=`TXN${Math.floor(Math.random()*1e9)}`;const q={id:n.value,date:p.value,items:C.map(w=>({id:w.id,name:w.name,image:w.image||"default-image-url.jpg",quantity:w.quantity,price:w.price,discount:w.discount,finalPrice:w.finalPrice,color:w.color,size:w.size})),totalPrice:f.value,paymentMethod:u.value,shippingLocation:m.value};s.addOrderFromCheckout(q),setTimeout(()=>{a.clearCart()},3e3),setTimeout(()=>{c.value=!1},5e3)},totalPrice:f,selectedLocation:m,handleCancel:()=>{W.push("/cart")}}},computed:{checkOutItems(){return T().checkOut.map(e=>{const s=parseFloat(e.discount.replace("%",""))||0,o=e.price*s/100,c=e.price-o;return{...e,discountPrice:o,finalPrice:c}})},shippingPrice(){return .25},subtotalPrice(){return this.checkOutItems.reduce((a,e)=>a+e.finalPrice*e.quantity,0)},totalDiscountPrice(){return this.checkOutItems.reduce((a,e)=>a+e.discountPrice*e.quantity,0)}}},we={class:"checkoutScreen"},Le={key:0,class:"load"},Ne={key:1},Fe={class:"container"},xe={class:"left"},Me={class:"right"},De={class:"payNow"},Ae={key:2,class:"showSuccess"};function Ie(a,e,s,o,c,u){const m=_("Navbar_Component"),n=_("LoadingView"),p=_("Breadcrumb_Component"),g=_("Location_Component"),v=_("PaymentMethod_Component"),P=_("CheckOutItem_Component"),f=_("ConfirmSum_Component"),b=_("Button_Component"),N=_("Footer_Component"),i=_("PaymentSuccess_Component");return l(),r("div",we,[h(m),o.isLoading?(l(),r("div",Le,[h(n)])):(l(),r("div",Ne,[h(p),e[0]||(e[0]=t("div",{class:"title"},[t("h1",{style:{"font-family":"Saira, sans-serif"}},"Check Out")],-1)),t("div",Fe,[t("div",xe,[h(g,{"onUpdate:location":o.updateLocation},null,8,["onUpdate:location"]),h(v,{style:{"margin-top":"5%"},"onUpdate:paymentMethod":o.updatePaymentMethod},null,8,["onUpdate:paymentMethod"])]),t("div",Me,[(l(!0),r(A,null,I(u.checkOutItems,k=>(l(),B(P,{style:{"margin-bottom":"3%"},key:k.id,id:k.id,imageProduct:k.image,nameProduct:k.name,sizeProduct:k.size,priceProduct:k.price,quantity:k.quantity},null,8,["id","imageProduct","nameProduct","sizeProduct","priceProduct","quantity"]))),128)),h(f)])]),t("div",De,[h(b,{class:"cancel","name-button":"Cancel","color-button":"#000000","background-color-button":"#FFFFFF","height-button":"50px","width-button":"200px",onClick:o.handleCancel},null,8,["onClick"]),h(b,{"name-button":"Pay Now","color-button":"#FFFFFF","background-color-button":"#958383","height-button":"50px","width-button":"200px",onClick:o.handlePayNow},null,8,["onClick"])]),h(N,{style:{"margin-top":"5%"}})])),o.isPaymentSuccess?(l(),r("div",Ae,[(l(),B(i,{key:o.isPaymentSuccess,totalPrice:o.totalPrice,paymentMethod:o.selectedPaymentMethod,transactionId:o.transactionId,transactionDate:o.transactionDate,location:o.selectedLocation},null,8,["totalPrice","paymentMethod","transactionId","transactionDate","location"]))])):x("",!0)])}const je=M(Se,[["render",Ie],["__scopeId","data-v-83047b18"]]);export{je as default};
