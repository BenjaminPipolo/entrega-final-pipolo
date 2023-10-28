document.addEventListener('DOMContentLoaded', pintarProductos(productos));
document.addEventListener('DOMContentLoaded', cargarCarrito());

const contactForm = document.querySelector('#contact_form');

const userName = document.querySelector('#user_name');
const userEmail = document.querySelector('#user_email');
const message = document.querySelector('#message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const body = {
        service_id: 'service_1bsscjf',
        template_id: 'template_kajs9tq',
        user_id: 'Zs261MK3ShTnxC1RB',
        template_params: {
            'to_name': userName.value,
            'from_name': userEmail.value,
            'message': message.value,
        }
    };

    sendEmail(body)
        .then(response => console.log(response.text()))
        .catch(error => {
            console.log(error);
        })
});

const sendEmail = async (body) => {
    const settings = {
        method: 'POST',
        headers: {
            'contentType': 'application/json'
        },
        body: JSON.stringify(body)
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', settings);
    const data = await response.json();
    console.log(data);
    
    return data;
}