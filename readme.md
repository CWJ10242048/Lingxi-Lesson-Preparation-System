这个很清楚，backend是后端，把所有的AI功能用函数的形式封装起来丢到app.py就行。
然后frontend是前端，把所有的前端代码就在别人的代码上面改好了。

启动项目：
**基础配置**

1. 配置前端，直接在命令行里面执行
   ```cmd
   cd /frontend
   npm install
   # 下载完成之后即可使用
   pnpm dev
   ```

2. 为你的python环境安装一下包
   可以先创建一个python虚拟环境然后再执行以下：
   ```cmd
   pip install flask
   pip install flask_cors
   pip install zhipuai
   ```  

**运行代码**
1. 先再pycharm中运行app.py
2. cd到frontend目录下，执行npm run dev