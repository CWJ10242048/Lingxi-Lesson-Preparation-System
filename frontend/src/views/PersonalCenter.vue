<template>
  <div class="personal-center">
    <!-- 顶部导航栏 -->
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
      <div class="header-buttons">
        <span class="timestamp">{{ currentTime }}</span>
        <router-link to="/login" class="login-button">登录</router-link>
        <button class="new-conversation"><i class="fas fa-plus"></i> 设置</button>
      </div>
    </header>

    <div class="container">
      <!-- 左侧导航栏 -->
      <nav class="sidebar">
        <router-link to="/HomePage" class="nav-item">
          <img src="https://img.icons8.com/small/16/school.png" alt="主页" width="24" height="24">
          <i class="fas fa-history"></i>主页
        </router-link>
        <router-link to="/HistoryPage" class="nav-item">
          <img src="https://img.icons8.com/small/16/information.png" alt="输出历史" width="24" height="24">
          <i class="fas fa-history"></i>输出历史
        </router-link>
        <router-link to="/CollaborationSpace" class="nav-item">
          <img src="https://img.icons8.com/small/96/news.png" alt="协作空间" width="24" height="24">
          <i class="fas fa-users"></i>协作空间
        </router-link>
        <div class="nav-item active">
          <img src="https://img.icons8.com/small/96/user-male-circle.png" alt="个人中心" width="24" height="24">
          <i class="fas fa-user"></i>个人中心
        </div>
      </nav>

      <!-- 主要内容区 -->
      <div class="main-content">
        <div class="user-profile">
          <!-- 头像部分 -->
          <div class="avatar-section">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" alt="用户头像" class="avatar">
            <button @click="changeAvatar" class="change-avatar">更换头像</button>
          </div>

          <!-- 选项卡 -->
          <div class="tabs">
            <button 
              v-for="tab in ['个人信息', '修改密码', '绑定手机']" 
              :key="tab"
              @click="activeTab = tab"
              :class="{ active: activeTab === tab }"
            >
              {{ tab }}
            </button>
          </div>

          <!-- 表单内容 -->
          <div class="form">
            <div class="form-item">
              <label>用户名</label>
              <input type="text" v-model="userInfo.username" disabled>
            </div>
            <div class="form-item">
              <label>邮箱</label>
              <input type="email" v-model="userInfo.email">
            </div>
            <div class="form-item">
              <label>昵称</label>
              <input type="text" v-model="userInfo.nickname">
            </div>
            <div class="form-item">
              <label>个人简介</label>
              <textarea v-model="userInfo.bio" rows="4"></textarea>
            </div>
            <button class="save-button" @click="saveProfile">保存修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  data() {
    return {
      activeTab: '个人信息',
      userInfo: {
        username: 'user123',
        email: 'user@example.com',
        nickname: '灵犀用户',
        bio: '热爱教学的老师'
      }
    }
  },
  methods: {
    saveProfile() {
      alert('保存成功！');
    },
    changeAvatar() {
      alert('更换头像功能开发中...');
    }
  }
}
</script>

<style scoped>
.personal-center {
  font-family: 'Helvetica Neue', sans-serif;
  background: url('../assets/images/蓝背景板.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  opacity: 0.85;  /* 这里设置了透明度为0.85,所以看起来比较蓝 */
}

.header {
  display: flex;
  justify-content: space-between;
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

.header-buttons {
  display: flex;
  gap: 15px;
}

.login-button, .new-conversation {
  padding: 10px 20px;
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 30px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover, .new-conversation:hover {
  background-color: #1565C0;
}

.container {
  display: flex;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.sidebar {
  width: 200px;
  background-color: rgb(101, 116, 137);
  padding: 20px;
  border-radius: 8px;
  position: fixed;
  top: 80px;
  left: 0px;
  height: calc(100vh - 80px);
  overflow-y: auto;
}

.nav-item {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center; /* 添加水平居中 */
  margin-bottom: 10px;
  /* color: #0D47A1; 变深的蓝色 */
  color: rgb(209, 213, 219);
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s;
  text-align: center; /* 确保文字居中 */
  width: 100%; /* 确保占满整个宽度 */
  font-size: 22px; /* 增大字体大小 */
}

.nav-item:hover, .nav-item.active {
  background-color: #e0f7fa;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  margin-right: 20px;
  background-color: rgba(230, 228, 230, 0.95);
  border-radius: 12px;
  padding: 30px;
  min-height: calc(100vh - 140px);
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.avatar-section {
  text-align: center;
  margin-bottom: 30px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #2196F3;
  background-color: white;
  margin-bottom: 15px;
}

.change-avatar {
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.change-avatar:hover {
  background-color: #1565C0;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  justify-content: center;
}

.tabs button {
  padding: 12px 24px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s;
}

.tabs button.active {
  background: #1976D2;
  color: white;
}

.form {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-item input,
.form-item textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-item input:focus,
.form-item textarea:focus {
  border-color: #2196F3;
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-item input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.save-button {
  width: 100%;
  padding: 14px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
}

.save-button:hover {
  background-color: #1565C0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 10px;
  }

  /* .sidebar {
    position: static;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  } */

  .main-content {
    margin-left: 0;
    margin-right: 0;
    min-height: auto;
  }

  .tabs button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style> 