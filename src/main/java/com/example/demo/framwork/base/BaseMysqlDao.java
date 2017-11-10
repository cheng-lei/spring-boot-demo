package com.example.demo.framwork.base;

import com.example.demo.framwork.config.mysql.CommonMapper;
import com.example.demo.framwork.page.Page;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

/**
 * Created by leicheng on 2017/10/20.
 */
public abstract class BaseMysqlDao<T> extends AbstractPropertyFilterService<T> implements CommonMapper<T> {

    @Autowired
    private CommonMapper<T> commonMapper;
    private Class<T> entityClass;

    public BaseMysqlDao() {
        this.entityClass = (Class) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    @Override
    public List<T> executeSelectSql(String sql) {
        return commonMapper.executeSelectSql(sql);
    }

    @Override
    public List<Map<String, Object>> executeSelectSqlResultMap(String sql) {
        return commonMapper.executeSelectSqlResultMap(sql);
    }

    @Override
    public long executeSelectCountSql(String sql) {
        return commonMapper.executeSelectCountSql(sql);
    }

    @Override
    public int executeUpdateSql(String sql) {
        return commonMapper.executeUpdateSql(sql);
    }

    @Override
    public int deleteByPrimaryKey(Object o) {
        return commonMapper.deleteByPrimaryKey(o);
    }

    @Override
    public int delete(T t) {
        return commonMapper.delete(t);
    }

    @Override
    public int insert(T t) {
        return commonMapper.insert(t);
    }

    @Override
    public int insertSelective(T t) {
        return commonMapper.insertSelective(t);
    }

    @Override
    public List<T> selectAll() {
        return commonMapper.selectAll();
    }

    @Override
    public T selectByPrimaryKey(Object o) {
        return commonMapper.selectByPrimaryKey(o);
    }

    @Override
    public int selectCount(T t) {
        return commonMapper.selectCount(t);
    }

    @Override
    public List<T> select(T t) {
        return commonMapper.select(t);
    }

    @Override
    public T selectOne(T t) {
        return commonMapper.selectOne(t);
    }

    @Override
    public int updateByPrimaryKey(T t) {
        return commonMapper.updateByPrimaryKey(t);
    }

    @Override
    public int updateByPrimaryKeySelective(T t) {
        return commonMapper.updateByPrimaryKeySelective(t);
    }

    @Override
    public int deleteByExample(Object o) {
        return commonMapper.deleteByExample(o);
    }

    @Override
    public List<T> selectByExample(Object o) {
        return commonMapper.selectByExample(o);
    }

    @Override
    public int selectCountByExample(Object o) {
        return commonMapper.selectCountByExample(o);
    }

    @Override
    public int updateByExample(T t, Object o) {
        return commonMapper.updateByExample(t, o);
    }

    @Override
    public int updateByExampleSelective(T t, Object o) {
        return commonMapper.updateByExampleSelective(t, o);
    }

    @Override
    public List<T> selectByExampleAndRowBounds(Object o, RowBounds rowBounds) {
        return commonMapper.selectByExampleAndRowBounds(o, rowBounds);
    }

    @Override
    public List<T> selectByRowBounds(T t, RowBounds rowBounds) {
        return commonMapper.selectByRowBounds(t, rowBounds);
    }

    @Override
    public int insertList(List<T> list) {
        return commonMapper.insertList(list);
    }

    @Override
    public int insertUseGeneratedKeys(T t) {
        return commonMapper.insertUseGeneratedKeys(t);
    }

    @Override
    public Page<T> findPageByPropertyFilters(Page<T> page, List<PropertyFilter> filters, String[] fieldArr) {
        if (page != null) {
            if (page.isAutoCount()) {
                long count = countByPropertyFilters(filters);
                page.setTotalCount(count);
            }
        }
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT ");
        if (ArrayUtils.isNotEmpty(fieldArr)) {
            boolean isFirst = true;
            for (String field : fieldArr) {
                if (StringUtils.isNotBlank(field)) {
                    if (isFirst) {
                        sql.append(field);
                        isFirst = false;
                    } else {
                        sql.append(",").append(field);
                    }
                }
            }
        } else {
            sql.append(" * ");
        }
        sql.append(" ").append(entityClass.getSimpleName()).append(PropertyFilter.buildQueryStringByPropertyFilter(filters));

        //构造排序参数
        if (page != null && page.isOrderBySetted()) {
            String[] orderByArray = StringUtils.split(page.getOrderBy(), ',');
            String[] orderArray = StringUtils.split(page.getOrder(), ',');
            Assert.isTrue(orderByArray.length == orderArray.length, "分页多重排序参数中,排序字段与排序方向的个数不相等");
            for (int i = 0; i < orderByArray.length; i++) {
                if (i == 0) {
                    sql.append(" order by ");
                } else {
                    sql.append(",");
                }
                sql.append(orderByArray[i]);
                sql.append(" ");
                if (Page.ASC.equals(orderArray[i])) {
                    sql.append(Page.ASC);
                } else {
                    sql.append(Page.DESC);
                }
            }
        }
        List<T> list = commonMapper.executeSelectSql(sql.toString());
        if (page == null) {
            page = new Page<>();
        }
        page.setResult(list);
        return page;
    }

    @Override
    public long countByPropertyFilters(List<PropertyFilter> filters) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT count(*) FROM ").append(entityClass.getSimpleName()).append(PropertyFilter.buildQueryStringByPropertyFilter(filters));
        return commonMapper.executeSelectCountSql(sql.toString());
    }
}
