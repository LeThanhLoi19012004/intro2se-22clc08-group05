// api.js

export async function sendLoginRequest(data){
    //data {username: 'nhan', password: 'nhan', remember-me: 'on'}
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "An error occurred" };
    }
};

export async function sendSignupRequest(data){
    // data {username: 'nhan', name: 'Nguyễn Nhân', dob: '2024-07-17', email: 'nhannguyentrong355@gmail.com', password: 'nhan'}
    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return {success: false, message: "An error occurred"};
    }
};

export async function sendNewPost(data, eventID){
    // data {}
    try {
        const response = await fetch("http://localhost:3000/event/" + string(eventID), {
            method: "POST",
            body: data,
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return {success: false, message: "An error occurred"};
    }
}