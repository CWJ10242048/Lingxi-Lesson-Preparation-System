<template>
  <div class="cognitive-diagnosis">
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
        <h1 class="page-title">认知诊断</h1>
        
        <!-- 文件上传区域 -->
        <div class="upload-section">
          <div class="form-group">
            <label>上传试题文件</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                id="questionFile" 
                ref="questionFileInput"
                @change="handleQuestionFileUpload"
                accept=".doc,.docx,.pdf"
                class="file-input"
              >
              <label for="questionFile" class="file-label">
                <i class="fas fa-upload"></i>
                选择试题文件
              </label>
              <span class="file-name" v-if="formData.questionFile">
                {{ formData.questionFile.name }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label>上传答题数据</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                id="answerData" 
                ref="answerDataInput"
                @change="handleAnswerDataUpload"
                accept=".csv,.xlsx,.xls"
                class="file-input"
              >
              <label for="answerData" class="file-label">
                <i class="fas fa-upload"></i>
                选择答题数据
              </label>
              <span class="file-name" v-if="formData.answerData">
                {{ formData.answerData.name }}
              </span>
            </div>
          </div>

          <button 
            class="analyze-btn"
            @click="startDiagnosis"
            :disabled="isDiagnosing"
          >
            {{ isDiagnosing ? '诊断中...' : '开始诊断' }}
          </button>
        </div>

        <!-- 诊断结果区域 -->
        <div class="dashboard-container" v-if="showResults">
          <div class="dashboard-header">
            <h2>认知诊断结果</h2>
            <div class="dashboard-actions">
              <button class="action-btn" @click="exportReport">
                <i class="fas fa-download"></i> 导出报告
              </button>
              <button class="action-btn" @click="refreshData">
                <i class="fas fa-sync-alt"></i> 刷新数据
              </button>
            </div>
          </div>

          <!-- 知识点掌握概览 -->
          <div class="data-overview">
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-brain"></i></div>
              <div class="card-content">
                <h3>知识点总数</h3>
                <p class="card-value">15</p>
              </div>
            </div>
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-check-circle"></i></div>
              <div class="card-content">
                <h3>已掌握</h3>
                <p class="card-value">10</p>
              </div>
            </div>
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-exclamation-circle"></i></div>
              <div class="card-content">
                <h3>待加强</h3>
                <p class="card-value">3</p>
              </div>
            </div>
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-times-circle"></i></div>
              <div class="card-content">
                <h3>未掌握</h3>
                <p class="card-value">2</p>
              </div>
            </div>
          </div>

          <!-- 图表区域 -->
          <div class="charts-container">
            <div class="chart-card">
              <h3>知识点掌握分布</h3>
              <div class="chart-placeholder">
                <div class="bar-chart">
                  <div class="bar" style="height: 85%;"><span>监督学习</span><span>85%</span></div>
                  <div class="bar" style="height: 75%;"><span>深度学习</span><span>75%</span></div>
                  <div class="bar" style="height: 65%;"><span>强化学习</span><span>65%</span></div>
                  <div class="bar" style="height: 55%;"><span>无监督学习</span><span>55%</span></div>
                  <div class="bar" style="height: 45%;"><span>集成学习</span><span>45%</span></div>
                </div>
              </div>
            </div>
            <div class="chart-card">
              <h3>认知水平分析</h3>
              <div class="chart-placeholder">
                <div class="pie-chart">
                  <div class="pie-segment">
                    <span>深度理解 (45%)</span>
                  </div>
                  <div class="pie-segment">
                    <span>基本掌握 (35%)</span>
                  </div>
                  <div class="pie-segment">
                    <span>需要提升 (20%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 知识点详情列表 -->
          <div class="knowledge-list">
            <h3>知识点掌握详情</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>知识点</th>
                    <th>掌握程度</th>
                    <th>相关题目数</th>
                    <th>正确率</th>
                    <th>建议</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in knowledgeList" :key="index">
                    <td>{{ item.name }}</td>
                    <td>
                      <div class="progress-bar">
                        <div class="progress" :style="{ width: item.mastery + '%', backgroundColor: getProgressColor(item.mastery) }"></div>
                      </div>
                      <span>{{ item.mastery }}%</span>
                    </td>
                    <td>{{ item.questionCount }}</td>
                    <td>{{ item.accuracy }}%</td>
                    <td>{{ item.suggestion }}</td>
                    <td>
                      <button class="detail-btn" @click="viewDetail(item)">详情</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CognitiveDiagnosis',
  data() {
    return {
      currentTime: '',
      formData: {
        questionFile: null,
        answerData: null
      },
      isDiagnosing: false,
      showResults: false,
      knowledgeList: [
        { name: '监督学习基础', mastery: 85, questionCount: 12, accuracy: 90, suggestion: '建议学习更高级的算法应用' },
        { name: '深度学习原理', mastery: 75, questionCount: 10, accuracy: 80, suggestion: '需要加强神经网络结构设计' },
        { name: '强化学习应用', mastery: 65, questionCount: 8, accuracy: 70, suggestion: '建议多做实际项目练习' },
        { name: '无监督学习方法', mastery: 55, questionCount: 9, accuracy: 60, suggestion: '聚类算法需要加强' },
        { name: '集成学习技术', mastery: 45, questionCount: 7, accuracy: 50, suggestion: '需要系统学习Boosting和Bagging' }
      ]
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
    handleQuestionFileUpload(event) {
      this.formData.questionFile = event.target.files[0];
    },
    handleAnswerDataUpload(event) {
      this.formData.answerData = event.target.files[0];
    },
    async startDiagnosis() {
      if (!this.formData.questionFile || !this.formData.answerData) {
        alert('请先上传试题文件和答题数据');
        return;
      }
      
      this.isDiagnosing = true;
      try {
        // 模拟诊断过程
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.showResults = true;
        alert('认知诊断完成！');
      } catch (error) {
        console.error('诊断失败:', error);
        alert('诊断失败，请重试');
      } finally {
        this.isDiagnosing = false;
      }
    },
    exportReport() {
      alert('报告导出成功！');
    },
    refreshData() {
      alert('数据已刷新！');
    },
    viewDetail(item) {
      alert(`查看知识点 ${item.name} 的详细信息`);
    },
    getProgressColor(mastery) {
      if (mastery >= 80) return '#4CAF50';
      if (mastery >= 60) return '#FFC107';
      return '#F44336';
    }
  }
}
</script>

<style scoped>
.cognitive-diagnosis {
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

.upload-section {
  max-width: 600px;
  margin: 0 auto 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.analyze-btn {
  padding: 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.analyze-btn:hover {
  background-color: #0b7dda;
}

.analyze-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.dashboard-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  margin-left: 120px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #e0e0e0;
}

.data-overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}

.overview-card {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-icon {
  width: 50px;
  height: 50px;
  background-color: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #2196F3;
}

.card-content h3 {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.card-value {
  margin: 5px 0 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.charts-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.chart-placeholder {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  height: 200px;
  gap: 10px;
  width: 100%;
}

.bar {
  flex: 1;
  background-color: #2196F3;
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 5px;
  color: white;
  font-size: 12px;
}

.pie-chart {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 0 auto;
}

.pie-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.pie-segment:nth-child(1) {
  background: conic-gradient(#4CAF50 0deg 162deg, transparent 162deg 360deg);
}

.pie-segment:nth-child(2) {
  background: conic-gradient(transparent 0deg 162deg, #FFC107 162deg 288deg, transparent 288deg 360deg);
}

.pie-segment:nth-child(3) {
  background: conic-gradient(transparent 0deg 288deg, #F44336 288deg 360deg);
}

.pie-segment span {
  position: absolute;
  left: 220px;
  white-space: nowrap;
  font-size: 14px;
  color: #333;
}

.pie-segment:nth-child(1) span {
  top: 40%;
}

.pie-segment:nth-child(2) span {
  top: 60%;
}

.pie-segment:nth-child(3) span {
  top: 80%;
}

.knowledge-list {
  margin-top: 30px;
}

.knowledge-list h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

tr:hover {
  background-color: #f9f9f9;
}

.progress-bar {
  width: 100px;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}

.progress {
  height: 100%;
  border-radius: 4px;
}

.detail-btn {
  padding: 5px 10px;
  background-color: #e3f2fd;
  color: #2196F3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.detail-btn:hover {
  background-color: #bbdefb;
}
</style> 