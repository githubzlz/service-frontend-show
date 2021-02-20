package com.zlz.blog.fontend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author zhulinzhong
 * @version 1.0 CreateTime:2020/1/17 10:09
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new BlogUserInterceptor()).addPathPatterns("/**")
                .excludePathPatterns("static/**")
                .excludePathPatterns("/index")
                .excludePathPatterns("/empty")
                .excludePathPatterns("/home")
                .excludePathPatterns("/classify")
                .excludePathPatterns("/time")
                .excludePathPatterns("/website")
                .excludePathPatterns("/aboutme")
                .excludePathPatterns("/detail");
    }
}
