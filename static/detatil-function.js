
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
                                                    <input id="date-${date}" type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${date}">
                                                </th>
                                                <th width="217px">
                                                    <input id="user-select" type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${selecteduserID}">
                                                </th>
                                                <th width="1215px">
                                                    <input id="comment-${date}" onclick="inputModify(this.id)" type="text" name="text" size="20" style="font-size: 17px; font-weight: bold; width:100%; border: 0;" value="${comment}">
                                                </th>                                                
                                                <td id="login">
                                                <button id="modifybutton-${date}" onclick="modifyComment(this.id)" class="button is-dark">????????????</button>
                                                <button id="deletebutton-${date}" onclick="deleteComment(this.id)" class="button is-dark">????????????</button>
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
        url: "/data/auth",  // token??? ?????????????????? ????????? undefined ?????????.
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
        alert("?????? ????????? ??????????????????!");
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
    alert("????????? ?????????????????????!");
    window.location.href=`/detail?id=${detailId}`;
}

async function deleteComment(uniqueDate) {
    const dateId = uniqueDate.substring(13);
    let uniqueID = document.getElementById(`date-${dateId}`);
    const date = uniqueID.value;
    
    if(confirm("????????? ?????????????????????????")) {
        
        $.ajax({
            type:"DELETE",
            url:"/data/comment/delete",
            data: {
                date: date
            },
            success: (res) => {

            }
        });
        alert("?????? ??????!");
        window.location.href=`/detail?id=${detailId}`;
    } else {
        alert("?????? ???????????????!");
    }
}

async function modifyComment(uniqueDate) {
    const uniqueId = await uniqueDate.substring(13);
    const date = await document.getElementById(`date-${uniqueId}`).value;
    const comment = await document.getElementById(`comment-${uniqueId}`).value;

    if(!comment) {
        alert("?????? ??? ????????? ??????????????????!");
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
    alert("????????????!");
    window.location.href=`/detail?id=${detailId}`;
}

async function inputModify(dateID) {
    const date = await dateID.substring(8);
    const modifyTemplate =  `
                            <div id="hidden" style="display: none;" class="box">
                                <div >
                                <textarea id="comment" class="textarea is-primary is-focused is-small" placeholder="????????? ??????????????????." style="width:100%; border: 0; resize: none;"></textarea>
                                <br>
                                <button id="comment-add" onclick="addComment()" class="button is-dark">????????????</button>
                                </div>
                            </div>
                            `;
    $("#hidden").replaceWith(modifyTemplate);

    
    let change = document.getElementById(`modifybutton-${date}`);
    change.textContent = "??????";
}

