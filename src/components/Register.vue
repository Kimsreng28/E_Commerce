<template>
    <form @submit.prevent="handleSubmit">
        <!-- use .prevent to prevent it from refreshing page which the form
         will also be refresh -->
        <h3>Sign Up</h3>

        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form control" v-model="first_name" placeholder="First Name" />
            <!-- v-model="first_name" it mean every time we change the input the binding will assigned to
             the variable and the value will set to the label  -->
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form control" v-model="last_name" placeholder="Last Name" />

        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form control" v-model="email" placeholder="Email" />

        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form control" v-model="password" placeholder="Password" />

        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" class="form control" v-model="confirm_password" placeholder="Confirm Password" />

        </div>

        <button class="btn btn-primary btn-block">Sign up</button>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Register',
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''

        }
    },
    methods: {
        handleSubmit(e) {
            const data = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password
            };
            axios.post('http://localhost:3000/register', data)


            .then(
                res => {
                    console.log(res)
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }
    }
}
</script>
<style></style>