from flask import Flask, request, jsonify, Response
from flask_cors import CORS
# from creat_file1 import create_course_outline  # 课程大纲生成函数
from creat_file1 import create_file  # 课程大纲生成函数
from creat_pptx import create_pptx  # PPT生成函数

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)


# 流式输出函数
def generate_stream(ai_response):
    try:
        for chunk in ai_response:
            yield f"{chunk.choices[0].delta.content}"
    except GeneratorExit:
        print("Client disconnected")


# 课程大纲生成API
@app.route('/api/create_outline', methods=['POST'])
def generate_course_outline():
    data = request.json
    course_name = data.get('course_name')
    course_alltime = data.get('course_alltime')
    course_labtime = data.get('course_labtime')
    course_sub = data.get('course_sub')
    course_type = data.get('course_type')
    file = data.get('file')  # 上传的文件，假设为PDF

    # 调用课程大纲生成函数
    create_course_outline(course_name, course_alltime, course_labtime, course_sub, course_type, file)

    return jsonify({'message': '课程大纲生成成功'}), 200


# PPT生成API
@app.route('/api/create_pptx', methods=['POST'])
def generate_ppt():
    data = request.json
    course_name = data.get('course_name')
    unit_name = data.get('unit_name')
    course_num = data.get('course_num')
    course_time = data.get('course_time')
    course_sub = data.get('course_sub')
    file = data.get('file')  # 上传的文件，假设为PDF

    # 调用PPT生成函数
    create_pptx(course_name, unit_name, course_num, course_time, course_sub, file)

    return jsonify({'message': 'PPT生成成功'}), 200


# 默认路由
@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True)
