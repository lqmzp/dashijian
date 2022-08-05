// 获取 表格数据
const initArtCateList = () => {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: (res) => {
            // 调用 template
            const { status, message, data } = res
            const htmlStr = template("tpl-table", data);
            $("tbody").empty().html(htmlStr);
        },
    });
};

initArtCateList();
let indexAdd = null
$('#addBtn').click(function () {
    indexAdd = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
    })
})
// 通过代理监听 submit 事件
$("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $(this).serialize(),
        success: (res) => {
            const { status, message } = res
            layer.msg(message);
            if (status !== 0) return
            initArtCateList();
            layer.close(indexAdd);
        },
    });
});
const form = layui.form;
$("#tb").on("click", ".btn-edit", function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "修改文章分类",
        content: $("#dialog-edit").html(),
    })
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'GET',
        url: "/my/article/cates/" + id,
        success: res => {
            const { status, message, data } = res
            if (status !== 0) return layer.msg(message)
            console.log(data);
            form.val("form-edit", data);
            // initArtCateList();
        }
    })
});
// 更新文章分类
$("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: (res) => {
            const { status, message } = res
            layer.msg(message);
            if (status !== 0) return
            layer.close(indexEdit);
            initArtCateList();
        },
    });
});
// 删除文章分类
$("#tb").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-id");
    // 提示用户是否删除
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
        $.ajax({
            method: "GET",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("删除分类失败！");
                }
                layer.msg("删除分类成功！");
                layer.close(index);
                initArtCateList();
            },
        });
    });
});