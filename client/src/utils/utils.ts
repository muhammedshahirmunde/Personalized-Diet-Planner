export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // window.location.href = "/login";

};

export const getLoggedInUser = () => {
    // const user = JSON.parse(localStorage.getItem("user") ?? "");
     const user = { id: 1, role: "patient", token: "12g2g", name : "Murmu" };
    return user;
};

