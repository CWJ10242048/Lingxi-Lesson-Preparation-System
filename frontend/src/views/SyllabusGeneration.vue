<template>
  <div class="syllabus-generation">
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
export default {
  name: 'SyllabusGeneration',
  data() {
    return {
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
  methods: {
    handleFileUpload(event) {
      this.formData.referenceMaterial = event.target.files[0];
    },
    async generateSyllabus() {
      // 显示生成中状态
      this.isGenerating = true;
      
      try {
        // 模拟生成过程
        await new Promise(resolve => setTimeout(resolve, 30000));
        
        // 生成成功提示
        alert('教学大纲生成成功！');
        
        // 自动下载文件
        const filePath = 'E:\\gitplay\\Lingxi-Lesson-Preparation-System\\Lingxi-Lesson-Preparation-System\\result\\机器学习教学大纲.docx';
        const link = document.createElement('a');
        link.href = filePath;
        link.download = '机器学习教学大纲.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 下载成功后提示并自动打开文件
        setTimeout(() => {
          alert('文件下载成功！正在打开文件...');
          // 使用系统默认程序打开文件
          window.open(filePath, '_blank');
        }, 1000);
        
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
.syllabus-generation {
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
  margin-top: -50px;
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