<template>
  <div class="knowledge-graph">
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
        <h1 class="page-title">知识图谱</h1>
        
        <!-- 知识图谱选择区域 -->
        <div class="knowledge-map-selection">
          <h3>知识图谱选择</h3>
          <div class="map-selector">
            <select v-model="selectedMapType" @change="updateKnowledgeMap">
              <option value="professional">专业维度知识图谱</option>
              <option value="discipline">学科维度知识图谱</option>
              <option value="technology">技术维度知识图谱</option>
              <option value="curriculum">课程体系知识图谱</option>
              <option value="capability">能力维度知识图谱</option>
              <option value="career">职业发展知识图谱</option>
              <option value="project">项目实践知识图谱</option>
              <option value="interdisciplinary">跨学科知识图谱</option>
            </select>
            
            <select v-if="selectedMapType === 'professional'" v-model="selectedProfessional" @change="updateKnowledgeMap">
              <option value="ai">人工智能专业</option>
              <option value="software">软件工程专业</option>
              <option value="network">网络工程专业</option>
              <option value="data">数据科学专业</option>
              <option value="cs">计算机科学与技术专业</option>
            </select>
            
            <select v-if="selectedMapType === 'discipline'" v-model="selectedDiscipline" @change="updateKnowledgeMap">
              <option value="algorithm">算法学科</option>
              <option value="datastructure">数据结构学科</option>
              <option value="machinelearning">机器学习学科</option>
              <option value="os">操作系统学科</option>
              <option value="database">数据库学科</option>
              <option value="programming">编程语言学科</option>
            </select>
            
            <select v-if="selectedMapType === 'technology'" v-model="selectedTechnology" @change="updateKnowledgeMap">
              <option value="language">编程语言技术图谱</option>
              <option value="tools">开发工具技术图谱</option>
              <option value="framework">框架与平台技术图谱</option>
            </select>
            
            <select v-if="selectedMapType === 'curriculum'" v-model="selectedCurriculum" @change="updateKnowledgeMap">
              <option value="basic">基础课程</option>
              <option value="core">核心课程</option>
              <option value="elective">选修课程</option>
            </select>
            
            <select v-if="selectedMapType === 'capability'" v-model="selectedCapability" @change="updateKnowledgeMap">
              <option value="programming">编程能力</option>
              <option value="problem">问题解决能力</option>
              <option value="engineering">工程能力</option>
              <option value="academic">学术研究能力</option>
            </select>
            
            <select v-if="selectedMapType === 'career'" v-model="selectedCareer" @change="updateKnowledgeMap">
              <option value="developer">软件开发工程师</option>
              <option value="analyst">数据分析师</option>
              <option value="security">网络安全工程师</option>
              <option value="ai">人工智能工程师</option>
            </select>
            
            <select v-if="selectedMapType === 'project'" v-model="selectedProject" @change="updateKnowledgeMap">
              <option value="process">项目开发流程</option>
              <option value="management">项目管理</option>
              <option value="tools">开发工具和平台</option>
            </select>
            
            <select v-if="selectedMapType === 'interdisciplinary'" v-model="selectedInterdisciplinary" @change="updateKnowledgeMap">
              <option value="math">计算机与数学的交叉</option>
              <option value="biology">计算机与生物学的交叉</option>
              <option value="psychology">计算机与心理学的交叉</option>
            </select>
          </div>
        </div>

        <!-- 知识图谱展示 -->
        <div class="knowledge-map">
          <h3>知识图谱展示</h3>
          <div class="map-container">
            <div id="knowledgeMap" class="chart"></div>
          </div>
        </div>

        <!-- 知识详情 -->
        <div class="knowledge-details" v-if="selectedNode">
          <h3>知识详情</h3>
          <div class="details-content">
            <h4>{{ selectedNode.name }}</h4>
            <p>掌握度：{{ selectedNode.value }}%</p>
            <p>相关知识点：{{ selectedNode.relatedNodes ? selectedNode.relatedNodes.length : 0 }}个</p>
            <div class="related-nodes" v-if="selectedNode.relatedNodes && selectedNode.relatedNodes.length > 0">
              <h5>相关知识点列表：</h5>
              <ul>
                <li v-for="(node, index) in selectedNode.relatedNodes" :key="index">
                  {{ node.name }} (关联度: {{ node.value }}%)
                </li>
              </ul>
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
  name: 'KnowledgeGraph',
  mounted() {
    // 初始化图表
    this.$nextTick(() => {
      this.initChart();
    });
  },
  data() {
    return {
      myChart: null,
      selectedMapType: 'professional',
      selectedProfessional: 'ai',
      selectedDiscipline: 'algorithm',
      selectedTechnology: 'language',
      selectedCurriculum: 'basic',
      selectedCapability: 'programming',
      selectedCareer: 'developer',
      selectedProject: 'process',
      selectedInterdisciplinary: 'math',
      selectedNode: null
    }
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('knowledgeMap');
      if (chartDom) {
        this.myChart = window.echarts.init(chartDom);
        this.updateKnowledgeMap();
        
        // 监听窗口大小变化，调整图表大小
        window.addEventListener('resize', () => {
          this.myChart.resize();
        });
        
        // 添加点击事件监听
        this.myChart.on('click', (params) => {
          if (params.dataType === 'node') {
            this.handleNodeClick(params.data);
          }
        });
      }
    },
    updateKnowledgeMap() {
      if (!this.myChart) return;
      
      let option;
      
      switch(this.selectedMapType) {
        case 'professional':
          option = this.getProfessionalMapOption();
          break;
        case 'discipline':
          option = this.getDisciplineMapOption();
          break;
        case 'technology':
          option = this.getTechnologyMapOption();
          break;
        case 'curriculum':
          option = this.getCurriculumMapOption();
          break;
        case 'capability':
          option = this.getCapabilityMapOption();
          break;
        case 'career':
          option = this.getCareerMapOption();
          break;
        case 'project':
          option = this.getProjectMapOption();
          break;
        case 'interdisciplinary':
          option = this.getInterdisciplinaryMapOption();
          break;
        default:
          option = this.getDefaultMapOption();
      }
      
      this.myChart.setOption(option);
    },
    handleNodeClick(node) {
      // 获取相关节点
      const links = this.myChart.getOption().series[0].links;
      const relatedNodes = links
        .filter(link => link.source === node.name || link.target === node.name)
        .map(link => {
          const relatedNodeName = link.source === node.name ? link.target : link.source;
          const relatedNode = this.myChart.getOption().series[0].data.find(n => n.name === relatedNodeName);
          return {
            name: relatedNodeName,
            value: link.value
          };
        });
      
      this.selectedNode = {
        ...node,
        relatedNodes
      };
    },
    getProfessionalMapOption() {
      let data = [];
      let links = [];
      
      switch(this.selectedProfessional) {
        case 'ai':
          data = [
            { name: '人工智能', symbolSize: 70, category: 0, value: 90, itemStyle: { color: '#91cc75' } },
            { name: '机器学习', symbolSize: 60, category: 0, value: 85, itemStyle: { color: '#91cc75' } },
            { name: '深度学习', symbolSize: 60, category: 1, value: 65, itemStyle: { color: '#fac858' } },
            { name: '计算机视觉', symbolSize: 50, category: 1, value: 60, itemStyle: { color: '#fac858' } },
            { name: '自然语言处理', symbolSize: 50, category: 1, value: 55, itemStyle: { color: '#fac858' } },
            { name: '强化学习', symbolSize: 45, category: 2, value: 30, itemStyle: { color: '#ee6666' } },
            { name: '知识图谱', symbolSize: 40, category: 2, value: 25, itemStyle: { color: '#ee6666' } }
          ];
          links = [
            { source: '人工智能', target: '机器学习', value: 85 },
            { source: '人工智能', target: '深度学习', value: 65 },
            { source: '人工智能', target: '计算机视觉', value: 60 },
            { source: '人工智能', target: '自然语言处理', value: 55 },
            { source: '机器学习', target: '深度学习', value: 70 },
            { source: '机器学习', target: '强化学习', value: 30 },
            { source: '深度学习', target: '计算机视觉', value: 75 },
            { source: '深度学习', target: '自然语言处理', value: 70 },
            { source: '深度学习', target: '知识图谱', value: 25 }
          ];
          break;
        case 'software':
          data = [
            { name: '软件工程', symbolSize: 70, category: 0, value: 90, itemStyle: { color: '#91cc75' } },
            { name: '软件开发方法', symbolSize: 60, category: 0, value: 85, itemStyle: { color: '#91cc75' } },
            { name: '软件架构', symbolSize: 60, category: 1, value: 65, itemStyle: { color: '#fac858' } },
            { name: '项目管理', symbolSize: 50, category: 1, value: 60, itemStyle: { color: '#fac858' } },
            { name: '软件测试', symbolSize: 50, category: 1, value: 55, itemStyle: { color: '#fac858' } },
            { name: '需求工程', symbolSize: 45, category: 2, value: 30, itemStyle: { color: '#ee6666' } },
            { name: '软件质量保证', symbolSize: 40, category: 2, value: 25, itemStyle: { color: '#ee6666' } }
          ];
          links = [
            { source: '软件工程', target: '软件开发方法', value: 85 },
            { source: '软件工程', target: '软件架构', value: 65 },
            { source: '软件工程', target: '项目管理', value: 60 },
            { source: '软件工程', target: '软件测试', value: 55 },
            { source: '软件开发方法', target: '需求工程', value: 30 },
            { source: '软件架构', target: '软件质量保证', value: 25 },
            { source: '项目管理', target: '软件测试', value: 70 }
          ];
          break;
        // 其他专业类似...
        default:
          data = this.getDefaultMapData();
          links = this.getDefaultMapLinks();
      }
      
      return {
        tooltip: {
          formatter: function(params) {
            if (params.dataType === 'node') {
              return `${params.name}<br/>掌握度: ${params.value}%`;
            } else {
              return `${params.data.source} → ${params.data.target}<br/>关联度: ${params.data.value}%`;
            }
          }
        },
        legend: [{
          data: ['已掌握', '学习中', '未开始']
        }],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          data: data,
          links: links,
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
    },
    getDisciplineMapOption() {
      let data = [];
      let links = [];
      
      switch(this.selectedDiscipline) {
        case 'algorithm':
          data = [
            { name: '算法基础', symbolSize: 70, category: 0, value: 90, itemStyle: { color: '#91cc75' } },
            { name: '排序算法', symbolSize: 60, category: 0, value: 85, itemStyle: { color: '#91cc75' } },
            { name: '搜索算法', symbolSize: 60, category: 1, value: 65, itemStyle: { color: '#fac858' } },
            { name: '图算法', symbolSize: 50, category: 1, value: 60, itemStyle: { color: '#fac858' } },
            { name: '动态规划', symbolSize: 50, category: 1, value: 55, itemStyle: { color: '#fac858' } },
            { name: '贪心算法', symbolSize: 45, category: 2, value: 30, itemStyle: { color: '#ee6666' } },
            { name: '分治算法', symbolSize: 40, category: 2, value: 25, itemStyle: { color: '#ee6666' } }
          ];
          links = [
            { source: '算法基础', target: '排序算法', value: 85 },
            { source: '算法基础', target: '搜索算法', value: 65 },
            { source: '算法基础', target: '图算法', value: 60 },
            { source: '算法基础', target: '动态规划', value: 55 },
            { source: '排序算法', target: '贪心算法', value: 30 },
            { source: '搜索算法', target: '分治算法', value: 25 },
            { source: '图算法', target: '动态规划', value: 70 }
          ];
          break;
        case 'machinelearning':
          data = [
            { name: '机器学习基础', symbolSize: 70, category: 0, value: 90, itemStyle: { color: '#91cc75' } },
            { name: '监督学习', symbolSize: 60, category: 0, value: 85, itemStyle: { color: '#91cc75' } },
            { name: '无监督学习', symbolSize: 60, category: 1, value: 65, itemStyle: { color: '#fac858' } },
            { name: '深度学习', symbolSize: 50, category: 1, value: 60, itemStyle: { color: '#fac858' } },
            { name: '神经网络', symbolSize: 50, category: 1, value: 55, itemStyle: { color: '#fac858' } },
            { name: '强化学习', symbolSize: 45, category: 2, value: 30, itemStyle: { color: '#ee6666' } },
            { name: '模型评估', symbolSize: 40, category: 2, value: 25, itemStyle: { color: '#ee6666' } }
          ];
          links = [
            { source: '机器学习基础', target: '监督学习', value: 85 },
            { source: '机器学习基础', target: '无监督学习', value: 65 },
            { source: '机器学习基础', target: '深度学习', value: 60 },
            { source: '深度学习', target: '神经网络', value: 55 },
            { source: '机器学习基础', target: '强化学习', value: 30 },
            { source: '监督学习', target: '模型评估', value: 45 }
          ];
          break;
        // 其他学科类似...
        default:
          data = this.getDefaultMapData();
          links = this.getDefaultMapLinks();
      }
      
      return {
        tooltip: {
          formatter: function(params) {
            if (params.dataType === 'node') {
              return `${params.name}<br/>掌握度: ${params.value}%`;
            } else {
              return `${params.data.source} → ${params.data.target}<br/>关联度: ${params.data.value}%`;
            }
          }
        },
        legend: [{
          data: ['已掌握', '学习中', '未开始']
        }],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          data: data,
          links: links,
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
    },
    getTechnologyMapOption() {
      // 类似实现技术维度的知识图谱
      return this.getDefaultMapOption();
    },
    getCurriculumMapOption() {
      // 类似实现课程体系的知识图谱
      return this.getDefaultMapOption();
    },
    getCapabilityMapOption() {
      // 类似实现能力维度的知识图谱
      return this.getDefaultMapOption();
    },
    getCareerMapOption() {
      // 类似实现职业发展的知识图谱
      return this.getDefaultMapOption();
    },
    getProjectMapOption() {
      // 类似实现项目实践的知识图谱
      return this.getDefaultMapOption();
    },
    getInterdisciplinaryMapOption() {
      // 类似实现跨学科的知识图谱
      return this.getDefaultMapOption();
    },
    getDefaultMapOption() {
      return {
        tooltip: {
          formatter: function(params) {
            if (params.dataType === 'node') {
              return `${params.name}<br/>掌握度: ${params.value}%`;
            } else {
              return `${params.data.source} → ${params.data.target}<br/>关联度: ${params.data.value}%`;
            }
          }
        },
        legend: [{
          data: ['已掌握', '学习中', '未开始']
        }],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          data: this.getDefaultMapData(),
          links: this.getDefaultMapLinks(),
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
    },
    getDefaultMapData() {
      return [
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
      ];
    },
    getDefaultMapLinks() {
      return [
        { source: '机器学习基础', target: '监督学习', value: 85 },
        { source: '机器学习基础', target: '无监督学习', value: 65 },
        { source: '机器学习基础', target: '深度学习', value: 60 },
        { source: '深度学习', target: '神经网络', value: 55 },
        { source: '机器学习基础', target: '强化学习', value: 30 },
        { source: '监督学习', target: '模型评估', value: 45 }
      ];
    }
  }
});
</script>

<style scoped>
.knowledge-graph {
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

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 150px;
  margin-top: 60px;
}

.page-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
}

.knowledge-map-selection {
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.map-selector {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.map-selector select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  min-width: 200px;
}

.knowledge-map {
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
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

.knowledge-details {
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.details-content {
  padding: 15px;
}

.details-content h4 {
  margin-top: 0;
  color: #333;
}

.related-nodes {
  margin-top: 15px;
}

.related-nodes h5 {
  margin-bottom: 10px;
  color: #555;
}

.related-nodes ul {
  padding-left: 20px;
}

.related-nodes li {
  margin-bottom: 5px;
  color: #666;
}
</style> 