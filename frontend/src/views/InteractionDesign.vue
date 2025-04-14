<template>
  <div class="interaction-design">
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
        <h1 class="page-title">互动环节设计</h1>
        <div class="form-container">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="courseTheme">课程主题</label>
              <input type="text" id="courseTheme" v-model="formData.courseTheme" required>
            </div>
            <div class="form-group">
              <label for="classSize">班级人数</label>
              <input type="number" id="classSize" v-model="formData.classSize" required>
            </div>
            <div class="form-group">
              <label>互动风格(多选)</label>
              <div class="interaction-styles">
                <div class="interaction-row">
                  <label class="style-option">
                    <input type="checkbox" value="小组讨论" v-model="formData.interactionStyles"> 小组讨论
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="角色扮演" v-model="formData.interactionStyles"> 角色扮演
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="案例分析" v-model="formData.interactionStyles"> 案例分析
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="游戏互动" v-model="formData.interactionStyles"> 游戏互动
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="问答互动" v-model="formData.interactionStyles"> 问答互动
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="头脑风暴" v-model="formData.interactionStyles"> 头脑风暴
                  </label>
                </div>
                <div class="interaction-row">
                  <label class="style-option">
                    <input type="checkbox" value="团队竞赛" v-model="formData.interactionStyles"> 团队竞赛
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="辩论" v-model="formData.interactionStyles"> 辩论
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="情境模拟" v-model="formData.interactionStyles"> 情境模拟
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="案例研究" v-model="formData.interactionStyles"> 案例研究
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="小测验或调查" v-model="formData.interactionStyles"> 小测验
                  </label>
                  <label class="style-option">
                    <input type="checkbox" value="在线讨论" v-model="formData.interactionStyles"> 互动演示
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="customInteractionStyle">自定义互动风格</label>
                <input type="text" id="customInteractionStyle" v-model="formData.customInteractionStyle" placeholder="请输入自定义互动风格">
              </div>
            </div>
            <div class="form-group">
              <label for="courseDuration">课程时长（分钟）</label>
              <input type="number" id="courseDuration" v-model="formData.courseDuration" required>
            </div>

            <!-- 文件上传部分 -->
            <div class="form-group">
              <label>教案文件</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  id="teachingPlan" 
                  ref="teachingPlanInput"
                  @change="handleFileUpload('teachingPlan', $event)"
                  accept=".doc,.docx"
                  class="file-input"
                >
                <label for="teachingPlan" class="file-label">
                  <i class="fas fa-upload"></i>
                  选择教案文件
                </label>
                <span class="file-name" v-if="formData.teachingPlan">
                  {{ formData.teachingPlan.name }}
                </span>
              </div>
            </div>

            <!-- <div class="form-group">
              <label>教学大纲文件</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  @change="handleFileUpload('syllabus')"
                  accept=".doc,.docx"
                  class="file-input"
                >
                <label class="file-label">
                  <i class="fas fa-upload"></i> 选择教学大纲文件
                </label>
                <span class="file-name" v-if="formData.syllabus">
                  {{ formData.syllabus.name }}
                </span>
              </div>
            </div> -->

            <div class="form-group">
              <label>教学PPT文件</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  id="ppt" 
                  ref="pptInput"
                  @change="handleFileUpload('ppt', $event)"
                  accept=".ppt,.pptx"
                  class="file-input"
                >
                <label for="ppt" class="file-label">
                  <i class="fas fa-upload"></i>
                  选择PPT文件
                </label>
                <span class="file-name" v-if="formData.ppt">
                  {{ formData.ppt.name }}
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              class="generate-btn"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '互动环节正在生成中...' : '提交设计' }}
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
  name: 'InteractionDesign',
  data() {
    return {
      currentTime: '',
      formData: {
        courseTheme: '',
        classSize: '',
        interactionStyles: [],
        customInteractionStyle: '',
        courseDuration: '',
        teachingPlan: null,
        syllabus: null,
        ppt: null
      },
      isSubmitting: false
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
    handleFileUpload(type, event) {
      this.formData[type] = event.target.files[0];
    },
    async submitForm() {
      this.isSubmitting = true;
      try {
        // 等待5秒
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // 发送请求到后端
        const response = await http.request({
          url: '/download-interaction-design',
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
        link.download = '互动环节设计.docx';
        document.body.appendChild(link);
        link.click();
        
        // 清理
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        alert('文件生成成功！正在下载文件');
        
      } catch (error) {
        console.error('提交失败:', error);
        alert('提交失败，请重试。错误信息：' + error.message);
      } finally {
        this.isSubmitting = false;
      }
    },
    navigateToPersonalCenter() {
      // 实现导航到个人中心的功能
      console.log('导航到个人中心');
    }
  }
}
</script>

<style scoped>
.interaction-design {
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

.interaction-styles {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.interaction-row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.style-option {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 0 0 calc(17% - 10px);
  min-width: 50px;
  justify-content: center;
  text-align: center;
}

.style-option:hover {
  background-color: #e0e0e0;
}

.style-option input[type="checkbox"] {
  margin-right: 8px;
}

.form-group input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}
</style>
