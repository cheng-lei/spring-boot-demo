package com.example.demo.framwork.base;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Assert;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 与具体ORM实现无关的属性过滤条件封装类, 主要记录页面中简单的搜索过滤条件.
 */
public class PropertyFilter {

    /**
     * 多个属性间OR关系的分隔符.
     */
    public static final String OR_SEPARATOR = "_OR_";

    /**
     * 属性比较类型.
     */
    public enum MatchType {
        EQ, LIKE, ENDLIKE, STARTLIKE, LT, GT, LE, GE, NEQ, IN, NIN;
    }

    /**
     * 属性数据类型.
     */
    public enum PropertyType {
        S(String.class), I(Integer.class), L(Long.class), N(Double.class), D(Date.class), B(Boolean.class), T(Timestamp.class), F(Float.class), Q(java.sql.Date.class);

        private Class<?> clazz;

        private PropertyType(Class<?> clazz) {
            this.clazz = clazz;
        }

        public Class<?> getValue() {
            return clazz;
        }
    }

    private MatchType matchType = null;
    private Object matchValue = null;

    private Class<?> propertyClass = null;
    private String[] propertyNames = null;

    /**
     * default 构造函数
     */
    public PropertyFilter() {
    }

    /**
     * 构造函数
     *
     * @param filterName 比较属性字符串,含待比较的比较类型、属性值类型及属性列表.
     *                   eg. LIKES_NAME_OR_LOGIN_NAME
     * @param value      待比较的值.
     */
    public PropertyFilter(final String filterName, final String value) {
        String firstPart = StringUtils.substringBefore(filterName, "_");//likeS
        String matchTypeCode = StringUtils.substring(firstPart, 0, firstPart.length() - 1);//like
        String propertyTypeCode = StringUtils.substring(firstPart, firstPart.length() - 1, firstPart.length());//S

        try {
            matchType = Enum.valueOf(MatchType.class, matchTypeCode);//like
        } catch (RuntimeException e) {
            throw new IllegalArgumentException("filter名称" + filterName + "没有按规则编写,无法得到属性比较类型.", e);
        }

        try {
            propertyClass = Enum.valueOf(PropertyType.class, propertyTypeCode).getValue();//string
        } catch (RuntimeException e) {
            throw new IllegalArgumentException("filter名称" + filterName + "没有按规则编写,无法得到属性值类型.", e);
        }

        String propertyNameStr = StringUtils.substringAfter(filterName, "_");//NAME_OR_LOGIN_NAME
        Assert.isTrue(StringUtils.isNotBlank(propertyNameStr), "filter名称" + filterName + "没有按规则编写,无法得到属性名称.");
        propertyNames = StringUtils.splitByWholeSeparator(propertyNameStr, PropertyFilter.OR_SEPARATOR);//name,login_name
        this.matchValue = ConvertUtils.convert(value, propertyClass);
    }

    /**
     * 获取比较值的类型.
     *
     * @return propertyClass
     */
    public Class<?> getPropertyClass() {
        return propertyClass;
    }

    /**
     * 获取比较方式.
     *
     * @return matchType
     */
    public MatchType getMatchType() {
        return matchType;
    }

    /**
     * 获取比较值.
     *
     * @return matchValue
     */
    public Object getMatchValue() {
        return matchValue;
    }

    /**
     * 获取比较属性名称列表.
     *
     * @return propertyNames
     */
    public String[] getPropertyNames() {
        return propertyNames;
    }

    /**
     * 获取唯一的比较属性名称.
     *
     * @return 返回propertyNames数组第一个属性名称
     */
    public String getPropertyName() {
        Assert.isTrue(propertyNames.length == 1, "There are not only one property in this filter.");
        return propertyNames[0];
    }

    /**
     * 是否比较多个属性.
     *
     * @return true：多个属性，false：1个属性
     */
    public boolean hasMultiProperties() {
        return (propertyNames.length > 1);
    }

    public static List<PropertyFilter> convertMapToFilters(Map<String, String> filterParamMap) {
        List<PropertyFilter> filterList = new ArrayList<PropertyFilter>();
        //分析参数Map,构造PropertyFilter列表
        for (Map.Entry<String, String> entry : filterParamMap.entrySet()) {
            String filterName = entry.getKey();
            String value = entry.getValue();
            //如果value值为空,则忽略此filter.
            if (StringUtils.isNotBlank(value)) {
                PropertyFilter filter = new PropertyFilter(filterName, value);
                filterList.add(filter);
            }
        }
        return filterList;
    }

    /**
     * 按属性条件列表创建查询语句
     *
     * @param filters
     * @return
     */
    public static String buildQueryStringByPropertyFilter(final List<PropertyFilter> filters) {
        StringBuilder sb = new StringBuilder();
        sb.append(" WHERE 1=1 ");
        for (PropertyFilter filter : filters) {
            if (!filter.hasMultiProperties()) { //只有一个属性需要比较的情况.
                sb.append(" and ");
                sb.append(filter.getPropertyName());
                sb.append(" ");
                if (filter.getMatchType() == PropertyFilter.MatchType.IN) {
                    sb.append("in ( ").append(filter.getMatchValue()).append(" ) ");
                    continue;
                } else {
                    sb.append(getSQLOperatorByFilterMatchType(filter.getMatchType()));
                }
                if (filter.getMatchType() == PropertyFilter.MatchType.LIKE) {
                    sb.append("%" + filter.getMatchValue() + "% ");
                } else {
                    sb.append(filter.getMatchValue());
                }
            } else {//包含多个属性需要比较的情况,进行or处理.
                sb.append(" and ( ");
                int i = 0;
                for (String param : filter.getPropertyNames()) {
                    if (i > 0) sb.append(" or ");
                    sb.append(param);
                    sb.append(" ");
                    sb.append(getSQLOperatorByFilterMatchType(filter.getMatchType()));
                    if (filter.getMatchType() == PropertyFilter.MatchType.LIKE) {
                        sb.append("%" + filter.getMatchValue() + "%");
                    } else {
                        sb.append(filter.getMatchValue());
                    }
                    i++;
                }
                sb.append(" ) ");
            }
        }
        return sb.toString();
    }

    /**
     * 判断MatchType的类型，返回sql操作字符串
     *
     * @param matchType MatchType
     * @return 操作的字符串
     */
    public static String getSQLOperatorByFilterMatchType(PropertyFilter.MatchType matchType) {
        String operator = "";
        //根据MatchType构造criterion
        switch (matchType) {
            case EQ:
                operator = "=";
                break;
            case NEQ:
                operator = "!=";
                break;
            case LIKE:
                operator = "like";
                break;

            case LE:
                operator = "<=";
                break;
            case LT:
                operator = "<";
                break;
            case GE:
                operator = ">=";
                break;
            case GT:
                operator = ">";
        }
        return operator;
    }

}
