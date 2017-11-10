package com.example.demo.framwork.config.mongo;

import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
//@MapperScan(basePackages = "com.example.demo.business.dao.master", sqlSessionFactoryRef = "masterSqlSessionFactory")
public class MutilMongoConfig {

    @Bean(name = "masterMongo")
    @ConfigurationProperties("mongo.master")
    @Primary
    public MongoProperties masterProperties() {
        return new MongoProperties();
    }


    @Bean
    @Primary
    @ConditionalOnMissingBean(MongoConverter.class)
    public MongoTemplate masterMongoTemplate() {
        //remove _class
        MongoDbFactory masterMongoFactory = masterMongoFactory(masterProperties());
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(masterMongoFactory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, new MongoMappingContext());
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return new MongoTemplate(masterMongoFactory,converter);
    }

    @Bean
    @Primary
    public MongoDbFactory masterMongoFactory(MongoProperties mongoProperties) {
        ServerAddress serverAdress = new ServerAddress(mongoProperties.getUri());
        return new SimpleMongoDbFactory(new MongoClient(serverAdress), mongoProperties.getDatabase());
    }


    @Bean(name = "slaveMongo")
    @ConfigurationProperties("mongo.slave")
    public MongoProperties slaveMongoProperties() {
        return new MongoProperties();
    }

    @Bean
    @ConditionalOnMissingBean(MongoConverter.class)
    public MongoTemplate slaveMongoTemplate() {
        //remove _class
        MongoDbFactory slaveMongoFactory = slaveMongoFactory(slaveMongoProperties());
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(slaveMongoFactory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, new MongoMappingContext());
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return new MongoTemplate(slaveMongoFactory,converter);
    }

    @Bean
    public MongoDbFactory slaveMongoFactory(MongoProperties mongoProperties) {
        ServerAddress serverAdress = new ServerAddress(mongoProperties.getUri());
        return new SimpleMongoDbFactory(new MongoClient(serverAdress), mongoProperties.getDatabase());
    }

}
