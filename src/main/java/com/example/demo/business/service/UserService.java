package com.example.demo.business.service;

import com.example.demo.business.dao.User3Mapper;
import com.example.demo.business.dao.User4Mapper;
import com.example.demo.business.model.User;
import com.example.demo.framwork.base.AbstractBaseService;
import com.example.demo.framwork.base.PropertyFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by leicheng on 2017/10/11.
 */
@Service
public class UserService extends AbstractBaseService<User> {
    @Autowired
    private User3Mapper mapper;
    @Autowired
    private User4Mapper mapper4;

    public List<User> getAll() {
        int count = mapper.executeUpdateSql("DELETE  FROM user WHERE id = 54");
        List<Map<String, Object>> map = mapper.executeSelectSqlResultMap("SELECT * FROM user WHERE id = 55");
        long selectCount = mapper.executeSelectCountSql("SELECT count(*) FROM user");
        return mapper.selectAll();
    }

    public List<User> findByPropertyFilters(List<PropertyFilter> filters) {
        String str = PropertyFilter.buildQueryStringByPropertyFilter(filters);
        List<User> list = mapper.selectByExample(User.class);
        return list;
    }
}
