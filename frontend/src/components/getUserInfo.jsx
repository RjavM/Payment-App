import axios from "axios"

export const getUserInfo = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/me", {
            headers: {
                "Authorization": token
            }
        });
        return res.data;
    }
    catch(e) {
        return null;
    }

}