<template>
  <div class="question-generation">
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
      <div class="header-buttons">
        <span class="timestamp">{{ currentTime }}</span>
        <router-link to="/login" class="login-button">登录</router-link>
        <button class="new-conversation"><i class="fas fa-plus"></i> 设置</button>
      </div>
    </header>

    <div class="container">
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

      <main class="main-content">
        <h1 class="page-title">智能出题</h1>
        
        <div class="form-container">
          <form @submit.prevent="generateQuestions">
            <div class="form-group">
              <label for="subject">目标科目</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                placeholder="请输入目标科目"
                required
              >
            </div>

            <div class="form-group">
              <label for="questionType">题目类型</label>
              <select id="questionType" v-model="formData.questionType" required>
                <option value="">请选择题型</option>
                <option value="单选题">单选题</option>
                <option value="多选题">多选题</option>
                <option value="判断题">判断题</option>
                <option value="填空题">填空题</option>
                <option value="简答题">简答题</option>
              </select>
            </div>

            <div class="form-group">
              <label for="difficulty">题目难度</label>
              <select id="difficulty" v-model="formData.difficulty" required>
                <option value="">请选择难度</option>
                <option value="简单">简单</option>
                <option value="中等">中等</option>
                <option value="困难">困难</option>
              </select>
            </div>

            <div class="form-group">
              <label for="referenceFile">参考文件</label>
              <div class="file-upload">
                <input type="file" id="referenceFile" @change="handleFileUpload" accept=".pdf,.doc,.docx">
                <label for="referenceFile" class="file-label">
                  <i class="fas fa-upload"></i> 选择文件
                </label>
                <span class="file-name" v-if="formData.fileName">{{ formData.fileName }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="customRequirements">自定义需求</label>
              <textarea 
                id="customRequirements" 
                v-model="formData.customRequirements" 
                placeholder="请输入您的具体需求..."
                rows="4"
              ></textarea>
              <button type="button" class="random-requirements-btn" @click="generateRandomRequirements">
                生成随机需求
              </button>
            </div>

            <button type="submit" class="generate-btn" :disabled="isGenerating">
              {{ isGenerating ? '生成中...' : '生成题目' }}
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionGeneration',
  data() {
    return {
      formData: {
        subject: '',
        questionType: '',
        difficulty: '',
        fileName: '',
        customRequirements: '',
        file: null
      },
      isGenerating: false,
      typingText: '',
      typingIndex: 0,
      typingSpeed: 50,
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
      const file = event.target.files[0];
      if (file) {
        this.formData.file = file;
        this.formData.fileName = file.name;
      }
    },
    generateRandomRequirements() {
      const text = "帮我出一道题考查机器学习的线性回归，难度中等，单选题。";
      this.typingText = '';
      this.typingIndex = 0;
      this.typeText(text);
    },
    typeText(text) {
      if (this.typingIndex < text.length) {
        this.typingText += text.charAt(this.typingIndex);
        this.typingIndex++;
        setTimeout(() => this.typeText(text), this.typingSpeed);
      } else {
        this.formData.customRequirements = this.typingText;
      }
    },
    async generateQuestions() {
      this.isGenerating = true;
      try {
        // TODO: 实现题目生成逻辑
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('题目生成成功！');
      } catch (error) {
        console.error('生成题目失败:', error);
        alert('生成题目失败，请重试');
      } finally {
        this.isGenerating = false;
      }
    },
    navigateToPersonalCenter() {
      // Implement the logic to navigate to the personal center
      console.log('Navigating to personal center');
    }
  }
}
</script>

<style scoped>
.question-generation {
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
  margin-top: -20px;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

select, textarea, input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
}

input[type="text"]:focus {
  border-color: #2196F3;
  outline: none;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="file"] {
  display: none;
}

.file-label {
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: #0b7dda;
}

.file-name {
  color: #666;
  font-size: 14px;
}

.random-requirements-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.random-requirements-btn:hover {
  background-color: #45a049;
}

.generate-btn {
  width: 100%;
  padding: 15px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-btn:hover:not(:disabled) {
  background-color: #0b7dda;
}

.generate-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style> 