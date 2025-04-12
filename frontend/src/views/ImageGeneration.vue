<template>
  <div class="image-generation">
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
      <div class="header-buttons">
        <router-link to="/login" class="login-button">登录</router-link>
        <button class="new-conversation"><i class="fas fa-plus"></i> 新对话</button>
      </div>
    </header>

    <div class="container">
      <!-- 左侧导航栏 -->
      <nav class="sidebar">
        <router-link to="/HomePage" class="nav-item">
          <i class="fas fa-history"></i>智能对话
        </router-link>
        <router-link to="/HistoryPage" class="nav-item">
          <i class="fas fa-history"></i>输出历史
        </router-link>
        <router-link to="/CollaborationSpace" class="nav-item">
          <i class="fas fa-users"></i>协作空间
        </router-link>
        <div class="nav-item">
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
  methods: {
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
  background: #FAF0E6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.logo {
  width: 150px;
}

.header-buttons {
  display: flex;
  align-items: center;
}

.login-button, .new-conversation {
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 30px;
  background-color: #BFAE9F;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.login-button:hover, .new-conversation:hover {
  background-color: #A9A194;
}

.container {
  display: flex;
  margin-top: 50px;
}

.sidebar {
  width: 160px;
  background-color: rgba(207, 207, 207, 0.7);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 100px;
  left: 0;
  height: calc(100vh - 80px);
}

.nav-item {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: #0D47A1;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s;
  text-align: center;
  width: 100%;
  font-size: 22px;
}

.nav-item:hover {
  background-color: #e0f7fa;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 150px;
  margin-top: -20px;
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