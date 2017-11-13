package com.example.demo.framwork.config.mysql;

import org.apache.ibatis.mapping.MappedStatement;
import tk.mybatis.mapper.mapperhelper.MapperHelper;
import tk.mybatis.mapper.mapperhelper.MapperTemplate;

/**
 * Created by leicheng on 2017/10/20.
 */
public class CommonMapperProvider extends MapperTemplate {
    public CommonMapperProvider() {
        super(null, null);
    }

    public CommonMapperProvider(Class<?> mapperClass, MapperHelper mapperHelper) {
        super(mapperClass, mapperHelper);
    }

    public String executeSelectSql(MappedStatement ms) {
        return "${sql}";
    }

    public String executeUpdateSql(MappedStatement ms) {
        return "${sql}";
    }

    public String executeSelectCountSql(MappedStatement ms) {
        return "${sql}";
    }

    public String executeSelectSqlResultMap(MappedStatement ms) {
        return "${sql}";
    }
}
