let params = location.search;
let modifyId = params.substring(4)

$(document).ready(() => {
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

function modifyButton() {
    const password = $('#password').val();
    const content = $('#content').val();

    $.ajax({
        type: 'POST',
        url: `/data/modify/${modifyId}`,
        data: {
            password: password,
            content: content
        },
        success: (res) => {
            alert(res['msg'])
            window.location.href=`/detail/?id=${modifyId}`
        }
    })
}

function deleteButton() {
    const password = $('#password').val();

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



// <input id="userName" class="input" type="text" placeholder="작성자명" readonly>
// <input id="title" class="input" type="text" placeholder="제목" readonly>
// <input id="content" class="input" id="password" type="text" placeholder="비밀번호"></input>

// $('input[name=inputNm]').attr('value',변수명);