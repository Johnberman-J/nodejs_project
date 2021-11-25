// import { encrypt } from "ncrypt-js"

let params = location.search;
let modifyId = params.substring(4)
const token = localStorage.getItem("token");

$(document).ready( async () => {
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        alert(result['msg']);
        location.href="/login";
    }

    $.ajax({
        type:'GET',
        url: `/data/modify/${modifyId}`,
        data:{},
        success: (res) => {
            let userName = res['selectedUserName']
            let title = res['selectedTitle']
            let content = res['selectedContent']
            
            // console.log(userName,title,content)
            
            $('input[id=userName]').attr('value',userName);
            $('input[id=title]').attr('value',title);
            document.getElementById("content").value = content;
        }


    })
})

async function modifyButton() {
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        alert(result['msg']);
        location.href="/login";
    }

    const password = $('#password').val();
    const content = $('#content').val();

    // const key = 'encrypt-practice';
    // const ncryptObject = new ncrypt(key)
    // const encryptPW = ncryptObject.encrypt(password)


    $.ajax({
        type: 'POST',
        url: `/data/modify/${modifyId}`,
        data: {
            password: password,
            content: content
        },
        success: (res) => {
            alert(res['msg'])
            if(res['msg']=="수정 완료!"){
                window.location.href=`/detail/?id=${modifyId}`
            }
        }
    })
}

async function deleteButton() {
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        alert(result['msg']);
        location.href="/login";
    }

    const password = $('#password').val();

    // const key = 'encrypt-practice';
    // const ncryptObject = new ncrypt(key)
    // const encryptPW = ncryptObject.encrypt(password)


    $.ajax({
        type: 'DELETE',
        url: `/data/modify/${modifyId}`,
        data: {
            password: password
        },
        success: (res) => {
            alert(res['msg'])
            if(res['msg']=="삭제 완료!")
            window.location.href=`/`
        }
    })
}

function backButton() {
    window.location.href=`/detail/?id=${modifyId}`
}


async function checkingAuth () {
    
    const result = $.ajax({
        type: "GET",
        url: "/data/auth",  // token을 생성해준곳을 거쳐야 undefined 안뜬다.
        headers: {
            Authorization: `bearer ${token}`
        },
        success: (res) => {
            localStorage.setItem("userID", res["nickname"]);
        }
    })
    // console.log(result);
    return result;
};


// <input id="userName" class="input" type="text" placeholder="작성자명" readonly>
// <input id="title" class="input" type="text" placeholder="제목" readonly>
// <input id="content" class="input" id="password" type="text" placeholder="비밀번호"></input>

// $('input[name=inputNm]').attr('value',변수명);


// const ncrypt = require('ncrypt-js')

// const pw1 = 'aqwe';
// const pw2 = '123'
// const key = 'key';

// const keyObject = new ncrypt(key)
// const encryptPW1 = keyObject.encrypt(pw1)
// const encryptPW2 = keyObject.encrypt(pw2)

// console.log(encryptPW1,typeof(encryptPW2))

// var decryptedPW1 = keyObject.decrypt(encryptPW1);
// var decryptedPW2 = keyObject.decrypt(encryptPW2);


// console.log(decryptedPW1, decryptedPW2)