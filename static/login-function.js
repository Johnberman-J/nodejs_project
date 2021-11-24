function moveRegisterpage() {
    location.href="/register"
}

function moveMainpage() {
    location.href="/"
}

function login() {
    const nickname = $("#nickname").val();
    const password = $("#password").val();

    $.ajax({
        type: "POST",
        url: "/data/login",
        // Headers: {
        //     type: 
        // },
        data: {
            nickname: nickname,
            password: password, 
        },
        success: (res) => {
            alert(res["msg"]);
        }
    })
}