export class api {
    static urlBase = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@kenzieBlog:token") || ""
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }
    static async loginUser (body) {
        const data = await fetch (`${this.urlBase}/users/login`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("@kenzieBlog:token", res.token)
            localStorage.setItem("@kenzieBlog:User_id", res.userId)
            return res
        })
          .catch(err => console.log(err))
            return data
    }

    static async createUser(body){
        const newUser = await fetch (`${this.urlBase}/users/register`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                username: body.username,
                email: body.email,
                avatarUrl: body.avatarUrl,
                password: body.password
            })
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => alert(err))
        return newUser
    }
}


