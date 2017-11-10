package com.example.demo.business.web.controller;

import com.example.demo.business.model.User;
import com.example.demo.business.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@RequestMapping(value = "/users3")
@Controller// 通过这里配置使下面的映射都在/users下
public class User3Controller {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView getUserList() {
        ModelAndView modelAndView = new ModelAndView("/index");
        List<User> list = userService.getAll();
        modelAndView.addObject("userList", list);
        return modelAndView;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUsers() {
        List<User> result = new ArrayList<>();
        List<User> list = userService.getAll();
        return list;
    }

}