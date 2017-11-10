package com.example.demo.framwork.config.mysql;

import com.github.pagehelper.PageHelper;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
//@MapperScan(basePackages = "com.example.demo.business.dao.master", sqlSessionFactoryRef = "masterSqlSessionFactory")
public class DynamicMasterDataSourceConfig {

    @Bean(name = "masterDataSource")
    @ConfigurationProperties("mysql.master")
    @Primary
    public DataSource masterDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "slaveDataSource")
    @ConfigurationProperties("mysql.slave")
    public DataSource slaveDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public DataSource dynmicDataSource() throws SQLException {
        DynamicDataSourceRouter dynamicDataSourceRouter = new DynamicDataSourceRouter();
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put("masterDataSource", masterDataSource());
        targetDataSources.put("slaveDataSource", slaveDataSource());
        dynamicDataSourceRouter.setTargetDataSources(targetDataSources);
        dynamicDataSourceRouter.setDefaultTargetDataSource(masterDataSource());
        return dynamicDataSourceRouter;
    }

    @Bean
    public PlatformTransactionManager transactionManager(@Qualifier("dynmicDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }



}
