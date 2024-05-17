emailjs.init({
    publicKey: "PUBLIC_KEY",
});

function sendEmail() { 
    let templateParams = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("project").value.trim(),
        message: document.getElementById("message").value.trim(),
        'g-recaptcha-response': getReCaptchaToken()
    };
    
    const isContactFormValid =  contactFormValidation();

    if (isContactFormValid) {
        Swal.fire({
            title: "Confirmation",
            html: "Are you sure to send this message?",
            icon: "question",
            confirmButtonText: "Yes, Send",
            showConfirmBUtton: true,
            showCancelButton: true,
            cancelButtonColor: "#d33",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                emailjs.send(
                    "SERVICE_ID",
                    "TEMPLATE_ID",
                    templateParams
                ).then(
                    (response) => {
                        Swal.fire({
                            icon: "success",
                            title: "Message Sent!",
                            html: "Thanks for reaching out! I'll be in touch soon.",
                        });
                    },
                    (error) => {
                        Swal.fire({
                            icon: "error",
                            title: `Opps..`,
                            text: `${error.text}`,
                        });
                    }
                );
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }
};