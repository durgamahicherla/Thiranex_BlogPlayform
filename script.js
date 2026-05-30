const titleInput =
document.getElementById("title");

const contentInput =
document.getElementById("content");

const blogContainer =
document.getElementById("blogContainer");

let blogs =
JSON.parse(localStorage.getItem("blogs")) || [];

function saveBlogs(){
    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );
}

function renderBlogs(){

    blogContainer.innerHTML = "";

    blogs.forEach((blog,index)=>{

        const div =
        document.createElement("div");

        div.classList.add("blog-card");

        div.innerHTML = `
        
            <h2>${blog.title}</h2>

            <p class="blog-date">
                ${blog.date}
            </p>

            <p>${blog.content}</p>

            <div class="blog-actions">

                <button class="like-btn"
                onclick="likeBlog(${index})">
                    ❤️ ${blog.likes}
                </button>

                <button class="delete-btn"
                onclick="deleteBlog(${index})">
                    Delete
                </button>

            </div>

            <div class="comment-section">

                <input type="text"
                id="comment-${index}"
                placeholder="Write a comment...">

                <button onclick="addComment(${index})">
                    Comment
                </button>

                <div id="comments-${index}"></div>

            </div>

        `;

        blogContainer.appendChild(div);

        const commentsDiv =
        document.getElementById(
            `comments-${index}`
        );

        blog.comments.forEach(comment=>{

            const p =
            document.createElement("p");

            p.classList.add("comment");

            p.textContent = comment;

            commentsDiv.appendChild(p);

        });

    });

    saveBlogs();
}

function addBlog(){

    const title =
    titleInput.value.trim();

    const content =
    contentInput.value.trim();

    if(title === "" || content === ""){
        alert("Fill all fields");
        return;
    }

    const currentDate =
    new Date().toLocaleString();

    blogs.unshift({
        title:title,
        content:content,
        date:currentDate,
        likes:0,
        comments:[]
    });

    titleInput.value = "";
    contentInput.value = "";

    renderBlogs();
}

function deleteBlog(index){

    blogs.splice(index,1);

    renderBlogs();
}

function likeBlog(index){

    blogs[index].likes++;

    renderBlogs();
}

function addComment(index){

    const commentInput =
    document.getElementById(
        `comment-${index}`
    );

    const comment =
    commentInput.value.trim();

    if(comment === ""){
        return;
    }

    blogs[index].comments.push(comment);

    commentInput.value = "";

    renderBlogs();
}

renderBlogs();