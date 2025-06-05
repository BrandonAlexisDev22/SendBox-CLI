document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form") as HTMLFormElement || null;
    if(form) {
        const emailUser = document.querySelector(".emailUser") as HTMLInputElement ;
        const tokenUser = document.querySelector(".tokenUser") as HTMLInputElement;
        form.addEventListener('submit',(e) => {
            e.preventDefault();
            if(emailUser && tokenUser) {
                const email = emailUser.value.trim();
                const token = tokenUser.value.trim();
            } else {
                console.log("Error email or token not found")
                return;
            }
        });
    };
});
