// use of this file   : 
//     Prevents the default form submission.
 // Displays a Bootstrap success alert.
 //    Resets the form fields after submission.


 document.addEventListener('DOMContentLoaded', function() { 
    const contactForm = document.getElementById('contactForm');
    const alertPlaceholder = document.getElementById('alertPlaceholder');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Create a Bootstrap success alert
        
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.role = 'alert';
        alert.innerHTML = `
            <strong>Success!</strong> Your message has been sent.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;

        // Clear any previous alerts
        alertPlaceholder.innerHTML = '';
        alertPlaceholder.appendChild(alert);

        // Reset the form fields
        contactForm.reset();
        showAlert('Thank you for your purchase', 'success')
    });
});


function showAlert(message, type) {
    var existingAlert = document.getElementById('custom-alert')
    if (existingAlert) {
        existingAlert.remove()
    }

    var alertContainer = document.createElement('div')
    alertContainer.id = 'custom-alert'
    alertContainer.className = `alert alert-${type}`
    alertContainer.innerHTML = `<strong>${type === 'success' ? 'Success' : 'Warning'}!</strong> ${message}`
    document.body.appendChild(alertContainer)
    setTimeout(function() {
        alertContainer.remove()
    }, 3000)
}

