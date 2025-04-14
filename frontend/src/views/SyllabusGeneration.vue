<template>
  <div class="syllabus-generation">
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
        <h1 class="page-title">教学大纲生成</h1>
        <div class="form-container">
          <form @submit.prevent="generateSyllabus">
            <div class="form-group">
              <label for="courseName">课程名称</label>
              <input type="text" id="courseName" v-model="formData.courseName" required>
            </div>
            <div class="form-group">
              <label for="totalHours">总学时</label>
              <input type="number" id="totalHours" v-model="formData.totalHours" required>
            </div>
            <div class="form-group">
              <label for="experimentHours">实验学时</label>
              <input type="number" id="experimentHours" v-model="formData.experimentHours" required>
            </div>
            <div class="form-group">
              <label for="major">适用专业</label>
              <input type="text" id="major" v-model="formData.major" required>
            </div>
            <div class="form-group">
              <label for="courseType">课程性质</label>
              <select id="courseType" v-model="formData.courseType" required>
                <option value="公共基础课程">公共基础课程</option>
                <option value="专业课程">专业课程</option>
                <option value="选修课程">选修课程</option>
                <option value="实践课程">实践课程</option>
                <option value="通识教育课程">通识教育课程</option>
              </select>
            </div>
            <div class="form-group">
              <label for="referenceMaterial">参考教程</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  id="referenceMaterial" 
                  @change="handleFileUpload" 
                  accept=".pdf,.doc,.docx"
                  class="file-input"
                >
                <label for="referenceMaterial" class="file-label">
                  <i class="fas fa-upload"></i> 选择文件
                </label>
                <span class="file-name" v-if="formData.referenceMaterial">
                  {{ formData.referenceMaterial.name }}
                </span>
              </div>
            </div>
            <div class="form-group">
              <label for="customRequirements">自定义需求</label>
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
              {{ isGenerating ? '生成中...' : '生成教学大纲' }}
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
  name: 'SyllabusGeneration',
  data() {
    return {
      currentTime: '',
      formData: {
        courseName: '',
        totalHours: '',
        experimentHours: '',
        major: '',
        courseType: '公共基础课程',
        referenceMaterial: null,
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
    handleFileUpload(event) {
      this.formData.referenceMaterial = event.target.files[0];
    },
    async generateSyllabus() {
      this.isGenerating = true;
      
      try {
        // 等待30秒
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 发送请求到后端
        const response = await http.request({
          url: '/download-syllabus',
          method: 'get',
          responseType: 'blob',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          }
        });

        if (!response.data) {
          throw new Error('没有接收到文件数据');
        }

        // 创建下载链接
        const blob = new Blob([response.data], { 
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        
        if (blob.size === 0) {
          throw new Error('文件大小为0');
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '机器学习教学大纲.docx';
        document.body.appendChild(link);
        link.click();
        
        // 清理
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        alert('文件生成成功！正在下载文件');
        
      } catch (error) {
        console.error('生成失败:', error);
        alert('生成失败，请重试。错误信息：' + error.message);
      } finally {
        this.isGenerating = false;
      }
    }
  }
}
</script>

<style scoped>
.syllabus-generation {
  font-family: 'Helvetica Neue', sans-serif;
  background: url('../assets/images/蓝背景板.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  overflow-y: auto;
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
  transition: all 0.3s ease;
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
  background-color: #A9A194;
}

.container {
  display: flex;
  margin-top: 30px;
  padding-bottom: 50px;
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
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 0;
  transition: all 0.3s ease;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  transform: translateY(0);
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
</style> 