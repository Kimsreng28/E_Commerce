<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email" />

        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password" />
            <button class="btn btn-primary btn-block">Login</button>

        </div>
    </form>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleSubmit() {
            const data = {
                email: this.email,
                password: this.password,
            };
            localSotorage.setItem('token',response.data.token)
        }
    }

}
</script>