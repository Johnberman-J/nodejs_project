function postpageButton() {
    const userName = $('#userName').val();
    const title = $('#title').val();
    const password = $('#password').val();
    const content = $('#content').val();

    console.log(userName,title,password,content)

    location.href='index.html'
}