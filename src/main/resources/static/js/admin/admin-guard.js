(function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/login.html";
        return;
    }

    if (user.role !== "ADMIN") {
        window.location.href = "/user/index.html";
    }
})();

