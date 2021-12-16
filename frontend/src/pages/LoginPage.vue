<template>
    <form @submit.prevent="onFormSubmit" class="login-form auth-form">
    <div class="form-field">
        <label for="login">Логин</label>
        <input v-model="login" id="login" type="text" required>
    </div>
    <div class="form-field">
        <label for="password">Пароль</label>
        <input v-model="password" id="password" type="text" required>
    </div>
    <button class="submit-btn" type="submit">Войти</button>
    <div class="action-link">
        <span>Нет аккаунта?</span>
        <a @click="redirect" class="link-btn">Зарегистироваться</a>
    </div>
    </form>
</template>

<script >
import {doLogin} from '@/netClient/authService';
export default{
    name: 'LoginPage',
    data:() => ({
        login: '',
        password: '',
    }),
    async mounted(){},
    methods:{
       async onFormSubmit(){
            try {
                const token = await doLogin(
                    this.login.trim(),
                    this.password.trim(),
                );
                console.warn({token});
                if (token){
                    this.$router.push('/')
                }
                
            } catch (error) {
                console.error({error});
            }
            
        },
        redirect(){
            this.$router.push('/registration')
        }
    },
};
</script>