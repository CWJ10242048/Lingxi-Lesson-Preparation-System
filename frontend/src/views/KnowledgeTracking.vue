<template>
  <div class="knowledge-tracking">
    <header class="header">
      <img class="logo" src="../assets/images/linxilogo.png" alt="lingxiTeach logo">
      <div class="header-buttons">
        <router-link to="/login" class="login-button">登录</router-link>
        <button class="new-conversation"><i class="fas fa-plus"></i> 新对话</button>
      </div>
    </header>

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
        <h1 class="page-title">知识追踪</h1>
        
        <!-- 文件上传区域 -->
        <div class="upload-section">
          <div class="form-group">
            <label>上传学习记录数据</label>
            <div class="file-upload-container">
              <input 
                type="file" 
                id="learningData" 
                ref="learningDataInput"
                @change="handleLearningDataUpload"
                accept=".csv,.xlsx,.xls"
                class="file-input"
              >
              <label for="learningData" class="file-label">
                <i class="fas fa-upload"></i>
                选择学习记录文件
              </label>
              <span class="file-name" v-if="formData.learningData">
                {{ formData.learningData.name }}
              </span>
            </div>
            <div class="upload-status" v-if="uploadStatus">
              {{ uploadStatus }}
            </div>
          </div>

          <button 
            class="analyze-btn"
            @click="startTracking"
            :disabled="isTracking || !formData.learningData"
          >
            {{ isTracking ? '分析中...' : '开始追踪' }}
          </button>
        </div>

        <!-- 追踪结果区域 -->
        <div class="tracking-results" v-if="showResults">
          <div class="results-header">
            <h2>知识追踪结果</h2>
            <div class="action-buttons">
              <button class="action-btn" @click="exportReport">
                <i class="fas fa-download"></i> 导出报告
              </button>
              <button class="action-btn" @click="refreshData">
                <i class="fas fa-sync-alt"></i> 刷新数据
              </button>
            </div>
          </div>

          <!-- 学习进度概览 -->
          <div class="progress-overview">
            <div class="progress-card">
              <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
              <div class="card-content">
                <h3>总学习进度</h3>
                <p class="progress-value">75%</p>
              </div>
            </div>
            <div class="progress-card">
              <div class="card-icon"><i class="fas fa-clock"></i></div>
              <div class="card-content">
                <h3>学习时长</h3>
                <p class="progress-value">32小时</p>
              </div>
            </div>
            <div class="progress-card">
              <div class="card-icon"><i class="fas fa-tasks"></i></div>
              <div class="card-content">
                <h3>已完成任务</h3>
                <p class="progress-value">45/60</p>
              </div>
            </div>
          </div>

          <!-- 知识图谱展示 -->
          <div class="knowledge-map">
            <h3>知识掌握路径图</h3>
            <div class="map-container">
              <div id="knowledgeMap" class="chart"></div>
            </div>
          </div>

          <!-- 学习轨迹分析 -->
          <div class="learning-trajectory">
            <h3>学习轨迹分析</h3>
            <div class="timeline">
              <div class="timeline-item" v-for="(item, index) in learningPath" :key="index">
                <div class="timeline-point" :class="{ 'completed': item.completed }"></div>
                <div class="timeline-content">
                  <h4>{{ item.topic }}</h4>
                  <p>掌握度：{{ item.mastery }}%</p>
                  <p>学习时间：{{ item.timeSpent }}</p>
                  <p>建议：{{ item.suggestion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'KnowledgeTracking',
  mounted() {
    // 初始化图表
    this.$nextTick(() => {
      this.initChart();
    });
  },
  data() {
    return {
      formData: {
        learningData: null
      },
      isTracking: false,
      showResults: false,
      uploadStatus: '',
      myChart: null,
      learningPath: [
        {
          topic: '机器学习基础概念',
          mastery: 90,
          timeSpent: '5小时',
          completed: true,
          suggestion: '可以进入下一阶段学习'
        },
        {
          topic: '监督学习算法',
          mastery: 75,
          timeSpent: '8小时',
          completed: true,
          suggestion: '建议复习决策树算法'
        },
        {
          topic: '深度学习基础',
          mastery: 60,
          timeSpent: '10小时',
          completed: false,
          suggestion: '需要加强神经网络原理的理解'
        },
        {
          topic: '模型评估方法',
          mastery: 45,
          timeSpent: '4小时',
          completed: false,
          suggestion: '建议多做实践练习'
        }
      ]
    }
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('knowledgeMap');
      if (chartDom) {
        this.myChart = window.echarts.init(chartDom);
        
        const option = {
          tooltip: {},
          legend: [{
            data: ['已掌握', '学习中', '未开始']
          }],
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            type: 'graph',
            layout: 'force',
            data: [
              { 
                name: '机器学习基础',
                symbolSize: 60,
                category: 0,
                value: 90,
                itemStyle: { color: '#91cc75' }
              },
              { 
                name: '监督学习',
                symbolSize: 50,
                category: 0,
                value: 85,
                itemStyle: { color: '#91cc75' }
              },
              { 
                name: '无监督学习',
                symbolSize: 50,
                category: 1,
                value: 65,
                itemStyle: { color: '#fac858' }
              },
              { 
                name: '深度学习',
                symbolSize: 50,
                category: 1,
                value: 60,
                itemStyle: { color: '#fac858' }
              },
              { 
                name: '强化学习',
                symbolSize: 45,
                category: 2,
                value: 30,
                itemStyle: { color: '#ee6666' }
              },
              { 
                name: '神经网络',
                symbolSize: 40,
                category: 1,
                value: 55,
                itemStyle: { color: '#fac858' }
              },
              { 
                name: '模型评估',
                symbolSize: 40,
                category: 1,
                value: 45,
                itemStyle: { color: '#fac858' }
              }
            ],
            links: [
              { source: '机器学习基础', target: '监督学习', value: 85 },
              { source: '机器学习基础', target: '无监督学习', value: 65 },
              { source: '机器学习基础', target: '深度学习', value: 60 },
              { source: '深度学习', target: '神经网络', value: 55 },
              { source: '机器学习基础', target: '强化学习', value: 30 },
              { source: '监督学习', target: '模型评估', value: 45 }
            ],
            categories: [
              { name: '已掌握' },
              { name: '学习中' },
              { name: '未开始' }
            ],
            roam: true,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}'
            },
            force: {
              repulsion: 1000,
              edgeLength: [80, 200]
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 4
              }
            }
          }]
        };
        
        this.myChart.setOption(option);
        
        // 监听窗口大小变化，调整图表大小
        window.addEventListener('resize', () => {
          this.myChart.resize();
        });
      }
    },
    handleLearningDataUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.learningData = file;
        this.uploadStatus = `文件 "${file.name}" 上传成功`;
        
        // 3秒后清除上传状态提示
        setTimeout(() => {
          this.uploadStatus = '';
        }, 3000);
      } else {
        this.uploadStatus = '请选择文件';
      }
    },
    async startTracking() {
      if (!this.formData.learningData) {
        this.uploadStatus = '请先上传学习记录数据';
        return;
      }
      
      this.isTracking = true;
      this.uploadStatus = '正在分析数据...';
      
      try {
        // 模拟分析过程
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.showResults = true;
        this.uploadStatus = '分析完成！';
        
        // 如果图表未初始化，则初始化
        if (!this.myChart) {
          this.$nextTick(() => {
            this.initChart();
          });
        }
      } catch (error) {
        console.error('分析失败:', error);
        this.uploadStatus = '分析失败，请重试';
      } finally {
        this.isTracking = false;
      }
    },
    exportReport() {
      alert('报告导出成功！');
    },
    refreshData() {
      alert('数据已刷新！');
    }
  }
});
</script>

<style scoped>
.knowledge-tracking {
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
  background: #FAF0E6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  top: 100px;
  left: 0;
  height: calc(100vh - 80px);
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

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 150px;
  margin-top: -20px;
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
}

.upload-section {
  max-width: 600px;
  margin: 0 auto 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 20px;
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
}

.analyze-btn {
  width: 100%;
  padding: 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.tracking-results {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
}

.progress-overview {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

.progress-card {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
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

.progress-value {
  font-size: 24px;
  font-weight: 700;
  margin: 5px 0 0;
}

.knowledge-map {
  margin-top: 30px;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
}

.map-container {
  height: 500px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.chart {
  height: 100%;
  width: 100%;
}

.placeholder-map {
  display: none;
}

.learning-trajectory {
  margin-top: 30px;
}

.timeline {
  margin-top: 20px;
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-point {
  position: absolute;
  left: -30px;
  width: 20px;
  height: 20px;
  background-color: #e3f2fd;
  border: 2px solid #2196F3;
  border-radius: 50%;
}

.timeline-point.completed {
  background-color: #2196F3;
}

.timeline-content {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.timeline-content h4 {
  margin: 0 0 10px;
  color: #333;
}

.timeline-content p {
  margin: 5px 0;
  color: #666;
}

.upload-status {
  margin-top: 10px;
  color: #2196F3;
  font-weight: 500;
}

.analyze-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 