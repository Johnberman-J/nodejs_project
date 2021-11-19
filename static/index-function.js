$(document).ready(function () {
    $.ajax({
        url:`/data/home`,
        type: 'GET',
        data: {},
        success: (res) => {
            console.log(res)
        }
    })
})

function movePostpage() {
    location.href="/board"    
}