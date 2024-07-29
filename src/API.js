// api.js

export async function sendLoginRequest(data){
    //data {username: 'nhan', password: 'nhan', remember-me: 'on'}
    try {
        const response = await fetch("http://localhost:3000/sign-in", {
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
        const response = await fetch("http://localhost:3000/sign-up", {
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

export async function forgotPassword(data){
    // data {email }
    try {
        const response = await fetch("http://localhost:3000/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
    catch (error){
        console.error("Error:", error);
        return {success: false, message: "An error occurred"};
    }
}


export async function renderMainPage(){
    try {
        const response = await fetch("http://localhost:3000/rendermp", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return {success: false, message: "An error occurred"};
    }
}

export async function renderProfile(data){
    //data {idaccount: idaccount}
    try {
        const response = await fetch("http://localhost:3000/render_profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
    catch (error){
        console.error("Error:", error);
        return {success: false, message: "An error occurred"};
    }
}

export async function updateProfile(data){
    try {
        const response = await fetch("http://localhost:3000/update_profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
    catch (error){
        console.error("Error:", error);
        return {success: false, message: "An error occurred"};
    }
}
export async function createEvent(data) {
    try {
        const response = await fetch("http://localhost:3000/create_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await response.json();
    } catch (error){
        console.log("Error:", error);
        return {success: false, message: "An error occured"};
    }
}