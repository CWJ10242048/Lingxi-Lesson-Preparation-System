<template>
  <div class="image-generation">
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
        <div class="nav-item" @click="navigateToPersonalCenter">
          <img src="https://img.icons8.com/small/96/user-male-circle.png" alt="个人中心" width="24" height="24">
          <i class="fas fa-user"></i>个人中心
        </div>
      </nav>

      <!-- 主内容区 -->
      <main class="main-content">
        <h1 class="page-title">图文生成</h1>
        <div class="form-container">
          <form @submit.prevent="generateImage">
            <div class="form-group">
              <label for="imageType">图片类型</label>
              <select id="imageType" v-model="formData.imageType" required>
                <option value="概念图">概念图</option>
                <option value="流程图">流程图</option>
                <option value="思维导图">思维导图</option>
                <option value="示意图">示意图</option>
                <option value="图表">图表</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <div class="form-group">
              <label for="imageSize">图片大小</label>
              <select id="imageSize" v-model="formData.imageSize" required>
                <option value="小">小 (800x600)</option>
                <option value="中">中 (1024x768)</option>
                <option value="大">大 (1920x1080)</option>
                <option value="自定义">自定义</option>
              </select>
            </div>
            <div class="form-group" v-if="formData.imageSize === '自定义'">
              <label for="customSize">自定义尺寸</label>
              <div class="size-inputs">
                <input type="number" v-model="formData.customWidth" placeholder="宽度" required>
                <span class="size-separator">x</span>
                <input type="number" v-model="formData.customHeight" placeholder="高度" required>
              </div>
            </div>
            <div class="form-group">
              <label for="style">风格</label>
              <select id="style" v-model="formData.style" required>
                <option value="简约">简约</option>
                <option value="卡通">卡通</option>
                <option value="写实">写实</option>
                <option value="手绘">手绘</option>
                <option value="科技">科技</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <div class="form-group">
              <label for="subject">适用学科</label>
              <input type="text" id="subject" v-model="formData.subject" required>
            </div>
            <div class="form-group">
              <label for="knowledgePoint">知识点</label>
              <input type="text" id="knowledgePoint" v-model="formData.knowledgePoint" required>
            </div>
            <div class="form-group">
              <label for="customRequirements">自定义要求</label>
              <textarea 
                id="customRequirements" 
                v-model="formData.customRequirements"
                placeholder="请输入您的特殊需求（选填）"
                class="custom-textarea"
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="generate-btn"
              :disabled="isGenerating"
            >
              {{ isGenerating ? '生成中...' : '生成图片' }}
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGeneration',
  data() {
    return {
      currentTime: '',
      formData: {
        imageType: '',
        imageSize: '',
        customWidth: '',
        customHeight: '',
        style: '',
        subject: '',
        knowledgePoint: '',
        customRequirements: ''
      },
      isGenerating: false
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    async generateImage() {
      this.isGenerating = true;
      try {
        // 模拟生成过程
        await new Promise(resolve => setTimeout(resolve, 30000));
        alert('图片生成成功！');
      } catch (error) {
        console.error('生成失败:', error);
        alert('生成失败，请重试');
      } finally {
        this.isGenerating = false;
      }
    },
    navigateToPersonalCenter() {
      // 实现导航到个人中心的逻辑
      console.log('导航到个人中心');
    }
  }
}
</script>

<style scoped>
.image-generation {
  font-family: 'Helvetica Neue', sans-serif;
  background: url('../assets/images/蓝背景板.png') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  opacity: 0.85;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: #E3F2FD; /* 改为浅蓝色背景 */
  box-shadow: 0 2px 8px rgba(32, 90, 177, 0.1); /* 调整阴影颜色为蓝色 */
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
  align-items: center;
}

.timestamp {
  color: #1976D2;
  font-size: 16px;
  margin-right: 15px;
  font-weight: 500;
}

.login-button, .new-conversation {
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 30px;
  background-color: #1976D2;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.login-button:hover, .new-conversation:hover {
  background-color: #1565C0;
}

.container {
  display: flex;
  margin-top: 50px;
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

.nav-item:hover {
  background-color: #e0f7fa;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 150px;
  margin-top: 60px;
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: -20px;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.generate-btn {
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

.generate-btn:hover {
  background-color: #0b7dda;
}

.generate-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.custom-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
}

.custom-textarea:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.size-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.size-inputs input {
  flex: 1;
}

.size-separator {
  font-size: 20px;
  color: #666;
}
</style> 