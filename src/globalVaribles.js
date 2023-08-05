const userData = localStorage.getItem("userData");
if (userData.username === "Admin" && userData.password === "@dmin") {
    export const ADMIN = true
}


