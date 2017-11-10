<%--
  Created by IntelliJ IDEA.
  User: leicheng
  Date: 2017/11/10
  Time: 11:10
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>QUI tree 基本示例</title>
    <link rel="stylesheet" href="http://static.qiyi.com/qui/0.5/css/qui.css">
    <link rel="stylesheet" type="text/css" href="../css-src/tree.css">
    <link rel="stylesheet" type="text/css" href="../data/tree/themes/custom-theme/style.css">
    <script charset="utf-8" type="text/javascript" src="http://static.qiyi.com/qui/0.5/js/qui.js"></script>
    <script>qui.config({ baseUrl:'../js-src'});</script>
    <!--<script>qui.config({ baseUrl:'dist/js'});</script>-->
</head>
<body>
TEST1fasfsd:${pageContext.request.contextPath},
TEST2:<%=request.getServletPath() %>
TEST2:<%=request.getRequestURI() %>
TEST2:<%= request.getContextPath() %>
<div class=" wrapper wrapper-tree">
    <div id="ContainerTree" class="container">
        <nav>
            <ol class="breadcrumb">
                <li><a href="./">Example Home</a></li>
                <li><a href="#">面包屑</a></li>
                <li class="active">QUI tree 基本示例</li>
            </ol>
        </nav>
        <div class="panel panel-default">
            <div class="panel-heading">QUI Tree 基本示例</div>
            <div class="panel-body tree-body">
                <!-- 设置节点图标的对话框 -->
                <div id="setIconDialog" title="设置节点图标">
                    <div class="icon-box" id="iconBox">
                    </div>
                </div>
                <!-- 主体 -->
                <form id="tipSample" class="form-horizontal" role="form">
                    <div class="form-group">
                        <div class="col-xs-3">
                            <div class="search-box">
                                <input id="search" type="text" class="form-control" placeholder="搜索电视台" aria-describedby="sizing-addon2">
                                <span id="searchedNodeNumber" class="label label-default searched-node-num"></span>
                            </div>
                            <hr class="line" />
                            <div id="TVTree" class="jstree">
                            </div>
                        </div>
                        <div class="col-xs-9">
                            <div id="tvInfo" class="tv-info">
                                <img class="tv-logo" src="./data/tree/tv-logo/mid/no_tv.png">
                                <span class="tv-name">无电视台</span>
                                <span>- 今日节目信息</span>
                            </div>
                            <div class="tv-program-grid">
                                <table id="TVGrid">
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    qrequire(['tree'], function(build) {
        $(function() {
            var URI = "<%=request.getRequestURI() %>";
            console.log("URI:"+URI);
            console.log("root url:"+getRootPath());
            Tree.Action.run('', {
                $container: $('#ContainerTree')
            });
        });
    });
    //js获取项目根路径，如： http://localhost:8083/uimcardprj
    function getRootPath(){
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath=window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht=curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        return(localhostPaht+projectName);
    }
</script>
</body>
</html>

