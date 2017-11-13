package com.example.demo.business.web.controller.table;

import com.example.demo.business.model.User;
import com.example.demo.business.service.UserService;
import com.example.demo.framwork.base.PropertyFilter;
import com.example.demo.framwork.page.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by leicheng on 2017/11/10.
 */
@RestController
@RequestMapping("/table")
public class TableController {

    @Autowired
    private UserService userService;

    @RequestMapping("/page")
    public Page<User> getPageUser() {
        Page<User> page = new Page(20);
        List<PropertyFilter> filters = new ArrayList<>(1);
        filters.add(new PropertyFilter("EQS_name", "master"));
        Page<User> userPage = userService.findPageByPropertyFilters(page, filters);
        return userPage;
    }
}
