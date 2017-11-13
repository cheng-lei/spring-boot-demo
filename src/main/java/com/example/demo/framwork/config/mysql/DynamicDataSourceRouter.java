package com.example.demo.framwork.config.mysql;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * Created by leicheng on 2017/9/29.
 */
public class DynamicDataSourceRouter extends AbstractRoutingDataSource {
    // 数据源名称线程池
    private static final ThreadLocal<String> holder = new ThreadLocal<String>();

    @Override
    protected Object determineCurrentLookupKey() {
        return holder.get();
    }


    public static void setDataSourceKey(String key) {
        holder.set(key);
    }
    public static void clearDataSourceKey() {
        holder.remove();
    }
}
