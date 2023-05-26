import { request } from "../hooks/request"

class AppService {
    async logout() {
        await request('/user/logout')
        localStorage.removeItem('token')
    }
    
    async checkToken() {
        return await request('/user/check-token')
    }
}

export default new AppService()