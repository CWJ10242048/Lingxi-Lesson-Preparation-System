<template>
  <div class="student-data-dashboard">
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
        <h1 class="page-title">学生数据看板</h1>
        
        <!-- 文件上传区域 -->
        <div class="upload-section">
          <div class="form-group">
            <label>上传学生答题数据</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                id="studentData" 
                ref="studentDataInput"
                @change="handleFileUpload"
                accept=".csv,.xlsx,.xls"
                class="file-input"
              >
              <label for="studentData" class="file-label">
                <i class="fas fa-upload"></i>
                选择文件
              </label>
              <span class="file-name" v-if="formData.studentData">
                {{ formData.studentData.name }}
              </span>
            </div>
          </div>
          <button 
            class="analyze-btn"
            @click="analyzeData"
            :disabled="isAnalyzing"
          >
            {{ isAnalyzing ? '分析中...' : '分析数据' }}
          </button>
        </div>

        <!-- 数据可视化区域 -->
        <div class="dashboard-container" v-if="showDashboard">
          <div class="dashboard-header">
            <h2>数据分析结果</h2>
            <div class="dashboard-actions">
              <button class="action-btn" @click="exportReport">
                <i class="fas fa-download"></i> 导出报告
              </button>
              <button class="action-btn" @click="refreshData">
                <i class="fas fa-sync-alt"></i> 刷新数据
              </button>
            </div>
          </div>

          <!-- 数据概览卡片 -->
          <div class="data-overview">
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-users"></i></div>
              <div class="card-content">
                <h3>总学生数</h3>
                <p class="card-value">42</p>
              </div>
            </div>
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-chart-line"></i></div>
              <div class="card-content">
                <h3>平均分</h3>
                <p class="card-value">78.5</p>
              </div>
            </div>
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-trophy"></i></div>
              <div class="card-content">
                <h3>最高分</h3>
                <p class="card-value">95</p>
              </div>
            </div>
            <div class="overview-card">
              <div class="card-icon"><i class="fas fa-exclamation-triangle"></i></div>
              <div class="card-content">
                <h3>最低分</h3>
                <p class="card-value">45</p>
              </div>
            </div>
          </div>

          <!-- 图表区域 -->
          <div class="charts-container">
            <div class="chart-card">
              <h3>成绩分布</h3>
              <div class="chart-placeholder">
                <div class="bar-chart">
                  <div class="bar" style="height: 30%;"><span>60分以下</span><span>5人</span></div>
                  <div class="bar" style="height: 45%;"><span>60-70分</span><span>8人</span></div>
                  <div class="bar" style="height: 70%;"><span>70-80分</span><span>12人</span></div>
                  <div class="bar" style="height: 85%;"><span>80-90分</span><span>15人</span></div>
                  <div class="bar" style="height: 40%;"><span>90分以上</span><span>2人</span></div>
                </div>
              </div>
            </div>
            <div class="chart-card">
              <h3>知识点掌握情况</h3>
              <div class="chart-placeholder">
                <div class="pie-chart">
                  <div class="pie-segment">
                    <span>掌握良好 (65%)</span>
                  </div>
                  <div class="pie-segment">
                    <span>部分掌握 (25%)</span>
                  </div>
                  <div class="pie-segment">
                    <span>需要加强 (10%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 学生列表 -->
          <div class="student-list">
            <h3>学生成绩详情</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>成绩</th>
                    <th>排名</th>
                    <th>知识点掌握</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(student, index) in studentList" :key="index">
                    <td>{{ student.id }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.score }}</td>
                    <td>{{ student.rank }}</td>
                    <td>
                      <div class="progress-bar">
                        <div class="progress" :style="{ width: student.mastery + '%' }"></div>
                      </div>
                      <span>{{ student.mastery }}%</span>
                    </td>
                    <td>
                      <button class="detail-btn" @click="viewStudentDetail(student)">详情</button>
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
  name: 'StudentDataDashboard',
  data() {
    return {
      formData: {
        studentData: null
      },
      isAnalyzing: false,
      showDashboard: false,
      studentList: [
        { id: '2021001', name: '张三', score: 85, rank: 5, mastery: 80 },
        { id: '2021002', name: '李四', score: 92, rank: 2, mastery: 90 },
        { id: '2021003', name: '王五', score: 78, rank: 8, mastery: 70 },
        { id: '2021004', name: '赵六', score: 65, rank: 15, mastery: 60 },
        { id: '2021005', name: '钱七', score: 88, rank: 4, mastery: 85 },
        { id: '2021006', name: '孙八', score: 95, rank: 1, mastery: 95 },
        { id: '2021007', name: '周九', score: 72, rank: 10, mastery: 65 },
        { id: '2021008', name: '吴十', score: 81, rank: 6, mastery: 75 },
        { id: '2021009', name: '郑十一', score: 69, rank: 12, mastery: 62 },
        { id: '2021010', name: '王十二', score: 45, rank: 20, mastery: 40 }
      ]
    }
  },
  methods: {
    handleFileUpload(event) {
      this.formData.studentData = event.target.files[0];
    },
    async analyzeData() {
      if (!this.formData.studentData) {
        alert('请先上传学生数据文件');
        return;
      }
      
      this.isAnalyzing = true;
      try {
        // 模拟分析过程
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.showDashboard = true;
        alert('数据分析完成！');
      } catch (error) {
        console.error('分析失败:', error);
        alert('分析失败，请重试');
      } finally {
        this.isAnalyzing = false;
      }
    },
    exportReport() {
      alert('报告导出成功！');
    },
    refreshData() {
      alert('数据已刷新！');
    },
    viewStudentDetail(student) {
      alert(`查看学生 ${student.name} 的详细信息`);
    }
  }
}
</script>

<style scoped>
.student-data-dashboard {
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
  margin-top: 50px;
  padding-bottom: 50px;
}

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
  background: conic-gradient(#4CAF50 0deg 234deg, transparent 234deg 360deg);
}

.pie-segment:nth-child(2) {
  background: conic-gradient(transparent 0deg 234deg, #FFC107 234deg 324deg, transparent 324deg 360deg);
}

.pie-segment:nth-child(3) {
  background: conic-gradient(transparent 0deg 324deg, #F44336 324deg 360deg);
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

.student-list {
  margin-top: 30px;
}

.student-list h3 {
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
  background-color: #4CAF50;
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