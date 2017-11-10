<%--
  Created by IntelliJ IDEA.
  User: leicheng
  Date: 2017/11/9
  Time: 17:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>grid表格开发示例</title>

    <link rel="shortcut icon" href="http://qui.qiyi.domain/images/title_03.png" type="image/x-icon">

    <!-- // QUI开发模式，指向js-src下，然后本地可以通过proxy代理到trunk的qui src目录 -->
    <link media="all" type="text/css" href="http://static.qiyi.com/qui/0.5/css/qui.css" rel="stylesheet">
    <!-- // QUI开发模式，指向css-src下，放在qui之下 -->
    <link href="../css-src/table.css" rel="stylesheet">
    <script charset="utf-8" type="text/javascript" src="http://static.qiyi.com/qui/0.5/js/qui.js"></script>

    <!-- // QUI直接引用压缩合并后的代码模式 -->
    <!--<script type="text/javascript" src="dist/js/qui.js"></script>-->

    <script>
        qui.config(
            {
                // 上线模式，指向压缩合并后的地址(一般是线上某个路径)
                // baseUrl: './dist/js'

                // 开发模式
                baseUrl: '../js-src'
            }
        );
    </script>
</head>
<body>
<div class=" wrapper wrapper-table">
    <div  id="ContainerTable" class="container">
        <nav>
            <ol class="breadcrumb">
                <li><a href="./">Example Home</a></li>
                <li><a href="#">面包屑</a></li>
                <li class="active">QUI grid 表格示例</li>
            </ol>
        </nav>
        <div class="panel panel-default">
            <div class="panel-heading">使用Arm进行开发的jqGrid简单样例</div>
            ${pageContext.request.contextPath}hh
            <div class="panel-body">

                <form class="form-horizontal query-form" id="QueryForm" role="form">
                    <div class="form-group">
                        <label class="col-md-1 control-label">雇员 <span class="form-must">*</span></label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" name="name" placeholder="name">
                        </div>
                        <div class="col-md-1">
                            <input type="text" class="form-control" name="id" placeholder="id">
                        </div>
                        <div class="col-md-3">
                            <label class="col-md-4 control-label">性别：</label>
                            <div class="col-md-6">
                                <select class="form-control col-md-2" name="sex">
                                    <option value="">请选择</option>
                                    <option value="1">男</option>
                                    <option value="0">女</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <label class="col-md-2 control-label">技能：</label>
                            <div class="col-md-10">
                                <input type="text" class="form-control skill" name="skill" placeholder="">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-6">
                            <button type="button" class="btn btn-info" id="BtnRemove">
                                删除
                            </button>
                            &nbsp;
                            <button type="button" class="btn btn-primary" id="BtnQuery">
                                查询
                            </button>
                            &nbsp;
                            <a type="button" class="btn btn-success" href="./table.html?id=9000&sex=1&name=李同学&skill=Java,C">查看我的信息</a>
                        </div>
                    </div>

                </form>

            </div>
        </div>

        <form class="form-horizontal" id="ModifyForm" title="修改雇员信息" onsubmit="javascript:return false;" style="display:none;" role="form">
        </form>

        <div class="user-grid-container">
            <table id="UserGrid">
            </table>
            <div id="Pager"></div>
        </div>

    </div>
</div>

<script type="text/x-jquery-tmpl" id="ModifyDataTemplate">
      <div class="form-group col-sm-12">
        <label for="id" class="col-sm-2 control-label">ID：</label>
        <div class="col-sm-5">
          <input type="email" class="form-control input-sm" value="${value}" readonly name="id" placeholder="ID">
        </div>
      </div>
      <div class="form-group col-sm-12">
        <label for="name" class="col-sm-2 control-label">姓名：</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" name="name" placeholder="Name">
        </div>
      </div>
      <div class="form-group col-sm-12">
        <label for="name" class="col-sm-2 control-label">性别：</label>
        <div class="col-sm-5">
        <label class="radio-inline">
          <input type="radio" name="sex" value="1"> 男
        </label>
        <label class="radio-inline">
          <input type="radio" name="sex" value="0"> 女
        </label>
        </div>
      </div>
      <div class="form-group col-sm-12">
        <label for="skill" class="col-sm-2 control-label">技能：</label>
        <div class="col-sm-5">
          <input type="text" class="form-control skill" name="skill" placeholder="skill">
        </div>
      </div>
</script>
<script>
    // require module and begining run
    qrequire(['table'], function() {
        $(function() {
            // console.log('run start...');
            Table.Action.run('', {
                $container: $('#ContainerTable')
            });
        });
    });
</script>
</body>
</html>
