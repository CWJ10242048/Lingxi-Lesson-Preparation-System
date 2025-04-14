<template>
  <div class="home-page">
    <!-- 主界面 -->
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
        <div class="row">
          <!-- 输出历史 -->
          <section class="card" >
            <h2>输出历史</h2>
            <div class="section-divider"></div>
            <table class="history-table">
              <thead>
                <tr>
                  <th>内容</th>
                  <th>工具</th>
                  <th>更新时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>机器学习教学大纲</td>
                  <td>教学大纲生成</td>
                  <td>2024/4/6 8:34</td>
                  <td class="action-buttons">
                    <span class="action-btn delete-btn">删除</span>
                    <span class="action-btn export-btn">导出</span>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>高等数学练习题</td>
                  <td>智能出题</td>
                  <td>2024/4/5 15:20</td>
                  <td class="action-buttons">
                    <span class="action-btn delete-btn">删除</span>
                    <span class="action-btn export-btn">导出</span>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>数据结构知识图谱</td>
                  <td>知识图谱</td>
                  <td>2024/4/4 10:15</td>
                  <td class="action-buttons">
                    <span class="action-btn delete-btn">删除</span>
                    <span class="action-btn export-btn">导出</span>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Python编程教案</td>
                  <td>教案生成</td>
                  <td>2024/4/3 14:30</td>
                  <td class="action-buttons">
                    <span class="action-btn delete-btn">删除</span>
                    <span class="action-btn export-btn">导出</span>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>计算机网络互动设计</td>
                  <td>互动环节设计</td>
                  <td>2024/4/2 9:45</td>
                  <td class="action-buttons">
                    <span class="action-btn delete-btn">删除</span>
                    <span class="action-btn export-btn">导出</span>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>数据库原理PPT</td>
                  <td>PPT生成</td>
                  <td>2024/4/1 16:20</td>
                  <td class="action-buttons">
                    <span class="action-btn delete-btn">删除</span>
                    <span class="action-btn export-btn">导出</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  data() {
    return {
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
    navigateToPersonalCenter() {
      this.$router.push('/personal-center');
    }
  }
}
</script>

<style scoped>
.home-page {
  font-family: 'Helvetica Neue', sans-serif;
  background: url('../assets/images/蓝背景板.png') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  opacity: 0.85; /* 控制背景图片透明度 */
}


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

.timestamp {
  color: #1976D2;
  font-size: 16px;
  margin-right: 15px;
  font-weight: 500;
}

.login-button,
.new-conversation {
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
  background-color: #A9A194; /* 悬停时颜色加深 */
}

.container {
  display: flex;
  justify-content: center; /* 改为居中 */
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  width: calc(100% - 160px); /* 减去侧边栏宽度 */
  padding: 20px;
  box-sizing: border-box;
  margin-left: 160px; /* 与侧边栏宽度一致 */
}

/* 保证侧边栏固定位置，不会影响中央的内容 */
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
  margin-top: 60px;

  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center; /* 让卡片居中 */
  width: 100%;
}

.card {
  flex: 0 0 auto;
  width: 90%; /* 缩小卡片宽度 */
  background-color: rgba(245, 230, 224, 0.7); /* 提高透明度 (alpha 0.7) */
  padding: 20px; /* 调整内边距 */
  border-radius: 12px; /* 调整圆角 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* 调整阴影 */
  margin: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加阴影过渡 */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12); /* 悬停时增强阴影 */
}

.card h2 {
  font-size: 22px; /* 进一步缩小标题字号 */
  font-weight: 600;
  margin-bottom: 15px; /* 减少下边距 */
  color: #8B5A5A;
  text-align: left;
}

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

.section-divider {
  border-top: 1px solid #eee;
  margin: 15px 0;
}
</style>
