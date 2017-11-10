package com.example.demo.business.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.Map;


@Controller
@SessionAttributes({"userId", "cityId"})
public class ControllerA {
    @RequestMapping(value = "/testA", method = RequestMethod.GET)
    public String testA(Model model, HttpSession session, @RequestParam("id") String id) {
        model.addAttribute("userId", id);

        session.setAttribute("cityid", "beijing");

        System.out.println("test A page.....");
        System.out.println("--- Model data ---");
        Map modelMap = model.asMap();
        for (Object modelKey : modelMap.keySet()) {
            Object modelValue = modelMap.get(modelKey);
            System.out.println(modelKey + " -- " + modelValue);
        }

        System.out.println("*** Session data ***");
        Enumeration<String> e = session.getAttributeNames();
        while (e.hasMoreElements()) {
            String s = e.nextElement();
            System.out.println(s + " == " + session.getAttribute(s));
        }

        return "checkA2";
    }
}  