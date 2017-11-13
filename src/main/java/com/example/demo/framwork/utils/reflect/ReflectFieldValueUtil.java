package com.example.demo.framwork.utils.reflect;

import org.apache.commons.beanutils.BeanUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

/**
 * Created by IntelliJ IDEA.
 * User: fangying
 * Date: 12-8-23
 * Time: 下午5:56
 * To change this template use File | Settings | File Templates.
 */
public class ReflectFieldValueUtil {
    private ReflectFieldValueUtil() {

    }
    /**
     * 取出当前对象所有字段名
     *
     * @param object 当前对象
     * @return 字段列表
     */
    public static List<String> getFieldNameList(Object object) {
        List<String> fieldNameList = new ArrayList<String>();
        Field[] tempFields = object.getClass().getDeclaredFields();
        for (Field field : tempFields) {
            fieldNameList.add(field.getName());
        }
        return fieldNameList;
    }

    public static Object getFieldValue(Object object, String fieldName) {
        try{
            String firstLetter = fieldName.substring(0, 1).toUpperCase();
            String getter = "get" + firstLetter + fieldName.substring(1);
            Method method = object.getClass().getMethod(getter, new Class[]{});
            Object value = method.invoke(object, new Object[]{});
            return value;
        } catch (Exception e){
            System.out.println("属性不存在");
            return null;
        }
    }

    public static Map<String, Object> convertToMap(Object object) {
        List<String> fieldNameList = getFieldNameList(object);
        if (fieldNameList != null && fieldNameList.size() > 0) {
            Map<String, Object> map = new HashMap<String, Object>();
            for (String fieldName : fieldNameList) {
                map.put(fieldName, getFieldValue(object, fieldName));
            }
            return map;
        }
        return null;
    }

    public static Object convertToObject(Map<String,Object> map , Object obj) throws Exception {
        BeanUtils.populate(obj,map);
        return obj;
    }

}
