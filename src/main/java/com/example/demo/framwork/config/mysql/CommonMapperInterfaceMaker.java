package com.example.demo.framwork.config.mysql;

import org.apache.ibatis.javassist.CannotCompileException;
import org.apache.ibatis.javassist.ClassPool;
import org.apache.ibatis.javassist.CtClass;
import org.apache.ibatis.javassist.NotFoundException;

import java.io.IOException;

/**
 * 没有用处
 */
@Deprecated
public class CommonMapperInterfaceMaker {

    public static Class<CommonMapper> makeInterface(String name, String entityName) {
        ClassPool pool = ClassPool.getDefault();
        try {
            CtClass commonMapperClass = pool.get(CommonMapper.class.getName());
            String interfaceName = name + "Interface";
            //Javassist 对泛型的支持不甚友好，实现方法中还是会把类型擦除
            CtClass interfaceMapper = pool.makeInterface(interfaceName);
            interfaceMapper.setSuperclass(commonMapperClass);
            interfaceMapper.writeFile("target/classes");
            Class<CommonMapper> result = interfaceMapper.toClass();
//            Class<CommonMapper> test = (Class<CommonMapper>) Class.forName(result.getName());
            return result;
        } catch (NotFoundException e) {
            e.printStackTrace();
        } catch (CannotCompileException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Class<CommonMapper> makeInterface(Class clazz, Class entity) {
        return makeInterface(clazz.getName(), entity.getName());
    }

    public static Class<CommonMapper> getInterface(Class clazz) {
        return getInterface(clazz.getName());
    }

    public static Class<CommonMapper> getInterface(String name) {
        String interfaceName = name + "Interface";
        try {
            return (Class<CommonMapper>) Class.forName(interfaceName);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }
}