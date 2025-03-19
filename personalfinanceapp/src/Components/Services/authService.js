import axios from "axios";

class AuthService { 
    async login(email, passcode) {
        try {
            const response = await axios.get(`https://localhost:7074/api/Users/login/${encodeURIComponent(email)}/${encodeURIComponent(passcode)}`);
            
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify({ email }));
                return { success: true, message: "Login successful!" };
            }
        } catch (error) {
            return { success: false, message: error.response?.data || "Invalid credentials" };
        }
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
