<template>
  <div class="home-page">
    <!-- 主界面 -->
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
      <div class="header-buttons">
        <router-link to="/login" class="login-button">登录</router-link>
        <button class="new-conversation"><i class="fas fa-plus"></i> 新对话</button>
      </div>
    </header>

    <h1 class="page-title">Hi，我是灵犀智能备课助手</h1>

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
        <div class="row">
          <!-- 教学助手 -->
          <section class="card">
            <h2>教学助手</h2>
            <div class="features">
              <div class="feature" @click="openLessonPlanModal">
                <i class="fas fa-book" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/document-folder.svg" alt="教案生成" width="24" height="24">
                教案生成
              </div>
              <div class="feature" @click="navigateToSyllabusGeneration">
                <i class="fas fa-book" style="color: #2196F3;"></i>
                <img src="" alt="" width="24" height="24">
                教学大纲生成
              </div>
              <div class="feature" @click="navigateToInteractionDesign">
                <i class="fas fa-lightbulb" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/every-user.svg" alt="灯泡图标" width="24" height="24">
                互动环节设计
              </div>
            </div>
          </section>

          <!-- 备课中心 -->
          <section class="card">
            <h2>备课中心</h2>
            <div class="features">
              <div class="feature" @click="openPPTGenerateModal">
                <i class="fas fa-file-powerpoint" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/ppt.svg" alt="幻灯片带文字的图标" width="24" height="24">
                PPT生成
              </div>
              <div class="feature" @click="navigateToImageGeneration">
                <i class="fas fa-image" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/picture.svg" alt="相机图标" width="24" height="24">
                图文生成
              </div>
              <div class="feature" @click="navigateToQuestionGeneration">
                <i class="fas fa-question-circle" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/view-grid-detail.svg" alt="一叠纸的图标" width="24" height="24">
                智能出题
              </div>
            </div>
          </section>
        </div>

        <div class="row">
          <!-- 学情分析 -->
          <section class="card">
            <h2>学情分析</h2>
            <div class="features">
              <div class="feature" @click="navigateToStudentDataDashboard">
                <i class="fas fa-chart-bar" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/data-file.svg" alt="带图表的人的图标" width="24" height="24">
                学生数据看板
              </div>
              <div class="feature" @click="navigateToCognitiveDiagnosis">
                <i class="fas fa-eye" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/woman.svg" alt="眼睛图标" width="24" height="24">
                认知诊断
              </div>
              <div class="feature" @click="navigateToKnowledgeTracking">
                <i class="fas fa-eye" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/mind-mapping.svg" alt="知识追踪图标" width="24" height="24">
                知识追踪
              </div>
            </div>
          </section>

          <!-- 资源库 -->
          <section class="card">
            <h2>资源库</h2>
            <div class="features">
              <div class="feature" @click="navigateToKnowledgeGraph">
                <i class="fas fa-project-diagram" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/mind-mapping.svg" alt="带线的三角形图标" width="24" height="24">
                知识图谱
              </div>
              <div class="feature" @click="navigateToResourceCommunity">
                <i class="fas fa-users"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/message-search.svg" alt="三个人的图标（不同）" width="24" height="24">
    
                <span>资源社区</span>
              </div>
              <div class="feature" @click="navigateToConceptPrerequisite">
                <i class="fas fa-heart" style="color: #2196F3;"></i>
                <img src="" alt="" width="24" height="24">
                概念先决识别
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <input type="text" class="input-field" placeholder="输入...">
      <div class="input-icons">
        <i class="fas fa-paperclip"></i>
        <i class="fas fa-arrow-right"></i>
      </div>
    </div>

    <!-- 教案生成浮层 -->
    <div class="modal" v-if="showLessonPlanModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>教学方案</h3>
          <button class="close-btn" @click="closeLessonPlanModal">&times;</button>
        </div>
        <div class="modal-content">
          <p class="subtitle">智能生成一份教案</p>
          <form @submit.prevent="generateLessonPlan">
            <div class="form-group">
              <label for="courseName">课程名称</label>
              <input type="text" id="courseName" required>
            </div>
            <div class="form-group">
              <label for="totalHours">总学时</label>
              <input type="number" id="totalHours" required>
            </div>
            <div class="form-group">
              <label for="major">适用专业</label>
              <input type="text" id="major" required>
            </div>
            <div class="form-group">
              <label for="courseType">课程性质</label>
              <select id="courseType" required>
                <option value="必修课">必修课</option>
                <option value="选修课">选修课</option>
              </select>
            </div>
            <button class="generate-btn">生成</button>
          </form>
        </div>
      </div>
    </div>

    <!-- PPT 生成浮层 -->
    <div class="modal" v-if="showPPTGenerateModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>PPT 生成</h3>
          <button class="close-btn" @click="closePPTGenerateModal">&times;</button>
        </div>
        <div class="modal-content">
          <p class="subtitle">智能生成一份PPT</p>
          <form @submit.prevent="generatePPT">
            <div class="form-group">
              <label for="pptCourseName">课程名称</label>
              <input type="text" id="pptCourseName" required>
            </div>
            <div class="form-group">
              <label for="pptSections">节数</label>
              <input type="number" id="pptSections" required>
            </div>
            <button class="generate-btn">生成</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      showLessonPlanModal: false,
      showPPTGenerateModal: false
    };
  },
  methods: {
    openLessonPlanModal() {
      this.$router.push('/LessonPlanGeneration');
    },
    closeLessonPlanModal() {
      this.showLessonPlanModal = false;
    },
    openPPTGenerateModal() {
      this.$router.push('/PPTGeneration');
    },
    closePPTGenerateModal() {
      this.showPPTGenerateModal = false;
    },
    generateLessonPlan() {
      alert('教案生成');
      this.closeLessonPlanModal();
    },
    generatePPT() {
      alert('PPT生成');
      this.closePPTGenerateModal();
    },
    navigateToSyllabusGeneration() {
      this.$router.push('/SyllabusGeneration');
    },
    navigateToImageGeneration() {
      this.$router.push('/ImageGeneration');
    },
    navigateToQuestionGeneration() {
      this.$router.push('/QuestionGeneration');
    },
    navigateToInteractionDesign() {
      this.$router.push('/interaction-design');
    },
    navigateToStudentDataDashboard() {
      this.$router.push('/student-data-dashboard');
    },
    navigateToCognitiveDiagnosis() {
      this.$router.push('/cognitive-diagnosis');
    },
    navigateToKnowledgeTracking() {
      this.$router.push('/knowledge-tracking');
    },
    navigateToKnowledgeGraph() {
      this.$router.push('/knowledge-graph');
    },
    navigateToResourceCommunity() {
      this.$router.push('/resource-community');
    },
    navigateToConceptPrerequisite() {
      this.$router.push('/concept-prerequisite');
    }
  }
};
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
  background: #FAF0E6; /* 柔和的亚麻色背景 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* 调整阴影 */
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
  background-color: #BFAE9F; /* 柔和的棕褐色 */
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.login-button:hover, .new-conversation:hover {
  background-color: #A9A194; /* 悬停时颜色加深 */
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-top: 20px;
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
  width: 160px; /* 恢复侧边栏宽度 */
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
  justify-content: center; /* 添加水平居中 */
  margin-bottom: 10px;
  color: #0D47A1; /* 变深的蓝色 */
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
  width: 320px; /* 缩小卡片宽度 */
  height: 250px; /* 缩小卡片高度 */
  background-color: rgba(245, 230, 224, 0.7); /* 提高透明度 (alpha 0.7) */
  padding: 20px; /* 调整内边距 */
  border-radius: 12px; /* 调整圆角 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* 调整阴影 */
  margin: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}

.feature {
  display: flex;
  align-items: center;
  background-color: rgba(248, 240, 237, 0.8); /* 可选：同步透明度 */
  padding: 12px; /* 减少内边距 */
  text-align: center;
  border-radius: 10px; /* 调整圆角 */
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  gap: 10px; /* 减少图标与文本间距 */
  width: 100%;
  margin-bottom: 10px; /* 减少下边距 */
  font-size: 14px; /* 减小字体大小 */
}

.feature:hover {
  transform: translateY(-3px);
  background-color: #F5E6E0;
}

.feature i, .feature img {
  width: 20px; /* 缩小图标尺寸 */
  height: 20px; /* 缩小图标尺寸 */
}

.input-area {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #FAF0E6; /* 与顶部栏一致的柔和背景 */
  padding: 15px;
  width: 80%;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* 调整阴影 */
  display: flex;
  justify-content: space-between;
}

.input-field {
  width: 85%;
  padding: 10px 15px; /* 调整内边距 */
  border: 1px solid #D3C1B8; /* 柔和的边框色 */
  border-radius: 20px;
  font-size: 16px;
  background-color: rgb(242, 220, 220); /* 保持输入框内部白色 */
}

.input-icons i {
  color: #BFAE9F; /* 与按钮颜色一致 */
  cursor: pointer;
  margin-left: 10px;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"], input[type="number"], select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button.generate-btn {
  background-color: #2196F3;
  color: white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

button.generate-btn:hover {
  background-color: #0b7dda;
}
</style>
