<template>
  <div>
    <div class="header">
      <img class="logo" src="../assets/images/v2_su8xbg.jpg" alt="lingxiTeach logo">
      <div class="right-buttons">
              <router-link to="/login" class="login-button">登录</router-link>
              <button class="new-conversation"><i class="fas fa-plus"></i> 新对话</button>
      </div>
    </div>

    <h1 class="title">Hi，我是灵犀智能备课助手</h1>

    <div class="container">
      <div class="side-bar">
        <router-link to="/HomePage" class="nav-item"><i class="fas fa-history"></i>智能对话</router-link>
        <router-link to="/HistoryPage" class="nav-item"><i class="fas fa-history"></i>输出历史</router-link>
        <router-link to="/CollaborationSpace" class="nav-item"><i class="fas fa-history"></i>协作空间</router-link>
        <div class="nav-item" id="personalCenterBtn"><i class="fas fa-user"></i>个人中心</div>
      </div>

      <!-- 协作空间内容 -->
      <div class="main-content collab-content" id="collabContent">
        <div class="collab-header">
          <h1 class="page-title">协作空间</h1>
          <div class="back-to-main" id="backToMainBtn">
            <i class="fas fa-arrow-left"></i>
            <span>返回智能助手</span>
          </div>
        </div>

        <div class="section-divider"></div>

        <div class="collab-course">
          <div class="course-header">
            <div class="course-title">机器学习</div>
            <button class="enter-prepare">进入备课</button>
          </div>
          <div class="course-meta">
            <span>主持人：胖胖老师</span> |
            <span>学科范围：计算机、人工智能</span> |
            <span>备课时间：2025/02/24-至今</span>
          </div>
          <div class="divider-line"></div>
          <div class="course-description">
            这是一个关于机器学习基础知识的协作备课空间，欢迎各位老师共同参与课程设计和资源准备。
          </div>
        </div>

        <div class="collab-course">
          <div class="course-header">
            <div class="course-title">数据结构</div>
            <button class="enter-prepare">进入备课</button>
          </div>
          <div class="course-meta">
            <span>主持人：李老师</span> |
            <span>学科范围：计算机</span> |
            <span>备课时间：2025/03/01-至今</span>
          </div>
          <div class="divider-line"></div>
          <div class="course-description">
            数据结构课程协作备课空间，共同设计教学方案和实验内容。
          </div>
        </div>

        <button class="generate-btn" style="margin-top: 20px;">发起集体备课</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollaborationSpace',
  methods: {
    handleNavClick(navItem) {
      console.log(`Clicked on ${navItem}`);
      // 可以在这里添加导航逻辑
    },
    handleFunctionClick(functionItem) {
      console.log(`Clicked on ${functionItem}`);
      // 可以在这里添加功能逻辑
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  color: #333;
  height: 100vh;
  overflow: hidden;
}

/* 主界面样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 150px; /* 根据实际需求调整 */
  height: auto;
}

/* 新增 right-buttons 类的样式 */
.right-buttons {
  display: flex;
  margin-left: auto; /* 将按钮组推到最右侧 */
}

/* 调整登录按钮和新对话按钮之间的间距 */
.login-button {
  background-color: white;
  color: #2196F3;
  padding: 8px 15px;
  border: 1px solid #2196F3;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  text-decoration: none;
}

.new-conversation {
  background-color: white;
  color: #2196F3;
  padding: 8px 15px;
  border: 1px solid #2196F3;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0;
  color: black;
}

.container {
  display: flex;
  gap: 20px;
  height: calc(100vh - 150px);
  padding: 0 20px;
}

.side-bar {
  width: 200px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 10px;
  color: #2196F3;
  margin-bottom: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #f0f7ff;
}

.nav-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.main-content {
  flex-grow: 1;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.main-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.main-block {
  flex-grow: 1;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.main-block h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.sub-functions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.function-button {
  border: 1px solid #2196F3;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.function-button:hover {
  background-color: #f0f7ff;
}

.function-button img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.input-area {
  margin: 20px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.input-field {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 14px;
}

.input-icons i {
  margin-left: 15px;
  cursor: pointer;
  color: #666;
}

/* 浮层样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.modal-close {
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.modal-content {
  padding: 20px;
}

/* 表单样式 */
.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.required:after {
  content: " *";
  color: red;
}

input[type="text"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.file-upload {
  margin-top: 5px;
}

.generate-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.generate-btn:hover {
  background-color: #0b7dda;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
}

/* 分割线样式 */
.divider {
  border-top: 1px solid #eee;
  margin: 15px 0;
}

/* 历史记录表格样式 */
.history-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.history-table th,
.history-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.history-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #555;
}

.history-table tr:hover {
  background-color: #f9f9f9;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  color: #2196F3;
  cursor: pointer;
  font-size: 14px;
}

.action-btn:hover {
  text-decoration: underline;
}

/* 页面标题样式 */
.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* 分割线样式 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 15px 0;
}



.collab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-to-main {
  display: flex;
  align-items: center;
  color: #2196F3;
  cursor: pointer;
}

.back-to-main i {
  margin-right: 5px;
}

.collab-course {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.course-title {
  font-size: 18px;
  font-weight: bold;
}

.course-meta {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.enter-prepare {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.divider-line {
  height: 1px;
  background-color: #eee;
  margin: 15px 0;
}
</style>