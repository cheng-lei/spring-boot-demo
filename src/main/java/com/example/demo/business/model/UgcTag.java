package com.example.demo.business.model;

import com.example.demo.framwork.base.BaseEntity;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Timestamp;


/**
 * Created by chaihaipeng.
 * Date: 2016/9/8
 * Time: 15:32
 * Desc: 标签审核实体,标签实体后续可能会扩展其他业务，所以此处
 * 未定义为HeadLineTag
 */
@Entity
@Table(name = "ugc_tag")
@Document(collection = "ugc_tag")
public class UgcTag extends BaseEntity {

    private Long businessId; //业务ID
    private Integer source;//区分业务方，1头条
    private String channel;//频道ID列表
    private String channelName;//频道名称列表
    private String localChannel;//通过channelName（运营频道名称）转换来的标签树根节点ID列表
    private String category;//类型标签ID列表，提审时带的原始数据
    private String tag;//内容标签，提审时带的原始数据
    private String editChannel;//编辑频道ID列表
    private String editChannelId;//编辑频道ID列表（转成短id）
    private String editCategory;//编辑类型标签ID列表
    private String editTag;//编辑内容标签
    private String displayChannel;//频道文本
    private String displayCategory;//编辑标签文本
    private String title;//标题
    private String content;//内容
    private String originalUrl;//源网站页面地址
    private Long siteId;//源网站ID
    private String siteName;//源网站名称
    private String pageUrl;//页面地址
    private Integer informMode;//回调模式
    private String callback;//回调地址
    private Long passageId;//通道Id
    private Long submitTime;//业务方提交时间
    private Integer auditStatus;//审核状态 0待审 1审核中 2已审核
    private Integer auditType = 1;//审核类型 1机审 2人审
    private String ext;//扩展字段
    private Long operatorId;//操作人ID
    private String operatorName;//审核人
    private Long auditCost;//首次出结果耗时，毫秒数
    private Long uploaderId;//头条号uid
    private Integer uploadType;//1自动抓取  2编辑写入 3写手写入 4套壳类型
    private Integer type;//素材类型 1新闻 2视频 3图集 4音频
    private Integer priority = 0;
    private Integer editorRecommendLevel = 1;//推荐等级	必选 100不推荐，0：低推荐 1：普通推荐 2:重点推荐 3:强烈推荐

    // 是否推荐(这里比较拗口，字段字面意思为拒绝推荐。
    // 当值为0的时候，表示不拒绝，即为推荐；当值为1的时候，表示拒绝推荐，即为不推荐)
    private Integer rejectRecommend = 0;

    //标签系统新增
    private Long qipuId;//奇谱ID
    private Integer preprocessType; //预处理标签类型：1:NLP标签 2：重庆标签团队人工 3：频道编辑标签
    private Integer processType; //处理标签类型：1:nlp1 2:nlp2 3:spider  100：人工处理
    private Integer qaStatus = 0;  //质检状态  0：未质检 1：质检中  2：已质检
    private Integer qaResult;   // 质检结果   1：优质标签  2：标签正确  3：问题标签
    private Timestamp handleTime;   //处理时间
    private Timestamp qaTime;   //质检时间
    private Long handleOperatorId;//处理人ID
    private String handleOperatorName;//处理人ID
    private Long qaOperatorId;//质检人ID
    private String qaOperatorName;//质检人姓名
    private Integer deleteFlag = 0;//删除位
    private Integer handleGroupType; //处理组别 ，重新选择通道时使用
    private Integer userType;//用户类型：1：版权合作用户 2：速审用户 3：免审用户 4：先发后审用户 5：泡泡免审用户

    //针对提审接口增加
    private String playUrl;  //主站播放地址
    private String preprocess;

    //针对接入ppc,pgc新增
    private String fantasyTitle;//吸睛标题
    private String promptDescription;//一句话推荐
    private String introduction;//简介
    //针对标签通道内的优先级添加
    private String openapiSource;//渠道来源
    private Integer copyrightInfo;//用户类型：原创达人（1）、搬运工（2）、拍客（3）、其他（4）
    //接入NLP新增，
    private Integer machineResult;//机审是否有结果   0:未机审  1：机审有结果   2：机审无结果

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public Integer getSource() {
        return source;
    }

    public void setSource(Integer source) {
        this.source = source;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public String getLocalChannel() {
        return localChannel;
    }

    public void setLocalChannel(String localChannel) {
        this.localChannel = localChannel;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getEditChannel() {
        return editChannel;
    }

    public void setEditChannel(String editChannel) {
        this.editChannel = editChannel;
    }

    public String getEditChannelId() {
        return editChannelId;
    }

    public void setEditChannelId(String editChannelId) {
        this.editChannelId = editChannelId;
    }

    public String getEditCategory() {
        return editCategory;
    }

    public void setEditCategory(String editCategory) {
        this.editCategory = editCategory;
    }

    public String getEditTag() {
        return editTag;
    }

    public void setEditTag(String editTag) {
        this.editTag = editTag;
    }

    public String getDisplayChannel() {
        return displayChannel;
    }

    public void setDisplayChannel(String displayChannel) {
        this.displayChannel = displayChannel;
    }

    public String getDisplayCategory() {
        return displayCategory;
    }

    public void setDisplayCategory(String displayCategory) {
        this.displayCategory = displayCategory;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }

    public Integer getInformMode() {
        return informMode;
    }

    public void setInformMode(Integer informMode) {
        this.informMode = informMode;
    }

    public String getCallback() {
        return callback;
    }

    public void setCallback(String callback) {
        this.callback = callback;
    }

    public Long getPassageId() {
        return passageId;
    }

    public void setPassageId(Long passageId) {
        this.passageId = passageId;
    }

    public Long getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Long submitTime) {
        this.submitTime = submitTime;
    }

    public Integer getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(Integer auditStatus) {
        this.auditStatus = auditStatus;
    }

    public Integer getAuditType() {
        return auditType;
    }

    public void setAuditType(Integer auditType) {
        this.auditType = auditType;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public Long getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Long operatorId) {
        this.operatorId = operatorId;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public Long getAuditCost() {
        return auditCost;
    }

    public void setAuditCost(Long auditCost) {
        this.auditCost = auditCost;
    }

    public Long getUploaderId() {
        return uploaderId;
    }

    public void setUploaderId(Long uploaderId) {
        this.uploaderId = uploaderId;
    }

    public Integer getUploadType() {
        return uploadType;
    }

    public void setUploadType(Integer uploadType) {
        this.uploadType = uploadType;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getEditorRecommendLevel() {
        return editorRecommendLevel;
    }

    public void setEditorRecommendLevel(Integer editorRecommendLevel) {
        this.editorRecommendLevel = editorRecommendLevel;
    }

    public Integer getRejectRecommend() {
        return rejectRecommend;
    }

    public void setRejectRecommend(Integer rejectRecommend) {
        this.rejectRecommend = rejectRecommend;
    }

    public Long getQipuId() {
        return qipuId;
    }

    public void setQipuId(Long qipuId) {
        this.qipuId = qipuId;
    }

    public Integer getPreprocessType() {
        return preprocessType;
    }

    public void setPreprocessType(Integer preprocessType) {
        this.preprocessType = preprocessType;
    }

    public Integer getProcessType() {
        return processType;
    }

    public void setProcessType(Integer processType) {
        this.processType = processType;
    }

    public Integer getQaStatus() {
        return qaStatus;
    }

    public void setQaStatus(Integer qaStatus) {
        this.qaStatus = qaStatus;
    }

    public Integer getQaResult() {
        return qaResult;
    }

    public void setQaResult(Integer qaResult) {
        this.qaResult = qaResult;
    }

    public Timestamp getHandleTime() {
        return handleTime;
    }

    public void setHandleTime(Timestamp handleTime) {
        this.handleTime = handleTime;
    }

    public Timestamp getQaTime() {
        return qaTime;
    }

    public void setQaTime(Timestamp qaTime) {
        this.qaTime = qaTime;
    }

    public Long getHandleOperatorId() {
        return handleOperatorId;
    }

    public void setHandleOperatorId(Long handleOperatorId) {
        this.handleOperatorId = handleOperatorId;
    }

    public String getHandleOperatorName() {
        return handleOperatorName;
    }

    public void setHandleOperatorName(String handleOperatorName) {
        this.handleOperatorName = handleOperatorName;
    }

    public Long getQaOperatorId() {
        return qaOperatorId;
    }

    public void setQaOperatorId(Long qaOperatorId) {
        this.qaOperatorId = qaOperatorId;
    }

    public String getQaOperatorName() {
        return qaOperatorName;
    }

    public void setQaOperatorName(String qaOperatorName) {
        this.qaOperatorName = qaOperatorName;
    }

    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public Integer getHandleGroupType() {
        return handleGroupType;
    }

    public void setHandleGroupType(Integer handleGroupType) {
        this.handleGroupType = handleGroupType;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public String getPlayUrl() {
        return playUrl;
    }

    public void setPlayUrl(String playUrl) {
        this.playUrl = playUrl;
    }

    public String getPreprocess() {
        return preprocess;
    }

    public void setPreprocess(String preprocess) {
        this.preprocess = preprocess;
    }

    public String getFantasyTitle() {
        return fantasyTitle;
    }

    public void setFantasyTitle(String fantasyTitle) {
        this.fantasyTitle = fantasyTitle;
    }

    public String getPromptDescription() {
        return promptDescription;
    }

    public void setPromptDescription(String promptDescription) {
        this.promptDescription = promptDescription;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getOpenapiSource() {
        return openapiSource;
    }

    public void setOpenapiSource(String openapiSource) {
        this.openapiSource = openapiSource;
    }

    public Integer getCopyrightInfo() {
        return copyrightInfo;
    }

    public void setCopyrightInfo(Integer copyrightInfo) {
        this.copyrightInfo = copyrightInfo;
    }

    public Integer getMachineResult() {
        return machineResult;
    }

    public void setMachineResult(Integer machineResult) {
        this.machineResult = machineResult;
    }
}
