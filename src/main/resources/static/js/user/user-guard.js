(function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.replace("/login.html");
        return;
    }

    if (user.role !== "USER") {
        window.location.replace("/admin/index.html");
    }
})();
