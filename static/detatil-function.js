$(document).ready(function () {
    $.ajax({
        url:`/data/detail/:detailId`,
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
            
            let contentTemplate =`
                                    <textarea id="content" class="textarea" rows="15" readonly>
                                    ${selectedContent}
                                    </textarea>
                                 `
            $('#content').append(contentTemplate)
        }
    })
})


function moveModifypage() {
    window.location.href="/modify";
}

function moveIndexpage() {
    window.location.href='/';
}


// <tr>
//     <th>Jason</th>
//     <td>이거시 코딩이다</td>
//     <td>11.17</td>
// </tr>