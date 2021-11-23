// 닉네임 중복 검사하고, 바뀐 닉네임으로 가입누르면 튕겨야 된다.
// 가입할때 이메일 바뀌었으면 다시 검사하라고 해야한다.

function moveMainpage() {
    location.href="/"
}


function nicknameChecker() {
    const nickname = $("#nickname").val();
    
    $.ajax({
        type: "GET",
        url: "/api/register",
        data: {
            nickname: nickname,
        },
        success: (res) => {
            if(res[msg]!=="success") {
                alert("중복된 닉네임입니다!");
                return;
            }
            alert("사용 가능한 닉네임입니다!");
            localStorage.setItem("nickname", nickname);
        }
    })
}


function registerSubmit() {
    const nickname = $("#nickname").val();
    const password = $("#password").val();
    const confirmPW = $("#password-check").val();

    let changeNickname = localStorage.getItem("nickname");
    if(changeNickname!==nickname) {
        alert("중복 검사를 해주세요!");
        return;
    }

    $.ajax({
        type: "POST",
        url: "/api/register",
        data: {
            nickname : nickname,
            password : password,
            confirmPW : confirmPW
        },
        success: (res) => {
            if(res['msg']!=="success") {
                alert('닉네임 혹은 비밀번호 양식을 지켜주세요!');
                return;
            } else {
                alert("회원가입 완료!");
                location.href="/login";
            }
        }
    })
}