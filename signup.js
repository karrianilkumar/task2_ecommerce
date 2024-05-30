function handleSignUp(event) {
  event.preventDefault(); // Prevent the form from submitting the default way

  // Simulate a successful sign-up process
  const alertContainer = document.getElementById('alert-container');
  alertContainer.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success!</strong> You have signed up successfully.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;

  // Redirect to the home page after a short delay
  setTimeout(() => {
    window.location.href = 'file:///home/rgukt/Desktop/Internpe/reference_e_commerce_web/LC09-ecommerce-website/index.html';
  }, 2000);
}

