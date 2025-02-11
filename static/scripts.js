document.getElementById('questionnaire-form').onsubmit = function (event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    let yesCount = 0;
  
    // Calculate the score
    formData.forEach((value) => {
      if (value === 'yes') yesCount++;
    });
  
    const score = Math.round((yesCount / 6) * 100);
    const scoreBox = document.getElementById('score-box');
    const scoreContainer = document.getElementById('score-container');
  
    // Assign class based on score
    if (score >= 75) {
      scoreBox.className = 'score-box green';
    } else if (score >= 50) {
      scoreBox.className = 'score-box yellow';
    } else {
      scoreBox.className = 'score-box red';
    }
  
    // Show score
    scoreBox.textContent = `Your Preparedness Score: ${score}%`;
    scoreContainer.style.display = 'block';
  };

  // Modal Functions
function showContactForm() {
  document.getElementById('contactFormModal').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeContactForm() {
  document.getElementById('contactFormModal').style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('contactFormModal');
  if (event.target == modal) {
      closeContactForm();
  }
};

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
  // Track contact form submissions
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function() {
          gtag('event', 'form_submission', {
              'event_category': 'engagement',
              'event_label': 'Contact Form Submitted',
              'score': document.querySelector('input[name="score"]').value
          });
      });
  }

  // Track CTA button clicks
  const ctaButtons = document.querySelectorAll('.nhs-button-cta');
  ctaButtons.forEach(button => {
      button.addEventListener('click', function() {
          gtag('event', 'cta_click', {
              'event_category': 'engagement',
              'event_label': button.textContent.trim()
          });
      });
  });

  // Track assessment retakes
  const retakeButtons = document.querySelectorAll('a.nhs-button[href="/"]');
  retakeButtons.forEach(button => {
      button.addEventListener('click', function() {
          gtag('event', 'retake_assessment', {
              'event_category': 'engagement',
              'event_label': 'Assessment Retake'
          });
      });
  });
});