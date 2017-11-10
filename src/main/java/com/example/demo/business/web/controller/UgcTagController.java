package com.example.demo.business.web.controller;

import com.example.demo.business.model.UgcTag;
import com.example.demo.business.service.UgcTagService;
import com.example.demo.framwork.page.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by leicheng on 2017/10/24.
 */
@Controller
@RequestMapping("/UgcTag")
public class UgcTagController {

    @Autowired
    private UgcTagService ugcTagService;

    @GetMapping("/list")
    @ResponseBody
    public Page<UgcTag> getPage(Page<UgcTag> page, UgcTag ugcTag) {
        return ugcTagService.findPageByPropertyFilters(page, null);
    }
}
