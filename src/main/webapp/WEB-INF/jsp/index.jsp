<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/bootstrap-table.css">


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<h1>Hello, world!${ctx}</h1>
<div class="panel-body">
    <div id="toolbar"></div>
    <table id="dataTable"></table>
</div>


<script src="../js/jquery-3.1.1.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/bootstrap-table.js"></script>
<!-- put your locale files after bootstrap-table.js -->
<script src="../js/bootstrap-table-zh-CN.min.js"></script>
<script>
    $('#dataTable').bootstrapTable({
        url:"/users3/all",
        pagination:true,
        striped: true,
        showRefresh:true,
        toolbar:"#toolbar",
        paginationVAlign:"both",
        columns: [{
            field: 'id',
            title: 'ID'
        }, {
            field: 'name',
            title: '名称'
        }, {
            field: 'age',
            title: '年龄'
        }]
    });
</script>
</body>
</html>