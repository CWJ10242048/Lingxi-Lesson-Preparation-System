import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress"; // 导入 nprogress
import "nprogress/nprogress.css";
import HomePage from '../components/home_page.vue';
import StudentDataDashboard from '../views/StudentDataDashboard.vue';
import CognitiveDiagnosis from '../views/CognitiveDiagnosis.vue';
import KnowledgeTracking from '../views/KnowledgeTracking.vue';
import KnowledgeGraph from '../views/KnowledgeGraph.vue';
import ResourceCommunity from '../views/ResourceCommunity.vue';
import ConceptPrerequisiteRecognition from '../views/ConceptPrerequisiteRecognition.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/HomePage",
        },
        {
            path: '/HomePage',
            name: 'HomePage',
            component: HomePage,
            meta: {
                title: "Ling Xi | 智能备课助手",
            },
        },
        {
            path: '/HistoryPage',
            name: 'HistoryPage',
            component: () => import('../components/HistoryPage.vue'),
            meta: {
                title: "Ling Xi | 智能备课助手",
            },
        },
        {
            path: '/CollaborationSpace',
            name: 'CollaborationSpace',
            component: () => import('../components/CollaborationSpace.vue'),
            meta: {
                title: "Ling Xi | 智能备课助手",
            },
        },
        {
            path: "/SyllabusGeneration",
            name: "SyllabusGeneration",
            component: () => import('../views/SyllabusGeneration.vue'),
            meta: {
                title: "Ling Xi | 教学大纲生成", // 定义标题
            },
        },
        {
            path: "/index",
            name: "index",
            component: () => import('../views/WholeExamPage.vue').catch((error) => {
                console.error('Failed to load WholeExamPage.vue:', error);
            }),
            meta: {
                title: "Ling Xi | 智能备课助手", // 定义标题
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import('../views/LoginPage.vue').catch((error) => {
                console.error('Failed to load LoginPage.vue:', error);
            }),
            meta: {
                title: "Ling Xi | 登陆注册", // 定义标题
            },
        },
        {
            path: "/index2",
            name: "index2",
            component: () => import('../views/SingleExamPage.vue').catch((error) => {
                console.error('Failed to load SingleExamPage.vue:', error);
            }),
            meta: {
                title: "Ling Xi | 智能备课助手", // 定义标题
            },
        },
        {
            path: '/LessonPlanGeneration',
            name: 'LessonPlanGeneration',
            component: () => import('../views/LessonPlanGeneration.vue'),
            meta: {
                title: 'Ling Xi | 教案生成'
            }
        },
        {
            path: '/PPTGeneration',
            name: 'PPTGeneration',
            component: () => import('../views/PPTGeneration.vue'),
            meta: {
                title: 'Ling Xi | PPT生成'
            }
        },
        {
            path: '/ImageGeneration',
            name: 'ImageGeneration',
            component: () => import('../views/ImageGeneration.vue'),
            meta: {
                title: 'Ling Xi | 图文生成'
            }
        },
        {
            path: '/QuestionGeneration',
            name: 'QuestionGeneration',
            component: () => import('../views/QuestionGeneration.vue'),
            meta: {
                title: 'Ling Xi | 智能出题'
            }
        },
        {
            path: '/interaction-design',
            name: 'InteractionDesign',
            component: () => import('../views/InteractionDesign.vue'),
            meta: {
                title: 'Ling Xi | 互动环节设计'
            }
        },
        {
            path: '/student-data-dashboard',
            name: 'StudentDataDashboard',
            component: StudentDataDashboard
        },
        {
            path: '/cognitive-diagnosis',
            name: 'CognitiveDiagnosis',
            component: () => import('../views/CognitiveDiagnosis.vue'),
            meta: {
                title: 'Ling Xi | 认知诊断'
            }
        },
        {
            path: '/knowledge-tracking',
            name: 'KnowledgeTracking',
            component: KnowledgeTracking
        },
        {
            path: '/knowledge-graph',
            name: 'KnowledgeGraph',
            component: KnowledgeGraph
        },
        {
            path: '/resource-community',
            name: 'ResourceCommunity',
            component: ResourceCommunity
        },
        {
            path: '/concept-prerequisite',
            name: 'ConceptPrerequisiteRecognition',
            component: ConceptPrerequisiteRecognition
        }
    ],
});

NProgress.configure({
    easing: "ease", // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 更改启动时使用的最小百分比
    parent: "body", // 指定进度条的父容器
});

router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启进度条
    next();
});

router.afterEach(() => {
    NProgress.done(); // 结束进度条
});

router.afterEach((to) => {
    document.title = to.meta.title || "editor";
});

export default router;    