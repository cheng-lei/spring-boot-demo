package com.example.demo.framwork.utils.serializable;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Created by leicheng on 2017/11/10.
 */
public class GsonUtils {
    private static final Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

    public static String toJson(Object o) {
        return GSON.toJson(o);
    }

    public static Object fromJson(String str, Class t) {
        return GSON.fromJson(str, t);
    }
}
