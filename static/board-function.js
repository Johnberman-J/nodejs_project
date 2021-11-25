// import { encrypt } from "ncrypt-js"
// const key = 'encrypt-practice';
// const ncryptObject = new ncrypt(key)

const token = localStorage.getItem("token");

$(document).ready( async () => {
   const result = await checkingAuth();
   if(result['msg'] !== "success") {
        alert(result['msg']);
        location.href="/login";
    }
});


function moveMainpage() {
    location.href="/"
}

function postpageButton() {
    const checkNumber = Math.random()
    const dateNow = new Date();
    const year = dateNow.getFullYear()
    const month = dateNow.getMonth()+1
    const date = dateNow.getDate()
    const postDate = `${year}-${month}-${date}`

    const userName = $('#userName').val();
    const title = $('#title').val();
    const password = $('#password').val();
    const content = $('#content').val();

    // Adding password Encryt (2021-11-21)
    
    // const encryptPW = ncryptObject.encrypt(password)

    // console.log(postId,postDate,userName,title,password,content)

    if(userName==='' || title==='' || password==='' || content==='') {
        alert('게시 정보를 입력해주세요!')
        return true;
    } else {
        console.log(postDate,userName,title,password,content)
        $.ajax({
            url:`/data/board/create`,
            type: 'POST',
            data: {
                checkNumber: checkNumber,
                userName: userName,
                password: password,
                content: content,                
                title: title,               
                postDate: postDate
            },
            success: (res) => {
                if(res['msg']=='success') {
                    alert('게시글 등록 완료!')
                    window.location.href = '/'
                }
            }
        })
    }
}



async function checkingAuth () {
    
    const result = $.ajax({
        type: "GET",
        url: "/data/auth",  // token을 생성해준곳을 거쳐야 undefined 안뜬다.
        headers: {
            Authorization: `bearer ${token}`
        },
        success: (res) => {
            
            
        }
    })
    return result;
};

// const dateNow = new Date();

// const month = dateNow.getMonth()+1
// const date = dateNow.getDate()
// const sortDate = Date.now()

// console.log(month,date,sortDate);
// console.log(typeof(month),typeof(date),typeof(sortDate));

// const dateNow = new Date();
// const year = dateNow.getFullYear()
// const month = dateNow.getMonth()+1
// const date = dateNow.getDate()
// const postDate = `${year}-${month}-${date}`

// console.log(postDate,typeof(postDate))
