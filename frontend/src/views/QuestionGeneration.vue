<template>
  <div class="question-generation">
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
      <div class="header-buttons">
        <router-link to="/login" class="login-button">登录</router-link>
        <button class="new-conversation"><i class="fas fa-plus"></i> 新对话</button>
      </div>
    </header>

    <div class="container">
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

      <main class="main-content">
        <h1 class="page-title">智能出题</h1>
        
        <div class="form-container">
          <form @submit.prevent="generateQuestions">
            <div class="form-group">
              <label for="subject">目标科目</label>
              <select id="subject" v-model="formData.subject" required>
                <option value="">请选择科目</option>
                <option value="计算机科学">计算机科学</option>
                <option value="数据库原理">数据库原理</option>
                <option value="SQL">SQL</option>
              </select>
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
      typingSpeed: 50
    }
  },
  methods: {
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

.container {
  display: flex;
  padding: 20px;
}

.sidebar {
  width: 160px;
  background-color: rgba(207, 207, 207, 0.7);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
  padding: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #0D47A1;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s;
  font-size: 22px;
}

.nav-item:hover {
  background-color: #e0f7fa;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 20px;
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
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

select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
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