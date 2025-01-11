import{v as S,_ as C,a as p,o as f,c as u,f as l,g as c,s as e,C as I,D as w,t as m,B as d,y}from"./index-CFOGQU_k.js";import{u as k}from"./useUserSignupStore-CRsTeUvy.js";import{_ as L}from"./LoadingView-Cc9w8Ri5.js";const g=S("cart",{state:()=>({cartItems:JSON.parse(localStorage.getItem("cart"))||[],coupon:"",couponDiscount:0}),actions:{addToCart(s){this.cartItems.push(s),this.saveToLocalStorage()},removeFromCart(s){this.cartItems=this.cartItems.filter(t=>t.id!==s),this.saveToLocalStorage()},clearCart(){this.cartItems=[],console.log("Cart cleared in state."),localStorage.removeItem("cart"),console.log("Cart cleared in localStorage.")},deleteItem(s){this.cartItems=this.cartItems.filter(t=>t.id!==s),this.saveToLocalStorage()},updateQuantity(s,t){const r=this.cartItems.find(o=>o.id===s);r&&(r.quantity=t,this.saveToLocalStorage())},applyCoupon(s){s==="SAVE10"?(this.coupon=s,this.couponDiscount=10):s==="SAVE20"?(this.coupon=s,this.couponDiscount=20):(this.coupon="",this.couponDiscount=0)},saveToLocalStorage(){localStorage.setItem("cart",JSON.stringify(this.cartItems))}},getters:{getCartItems:s=>s.cartItems,getSubtotal:s=>s.cartItems.reduce((t,r)=>t+r.price*r.quantity,0),getDiscount:s=>{const t=s.cartItems.reduce((o,a)=>{if(a.discount){const n=a.discount/100*a.price*a.quantity;return o+n}return o},0),r=s.couponDiscount/100*s.getSubtotal;return t+r}}}),v=S("wishlist",{state:()=>({wishlist:JSON.parse(localStorage.getItem("wishlist"))||[]}),actions:{addToWishlist(s){this.wishlist.find(t=>t.id===s.id)?alert("Product already in wishlist!"):(this.wishlist.push(s),this.saveWishlistToLocalStorage())},removeFromWishlist(s){s?(this.wishlist=this.wishlist.filter(t=>t.id!==s),this.saveWishlistToLocalStorage()):console.error("No product ID provided to remove from wishlist.")},clearWishlist(){this.wishlist=[],this.saveWishlistToLocalStorage()},saveWishlistToLocalStorage(){localStorage.setItem("wishlist",JSON.stringify(this.wishlist))}}}),D={name:"NavbarComponent",props:["onSearch"],setup(s){const t=k(),r=y(),o=p(null),a=p(""),n=()=>{t.isLoggedIn?r.push("/profile"):r.push("/signIn")},i=()=>{s.onSearch(a.value)};return f(()=>{const h=localStorage.getItem("profileImage");h&&(o.value=h)}),{handleAccountClick:n,emitSearch:i,searchQuery:a,profileImage:o,isLoggedIn:u(()=>t.isLoggedIn),wishlistCount:u(()=>v().wishlist.length),cartCount:u(()=>g().cartItems.length)}},computed:{wishlistCount(){return v().wishlist.length},cartCount(){return g().cartItems.length}}},T={class:"navBar"},N={class:"imgLogo"},A={class:"contents"},W={class:"search"},b={class:"cart"},B={key:0,class:"cart-count"},V={key:1,class:"wishlist-count"},$=["src"];function J(s,t,r,o,a,n){return l(),c("div",T,[e("div",N,[e("img",{src:L,alt:"",onClick:t[0]||(t[0]=i=>this.$router.push("/"))})]),e("div",A,[e("p",{onClick:t[1]||(t[1]=i=>this.$router.push("/"))},"Home"),e("p",{onClick:t[2]||(t[2]=i=>this.$router.push("/category"))},"Shop"),e("p",{onClick:t[3]||(t[3]=i=>this.$router.push("/contact"))},"Contact"),e("p",{onClick:t[4]||(t[4]=i=>this.$router.push("/about"))},"About")]),e("div",W,[t[12]||(t[12]=e("span",{class:"material-icons"},"search",-1)),I(e("input",{type:"text",placeholder:"Search product here...",onInput:t[5]||(t[5]=(...i)=>o.emitSearch&&o.emitSearch(...i)),"onUpdate:modelValue":t[6]||(t[6]=i=>o.searchQuery=i)},null,544),[[w,o.searchQuery]]),t[13]||(t[13]=e("span",{class:"material-icons"},"shopping_cart",-1))]),e("div",b,[e("span",{class:"material-icons",id:"cart",onClick:t[7]||(t[7]=i=>this.$router.push("/cart"))},"shopping_cart"),n.cartCount>0?(l(),c("span",B,[e("p",null,m(n.cartCount),1)])):d("",!0),e("span",{class:"material-icons",id:"favorite",onClick:t[8]||(t[8]=i=>s.$router.push("/wishlist"))},"favorite"),n.wishlistCount>0?(l(),c("span",V,[e("p",null,m(n.wishlistCount),1)])):d("",!0),e("span",{class:"material-icons",id:"order_history",onClick:t[9]||(t[9]=i=>s.$router.push("/order"))},"history"),t[14]||(t[14]=e("p",{style:{color:"white"}},"|",-1)),o.isLoggedIn&&o.profileImage?(l(),c("span",{key:2,class:"profile-image",onClick:t[10]||(t[10]=(...i)=>o.handleAccountClick&&o.handleAccountClick(...i))},[e("img",{src:o.profileImage,alt:""},null,8,$)])):(l(),c("span",{key:3,class:"material-icons",id:"account",onClick:t[11]||(t[11]=(...i)=>o.handleAccountClick&&o.handleAccountClick(...i))},"account_circle"))])])}const x=C(D,[["render",J],["__scopeId","data-v-ec534156"]]);export{x as N,v as a,g as u};
