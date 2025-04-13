<template>
  <div class="resource-community">
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
        <h1 class="page-title">资源社区</h1>
        
        <!-- 资源上传区域 -->
        <div class="upload-section">
          <h3>上传资源</h3>
          <div class="upload-area" @click="triggerFileInput" @drop.prevent="handleFileDrop" @dragover.prevent>
            <input type="file" ref="fileInput" @change="handleFileSelect" style="display: none" multiple>
            <i class="fas fa-cloud-upload-alt"></i>
            <p>点击或拖拽文件到此处上传</p>
            <p class="upload-hint">支持的文件类型：PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX</p>
          </div>
          <div class="upload-form" v-if="selectedFiles.length > 0">
            <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
              <span>{{ file.name }}</span>
              <div class="file-actions">
                <button @click="removeFile(index)" class="remove-btn">删除</button>
              </div>
            </div>
            <div class="form-group">
              <label>资源类型</label>
              <select v-model="resourceType">
                <option value="lesson_plan">教案</option>
                <option value="courseware">课件</option>
                <option value="exercise">习题</option>
                <option value="material">教学材料</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div class="form-group">
              <label>资源描述</label>
              <textarea v-model="resourceDescription" placeholder="请简要描述资源内容..."></textarea>
            </div>
            <button @click="uploadResources" class="upload-btn">上传</button>
          </div>
        </div>

        <!-- 资源列表区域 -->
        <div class="resource-list">
          <div class="list-header">
            <h3>优质资源</h3>
            <div class="filter-section">
              <select v-model="filterType" @change="filterResources">
                <option value="all">全部类型</option>
                <option value="lesson_plan">教案</option>
                <option value="courseware">课件</option>
                <option value="exercise">习题</option>
                <option value="material">教学材料</option>
                <option value="other">其他</option>
              </select>
              <input type="text" v-model="searchQuery" @input="searchResources" placeholder="搜索资源...">
            </div>
          </div>
          
          <div class="resources-grid">
            <div v-for="resource in filteredResources" :key="resource.id" class="resource-card">
              <div class="resource-icon">
                <i :class="getFileIcon(resource.type)"></i>
              </div>
              <div class="resource-info">
                <h4>{{ resource.name }}</h4>
                <p class="resource-type">{{ getResourceTypeName(resource.type) }}</p>
                <p class="resource-desc">{{ resource.description }}</p>
                <div class="resource-meta">
                  <span><i class="fas fa-download"></i> {{ resource.downloads }}</span>
                  <span><i class="fas fa-star"></i> {{ resource.rating }}</span>
                </div>
              </div>
              <div class="resource-actions">
                <button @click="downloadResource(resource)" class="download-btn">
                  <i class="fas fa-download"></i> 下载
                </button>
                <button @click="previewResource(resource)" class="preview-btn">
                  <i class="fas fa-eye"></i> 预览
                </button>
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
  name: 'ResourceCommunity',
  data() {
    return {
      selectedFiles: [],
      resourceType: 'lesson_plan',
      resourceDescription: '',
      filterType: 'all',
      searchQuery: '',
      resources: [
        {
          id: 1,
          name: '高等数学第一章教案',
          type: 'lesson_plan',
          description: '包含教学目标、重难点分析、教学过程等完整教案内容',
          downloads: 156,
          rating: 4.8
        },
        {
          id: 2,
          name: 'Python编程基础课件',
          type: 'courseware',
          description: 'Python语言基础入门课件，包含代码示例和练习题',
          downloads: 243,
          rating: 4.9
        },
        {
          id: 3,
          name: '数据结构与算法习题集',
          type: 'exercise',
          description: '包含常见数据结构和算法的练习题及解答',
          downloads: 189,
          rating: 4.7
        },
        {
          id: 4,
          name: '机器学习实验指导书',
          type: 'material',
          description: '机器学习课程实验指导材料，包含详细步骤和代码',
          downloads: 312,
          rating: 4.9
        }
      ]
    }
  },
  computed: {
    filteredResources() {
      return this.resources.filter(resource => {
        const typeMatch = this.filterType === 'all' || resource.type === this.filterType;
        const searchMatch = resource.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        return typeMatch && searchMatch;
      });
    }
  },
  methods: {
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
    uploadResources() {
      // 这里添加实际的上传逻辑
      console.log('上传资源:', {
        files: this.selectedFiles,
        type: this.resourceType,
        description: this.resourceDescription
      });
      // 上传成功后清空表单
      this.selectedFiles = [];
      this.resourceDescription = '';
      alert('资源上传成功！');
    },
    filterResources() {
      // 过滤逻辑已在计算属性中实现
    },
    searchResources() {
      // 搜索逻辑已在计算属性中实现
    },
    downloadResource(resource) {
      // 这里添加实际的下载逻辑
      console.log('下载资源:', resource);
      alert(`开始下载: ${resource.name}`);
    },
    previewResource(resource) {
      // 这里添加实际的预览逻辑
      console.log('预览资源:', resource);
      alert(`预览资源: ${resource.name}`);
    },
    getFileIcon(type) {
      const icons = {
        lesson_plan: 'fas fa-book',
        courseware: 'fas fa-file-powerpoint',
        exercise: 'fas fa-tasks',
        material: 'fas fa-file-alt',
        other: 'fas fa-file'
      };
      return icons[type] || icons.other;
    },
    getResourceTypeName(type) {
      const types = {
        lesson_plan: '教案',
        courseware: '课件',
        exercise: '习题',
        material: '教学材料',
        other: '其他'
      };
      return types[type] || '其他';
    }
  }
}
</script>

<style scoped>
.resource-community {
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group select, .form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.upload-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.resource-list {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-section {
  display: flex;
  gap: 10px;
}

.filter-section select, .filter-section input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.resource-card {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.resource-icon {
  font-size: 24px;
  color: #BFAE9F;
  margin-bottom: 10px;
}

.resource-info h4 {
  margin: 0 0 5px 0;
  color: #333;
}

.resource-type {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.resource-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.resource-meta {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.resource-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.download-btn, .preview-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.download-btn {
  background-color: #4CAF50;
  color: white;
}

.preview-btn {
  background-color: #2196F3;
  color: white;
}
</style> 