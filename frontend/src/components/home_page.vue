<template>
  <div>
    <!-- 主界面 -->
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
      <div class="main-content">
        <div class="main-row">
          <div class="main-block">
            <h2>教学助手</h2>
            <div class="sub-functions">
              <div class="function-button" @click="openLessonPlanModal">
                <i class="fas fa-book" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/document-folder.svg" alt="教案生成" width="24" height="24">
                教案生成
              </div>
              <div class="function-button">
                <i class="fas fa-lightbulb" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/every-user.svg" alt="灯泡图标" width="24" height="24">
                互动环节设计
              </div>
            </div>
          </div>
          <div class="main-block">
            <h2>备课中心</h2>
            <div class="sub-functions">
              <div class="function-button" @click="openPPTGenerateModal">
                <i class="fas fa-file-powerpoint" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/ppt.svg" alt="幻灯片带文字的图标" width="24" height="24">
                PPT生成
              </div>
              <div class="function-button">
                <i class="fas fa-image" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/picture.svg" alt="相机图标" width="24" height="24">
                图文生成
              </div>
              <div class="function-button">
                <i class="fas fa-question-circle" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/view-grid-detail.svg" alt="一叠纸的图标" width="24" height="24">
                <router-link to="/index" >智能出题</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="main-row">
          <div class="main-block">
            <h2>学情分析</h2>
            <div class="sub-functions">
              <div class="function-button">
                <i class="fas fa-chart-bar" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/data-file.svg" alt="带图表的人的图标" width="24" height="24">
                学生数据看板
              </div>
              <div class="function-button">
                <i class="fas fa-eye" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/woman.svg" alt="眼睛图标" width="24" height="24">
                认知诊断
              </div>
            </div>
          </div>
          <div class="main-block">
            <h2>资源库</h2>
            <div class="sub-functions">
              <div class="function-button">
                <i class="fas fa-project-diagram" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/mind-mapping.svg" alt="带线的三角形图标" width="24" height="24">
                知识图谱
              </div>
              <div class="function-button">
                <i class="fas fa-users" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/message-search.svg" alt="三个人的图标（不同）" width="24" height="24">
                资源社区
              </div>
              <div class="function-button">
                <i class="fas fa-heart" style="color: #2196F3;"></i>
                <img src="https://birdflock.unipus.cn/static/aigc/find/icon/helpcenter.svg" alt="带眼睛的心形图标" width="24" height="24">
                敬请期待
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <input type="text" class="input-field" placeholder="输入...">
      <div class="input-icons">
        <i class="fas fa-paperclip"></i>
        <i class="fas fa-arrow-right"></i>
      </div>
    </div>
    <!-- 教案生成浮层 -->
    <div class="modal-overlay" :style="{ display: showLessonPlanModal ? 'flex' : 'none' }" id="lessonPlanModal">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">教学方案</div>
          <div class="modal-close" @click="closeLessonPlanModal">&times;</div>
        </div>
        <div class="modal-content">
          <div class="form-container">
            <p class="subtitle">智能生成一份教案</p>
            <form id="teachingPlanForm">
              <div class="form-group">
                <label for="courseName" class="required">课程名称</label>
                <input type="text" id="courseName" name="courseName" placeholder="请输入" required>
              </div>
              <div class="form-group">
                <label for="totalHours" class="required">总学时</label>
                <input type="number" id="totalHours" name="totalHours" placeholder="请输入" required>
              </div>
              <div class="form-group">
                <label for="major" class="required">适用专业</label>
                <input type="text" id="major" name="major" placeholder="请输入" required>
              </div>
              <div class="form-group">
                <label for="courseType" class="required">课程性质</label>
                <select id="courseType" name="courseType" required>
                  <option value="" disabled selected>请选择</option>
                  <option value="必修课">必修课</option>
                  <option value="选修课">选修课</option>
                  <option value="公共课">公共课</option>
                  <option value="专业课">专业课</option>
                  <option value="实践课">实践课</option>
                </select>
              </div>
              <div class="form-group">
                <label for="textbook">参考教材</label>
                <input type="file" id="textbook" name="textbook" class="file-upload">
                <span id="fileStatus">未选择文件</span>
              </div>
              <div class="form-group">
                <label for="requirements">其他要求</label>
                <textarea id="requirements" name="requirements" rows="3" placeholder="请输入"></textarea>
              </div>
              <button type="submit" class="generate-btn">生成</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- PPT 生成浮层 -->
    <div class="modal-overlay" :style="{ display: showPPTGenerateModal ? 'flex' : 'none' }" id="pptGenerateModal">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">PPT 生成</div>
          <div class="modal-close" @click="closePPTGenerateModal">&times;</div>
        </div>
        <div class="modal-content">
          <div class="form-container">
            <p class="subtitle">智能生成一份PPT</p>
            <form id="pptGenerateForm">
              <div class="form-group">
                <label for="pptCourseName" class="required">课程名称</label>
                <input type="text" id="pptCourseName" name="pptCourseName" placeholder="请输入" required>
              </div>
              <div class="form-group">
                <label for="pptSections" class="required">节数</label>
                <input type="number" id="pptSections" name="pptSections" placeholder="请输入" required>
              </div>
              <div class="form-group">
                <label for="classHours">本课时学时（每学时40分钟）</label>
                <input type="number" id="classHours" name="classHours" placeholder="请输入">
              </div>
              <div class="divider"></div>
              <div class="form-group">
                <label for="pptMajor">适用专业</label>
                <input type="text" id="pptMajor" name="pptMajor" placeholder="请输入">
              </div>
              <div class="divider"></div>
              <div class="form-group">
                <label for="pptTextbook">参考教材</label>
                <input type="file" id="pptTextbook" name="pptTextbook" class="file-upload">
                <span id="pptFileStatus">未选择文件</span>
              </div>
              <div class="form-group">
                <label for="pptRequirements">其他要求</label>
                <textarea id="pptRequirements" name="pptRequirements" rows="3" placeholder="请输入"></textarea>
              </div>
              <button type="submit" class="generate-btn">生成</button>
            </form>
          </div>
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
      this.showLessonPlanModal = true;
    },
    closeLessonPlanModal() {
      this.showLessonPlanModal = false;
    },
    openPPTGenerateModal() {
      this.showPPTGenerateModal = true;
    },
    closePPTGenerateModal() {
      this.showPPTGenerateModal = false;
    }
  }
};
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
</style>