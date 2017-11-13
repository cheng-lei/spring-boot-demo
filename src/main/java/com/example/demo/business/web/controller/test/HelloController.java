package com.example.demo.business.web.controller.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by leicheng on 2017/9/28.
 */
@RestController
@RequestMapping("/test")
public class HelloController {
    @RequestMapping("/hello")
    public String hello() {
        return "hello";
    }

}
