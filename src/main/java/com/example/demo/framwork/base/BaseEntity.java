package com.example.demo.framwork.base;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

public abstract class BaseEntity implements Serializable {

    protected Integer id;

    /**
     * 实体版本标识
     */
    protected Integer version = 0;
    /**
     * 实体更新时间
     */
    protected Timestamp updateTime = new Timestamp(System.currentTimeMillis());

    /**
     * 实体创建时间
     */
    protected Timestamp createTime = new Timestamp(System.currentTimeMillis());

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
