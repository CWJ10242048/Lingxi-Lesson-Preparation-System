from flask import Flask, send_file, Response, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # 启用 CORS

# 获取当前文件所在目录的上级目录（项目根目录）
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_result_path(filename):
    """构建result目录下文件的完整路径"""
    return os.path.join(BASE_DIR, 'result', filename)

@app.route('/download-syllabus')
def download_syllabus():
    try:
        file_path = get_result_path('机器学习教学大纲.docx')
        
        # 检查文件是否存在
        if not os.path.exists(file_path):
            return Response("文件不存在", status=404)
        
        # 设置正确的 MIME 类型和响应头
        return send_file(
            file_path,
            as_attachment=True,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            download_name='机器学习教学大纲.docx',
            conditional=False  # 禁用条件请求
        )
    except Exception as e:
        print(f"Error: {str(e)}")
        return Response(f"服务器错误: {str(e)}", status=500)

@app.route('/download-ppt')
def download_ppt():
    try:
        file_path = get_result_path('机器学习课程线性回归课时教学PPT.pptx')
        
        # 检查文件是否存在
        if not os.path.exists(file_path):
            return Response("文件不存在", status=404)
        
        # 设置正确的 MIME 类型和响应头
        return send_file(
            file_path,
            as_attachment=True,
            mimetype='application/vnd.openxmlformats-officedocument.presentationml.presentation',
            download_name='机器学习课程线性回归课时教学PPT.pptx',
            conditional=False  # 禁用条件请求
        )
    except Exception as e:
        print(f"Error: {str(e)}")
        return Response(f"服务器错误: {str(e)}", status=500)

@app.route('/download-interaction-design')
def download_interaction_design():
    try:
        file_path = get_result_path('互动环节设计.docx')
        
        # 检查文件是否存在
        if not os.path.exists(file_path):
            return Response("文件不存在", status=404)
        
        # 设置正确的 MIME 类型和响应头
        return send_file(
            file_path,
            as_attachment=True,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            download_name='互动环节设计.docx',
            conditional=False  # 禁用条件请求
        )
    except Exception as e:
        print(f"Error: {str(e)}")
        return Response(f"服务器错误: {str(e)}", status=500)

@app.route('/api/generate-lesson-plan', methods=['POST'])
def generate_lesson_plan():
    try:
        # 获取请求数据
        data = request.get_json()
        
        # 使用相对路径
        file_path = get_result_path('机器学习学期教案.docx')
        
        # 检查文件是否存在
        if not os.path.exists(file_path):
            return {"error": "文件不存在"}, 404
            
        # 发送文件
        return send_file(
            file_path,
            as_attachment=True,
            download_name='机器学习学期教案.docx',
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 