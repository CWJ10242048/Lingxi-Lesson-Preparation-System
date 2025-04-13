<script setup>
import { markRaw, ref } from "vue";

import Login from "@/components/login/login.vue";
import Register from "@/components/login/register.vue";
import Forget from "@/components/login/forget.vue";

const tabs = ref([markRaw(Login), markRaw(Register), markRaw(Forget)]);
const currentFormType = ref(tabs.value[0]);
const currentNum = ref(0);

function switchForm(formType) {
  if (formType === "login") {
    currentFormType.value = tabs.value[0];
    currentNum.value = 0;
  } else if (formType === "register") {
    currentFormType.value = tabs.value[1];
    currentNum.value = 1;
  } else {
    currentFormType.value = tabs.value[2];
    currentNum.value = 2;
  }
}

const findUrl = "@/assets/images/finding.svg";
const imageUrl = "https://picsum.photos/800";
</script>

<template>
  <div class="login-page">
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
    </header>

    <div class="container">
      <div class="login-container">
        <h1 class="page-title">用户登录</h1>
        <div class="form-container">
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">用户名</label>
              <input 
                type="text" 
                id="username" 
                v-model="formData.username" 
                placeholder="请输入用户名"
                required
              >
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input 
                type="password" 
                id="password" 
                v-model="formData.password" 
                placeholder="请输入密码"
                required
              >
            </div>
            <button type="submit" class="login-btn">登录</button>
            <div class="form-links">
              <router-link to="/register" class="link">注册账号</router-link>
              <router-link to="/forget-password" class="link">忘记密码？</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      // 直接返回登录成功
      alert('登录成功！');
      this.$router.push('/HomePage');
    }
  }
}
</script>

<style scoped>
.login-page {
  font-family: 'Helvetica Neue', sans-serif;
  background: url('../assets/images/蓝背景板.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  overflow-y: auto;
  opacity: 0.85;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  background: #E3F2FD;
  box-shadow: 0 2px 8px rgba(32, 90, 177, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo {
  width: 150px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 20px 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #0b7dda;
}

.form-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 40px;
}

.link {
  color: #2196F3;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
  padding: 0 10px;
}

.link:hover {
  color: #0b7dda;
  text-decoration: underline;
}
</style>
