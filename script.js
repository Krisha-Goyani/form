const phoneInput = window.intlTelInput(document.querySelector("#phone"), {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    separateDialCode: true,
    initialCountry: "in",
    preferredCountries: ["in"],
    geoIpLookup: null
});

// Add input event listener for real-time validation
document.getElementById('userForm').addEventListener('input', function(e) {
    const input = e.target;
    // Always validate on input, regardless of touched state
    validateField(input);
});

// Add blur event to mark fields as touched
document.getElementById('userForm').addEventListener('blur', function(e) {
    const input = e.target;
    input.dataset.touched = 'true';
    validateField(input);
}, true);

function validateField(input) {
    let isValid = true;
    let errorMessage = '';

    switch(input.name) {
        case 'firstName':
        case 'lastName':
            const nameRegex = /^[a-zA-Z]+$/;
            isValid = nameRegex.test(input.value.trim());
            errorMessage = 'Only characters allowed from a-z and A-Z';
            break;
        case 'email':
            // More comprehensive email validation
            const emailRegex = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            
            if (input.value.trim() === '') {
                isValid = false;
                errorMessage = 'Email address is required';
            } else if (!input.value.includes('@')) {
                isValid = false;
                errorMessage = 'Email must contain @ symbol';
            } else if (!input.value.includes('.')) {
                isValid = false;
                errorMessage = 'Email must contain a valid domain';
            } else if (!emailRegex.test(input.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address (e.g., example@domain.com)';
            }
            break;
        case 'phone':
            isValid = phoneInput.isValidNumber();
            errorMessage = 'Please enter a valid phone number';
            break;
        case 'gender':
            const genderGroup = document.querySelector('.gender-group');
            isValid = document.querySelector('input[name="gender"]:checked');
            errorMessage = 'Please select a gender';
            if (input.closest('.gender-group')) {
                genderGroup.classList.toggle('valid', isValid);
                genderGroup.classList.toggle('invalid', !isValid);
                const errorElement = genderGroup.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-text')) {
                    errorElement.textContent = isValid ? '' : errorMessage;
                }
            }
            return isValid;
        case 'education':
            isValid = input.value !== '' && input.value !== 'Select Degree';
            errorMessage = 'You have to choose one field';
            input.classList.toggle('valid', isValid);
            input.classList.toggle('invalid', !isValid);
            const educationError = input.nextElementSibling;
            if (educationError && educationError.classList.contains('error-text')) {
                educationError.textContent = !isValid ? errorMessage : '';
            }
            return isValid;
        case 'profileImage':
            isValid = input.files.length > 0;
            errorMessage = 'Please select a profile image';
            const imageContainer = input.closest('.image-input-container');
            imageContainer.classList.toggle('valid', isValid);
            imageContainer.classList.toggle('invalid', !isValid);
            const imageError = imageContainer.nextElementSibling;
            if (imageError && imageError.classList.contains('error-text')) {
                imageError.textContent = !isValid ? errorMessage : '';
            }
            return isValid;
    }

    // Update visual feedback
    input.classList.toggle('valid', isValid && input.value.length > 0);
    input.classList.toggle('invalid', !isValid && input.value.length > 0);
    
    // Show error message
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-text')) {
        errorElement.textContent = (!isValid && input.value.length > 0) ? errorMessage : '';
    }

    return isValid;
}

// Add this CSS to your style.css file or update existing styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    input, select {
        border: 1px solid #ccc;
        outline: none;
        transition: border-color 0.2s ease-in-out;
    }

    input.valid, select.valid {
        border: 2px solid #28a745 !important;
    }

    input.invalid, select.invalid {
        border: 2px solid #dc3545 !important;
    }

    .error-text {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        min-height: 1.25rem;
        transition: all 0.2s ease-in-out;
    }

    /* Remove default border styles */
    input:focus, select:focus {
        border-color: inherit;
        box-shadow: none;
    }

    .gender-group.valid {
        border: 2px solid #28a745;
        padding: 10px;
        border-radius: 4px;
    }

    .gender-group.invalid {
        border: 2px solid #dc3545;
        padding: 10px;
        border-radius: 4px;
    }

    .image-input-container {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 4px;
        transition: border-color 0.2s ease-in-out;
    }

    .image-input-container.valid {
        border: 2px solid #28a745 !important;
    }

    .image-input-container.invalid {
        border: 2px solid #dc3545 !important;
    }

    select {
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 4px;
        width: 100%;
        transition: border-color 0.2s ease-in-out;
    }

    select.valid {
        border: 2px solid #28a745 !important;
    }

    select.invalid {
        border: 2px solid #dc3545 !important;
    }
`;
document.head.appendChild(styleSheet);

// Add form submission handler
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields first
    const fields = ['firstName', 'lastName', 'email', 'phone', 'gender', 'education', 'profileImage'];
    let isValid = true;

    // Check each field's validation
    fields.forEach(fieldName => {
        const input = document.querySelector(`[name="${fieldName}"]`);
        if (input) {
            validateField(input);
            
            // Check if the field is valid
            switch(fieldName) {
                case 'gender':
                    if (!document.querySelector('input[name="gender"]:checked')) {
                        isValid = false;
                    }
                    break;
                case 'education':
                    if (!input.value || input.value === 'Select Degree') {
                        isValid = false;
                    }
                    break;
                case 'profileImage':
                    if (!input.files.length) {
                        isValid = false;
                    }
                    break;
                default:
                    // For text inputs, check if they have the invalid class
                    if (input.classList.contains('invalid') || !input.value.trim()) {
                        isValid = false;
                    }
            }
        }
    });

    // Check for any error messages
    const errorMessages = document.querySelectorAll('.error-text');
    errorMessages.forEach(errorElement => {
        if (errorElement.textContent.trim() !== '') {
            isValid = false;
        }
    });

    // If any validation failed, prevent form submission
    if (!isValid) {
        // Optionally scroll to the first error
        const firstError = document.querySelector('.invalid') || document.querySelector('.error-text:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
    }

    // If all validations pass, proceed with form submission
    const formData = new FormData(this);
    const params = new URLSearchParams();

    // Add form data to URL parameters
    for (const [key, value] of formData.entries()) {
        if (key === 'profileImage') {
            // Handle profile image
            const file = value;
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    params.append('profileImage', e.target.result);
                    // Redirect to preview page after image is processed
                    window.location.href = './preview/index.html?' + params.toString();
                };
                reader.readAsDataURL(file);
                return; // Exit here as we'll redirect after image is processed
            }
        } else {
            params.append(key, value);
        }
    }

    // If no image, redirect immediately
    if (!formData.get('profileImage')) {
        window.location.href = './preview/index.html?' + params.toString();
    }
});

// Add image preview functionality
document.getElementById('profileImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">`;
        };
        reader.readAsDataURL(file);
    }
});

function createPreviewCard(formData) {
    const previewCard = document.createElement('div');
    previewCard.className = 'preview-card';
    previewCard.draggable = true; // Make card draggable
    
    const reader = new FileReader();
    reader.onload = function(e) {
        previewCard.innerHTML = `
            <img src="${e.target.result}" alt="Profile" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
            <p><strong>Name:</strong> ${formData.get('firstName')} ${formData.get('lastName')}</p>
            <p><strong>Email:</strong> ${formData.get('email')}</p>
            <p><strong>Phone:</strong> ${phoneInput.getNumber()}</p>
            <p><strong>Gender:</strong> ${formData.get('gender')}</p>
            <p><strong>Education:</strong> ${formData.get('education')}</p>
            <button class="btn btn-secondary" onclick="editForm(this.parentElement)">Edit</button>
        `;
        document.getElementById('previewArea').innerHTML = '';
        document.getElementById('previewArea').appendChild(previewCard);
    };
    reader.readAsDataURL(formData.get('profileImage'));
}

function createDeleteItems(formData) {
    const deleteArea = document.getElementById('deleteArea');
    deleteArea.innerHTML = `
        <div class="delete-item">
            <input type="checkbox" id="nameDelete">
            <label>Name: ${formData.get('firstName')} ${formData.get('lastName')}</label>
        </div>
        <div class="delete-item">
            <input type="checkbox" id="emailDelete">
            <label>Email: ${formData.get('email')}</label>
        </div>
        <div class="delete-item">
            <input type="checkbox" id="phoneDelete">
            <label>Phone: ${phoneInput.getNumber()}</label>
        </div>
        <div class="delete-item">
            <input type="checkbox" id="genderDelete">
            <label>Gender: ${formData.get('gender')}</label>
        </div>
        <div class="delete-item">
            <input type="checkbox" id="educationDelete">
            <label>Education: ${formData.get('education')}</label>
        </div>
    `;
}

// Select All functionality
document.getElementById('selectAllBtn').addEventListener('click', function() {
    document.querySelectorAll('.delete-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
});

// Update the delete functionality
document.getElementById('deleteSelectedBtn').addEventListener('click', function() {
    const checkedItems = document.querySelectorAll('.delete-item input[type="checkbox"]:checked');
    if (checkedItems.length === document.querySelectorAll('.delete-item').length) {
        // Show empty state for both preview and delete areas
        showEmptyState();
    } else {
        // Remove only checked items
        checkedItems.forEach(checkbox => {
            checkbox.parentElement.remove();
        });
        updatePreviewCard();
    }
});

function showEmptyState() {
    // Empty state for preview area
    document.getElementById('previewArea').innerHTML = `
        <div class="empty-state">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#ccc" stroke-width="2"/>
                <line x1="20" y1="20" x2="80" y2="80" stroke="#ccc" stroke-width="2"/>
                <line x1="80" y1="20" x2="20" y2="80" stroke="#ccc" stroke-width="2"/>
            </svg>
            <p>No data available</p>
        </div>
    `;

    // Empty state for delete area
    document.getElementById('deleteArea').innerHTML = `
        <div class="empty-state">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <rect x="25" y="25" width="50" height="50" fill="none" stroke="#ccc" stroke-width="2"/>
                <line x1="35" y1="35" x2="65" y2="65" stroke="#ccc" stroke-width="2"/>
                <line x1="65" y1="35" x2="35" y2="65" stroke="#ccc" stroke-width="2"/>
            </svg>
            <p>No items to delete</p>
        </div>
    `;
}

// Enhanced drag and drop functionality
const deleteArea = document.getElementById('deleteArea');
const previewArea = document.getElementById('previewArea');

previewArea.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('preview-card')) {
        e.dataTransfer.setData('text/plain', '');
        e.target.classList.add('dragging');
        deleteArea.classList.add('drag-over');
    }
});

previewArea.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('preview-card')) {
        e.target.classList.remove('dragging');
        deleteArea.classList.remove('drag-over');
    }
});

deleteArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    deleteArea.classList.add('drag-over');
});

deleteArea.addEventListener('dragleave', (e) => {
    deleteArea.classList.remove('drag-over');
});

deleteArea.addEventListener('drop', (e) => {
    e.preventDefault();
    deleteArea.classList.remove('drag-over');
    const previewCard = document.querySelector('.preview-card');
    if (previewCard) {
        previewCard.classList.remove('dragging');
        // Select all checkboxes and trigger delete
        document.querySelectorAll('.delete-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        document.getElementById('deleteSelectedBtn').click();
    }
});

// Edit form functionality
function editForm(card) {
    // Switch back to form view
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('previewDeleteContainer').style.display = 'none';

    // Populate form with existing data
    const form = document.getElementById('userForm');
    const dataElements = card.querySelectorAll('p');
    
    dataElements.forEach(element => {
        const text = element.textContent;
        const [field, value] = text.split(':').map(str => str.trim());
        
        switch(field.toLowerCase()) {
            case 'name':
                const [firstName, lastName] = value.split(' ');
                form.firstName.value = firstName;
                form.lastName.value = lastName;
                break;
            case 'email':
                form.email.value = value;
                break;
            case 'phone':
                phoneInput.setNumber(value);
                break;
            case 'gender':
                form.querySelector(`input[value="${value}"]`).checked = true;
                break;
            case 'education':
                form.education.value = value;
                break;
        }
    });

    // Handle profile image
    const profileImg = card.querySelector('img');
    if (profileImg) {
        const imgPreview = document.getElementById('imagePreview');
        imgPreview.innerHTML = `<img src="${profileImg.src}" alt="Profile Preview" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">`;
    }
}

function updatePreviewCard() {
    const remainingItems = document.querySelectorAll('.delete-item');
    if (remainingItems.length === 0) {
        document.getElementById('previewArea').innerHTML = `
            <div class="empty-state">
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <rect x="20" y="20" width="60" height="60" fill="none" stroke="#ccc" stroke-width="2"/>
                    <line x1="20" y1="20" x2="80" y2="80" stroke="#ccc" stroke-width="2"/>
                    <line x1="80" y1="20" x2="20" y2="80" stroke="#ccc" stroke-width="2"/>
                </svg>
                <p>No data available</p>
            </div>
        `;
    } else {
        const previewCard = document.querySelector('.preview-card');
        remainingItems.forEach(item => {
            const label = item.querySelector('label').textContent;
            const field = label.split(':')[0].toLowerCase();
            const value = label.split(':')[1].trim();
            const fieldElement = previewCard.querySelector(`p:contains('${field}')`);
            if (fieldElement) {
                fieldElement.innerHTML = `<strong>${field}:</strong> ${value}`;
            }
        });
    }
}

// Update reset handler
document.getElementById('userForm').addEventListener('reset', function() {
    document.querySelectorAll('.valid, .invalid').forEach(element => {
        element.classList.remove('valid', 'invalid');
        delete element.dataset.touched; // Remove touched state
    });
    document.querySelector('.gender-group').classList.remove('valid', 'invalid');
    delete document.querySelector('.gender-group').dataset.touched;
});

// Add this at the beginning of the file
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in edit mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('isEditing') === 'true') {
        // Populate form with data from URL parameters
        const form = document.getElementById('userForm');
        
        // Set text inputs
        form.firstName.value = urlParams.get('firstName') || '';
        form.lastName.value = urlParams.get('lastName') || '';
        form.email.value = urlParams.get('email') || '';
        
        // Set phone input
        if (urlParams.get('phone')) {
            phoneInput.setNumber(urlParams.get('phone'));
        }
        
        // Set gender radio
        const gender = urlParams.get('gender');
        if (gender) {
            const genderInput = form.querySelector(`input[name="gender"][value="${gender}"]`);
            if (genderInput) genderInput.checked = true;
        }
        
        // Set education select
        form.education.value = urlParams.get('education') || '';
        
        // Handle profile image
        const profileImage = urlParams.get('profileImage');
        if (profileImage) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${profileImage}" alt="Profile Preview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">`;
        }
    }
});
            