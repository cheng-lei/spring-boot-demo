package com.example.demo.business.dao.master;

import com.example.demo.framwork.config.mysql.DynamicDataSourceAnnotation;
import com.example.demo.business.model.User;

import java.util.List;

/**
 * Created by leicheng on 2017/9/29.
 */
@DynamicDataSourceAnnotation("masterDataSource")
public interface User2Mapper {

    List<User> getAll();

    User getOne(Long id);

    void insert(User user);

    void update(User user);

    void delete(Long id);

}
