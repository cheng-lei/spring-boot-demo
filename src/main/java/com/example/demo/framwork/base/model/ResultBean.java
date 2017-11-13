package com.example.demo.framwork.base.model;

/**
 * Created by leicheng on 2017/11/10.
 */
public class ResultBean {
    private int code = 0;
    private String msg = "请求成功";
    private Object data = null;
    private String debug = "";

    public ResultBean(Object data, String debug) {
        this(0, "SUCCESS", data, debug);
    }

    public ResultBean(Object data) {
        this(0, "SUCCESS", data, null);
    }

    public ResultBean(int code, String msg, Object data, String debug) {
        this.data = data;
        this.code = code;
        this.msg = msg;
        this.debug = debug;
    }

    public ResultBean(int code, String msg, String debug) {
        this(code, msg, null, debug);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getDebug() {
        return debug;
    }

    public void setDebug(String debug) {
        this.debug = debug;
    }
}
