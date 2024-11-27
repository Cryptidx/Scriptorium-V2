export async function defaultLocalStorage() {
    if (!localStorage.getItem("refreshToken")) {
        localStorage.setItem("refreshToken", "");
    }

    if (!localStorage.getItem("accessToken")) {
        localStorage.setItem("accessToken", "");
    }

    if (!localStorage.getItem("blogId")) {
        localStorage.setItem("blogId", "-1");
    }

    if (!localStorage.getItem("templateId")) {
        localStorage.setItem("templateId", "-1");
    }

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light");
    }
}