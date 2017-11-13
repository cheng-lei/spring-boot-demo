package com.example.demo.framwork.config.mysql;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 动态数据源注解类用于标记选择的数据源
 * @author zongbo
 *
 */
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
    public @interface DynamicDataSourceAnnotation {
    String value(); //数据源名称
}
