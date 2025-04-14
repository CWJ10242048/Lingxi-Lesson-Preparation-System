<template>
  <div class="ppt-generation">
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
        <h1 class="page-title">PPT生成</h1>
        <div class="form-container">
          <form @submit.prevent="generatePPT">
            <div class="form-group">
              <label for="courseName">课程名称</label>
              <input type="text" id="courseName" v-model="formData.courseName" required>
            </div>
            <div class="form-group">
              <label for="sectionNumber">节数（第几节课）</label>
              <input type="number" id="sectionNumber" v-model="formData.sectionNumber" required>
            </div>
            <div class="form-group">
              <label for="lessonTopic">本节课时主题</label>
              <input type="text" id="lessonTopic" v-model="formData.lessonTopic" required>
            </div>
            <div class="form-group">
              <label for="lessonHours">本节课时学时</label>
              <input type="number" id="lessonHours" v-model="formData.lessonHours" required>
            </div>
            <div class="form-group">
              <label for="major">适用专业</label>
              <input type="text" id="major" v-model="formData.major" required>
            </div>
            <div class="form-group">
              <label for="referenceMaterial">参考教程</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  id="referenceMaterial" 
                  ref="fileInput"
                  @change="handleFileUpload"
                  accept=".pdf,.doc,.docx"
                  class="file-input"
                >
                <label for="referenceMaterial" class="file-label">
                  <i class="fas fa-upload"></i>
                  选择文件
                </label>
                <span class="file-name" v-if="formData.referenceMaterial">
                  {{ formData.referenceMaterial.name }}
                </span>
              </div>
            </div>
            <button 
              type="submit" 
              class="generate-btn"
              :disabled="isGenerating"
            >
              {{ isGenerating ? '生成中...' : '生成PPT' }}
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import http from '../utils/requests';

export default {
  name: 'PPTGeneration',
  data() {
    return {
      formData: {
        courseName: '',
        sectionNumber: '',
        lessonTopic: '',
        lessonHours: '',
        major: '',
        referenceMaterial: null
      },
      isGenerating: false,
      currentTime: ''
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
    handleFileUpload(event) {
      this.formData.referenceMaterial = event.target.files[0];
    },
    async generatePPT() {
      this.isGenerating = true;
      try {
        // 等待20秒
        await new Promise(resolve => setTimeout(resolve, 8000));
        
        // 发送请求到后端
        const response = await http.request({
          url: '/download-ppt',
          method: 'get',
          responseType: 'blob',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
          }
        });

        if (!response.data) {
          throw new Error('没有接收到文件数据');
        }

        // 创建下载链接
        const blob = new Blob([response.data], { 
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        });
        
        if (blob.size === 0) {
          throw new Error('文件大小为0');
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '机器学习课程线性回归课时教学PPT.pptx';
        document.body.appendChild(link);
        link.click();
        
        // 清理
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        alert('PPT生成成功！正在下载文件');
        
      } catch (error) {
        console.error('生成失败:', error);
        alert('生成失败，请重试。错误信息：' + error.message);
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
.ppt-generation {
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

.file-upload-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-input {
  display: none;
}

.file-label {
  padding: 12px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: #e0e0e0;
}

.file-name {
  color: #666;
  font-size: 14px;
}
</style> 