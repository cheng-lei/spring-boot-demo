//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.example.demo.framwork.utils.reflect;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReflectionUtils {
    private static Logger logger = LoggerFactory.getLogger(ReflectionUtils.class);

    public ReflectionUtils() {
    }

    public static Object invokeGetterMethod(Object obj, String propertyName) {
        String getterMethodName = "get" + StringUtils.capitalize(propertyName);
        return invokeMethod(obj, getterMethodName, new Class[0], new Object[0]);
    }

    public static void invokeSetterMethod(Object obj, String propertyName, Object value) {
        invokeSetterMethod(obj, propertyName, value, (Class)null);
    }

    public static void invokeSetterMethod(Object obj, String propertyName, Object value, Class<?> propertyType) {
        Class<?> type = propertyType != null?propertyType:value.getClass();
        String setterMethodName = "set" + StringUtils.capitalize(propertyName);
        invokeMethod(obj, setterMethodName, new Class[]{type}, new Object[]{value});
    }

    public static Object getFieldValue(Object obj, String fieldName) {
        Field field = getAccessibleField(obj, fieldName);
        if(field == null) {
            throw new IllegalArgumentException("Could not find field [" + fieldName + "] on target [" + obj + "]");
        } else {
            Object result = null;

            try {
                result = field.get(obj);
            } catch (IllegalAccessException var5) {
                logger.error("不可能抛出的异常{}", var5.getMessage());
            }

            return result;
        }
    }

    public static void setFieldValue(Object obj, String fieldName, Object value) {
        Field field = getAccessibleField(obj, fieldName);
        if(field == null) {
            throw new IllegalArgumentException("Could not find field [" + fieldName + "] on target [" + obj + "]");
        } else {
            try {
                field.set(obj, value);
            } catch (IllegalAccessException var5) {
                logger.error("不可能抛出的异常:{}", var5.getMessage());
            }

        }
    }

    public static Field getAccessibleField(Object obj, String fieldName) {
        Class<?> superClass = null;
        if(obj instanceof Class) {
            superClass = (Class)obj;
        } else {
            superClass = obj.getClass();
        }

        while(superClass != Object.class) {
            try {
                Field field = superClass.getDeclaredField(fieldName);
                field.setAccessible(true);
                return field;
            } catch (NoSuchFieldException var4) {
                superClass = superClass.getSuperclass();
            }
        }

        return null;
    }

    public static Object invokeMethod(Object obj, String methodName, Class<?>[] parameterTypes, Object[] args) {
        Method method = getAccessibleMethod(obj, methodName, parameterTypes);
        if(method == null) {
            throw new IllegalArgumentException("Could not find method [" + methodName + "] on target [" + obj + "]");
        } else {
            try {
                return method.invoke(obj, args);
            } catch (Exception var6) {
                throw convertReflectionExceptionToUnchecked(var6);
            }
        }
    }

    public static Method getAccessibleMethod(Object obj, String methodName, Class... parameterTypes) {
        Class superClass = obj.getClass();

        while(superClass != Object.class) {
            try {
                Method method = superClass.getDeclaredMethod(methodName, parameterTypes);
                method.setAccessible(true);
                return method;
            } catch (NoSuchMethodException var5) {
                superClass = superClass.getSuperclass();
            }
        }

        return null;
    }

    public static <T> Class<T> getSuperClassGenricType(Class clazz) {
        return getSuperClassGenricType(clazz, 0);
    }

    public static Class getSuperClassGenricType(Class clazz, int index) {
        Type genType = clazz.getGenericSuperclass();
        if(!(genType instanceof ParameterizedType)) {
            logger.warn(clazz.getSimpleName() + "'s superclass not ParameterizedType");
            return Object.class;
        } else {
            Type[] params = ((ParameterizedType)genType).getActualTypeArguments();
            if(index < params.length && index >= 0) {
                if(!(params[index] instanceof Class)) {
                    logger.warn(clazz.getSimpleName() + " not set the actual class on superclass generic parameter");
                    return Object.class;
                } else {
                    return (Class)params[index];
                }
            } else {
                logger.warn("Index: " + index + ", Size of " + clazz.getSimpleName() + "'s Parameterized Type: " + params.length);
                return Object.class;
            }
        }
    }

    public static RuntimeException convertReflectionExceptionToUnchecked(Exception e) {
        return (RuntimeException)(!(e instanceof IllegalAccessException) && !(e instanceof IllegalArgumentException) && !(e instanceof NoSuchMethodException)?(e instanceof InvocationTargetException?new RuntimeException("Reflection Exception.", ((InvocationTargetException)e).getTargetException()):(e instanceof RuntimeException?(RuntimeException)e:new RuntimeException("Unexpected Checked Exception.", e))):new IllegalArgumentException("Reflection Exception.", e));
    }

    public static String fetchElementPropertyToString(Collection collection, String propertyName, String separator) {
        List list = fetchElementPropertyToList(collection, propertyName);
        return StringUtils.join(list, separator);
    }

    public static List fetchElementPropertyToList(Collection collection, String propertyName) {
        ArrayList list = new ArrayList();

        try {
            Iterator i$ = collection.iterator();

            while(i$.hasNext()) {
                Object obj = i$.next();
                list.add(PropertyUtils.getProperty(obj, propertyName));
            }
        } catch (Exception var5) {
            convertReflectionExceptionToUnchecked(var5);
        }

        return list;
    }

    public static List convertElementPropertyToList(Collection collection, String propertyName) {
        ArrayList list = new ArrayList();

        try {
            Iterator i$ = collection.iterator();

            while(i$.hasNext()) {
                Object obj = i$.next();
                list.add(PropertyUtils.getProperty(obj, propertyName));
            }

            return list;
        } catch (Exception var5) {
            throw convertReflectionExceptionToUnchecked(var5);
        }
    }

    public static String convertElementPropertyToString(Collection collection, String propertyName, String separator) {
        List list = convertElementPropertyToList(collection, propertyName);
        return StringUtils.join(list, separator);
    }
}
