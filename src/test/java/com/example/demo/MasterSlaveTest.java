package com.example.demo;

import com.example.demo.business.dao.User3Mapper;
import com.example.demo.business.dao.master.User2Mapper;
import com.example.demo.business.model.User;
import com.github.pagehelper.PageHelper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by leicheng on 2017/9/29.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoApplication.class)
public class MasterSlaveTest {
    @Autowired
    private User2Mapper userMapper;
    @Autowired
    private com.example.demo.business.dao.slave.UserMapper slaveUserMapper;
    @Autowired
    private User3Mapper user3Mapper;

    @Test
    public void insterMaster() {
        User user = new User();
        user.setAge(11);
        user.setName("master");
        userMapper.insert(user);
        System.out.println("master test end");
    }

    @Test
    public void insterSlave() {
        User user = new User();
        user.setAge(22);
        user.setName("slave");
        slaveUserMapper.insert(user);
        System.out.println("slave test end");
    }

    @Test
    public void insterCommon() {
        User user = new User();
        user.setAge(33);
        user.setName("common");
        user3Mapper.insert(user);
        user3Mapper.insert(user);
        user3Mapper.insert(user);
        List<User> list = user3Mapper.selectAll();
        System.out.println(list.size());
        PageHelper.startPage(1, 2);
        List<User> pageList = user3Mapper.selectAll();
        System.out.println("pagelist.size:" + pageList.size());
        System.out.println("common test end");
    }

    @Autowired
    @Qualifier("masterMongoTemplate")
    private MongoTemplate master;
    @Autowired
    @Qualifier("slaveMongoTemplate")
    private MongoTemplate slave;

    @Test
    public void insertMongo(){
        User user = new User();
        user.setName("name22");
        user.setAge(143);
        System.out.println(System.currentTimeMillis());
        System.out.println(new Timestamp(System.currentTimeMillis()).getTime());
        System.out.println(new Timestamp(System.currentTimeMillis()));
        master.save(user);
    }

}
