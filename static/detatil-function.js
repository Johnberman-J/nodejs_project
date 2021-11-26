
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

    $.ajax({
        type: "GET",
        url: "/data/comment",
        success: (res) => {
            const receivingData = res;
            // console.log(receivingData)
            for(let i = receivingData.length-1; i>=0; i--) {
                const selecteddetailId = receivingData[i]["detailId"];
                // console.log(selecteddetailId);
                // console.log(detailId)
                if(selecteddetailId==detailId) {
                    const selecteduserID = receivingData[i]["userID"];
                    // console.log(selecteduserID)
                    const comment = receivingData[i]["comment"];
                    const date = receivingData[i]["date"];
                    // console.log(comment)
                    if(selecteduserID==localStorage.getItem("userID")){
                        let tableTemplate = `<tr>
                                                <th width="239px">
                                                    <input id="date-select" type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${date}">
                                                </th>
                                                <th width="217px">
                                                    <input id="user-select" type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${selecteduserID}">
                                                </th>
                                                <th width="1215px">
                                                    <input id="comment-select" onclick="inputModify()" type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${comment}">
                                                </th>                                                
                                                <td id="login">
                                                <button id="comment-modify" onclick="modifyComment()" class="button is-dark">댓글수정</button>
                                                <button id="comment-delete" onclick="deleteComment()" class="button is-dark">댓글삭제</button>
                                                </td>
                                            </tr>`
                        $("#commentinfo").append(tableTemplate);
                    } else {
                        let tableTemplate = `<tr>
                                                <th width="239px">
                                                    <input type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${date}">
                                                </th>
                                                <th width="217px">
                                                    <input type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${selecteduserID}">
                                                </th>
                                                <th width="1215px">
                                                    <input type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${comment}">
                                                </th>  
                                             </tr>`;
                        $("#commentinfo").append(tableTemplate);


                    }
                    // $("#commentinfo").append(tableTemplate);
                }
            }
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

    const date = String(new Date()).substring(4,25);
    const userID = localStorage.getItem("userID")
    $.ajax({
        type: "POST",
        url: "/data/comment",
        data: {
            detailId: detailId,
            userID: userID,
            comment: comment,
            date: date
        },
        success: (res) => {
            
        }
    })
    alert("댓글이 등록되었습니다!");
    window.location.href=`/detail?id=${detailId}`;
}

function deleteComment() {
    if(confirm("정말로 삭제하시겠습니까?")) {
        const date = $("#date-select").val();
        $.ajax({
            type:"DELETE",
            url:"/data/comment/delete",
            data: {
                date: date
            },
            success: (res) => {

            }
        });
        alert("삭제 완료!");
        window.location.href=`/detail?id=${detailId}`;
    } else {
        alert("취소 되었습니다!");
    }
}

function modifyComment() {
    const date = $("#date-select").val();
    const comment = $("#comment-select").val();

    if(!comment) {
        alert("수정 할 내용을 입력해주세요!");
        return;
    }

    console.log(date,comment);

    $.ajax({
        type: "POST",
        url: "/data/comment/modify",
        data: {
            date: date,
            comment: comment
        },
        success: (res) => {
        
        }
    })
    alert("수정완료!");
    window.location.href=`/detail?id=${detailId}`;
}

function inputModify() {
    const modifyTemplate =  `
                            <div id="hidden" style="display: none;" class="box">
                                <div >
                                <textarea id="comment" class="textarea is-primary is-focused is-small" placeholder="댓글을 입력해주세요." style="width:100%; border: 0; resize: none;"></textarea>
                                <br>
                                <button id="comment-add" onclick="addComment()" class="button is-dark">댓글작성</button>
                                </div>
                            </div>
                            `;
    $("#hidden").replaceWith(modifyTemplate);

    const modifyButton = `
                            <button id="comment-modify" onclick="modifyComment()" class="button is-dark">저장</button>
                         `;
    $("#comment-modify").replaceWith(modifyButton);      
}

