package com.example.demo.framwork.base;

import com.example.demo.framwork.page.Page;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.Assert;

import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * spring-data-mongo与查询相关参数转换。
 * User: zhouqin
 * Date: 13-11-22
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */
public class SpringDataMongoUtils {
    static final String REPLACE_STR = "?";

    /**
     * 根据matchType 返回相应的 Criteria
     *
     * @param propertyName
     * @param matchValue
     * @param matchType
     * @return
     */
    public static Criteria getMongoDbOperatorByFilterMatchType(String propertyName, Object matchValue, PropertyFilter.MatchType matchType) {
        Criteria where = where(propertyName);
        switch (matchType) {
            case EQ:
                where.is(matchValue);
                break;
            case NEQ:
                where.ne(matchValue);
                break;
//            case LIKE:
//                break;
            case LE:
                where.lte(matchValue);
                break;
            case LT:
                where.lt(matchValue);
                break;
            case GE:
                where.gte(matchValue);
                break;
            case GT:
                where.gt(matchValue);
                break;
            case IN:
                List<Long> list = new ArrayList<>();
                String[] valueArray = matchValue.toString().split(",");
                for (String singleValue : valueArray) {
                    list.add(Long.valueOf(singleValue));
                }
                where.in(list);

        }
        return where;
    }

    /**
     * 根据filter 返回相应的 Criteria
     *
     * @param filter
     * @return
     */
    public static Criteria getCriteriaByFilter(PropertyFilter filter) {
        Criteria criteria = null;
        if (!filter.hasMultiProperties()) { //只有一个属性需要比较的情况.
            criteria = getMongoDbOperatorByFilterMatchType(filter.getPropertyName().equals("id") ? "_id" : filter.getPropertyName(), filter.getMatchValue(), filter.getMatchType());
        } else {//包含多个属性需要比较的情况,进行or处理.
            List<Criteria> orList = new ArrayList<Criteria>();
            for (String param : filter.getPropertyNames()) {
                orList.add(getMongoDbOperatorByFilterMatchType(param, filter.getMatchValue(), filter.getMatchType()));
                if (criteria == null) {
                    criteria = getMongoDbOperatorByFilterMatchType(param, filter.getMatchValue(), filter.getMatchType());
                } else {
                    criteria.orOperator(getMongoDbOperatorByFilterMatchType(param, filter.getMatchValue(), filter.getMatchType()));
                }
            }
            criteria = new Criteria().orOperator(orList.toArray(new Criteria[]{}));
        }
        return criteria;
    }

    /*
     * 暂不支持类似 like操作和原生json操作。
     * 按属性条件列表创建Query,辅助函数.
     *
     * @param page    Page<T>
     * @param filters 过滤条件
     * @return Query
     */
    public static Query buildQueryByPropertyFilter(final Page page, final List<PropertyFilter> filters, final String[] fields) {
        //先假定filters 个数大于1
        List<Criteria> criterias = new ArrayList<Criteria>();
        if (null != filters) {
            for (PropertyFilter filter : filters) {
                criterias.add(getCriteriaByFilter(filter));
            }
        }
        //构造排序参数
        Criteria criteria = criterias.size() > 0 ? new Criteria().andOperator(criterias.toArray(new Criteria[]{})) : null;
        QueryBuilder queryBuilder = new QueryBuilder();
        queryBuilder.setPage(page.getPageNo());
        queryBuilder.setPageSize(page.getPageSize());
        queryBuilder.addWhere(criteria);
        if (ArrayUtils.isNotEmpty(fields)) {
            queryBuilder.addIncludeFields(fields);
        }
        if (page.isOrderBySetted()) {
            String[] orderByArray = StringUtils.split(page.getOrderBy(), ',');
            String[] orderArray = StringUtils.split(page.getOrder(), ',');

            Assert.isTrue(orderByArray.length == orderArray.length, "分页多重排序参数中,排序字段与排序方向的个数不相等");

            for (int i = 0; i < orderByArray.length; i++) {
                String orderByStr = orderByArray[i];
                if (orderByStr.equals("id")) {
                    orderByStr = "_id";
                }
                if (Page.ASC.equals(orderArray[i])) {
                    queryBuilder.addAscSort(orderByStr);
                } else {
                    queryBuilder.addDescSort(orderByStr);
                }
            }
        }
        return queryBuilder.builder();
    }

    /**
     * build
     *
     * @param filters
     * @param fields
     * @return
     */
    public static Query buildQueryByPropertyFilter(final List<PropertyFilter> filters, final String[] fields) {
        //先假定filters 个数大于1
        List<Criteria> criterias = new ArrayList<Criteria>();
        if (null != filters) {
            for (PropertyFilter filter : filters) {
                criterias.add(getCriteriaByFilter(filter));
            }
        }
        //构造排序参数
        Criteria criteria = criterias.size() > 0 ? new Criteria().andOperator(criterias.toArray(new Criteria[]{})) : null;
        QueryBuilder queryBuilder = new QueryBuilder();
        queryBuilder.addWhere(criteria);
        if (ArrayUtils.isNotEmpty(fields)) {
            queryBuilder.addIncludeFields(fields);
        }

        return queryBuilder.builder();
    }

    /**
     * “？”替换工具
     *
     * @param queryPattern
     * @param objects
     * @return
     */
    public static String format(String queryPattern, Object[] objects) {
        StringBuilder rs = new StringBuilder();
        int b = 0;
        int index;
        for (int L = 0; L < objects.length; L++) {
            index = queryPattern.indexOf(REPLACE_STR, b);
            if (index == -1) {
                throw new IllegalArgumentException("queryPattern:\"" + queryPattern + "\" can't match ?'s number");
            }
            rs.append(queryPattern.substring(b, index));
            rs.append(obj2String(objects[L]));
            b = index + 1;
        }

        if (queryPattern.indexOf(REPLACE_STR, b) > 1) {
            throw new IllegalArgumentException("queryPattern:\"" + queryPattern + "\" can't match ?'s number");
        }
        rs.append(queryPattern.substring(b, queryPattern.length()));
        return rs.toString();
    }

    public static String obj2String(Object o) {
        if (null == o) {
            return "";
        }

        if (o instanceof Date) {
            Date d = (Date) o;
            SimpleDateFormat format =
                    new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            format.setCalendar(new GregorianCalendar(new SimpleTimeZone(0, "GMT")));
            return "\"" + format.format(d) + "\"";
        }

        return o.toString();
    }

    public static BasicQuery format2Query(String queryPattern, Object[] objects) {
        return new BasicQuery(format(queryPattern, objects));
    }

}
