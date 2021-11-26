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
        data: {
            nickname: nickname,
            password: password, 
        },
        success: (res) => {
            console.log(res["nickname"]);
            if(!res["msg"]) {
                alert("로그인 성공!")
                localStorage.setItem("token",res["token"]);
                localStorage.setItem("userID",res["nickname"]);
                location.href="/"
            } else {
                alert(res["msg"]);
            }           
        }
    })
}