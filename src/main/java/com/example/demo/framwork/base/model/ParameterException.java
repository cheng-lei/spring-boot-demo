package com.example.demo.framwork.base.model;

/**
 * Created by leicheng on 2017/11/10.
 */
public class ParameterException extends RuntimeException {

    public ParameterException() {
        super();
    }

    public ParameterException(String message) {
        super(message);
    }


    public ParameterException(String message, Throwable cause) {
        super(message, cause);
    }

}
