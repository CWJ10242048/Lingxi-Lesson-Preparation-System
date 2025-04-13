<template>
  <div class="home-page">
    <!-- 主界面 -->
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
      <div class="header-buttons">
        <router-link to="/login" class="login-button">登录</router-link>
        <button class="new-conversation"><i class="fas fa-plus"></i> 设置</button>
      </div>
    </header>

    <div class="container">
      <!-- 左侧导航栏 -->
      <nav class="sidebar">
        <router-link to="/HomePage" class="nav-item">
          <i class="fas fa-history"></i>主页
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
        <div class="row">
          <!-- 协作空间内容 -->
          <section class="card">
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
          </section>
        </div>
      </main>
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
/* 整体页面样式 */
.home-page {
  font-family: 'Helvetica Neue', sans-serif;
  background: url('../assets/images/蓝背景板.png') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  opacity: 0.85; /* 控制背景图片透明度 */
}

/* 头部样式 */
header {
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

.login-button,
.new-conversation {
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 30px;
  background-color: #BFAE9F; /* 柔和的棕褐色 */
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.login-button:hover,
.new-conversation:hover {
  background-color: #A9A194; /* 悬停时颜色加深 */
}

/* 容器样式 */
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 顶部对齐 */
  gap: 30px;
  flex-wrap: nowrap; /* 不换行 */
  width: calc(100% - 160px); /* 减去侧边栏宽度 */
  padding: 20px;
  box-sizing: border-box;
  margin-left: 160px; /* 与侧边栏宽度一致 */
}

/* 侧边栏样式 */
.sidebar {
  width: 160px;
  background-color: rgba(207, 207, 207, 0.7);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 80px; /* 与顶部栏对齐 */
  left: 10px;
  height: calc(100vh - 80px); /* 调整高度以延伸到屏幕底部 */
  overflow-y: auto;
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

/* 主要内容区域样式 */
.main-content {
  flex: 1;
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  align-items: stretch; /* 拉伸子元素以填充整个宽度 */
}

.row {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
  width: 100%;
}

/* 卡片样式 */
.card {
  flex: 1;  /*重要，让卡片填充main-content的宽度*/
  min-width: 600px;
  background-color: rgba(245, 230, 224, 0.7);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin: 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

/* 协作空间特有样式 */
.collab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #8B5A5A;
  margin: 0;  /* 移除默认边距 */
}

.back-to-main {
  display: flex;
  align-items: center;
  color: #2196F3;
  cursor: pointer;
  transition: color 0.3s;
}

.back-to-main:hover {
  color: #0d47a1;
}

.back-to-main i {
  margin-right: 5px;
}

.section-divider {
  border-top: 1px solid #eee;
  margin: 15px 0;
}

.collab-course {
  background-color: rgba(248, 240, 237, 0.8); /* 颜色与HistoryPage统一 */
  border-radius: 10px; /* 圆角 */
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.collab-course:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  color: #8B5A5A;
}

.course-meta {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.divider-line {
  height: 1px;
  background-color: #e1e5eb;
  margin: 15px 0;
}

.course-description {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
}

/* 按钮样式 */
.enter-prepare,
.generate-btn {
  background-color: #2196F3; /* 统一颜色 */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.enter-prepare:hover,
.generate-btn:hover {
  background-color: #0d47a1;
}
</style>
