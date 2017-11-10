package com.example.demo.framwork.base;

import com.example.demo.framwork.page.Page;
import com.example.demo.framwork.utils.reflect.ReflectionUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.util.Assert;

import javax.persistence.Id;
import javax.persistence.Transient;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.List;

/**
 * Created by leicheng on 2017/10/12.
 */
public abstract class BaseMongoDao<T> extends AbstractPropertyFilterService<T> implements IBaseMongoDao<T> {


    protected static final String KEY_SUFFIC = "_primaryKey";

    @Autowired
    protected MongoTemplate mongoTemplate;

    protected Class<T> entityClass;

    protected String primaryKey = "id";

    public BaseMongoDao() {
        this.entityClass = (Class) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        try {
            Field pk = this.entityClass.getDeclaredField(primaryKey);
            if (pk == null || !pk.isAnnotationPresent(Id.class)) {
                Field[] fields = this.entityClass.getDeclaredFields();

                for (Field field : fields) {
                    if (field.isAnnotationPresent(Transient.class)) {
                        continue;
                    }
                    //获取主键名
                    if (field.isAnnotationPresent(Id.class)) {
                        // 取得ID的列名
                        primaryKey = field.getName();
                    }
                }
            }
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Page<T> findPageByPropertyFilters(Page<T> page, List<PropertyFilter> filters, String[] fieldArr) {
        //TODO:实现mongodb的逻辑
        Query query = SpringDataMongoUtils.buildQueryByPropertyFilter(page, filters, fieldArr);
        List<T> list = mongoTemplate.find(query, this.entityClass);
        if (page == null) {
            page = new Page<>(Integer.MAX_VALUE);
        }
        page.setResult(list);
        return page;
    }

    @Override
    public long countByPropertyFilters(List<PropertyFilter> filters) {
        Query query = SpringDataMongoUtils.buildQueryByPropertyFilter(filters, null);
        return mongoTemplate.count(query, this.entityClass);
    }

    @Override
    public T save(T entity) {
        Object pkVal = ReflectionUtils.invokeGetterMethod(entity, primaryKey);
        if (pkVal == null) {
            ReflectionUtils.invokeSetterMethod(entity, primaryKey, generateKey());
        }
        mongoTemplate.save(entity);
        return entity;
    }

    /**
     * 获取collectionName
     *
     * @return
     */
    private String _collectionName() {
        //获取映射数据库表名的注解
        Document document = this.entityClass.getAnnotation(Document.class);
        if (null == document || StringUtils.isEmpty(document.collection())) {
            return "_" + this.entityClass.getSimpleName();
        }
        return document.collection();

    }

    /**
     * 主键自动增长
     *
     * @return
     */
    public Long generateKey() {
        QueryBuilder queryBuilder = new QueryBuilder();
        Criteria where = Criteria.where("_id").is(_collectionName() + KEY_SUFFIC);
        queryBuilder.addWhere(where);
        Update update = new Update();
        update.inc("counter", 1);
        return mongoTemplate.findAndModify(queryBuilder.builder(), update,
                FindAndModifyOptions.options().returnNew(true).upsert(true),
                MongoKey.class).getCounter();
    }

    @Override
    public void saveOfBatch(Collection<T> entitys) {
        if (CollectionUtils.isNotEmpty(entitys)) {
            for (T t : entitys) {
                save(t);
            }
        }
    }

    @Override
    public void deleteById(Long id) {
        mongoTemplate.remove(find(id));
    }

    @Override
    public void deleteOfBatch(Collection<Long> ids) {
        if (CollectionUtils.isNotEmpty(ids)) {
            mongoTemplate.findAndRemove(Query.query(Criteria.where(primaryKey).in(ids)), this.entityClass);
        }
    }

    @Override
    public void delete(T entity) {
        mongoTemplate.remove(entity);
    }

    @Override
    public T find(Long id) {
        return mongoTemplate.findById(id, this.entityClass);
    }

    @Override
    public List<T> findOfMul(Collection<Long> ids) {
        return mongoTemplate.find(Query.query(Criteria.where(primaryKey).in(ids)), this.entityClass);
    }

    @Override
    public void insert(T t) {
        mongoTemplate.insert(t);
    }

    @Override
    public void insertOfBatch(Collection<T> tList) {
        mongoTemplate.insert(tList, this.entityClass);
    }

    /**
     * 批量获取并且按Page来排序
     * add 2016-12-21
     *
     * @param ids  主键
     * @param page 用来排序
     * @return
     */
    public Page<T> findMulByPage(Page<T> page, Collection<Long> ids) {
        Assert.notNull(ids, "id列表不能为空");
        List<T> tList = findOfMul(ids);
        page.setResult(tList);
        page.setTotalCount(tList.size());
        return page;
    }

}
