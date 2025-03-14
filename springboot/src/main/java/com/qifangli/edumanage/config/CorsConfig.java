//package com.qifangli.edumanage.config;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration // 确保添加此注解
//public class CorsConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost", "https://localhost") // 添加 HTTPS 和端口
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 允许所有方法
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }
//}
package com.qifangli.edumanage.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("cors begin");
        registry.addMapping("/**") // 允许所有路径
                .allowCredentials(true)
                .allowedOrigins("*") // 允许的来源
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 允许的HTTP方法
                .allowedHeaders("*") // 允许的请求头
                .maxAge(3600); // 预检请求的缓存时间
        System.out.println("cors end");
    }
}