document.addEventListener('DOMContentLoaded', function(event) {
    if (window.location.href.startsWith("http://localhost:8080/")) {
        $(".nav .nav-pills").prepend("<a href=\"/new-blog-post.html\"><li>New Blog Post</li></a>")
    }
});
