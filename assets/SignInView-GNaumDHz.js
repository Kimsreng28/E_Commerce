import{g as I,_ as b}from"./ecommerce-bg-CSzpsND7.js";import{u as k}from"./useUserSignupStore-CRsTeUvy.js";import{_ as f,a as g,o as L,f as i,g as a,s as e,j as v,A as C,t as V,B as u,C as c,D as E,x as S,E as h,y,l as p}from"./index-CFOGQU_k.js";import{_ as x,L as B}from"./LoadingView-Cc9w8Ri5.js";const M={name:"SignInComponent",components:{google:I},setup(){const d=y(),o=k(),r=g(""),s=g(""),l=g(!1),m=g(!1),t=g(!1);L(()=>{const w=localStorage.getItem("saveEmail");w&&(r.value=w,t.value=!0)});const n=()=>{l.value=!r.value.trim()||!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(r.value)},_=()=>{m.value=s.value.length<6};return{userSignInStore:o,email:r,password:s,emailError:l,passwordError:m,validateEmail:n,validatePassword:_,handleSignIn:()=>{n(),_(),!l.value&&!m.value&&(o.signIn(r.value,s.value),o.loginError?alert(o.loginError):(t.value?localStorage.setItem("saveEmail",r.value):localStorage.removeItem("saveEmail"),alert("Login successful!"),d.push("/")))},rememberMe:t}}},P={class:"containerSignIn"},U={class:"leftSide"},N={class:"loginGoogle"},D={class:"err"},T={key:0,class:"errorMessage"},G={class:"inputEmail"},R={key:0,class:"inputError"},j={class:"inputPassword"},A={key:0,class:"inputError"},O={class:"remember"},W={class:"checkBoc"},Y={class:"box"},q={class:"login"},z={class:"goSignUp"};function F(d,o,r,s,l,m){const t=p("google");return i(),a("div",P,[e("div",U,[o[11]||(o[11]=e("div",{class:"logo"},[e("img",{src:x,alt:""})],-1)),o[12]||(o[12]=e("div",{class:"welcome"},[e("p",null,"Welcome Back")],-1)),e("div",N,[e("button",null,[v(t),o[8]||(o[8]=C("Login with Google"))])]),o[13]||(o[13]=e("div",{class:"orLogin"},[e("p",null,"OR LOG IN WITH EMAIL")],-1)),e("div",D,[s.userSignInStore.loginError?(i(),a("div",T,V(s.userSignInStore.loginError),1)):u("",!0)]),e("div",G,[c(e("input",{"onUpdate:modelValue":o[0]||(o[0]=n=>s.email=n),type:"text",id:"email",placeholder:"Your Email",class:S({"error-border":s.emailError}),onBlur:o[1]||(o[1]=(...n)=>s.validateEmail&&s.validateEmail(...n))},null,34),[[E,s.email]]),s.emailError?(i(),a("p",R,"Email is required.")):u("",!0)]),e("div",j,[c(e("input",{"onUpdate:modelValue":o[2]||(o[2]=n=>s.password=n),type:"password",id:"password",placeholder:"Your Password",class:S({"error-border":s.passwordError}),onBlur:o[3]||(o[3]=(...n)=>s.validatePassword&&s.validatePassword(...n))},null,34),[[E,s.password]]),s.passwordError?(i(),a("p",A,"Password must be wrong.")):u("",!0)]),e("div",O,[e("div",W,[c(e("input",{type:"checkbox",id:"remember","onUpdate:modelValue":o[4]||(o[4]=n=>s.rememberMe=n)},null,512),[[h,s.rememberMe]]),e("div",Y,[o[9]||(o[9]=e("p",null,"Remember me",-1)),e("h1",{onClick:o[5]||(o[5]=n=>d.$router.push("/resetPassword"))},"Forgot Password?")])])]),e("div",q,[e("button",{onClick:o[6]||(o[6]=(...n)=>s.handleSignIn&&s.handleSignIn(...n))},"Login   →")]),e("div",z,[o[10]||(o[10]=e("p",null,"Don't have an account?",-1)),e("h1",{onClick:o[7]||(o[7]=n=>d.$router.push("/signUp"))},"Sign Up")])]),o[14]||(o[14]=e("div",{class:"rightSide"},[e("div",{class:"text"},[e("h1",null,"Enjoy with New"),e("p",null,"E-commerce")]),e("div",{class:"imageEcommerce"},[e("img",{src:b,alt:""})])],-1))])}const H=f(M,[["render",F],["__scopeId","data-v-e48b8a4f"]]),J={name:"SignInView",components:{SignIn_Component:H,LoadingView:B},data(){return{isLoading:!0}},mounted(){setTimeout(()=>{this.isLoading=!1},1e3)}},K={class:"container"},Q={key:0,class:"load"},X={key:1};function Z(d,o,r,s,l,m){const t=p("LoadingView"),n=p("SignIn_Component");return i(),a("div",K,[l.isLoading?(i(),a("div",Q,[v(t)])):(i(),a("div",X,[v(n)]))])}const ro=f(J,[["render",Z],["__scopeId","data-v-59fd91db"]]);export{ro as default};
