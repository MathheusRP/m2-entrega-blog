import { api } from "./api.js"

export class signup {

    static createNewUser(){
        const signupNameInput = document.getElementById ('signupNameInput')
        const singnupEmailInput = document.getElementById ('singnupEmailInput')
        const signupImg = document.getElementById ('signupImg')
        const signupPassword = document.getElementById ('signupPassword')
        const signupBtn = document.getElementById ('signupBtn')

        signupBtn.addEventListener  ('click', async (event) => {
            event.preventDefault()

            const data = {
                username: signupNameInput.value,
                email: singnupEmailInput.value,
                avatarUrl: signupImg.value,
                password: signupPassword.value,

            }
            // console.log(data)
            await api.createUser(data)
            window.location.reload(true);
        })
    }
}


