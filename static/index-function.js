$(document).ready(function () {
    $.ajax({
        url:`/data/home`,
        type: 'GET',
        data: {},
        success: (res) => {
            const receivingData = res
            console.log(receivingData);
            
            for(let i = receivingData.length-1; i>=0; i--) {
                let postDate = receivingData[i]['postDate']
                let title = receivingData[i]['title']
                let userName = receivingData[i]['userName']
                let checkNumber = receivingData[i]['checkNumber']
                

                let temp_html = `
                                <tr>
                                    <th>${postDate}</th>
                                    <td><a href="/detail">${title}</a></td>
                                    <td>${userName}</td>
                                </tr>`

                $('#table').append(temp_html)
            }
        }
    })
})

function movePostpage() {
    location.href="/board"    
}
