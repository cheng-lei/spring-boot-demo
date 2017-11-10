package com.example.demo.framwork.base;

import com.example.demo.framwork.base.PropertyFilter;
import com.example.demo.framwork.page.Page;
import org.apache.commons.collections.CollectionUtils;

import java.util.List;

/**
 * Created by leicheng on 2017/10/20.
 */
public abstract class AbstractPropertyFilterService<T> {

    public List<T> findByPropertyFilters(List<PropertyFilter> filters, String[] fieldArr) {
        Page<T> page = findPageByPropertyFilters(null, filters, fieldArr);
        return page.getResult();
    }

    public List<T> findByPropertyFilters(List<PropertyFilter> filters) {
        return findByPropertyFilters(filters, null);
    }

    public Page<T> findPageByPropertyFilters(Page<T> page, List<PropertyFilter> filters) {
        return findPageByPropertyFilters(page, filters, null);
    }

    public T findOneByPropertyFilters(List<PropertyFilter> filters, String[] fieldArr) {
        List<T> list = findByPropertyFilters(filters, fieldArr);
        if (CollectionUtils.isNotEmpty(list)) {
            return list.get(0);
        }
        return null;
    }

    public abstract Page<T> findPageByPropertyFilters(Page<T> page, List<PropertyFilter> filters, String[] fieldArr);


    public abstract long countByPropertyFilters(List<PropertyFilter> filters);

}
