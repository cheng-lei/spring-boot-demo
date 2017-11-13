package com.example.demo.framwork.config.mysql;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

import java.util.List;
import java.util.Map;

/**
 * Created by leicheng on 2017/9/29.
 */
public interface CommonMapper<T> extends Mapper<T>, MySqlMapper<T> {

    @SelectProvider(type = CommonMapperProvider.class, method = "dynamicSQL")
    List<T> executeSelectSql(@Param("sql") String sql);

    @SelectProvider(type = CommonMapperProvider.class, method = "dynamicSQL")
    List<Map<String, Object>> executeSelectSqlResultMap(@Param("sql") String sql);

    @SelectProvider(type = CommonMapperProvider.class, method = "dynamicSQL")
    long executeSelectCountSql(@Param("sql") String sql);

    @UpdateProvider(type = CommonMapperProvider.class, method = "dynamicSQL")
    int executeUpdateSql(@Param("sql") String sql);
}
