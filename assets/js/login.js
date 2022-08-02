$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})
$('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})
const form = layui.form;

form.verify({
    repwd: (val) => {
        const pwd = $(".reg-box [name=password").val();
        if (pwd !== val) return "两次密码不一致"
    }
    , password: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ]
});
// const layer = layui.layer;
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data: data,
        success: res => {
            const { message, status } = res
            if (status !== 0) return layer.msg(message)
            $('#link_login').click()
        }
    })
})
$("#form_login").on('submit', function (e) {
    const data = $(this).serialize()
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: data,
        success: res => {
            const { message, status, token } = res
            if (status !== 0) return layer.msg(message)
            // $('#link_login').click()
            localStorage.setItem("token", token);
            // 跳转到主页
            location.href = "/index.html";
        }
    })
})