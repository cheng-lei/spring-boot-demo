package com.example.demo.framwork.base;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhouqin
 * @date 2013-11-12
 */
public class QueryBuilder<T>{
    //分页条件相关
	private Integer page;
	private Integer pageSize = 20;
	private List<Order> orders = new ArrayList<Order>();
	private Query query;

    public QueryBuilder(){
        query = new Query();
    }

    /**
     * 支持原生json查询
     * @param baseQuery
     */
    public QueryBuilder(String baseQuery){
        query = new BasicQuery(baseQuery);
    }

    /**
     * 支持原生json查询&查询条件替换
     * ex baseQuery  { age : { $lt : ? }, name : '?' }
     * objs new object[]{111,"bill"}
     * @param baseQuery
     */
    public QueryBuilder(String baseQuery, Object[] objs){
        query = SpringDataMongoUtils.format2Query(baseQuery, objs);
    }

	public QueryBuilder addAscSort(String property){
		orders.add(new Order(Direction.ASC,property));
		return this;
	}
	
	public QueryBuilder addDescSort(String property){
		orders.add(new Order(Direction.DESC,property));
		return this;
	}
	
	public QueryBuilder setPage(int page){
		this.page = page;
		return this;
	}
	
	public QueryBuilder setPageSize(int pageSize){
		this.pageSize = pageSize;
		return this;
	}

    /**
     * 增加where条件
     * @param criteria
     * @return
     */
	public QueryBuilder addWhere(Criteria criteria){
        if(null!=criteria){
		    query.addCriteria(criteria);
        }
		return this;
	}

    /**
     * 确定单值查询字段
     * @param field
     * @return
     */
    public QueryBuilder addIncludeField(String field){
        query.fields().include(field);
        return this;
    }

    /**
     * 确定单值查询字段
     * @param fields
     * @return
     */
    public QueryBuilder addIncludeFields(String[] fields){
        for(String field:fields){
            query.fields().include(field);
        }
        return this;
    }

	public Query builder(){
		if(null!=page){
            if(page<1){
                throw new IllegalArgumentException("page must gt 0");
            }
			query.limit(pageSize).skip((page-1)*this.pageSize);
		}
		if(!orders.isEmpty()){
			query.with(new Sort(orders));
		}
		return query;
	}
    //分页结果相关
    private Long count;
    private List<T> list;
    public boolean isSuccess = true;
    public String errMsg;

    public QueryBuilder setCount(Long count) {
        this.count = count;
        return this;
    }

    public List<T> getList() {
        return list;
    }

    public QueryBuilder setList(List<T> list) {
        this.list = list;
        return this;
    }

    public QueryBuilder setSuccess(boolean success) {
        isSuccess = success;
        return this;
    }

    public QueryBuilder setErrMsg(String errMsg) {
        this.errMsg = errMsg;
        return this;
    }

    public Result<T> builderResult(){
        return new Result<T>().setPage(this.page).setPageSize(this.pageSize)
                .setCount(this.count).setSuccess(this.isSuccess).setList(this.list)
                .setErrMsg(this.errMsg);
    }

    public static class Result<T>{
        public boolean isSuccess = true;
        private Integer page;
        private Integer pageSize;
        private Long count;
        private List<T> list;
        public String errMsg;
        public boolean isSuccess() {
            return isSuccess;
        }

        public Result<T> setSuccess(boolean success) {
            isSuccess = success;
            return this;
        }

        public Integer getPage() {
            return page;
        }

        /**
         * 当前页面数
         * @param page
         * @return
         */
        public Result<T> setPage(Integer page) {
            this.page = page;
            return this;
        }

        /**
         * 此查询条件下共有page数
         * @return
         */
        public Long getPageCount() {
            return count/pageSize + ((count%pageSize>1)?1L:0L);
        }

        /**
         * 当前页面size
         * @return
         */
        public Integer getPageSize(){
            return this.pageSize;
        }

        public Result<T> setPageSize(Integer pageSize) {
            this.pageSize = pageSize;
            return this;
        }

        public Long getCount() {
            return count;
        }

        public Result<T> setCount(Long count) {
            this.count = count;
            return this;
        }

        public List<T> getList() {
            return list;
        }

        public Result<T> setList(List<T> list) {
            this.list = list;
            return this;
        }

        public String getErrMsg() {
            return errMsg;
        }

        public Result<T> setErrMsg(String errMsg) {
            this.errMsg = errMsg;
            return this;
        }
    }
}
