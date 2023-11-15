document.addEventListener('DOMContentLoaded', pintarProductos(productos));
document.addEventListener('DOMContentLoaded', cargarCarrito());

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userName = document.getElementById('user_name').value;
        const userEmail = document.getElementById('user_email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/data/contactData.json'); // Ruta al archivo JSON
            const contactData = await response.json();

            const body = {
                service_id: contactData.service_id,
                template_id: contactData.template_id,
                user_id: contactData.user_id,
                template_params: {
                    'to_name': userName,
                    'from_name': userEmail,
                    'message': message,
                }
            };

            const emailResponse = await sendEmail(body);
            console.log(emailResponse);

            // Aquí puedes agregar lógica adicional después de enviar el correo

        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    });

    const sendEmail = async (body) => {
        try {
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', settings);
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw error;
        }
    };
});
