package com.example.demo.business.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by leicheng on 2017/11/9.
 */
@RequestMapping(value = "/table")
@Controller
public class TableTestController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView getUserList() {
        ModelAndView modelAndView = new ModelAndView("/table");
        return modelAndView;
    }
    @RequestMapping(value = "/tree", method = RequestMethod.GET)
    public ModelAndView getTreeTest() {
        ModelAndView modelAndView = new ModelAndView("/tree");
        return modelAndView;
    }
}
