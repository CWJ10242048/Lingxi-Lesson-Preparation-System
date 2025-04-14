<template>
  <div class="concept-prerequisite">
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
        <h1 class="page-title">概念先决识别</h1>
        
        <!-- 文件上传区域 -->
        <div class="upload-section">
          <h3>上传课程内容</h3>
          <div class="upload-area" @click="triggerFileInput" @drop.prevent="handleFileDrop" @dragover.prevent>
            <input type="file" ref="fileInput" @change="handleFileSelect" style="display: none" multiple>
            <i class="fas fa-cloud-upload-alt"></i>
            <p>点击或拖拽文件到此处上传</p>
            <p class="upload-hint">支持的文件类型：PDF, DOC, DOCX, TXT</p>
          </div>
          <div class="upload-form" v-if="selectedFiles.length > 0">
            <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
              <span>{{ file.name }}</span>
              <div class="file-actions">
                <button @click="removeFile(index)" class="remove-btn">删除</button>
              </div>
            </div>
            <button @click="startAnalysis" class="analyze-btn">开始分析</button>
          </div>
        </div>

        <!-- 分析结果区域 -->
        <div class="analysis-results" v-if="showResults">
          <div class="results-header">
            <h3>分析结果</h3>
            <div class="action-buttons">
              <button @click="exportReport" class="export-btn">
                <i class="fas fa-download"></i> 导出报告
              </button>
              <button @click="refreshData" class="refresh-btn">
                <i class="fas fa-sync-alt"></i> 刷新数据
              </button>
            </div>
          </div>
          
          <!-- 概念关系图 -->
          <div class="concept-graph">
            <h4>概念关系图</h4>
            <div class="graph-container" ref="graphContainer"></div>
          </div>
          
          <!-- 先决概念列表 -->
          <div class="prerequisite-list">
            <h4>先决概念列表</h4>
            <table>
              <thead>
                <tr>
                  <th>概念名称</th>
                  <th>先决概念</th>
                  <th>依赖程度</th>
                  <th>建议学习顺序</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(concept, index) in prerequisiteConcepts" :key="index">
                  <td>{{ concept.name }}</td>
                  <td>{{ concept.prerequisites.join(', ') }}</td>
                  <td>
                    <div class="dependency-bar">
                      <div class="bar-fill" :style="{ width: concept.dependencyLevel + '%' }"></div>
                    </div>
                    <span>{{ concept.dependencyLevel }}%</span>
                  </td>
                  <td>{{ concept.suggestedOrder }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 学习路径建议 -->
          <div class="learning-path">
            <h4>推荐学习路径</h4>
            <div class="path-timeline">
              <div v-for="(step, index) in learningPath" :key="index" class="path-step">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">
                  <h5>{{ step.concept }}</h5>
                  <p>{{ step.description }}</p>
                </div>
                <div class="step-connector" v-if="index < learningPath.length - 1"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConceptPrerequisiteRecognition',
  data() {
    return {
      currentTime: '',
      selectedFiles: [],
      showResults: false,
      prerequisiteConcepts: [
        {
          name: '机器学习基础',
          prerequisites: ['概率论', '线性代数', '微积分'],
          dependencyLevel: 90,
          suggestedOrder: 1
        },
        {
          name: '监督学习',
          prerequisites: ['机器学习基础', '统计推断'],
          dependencyLevel: 85,
          suggestedOrder: 2
        },
        {
          name: '神经网络',
          prerequisites: ['监督学习', '优化算法'],
          dependencyLevel: 75,
          suggestedOrder: 3
        },
        {
          name: '深度学习',
          prerequisites: ['神经网络', '反向传播'],
          dependencyLevel: 80,
          suggestedOrder: 4
        },
        {
          name: '强化学习',
          prerequisites: ['机器学习基础', '动态规划'],
          dependencyLevel: 70,
          suggestedOrder: 5
        }
      ],
      learningPath: [
        {
          concept: '概率论与数理统计',
          description: '掌握概率分布、期望、方差等基础概念'
        },
        {
          concept: '线性代数',
          description: '理解向量、矩阵运算、特征值和特征向量'
        },
        {
          concept: '机器学习基础',
          description: '学习机器学习的基本概念、算法和评估方法'
        },
        {
          concept: '监督学习',
          description: '掌握分类、回归等监督学习方法'
        },
        {
          concept: '神经网络与深度学习',
          description: '学习神经网络结构、训练方法和应用场景'
        }
      ],
      graphChart: null
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
    
    // 初始化图表
    this.$nextTick(() => {
      this.initGraphChart();
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // 移除事件监听
    window.removeEventListener('resize', this.handleResize);
    
    if (this.graphChart) {
      this.graphChart.dispose();
    }
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
    handleResize() {
      if (this.graphChart) {
        this.graphChart.resize();
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      this.selectedFiles = [...this.selectedFiles, ...files];
    },
    handleFileDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      this.selectedFiles = [...this.selectedFiles, ...files];
    },
    removeFile(index) {
      this.selectedFiles.splice(index, 1);
    },
    startAnalysis() {
      // 模拟分析过程
      setTimeout(() => {
        this.showResults = true;
        this.$nextTick(() => {
          this.updateGraphChart();
        });
      }, 1500);
    },
    exportReport() {
      alert('报告导出功能即将上线');
    },
    refreshData() {
      alert('数据刷新功能即将上线');
    },
    initGraphChart() {
      if (this.$refs.graphContainer) {
        console.log('图表容器已找到，开始初始化图表');
        
        // 确保容器有尺寸
        this.$refs.graphContainer.style.height = '400px';
        this.$refs.graphContainer.style.width = '100%';
        
        try {
          // 初始化图表
          this.graphChart = window.echarts.init(this.$refs.graphContainer);
          console.log('图表初始化成功');
          
          // 设置响应式
          window.addEventListener('resize', () => {
            this.graphChart.resize();
          });
          
          this.updateGraphChart();
        } catch (error) {
          console.error('图表初始化失败:', error);
        }
      } else {
        console.error('图表容器未找到');
      }
    },
    updateGraphChart() {
      if (!this.graphChart) return;
      
      const option = {
        backgroundColor: '#fff',
        title: {
          text: '概念依赖关系图',
          subtext: '展示知识点之间的先决关系',
          left: 'center',
          top: 10,
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.dataType === 'edge') {
              return `${params.data.source} → ${params.data.target}`;
            }
            return `${params.name}<br/>重要性: ${params.value}`;
          }
        },
        legend: {
          data: ['核心概念', '先决概念', '后续概念'],
          orient: 'vertical',
          left: 'left',
          top: 'middle'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 200,
            edgeLength: 150,
            gravity: 0.1
          },
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontSize: 14,
            color: '#333'
          },
          data: [
            { name: '机器学习基础', value: 20, category: 0, symbolSize: 50 },
            { name: '概率论', value: 15, category: 1, symbolSize: 40 },
            { name: '线性代数', value: 15, category: 1, symbolSize: 40 },
            { name: '微积分', value: 15, category: 1, symbolSize: 40 },
            { name: '监督学习', value: 18, category: 2, symbolSize: 45 },
            { name: '神经网络', value: 16, category: 2, symbolSize: 42 },
            { name: '深度学习', value: 17, category: 2, symbolSize: 44 },
            { name: '强化学习', value: 16, category: 2, symbolSize: 42 }
          ],
          categories: [
            { name: '核心概念' },
            { name: '先决概念' },
            { name: '后续概念' }
          ],
          edges: [
            { source: '机器学习基础', target: '监督学习', value: 0.8 },
            { source: '机器学习基础', target: '神经网络', value: 0.8 },
            { source: '机器学习基础', target: '深度学习', value: 0.8 },
            { source: '机器学习基础', target: '强化学习', value: 0.8 },
            { source: '概率论', target: '机器学习基础', value: 0.9 },
            { source: '线性代数', target: '机器学习基础', value: 0.9 },
            { source: '微积分', target: '机器学习基础', value: 0.9 },
            { source: '神经网络', target: '深度学习', value: 0.7 }
          ],
          lineStyle: {
            color: '#999',
            curveness: 0.3,
            width: 2
          },
          itemStyle: {
            opacity: 0.8,
            borderColor: '#fff',
            borderWidth: 2
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 4
            }
          }
        }]
      };
      
      this.graphChart.setOption(option);
    },
    navigateToPersonalCenter() {
      // Implement the logic to navigate to the personal center
      console.log('Navigating to personal center');
    }
  }
}
</script>

<style scoped>
.concept-prerequisite {
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

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 300px;
  margin-top: 60px;
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
}

.upload-section {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.upload-area {
  border: 2px dashed #BFAE9F;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-area:hover {
  background-color: rgba(191, 174, 159, 0.1);
}

.upload-area i {
  font-size: 48px;
  color: #BFAE9F;
  margin-bottom: 15px;
}

.upload-hint {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}

.upload-form {
  margin-top: 20px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 10px;
}

.remove-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.analyze-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
}

.analysis-results {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.export-btn, .refresh-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.export-btn {
  background-color: #4CAF50;
  color: white;
}

.refresh-btn {
  background-color: #2196F3;
  color: white;
}

.concept-graph {
  margin-bottom: 30px;
}

.graph-container {
  height: 400px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.prerequisite-list {
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.dependency-bar {
  width: 100px;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.bar-fill {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 4px;
}

.learning-path {
  margin-top: 30px;
}

.path-timeline {
  position: relative;
  padding: 20px 0;
}

.path-step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.step-content h5 {
  margin: 0 0 5px 0;
  color: #333;
}

.step-content p {
  margin: 0;
  color: #666;
}

.step-connector {
  position: absolute;
  left: 15px;
  top: 30px;
  bottom: -20px;
  width: 2px;
  background-color: #ddd;
}
</style> 