package com.example.demo.framwork.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyWebAppConfigurer
        extends WebMvcConfigurerAdapter {

    @Bean
    public GlobalHandlerExceptionResolver globalHandlerExceptionResolver() {
        return new GlobalHandlerExceptionResolver();
    }

}