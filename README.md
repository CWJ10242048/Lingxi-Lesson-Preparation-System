# Lingxi-Lesson-Preparation-System
3.14更新：
目前如何快速把项目跑起来：
### 第一步：配置数据库
打开mysql
执行：
```sql
create database edu_adm;
```
然后把edu_adm_sys.sql里面的内容复制执行。
然后使用use edu_adm;
然后show tables; 检查一下是否执行成功

### 第二步：后端配置
修改"E:\gitplay\Lingxi-Lesson-Preparation-System\Lingxi-Lesson-Preparation-System\springboot\src\main\resources\application.properties"里面的user、password和url。和你自己的数据库配置对应。如果你的user和password都是root，并且数据库名字是edu_adm，即跟我一样则不需要配置。

"E:\gitplay\Lingxi-Lesson-Preparation-System\Lingxi-Lesson-Preparation-System\springboot\src\main\resources\logback-spring.xml"这个里面也是同样配置user、password和url。

### 第三步：前端配置
cd 进入"E:\gitplay\Lingxi-Lesson-Preparation-System\Lingxi-Lesson-Preparation-System\vue"目录，执行：
```
npm install
```
和
```
npm run serve
```
即可成功部署