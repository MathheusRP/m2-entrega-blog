import {
    api
} from "./api.js"
import {
    signup
} from "./signup.js"

const userInfoHeader = document.querySelector(".user__info")
const postsList = document.querySelector(".list")
const logoutButton = document.querySelector(".logoutButton")
const deleteModal = document.querySelector('#deleteModal')
const deleteCancel = document.querySelector('.delete_cancel')
const deleteConfirm = document.querySelector('.delete_confirm')
const editModal = document.querySelector('#editModal')
const editCancel = document.querySelector('.edit_cancel')
const editConfirm = document.querySelector('.edit_confirm')
export class BlogPage {

    static urlBase = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@kenzieBlog:token") || ""
    static id = localStorage.getItem("@kenzieBlog:User_id")
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }

    static getProfileInfo = async () => {

        const id = BlogPage.id
        const user = await fetch(`${BlogPage.urlBase}/users/${id}`, {
                headers: BlogPage.headers
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        const userImg = document.createElement("img")
        const userName = document.createElement("h2")

        userImg.src = user.avatarUrl
        userName.innerText = user.username
        userInfoHeader.append(userImg, userName)
    }

    static getPosts = async () => {
        postsList.innerText = ""
        if(!BlogPage.token){
            window.location.assign("../../index.html")
        }
        const posts = await fetch(`${BlogPage.urlBase}/posts?page=1`, {
                method: "GET",
                headers: BlogPage.headers,
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        posts.data.forEach((post) => {

            const li = document.createElement("li")
            const divInformation = document.createElement("div")
            const userImg = document.createElement("img")
            const userName = document.createElement("h2")
            const content = document.createElement("p")
            const date = document.createElement("p")
            const divButtons = document.createElement("div")
            const edit = document.createElement("img")
            const trash = document.createElement("img")

            li.classList.add("post")
            divInformation.classList.add("information")
            content.classList.add("content")
            divButtons.classList.add("buttons")

            userImg.src = post.user.avatarUrl
            userName.innerText = post.user.username
            content.innerText = post.content
            date.innerText = post.createdAt.substring(0, 10)
            edit.src = "../assets/edit.png"
            trash.src = "../assets/trash.png"

            edit.addEventListener("click",(e) => {
                BlogPage.edit(post.id, post.content)
            })
            trash.addEventListener("click",(e) => {
                BlogPage.remove(post.id)
            })

            divInformation.append(userImg, userName, content, date)

            if (post.user.id == BlogPage.id) {        
                edit.value = post.content
                divButtons.append(edit, trash)                
            }
            li.append(divInformation, divButtons)
            postsList.append(li)
        });
    }

    static post = async () => {
        const getNewPost = document.querySelector(".newPost")
        const newPost = await fetch(`${this.urlBase}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    content: getNewPost.value
                })
            })
            .then(res => res.json())
            .then(res => {                
                return res
            })            
            .catch(err => console.log(err))
            getNewPost.value = ""
        return newPost
    }
    static async createNewPost() {
        const addPost = document.querySelector(".addPost")

        addPost.addEventListener('click', async (event) => {
            
            event.preventDefault()

            await BlogPage.post()
            await BlogPage.getPosts()      
        })
    }

    static edit = async (id,content) => {
        window.scrollTo(0, 0)
        editModal.classList.remove('off')
        const editMensagem = document.querySelector('.input_edit_modal')
        editMensagem.value = content
        
        editCancel.addEventListener('click', event => {
            editModal.classList.add('off')
        })
        editConfirm.addEventListener ('click', async (event) => { 

        const editedPost = await fetch (`${BlogPage.urlBase}/posts/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                content: editMensagem.value
            })
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
        
        window.location.reload(true);
    })
    }

    static remove = async (id) => {
        window.scrollTo(0, 0)
        deleteModal.classList.remove('off')

        deleteCancel.addEventListener('click', event => {
            deleteModal.classList.add('off')
        })

        deleteConfirm.addEventListener('click', async (event) => {
            
            await fetch (`${BlogPage.urlBase}/posts/${id}`, {
                method: "DELETE",
                headers: BlogPage.headers
        })
        window.location.reload(true);  
    })
}

    static logout = async () => {
        logoutButton.addEventListener('click', async (event) => {
            event.preventDefault()
            localStorage.clear()
            window.location.assign("../../index.html")
        })
    }
}

await BlogPage.getProfileInfo()
await BlogPage.getPosts()
await BlogPage.logout()
await BlogPage.createNewPost()