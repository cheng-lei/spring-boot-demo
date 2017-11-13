package com.example.demo.framwork.base;

import com.example.demo.framwork.page.Page;

import java.util.Collection;
import java.util.List;

/**
 * Created by leicheng on 2017/10/23.
 */
public interface IBaseMongoDao<T> {

    /**
     * 单个保存
     *
     * @param entity
     * @return
     */
    T save(final T entity);

    /**
     * 批量保存
     *
     * @param entitys
     * @return
     */
    void saveOfBatch(final Collection<T> entitys);

    /**
     * 根据主键id删除
     *
     * @param id
     */
    void deleteById(final Long id);

    /**
     * 批量删除
     *
     * @param ids
     */
    void deleteOfBatch(Collection<Long> ids);

    /**
     * 删除实体
     *
     * @param entity
     */
    void delete(final T entity);

    /**
     * 根据id获取实体对象
     *
     * @param id
     * @return
     */
    T find(Long id);

    /**
     * 批量获取
     *
     * @param ids
     * @return
     */
    List<T> findOfMul(final Collection<Long> ids);

    /**
     * 更新,字段为空，则不进行更新
     *
     * @param t
     */
    void insert(T t);

    /**
     * 批量更新，字段为空，则不进行更新
     *
     * @param tList
     */
    void insertOfBatch(Collection<T> tList);

    Page<T> findMulByPage(Page<T> page, Collection<Long> ids);
}
