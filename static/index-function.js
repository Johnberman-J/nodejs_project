const token = localStorage.getItem("token");

$(document).ready(function () {
    $.ajax({
        url:`/data/home`,
        type: 'GET',
        data: {},
        success: (res) => {
            const receivingData = res
            // console.log(receivingData);
            
            for(let i = receivingData.length-1; i>=0; i--) {
                let postDate = receivingData[i]['postDate']
                let title = receivingData[i]['title']
                let userName = receivingData[i]['userName']
                
                let detailId = i;                

                let temp_html = `
                                <tr>
                                    <th>${postDate}</th>
                                    <td><a href="detail/?id=${detailId}">${title}</a></td>
                                    <td>${userName}</td>
                                </tr>`

                $('#table').append(temp_html)
            }
        }
    })
})

function movePostpage() {   
    if(!token) {
        alert("로그인이 필요합니다!");
        location.href="/login";
        return;
    } else {
        checkingAuth();
        // location.href="/board"    
    }        
}

function moveLoginpage() {
    location.href="/login"
}

function moveRegisterpage() {
    location.href="/register"
}

function logout() {
    location.href="/";
    localStorage.removeItem("token");
}

function checkingAuth() {
    alert(token);
    $.ajax({
        type: "GET",
        url: "/data/auth",
        // Headers: {
        //     authorization: 1234
        // },
        data: {},
        success: (res) => {
            // alert(res["msg"]);
        }
    })
};



// for(let i = receivingData.length-1; i>=0; i--) {
//     let postDate = receivingData[i]['postDate']
//     let title = receivingData[i]['title']
//     let userName = receivingData[i]['userName']
    
//     let detailId = i;                

//     let temp_html = `
//                     <tr>
//                         <th>${postDate}</th>
//                         <td><a href="/data/detail/${detailId}">${title}</a></td>
//                         <td>${userName}</td>
//                     </tr>`

//     $('#table').append(temp_html)
// }