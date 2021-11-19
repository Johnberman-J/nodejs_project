$(document).ready(function () {
    $.ajax({
        url:`/data/home`,
        type: 'GET',
        data: {},
        success: (res) => {
            var receivingData = res
            console.log(receivingData);
            let temp_html = `
            <tr>
                <th>${postDate}</th>
                <td><a href="/detail">${title}</a></td>
                <td>${userName}</td>
            </tr>`

            for(let i = receivingData.length-1; i>=0; i--) {
                    
            }
        }
    })
})

function movePostpage() {
    location.href="/board"    
}


{/* <tr>
    <th>11.07</th>
    <td><a href="/detail">이거시 코딩이다</a></td>
    <td>Jason</td>
</tr> */}