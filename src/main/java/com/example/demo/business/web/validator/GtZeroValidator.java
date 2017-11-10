package com.example.demo.business.web.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class GtZeroValidator implements ConstraintValidator<GtZero, Object> {

    @Override
    public void initialize(GtZero gtZero) {
    }

    @Override
    public boolean isValid(Object s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null) {
            return false;
        }
        try {
            Long l = Long.parseLong(s.toString());
            if (l != null && l.longValue() > 0) {
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }
}