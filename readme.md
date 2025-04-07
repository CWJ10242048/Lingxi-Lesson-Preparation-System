这个很清楚，backend是后端，把所有的AI功能用函数的形式封装起来丢到app.py就行。
然后frontend是前端，把所有的前端代码就在别人的代码上面改好了。

启动项目：
**基础配置**

1. ```cmd
   cd /frontend
   pnpm install
   # 下载完成之后即可使用
   pnpm dev
   ```

2. 为你的python环境安装一下包

   ```cmd
   pip install flask
   pip install flask_cors
   pip install zhipuai
   ```  