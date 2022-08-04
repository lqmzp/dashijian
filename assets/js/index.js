function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        data: '',
        success: (res) => {
            if (res.status !== 0) return layui.layer.msg("数据请求失败！");
            // console.log(res);
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
    });
}

const renderAvatar = (data) => {
    let name = data.nickname || data.username;
    // 设置欢迎文本
    // console.log(name);
    $("#welcome").html(`欢迎 ${name}`);
    // 按需渲染用户头像
    if (data.user_pic !== null) {
        // 渲染图片头像

        $(".layui-nav-img").attr("src", data.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName);
    }
}
$('#exitBtn').on('click', function () {
    console.log(1);
    layui.layer.confirm('确定退出？', { icon: 3, title: '' }, function () {
        location.href = '/login.html'
        localStorage.removeItem("token");
    })
})
getUserInfo()