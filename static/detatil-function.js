let params = location.search;
// console.log(params)
let detailId = params.substring(4)
// console.log(detailId)
const token = localStorage.getItem("token");


$(document).ready( async function () {
    
    $.ajax({
        url:`/data/detail/${detailId}`,
        type: 'GET',
        data: {},
        success: (res) => {
            const selectedUserName = res['selectedUserName']
            const selectedTitle = res['selectedTitle']
            const selectedPostDate = res['selectedPostDate']
            const selectedContent = res['selectedContent']
            
            let tableTemplate = `
                                <tr>
                                    <th>${selectedUserName}</th>
                                    <td>${selectedTitle}</td>
                                    <td>${selectedPostDate}</td>
                                </tr>
                                `
            $('#info').append(tableTemplate);

            document.getElementById("content").value = selectedContent;
        }
    })
})


async function moveModifypage() {
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        alert(result['msg'])
        location.href="/login";        
    } else {
        window.location.href=`/modify?id=${detailId}`;
    }
    // window.location.href=`/modify?id=${detailId}`;
}

function moveIndexpage() {
    window.location.href='/';
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


async function addComment() {
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        alert(result['msg'])
        location.href="/login"; 
        return;       
    }

    const comment = $("#comment").val();
    // console.log(comment)
    if(!comment) {
        alert("댓글 내용을 입력해주세요!");
        return;
    }

    const userID = localStorage.getItem("userID")
    $.ajax({
        type: "POST",
        url: "/data/comment",
        data: {
            detailId: detailId,
            userID: userID,
            comment, comment
        },
        success: (res) => {
            alert(res);
        }
    })
}

function deleteComment() {
    if(confirm("정말로 삭제하시겠습니까?")) {
        alert("삭제 완료!");
    } else {
        alert("취소 되었습니다!");
    }
}

function modifyComment() {
    alert("수정버튼입니다!");
}

// <tr>
//     <th>Jason</th>
//     <td>이거시 코딩이다</td>
//     <td>11.17</td>
// </tr>

// let findingParams = new URLSearchParams(queryString);
//     console.log(findingParams)

// let contentTemplate =`
//                         <textarea id="content" class="textarea" rows="15" readonly>
//                         ${selectedContent}
//                         </textarea>
//                     `
// $('#content').append(contentTemplate)