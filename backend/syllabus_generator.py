from flask import Flask, send_file, Response
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # 启用 CORS

@app.route('/download-syllabus')
def download_syllabus():
    try:
        file_path = r"E:\gitplay\Lingxi-Lesson-Preparation-System\Lingxi-Lesson-Preparation-System\result\机器学习教学大纲.docx"
        
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

if __name__ == '__main__':
    app.run(port=5000, debug=True)