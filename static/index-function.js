
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

async function movePostpage() {   
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        alert(result['msg'])
        location.href="/login";        
    } else {
        location.href="/board";
    }
           
}

async function moveLoginpage() {
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        location.href="/login";        
    } else {
        alert("이미 로그인이 되어있습니다!");
    }
}

async function moveRegisterpage() {
    const result = await checkingAuth();
    if(result['msg'] !== "success") {
        location.href="/register";        
    } else {
        alert("이미 로그인이 되어있습니다!");
    }
}

function logout() {
    location.href="/";
    localStorage.clear();
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