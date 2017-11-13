package com.example.demo.framwork.base.model;

/**
 * Created by leicheng on 2017/11/10.
 */
public class BusinessException extends RuntimeException {

    public BusinessException() {
        super();
    }

    public BusinessException(String message) {
        super(message);
    }
    
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }

}
