package com.example.demo.business.model;

import com.example.demo.business.web.validator.GtZero;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;

/**
 * Created by leicheng on 2017/9/28.
 */
public class User implements Serializable {
    @GtZero
    private Long id;
    @NotEmpty
    private String name;
    private Integer age;
    private Integer mathScore=0;
    private Float chineseScore=0.0F;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMathScore() {
        return mathScore;
    }

    public void setMathScore(Integer mathScore) {
        this.mathScore = mathScore;
    }

    public Float getChineseScore() {
        return chineseScore;
    }

    public void setChineseScore(Float chineseScore) {
        this.chineseScore = chineseScore;
    }
}
