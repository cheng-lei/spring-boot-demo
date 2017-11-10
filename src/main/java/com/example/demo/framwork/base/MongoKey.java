package com.example.demo.framwork.base;

import org.springframework.data.annotation.Id;

import java.io.Serializable;

/**
 * User: rainliang
 * Mail: rainliang@qiyi.com
 * Date: 2014/11/19
 * Time: 2:10
 * Desc:
 */
public class MongoKey implements Serializable {

    private String collectionName;
    private Long counter;

    @Id
    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public Long getCounter() {
        return counter;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }
}
