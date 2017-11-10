package com.example.demo.framwork.config.mysql;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.lang.reflect.Method;
import java.text.MessageFormat;

@Aspect
@Component
@Order(-1) //注意，先执行数据源选择切面，才能执行事务切面
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class DynamicDataSourceAspect {
    static Logger logger = LoggerFactory.getLogger(DynamicDataSourceAspect.class);

    /**
     * 切入点 service包及子孙包下的所有类
     */
    @Pointcut("execution(* com.example.demo.business.dao..*.*(..))")
    public void aspect() {
    }

    /**
     * 配置前置通知,使用在方法aspect()上注册的切入点
     */
    @Before("aspect()")
    public void before(JoinPoint point) {
        Class<?> target = point.getTarget().getClass();
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();
        //从类初始化
        DynamicDataSourceAnnotation dataSource = this.getDataSource(target, method);
        //从接口初始化
        if (dataSource == null && target.getInterfaces() != null) {
            for (Class<?> clazz : target.getInterfaces()) {
                dataSource = getDataSource(clazz, method);
                if (dataSource != null) {
                    break;//从某个接口中一旦发现注解，不再循环
                }
            }
        }

        if (dataSource != null && !StringUtils.isEmpty(dataSource.value())) {
            DynamicDataSourceRouter.setDataSourceKey(dataSource.value());
        }
    }

    @After("aspect()")
    public void after(JoinPoint point) {
        //使用完记得清空
        DynamicDataSourceRouter.clearDataSourceKey();
    }


    /**
     * 获取方法或类的注解对象DataSource
     *
     * @param target 类class
     * @param method 方法
     * @return DataSource
     */
    public DynamicDataSourceAnnotation getDataSource(Class<?> target, Method method) {
        try {
            //1.优先方法注解
            Class<?>[] types = method.getParameterTypes();
            Method m = target.getMethod(method.getName(), types);
            if (m != null && m.isAnnotationPresent(DynamicDataSourceAnnotation.class)) {
                return m.getAnnotation(DynamicDataSourceAnnotation.class);
            }
            //2.其次method 类注解
            if (method.getDeclaringClass().isAnnotationPresent(DynamicDataSourceAnnotation.class)) {
                return method.getDeclaringClass().getAnnotation(DynamicDataSourceAnnotation.class);
            }
            //3.其次target注解
            if (target.isAnnotationPresent(DynamicDataSourceAnnotation.class)) {
                return target.getAnnotation(DynamicDataSourceAnnotation.class);
            }

        } catch (Exception e) {
            e.printStackTrace();
            logger.error(MessageFormat.format("通过注解切换数据源时发生异常[class={0},method={1}]："
                    , target.getName(), method.getName()), e);
        }
        return null;
    }
}