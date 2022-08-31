import { api} from "./api.js"
import { signup} from "./signup.js"

class loginPage {
    static renderLoginPage() {        
        const loginEmailInput = document.getElementById('loginEmailInput')
        const loginPasswordInput = document.getElementById('loginpasswordInput')
        const loginBtn = document.getElementById('loginBtn')

        loginBtn.addEventListener('click', async (event) => {
            event.preventDefault()
            const data = {
                email: loginEmailInput.value,
                password: loginPasswordInput.value,
            }
            const token = await api.loginUser(data)
            if (token.token) {
                window.location.assign("src/pages/blog.html")              
            }
        })
    }
}
signup.createNewUser()
loginPage.renderLoginPage()


