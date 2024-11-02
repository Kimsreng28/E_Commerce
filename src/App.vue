<template>
  <div id="app">
    <Nav/>
    <div class="auth-wrapper">
      <div class="auth-inner">
        <!-- <Login/> -->
         <router-view/>
      </div>
    </div>
  </div>


</template>
<script>
import Nav from './components/Nav.vue';
// import Home from './components/Home.vue';
import Login from './components/Login.vue';
import { routerViewLocationKey } from 'vue-router';
export default {
  name: "App",
  components: {
    Nav,
    // Home,
    Login
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  background: rgb(122, 122, 234);
  font-family: 'Courier New', Courier, monospace;
  min-height: 100vh;
}

#app {
  text-align: center;
  width: 100%;
  height: 100%;
}



.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;

}

.auth-inner {
  width: 450px;
  margin: auto;
  background: rgb(255, 255, 255);
  box-shadow: 0px 14px 80px rgb(96, 93, 93);
  padding: 30px;
  border-radius: 15px;
  transition: all .3s;

}
</style>