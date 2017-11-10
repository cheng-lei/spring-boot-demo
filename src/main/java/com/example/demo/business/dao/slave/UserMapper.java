package com.example.demo.business.dao.slave;

import com.example.demo.framwork.config.mysql.DynamicDataSourceAnnotation;
import com.example.demo.business.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by leicheng on 2017/9/29.
 */
@DynamicDataSourceAnnotation("slaveDataSource")
public interface UserMapper {

    @Select("SELECT * FROM user")
    List<User> getAll();

    @Select("SELECT * FROM user WHERE id = #{id}")
    User getOne(Long id);

    @Insert("INSERT INTO user(name,age) VALUES(#{name}, #{age})")
    void insert(User user);

    @Update("UPDATE user SET name=#{name},age=#{age} WHERE id =#{id}")
    void update(User user);

    @Delete("DELETE FROM user WHERE id =#{id}")
    void delete(Long id);

}
