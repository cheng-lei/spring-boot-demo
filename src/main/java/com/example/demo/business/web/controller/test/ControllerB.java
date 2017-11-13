package com.example.demo.business.web.controller.test;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttribute;

import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.Map;

@Controller
public class ControllerB {  
  
    @RequestMapping(value="/checkA", method= RequestMethod.GET)
    public String checkA(Model model, HttpSession session, @SessionAttribute("userId") String userId,
                         @ModelAttribute("cityid") String cityid) {
        System.out.println("Test session Attribute userId/cityid==>" + userId + "/" + cityid );  
          
        System.out.println("Check A Page........");  
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
          
        return "testB";  
    }  
}  