// 닉네임 중복 검사하고, 바뀐 닉네임으로 가입누르면 튕겨야 된다.
// 가입할때 이메일 바뀌었으면 다시 검사하라고 해야한다.

function moveMainpage() {
    location.href="/"
}


// function nicknameChecker() {
//     const nickname = $("#nickname").val();
//     localStorage.setItem("nickname", nickname);

// let changeNickname = localStorage.getItem("nickname");
// if(changeNickname!==nickname) {
//     alert("중복 검사를 해주세요!");
//     return;
// }
//     $.ajax({
//         type: "POST",
//         url: "/data/register",
//         data: {
//             nickname: nickname,
//         },
//         success: (res) => {
//             if(res["msg"]!=="success") {
//                 alert(res["msg"]);
//                 return;
//             }
//             alert("사용 가능한 닉네임입니다!");
//             localStorage.setItem("nickname", nickname);
//         }
//     })
// }


function registerSubmit() {
    const nickname = $("#nickname").val();
    const password = $("#password").val();
    const confirmPW = $("#password-check").val();


    $.ajax({
        type: "POST",
        url: "/data/register",
        data: {
            nickname : nickname,
            password : password,
            confirmPW : confirmPW
        },
        success: (res) => {
            alert(res["msg"]);
            if(res["msg"] === "회원가입 완료!") {
                location.href="/login";
            }
        }
    })
        
}
