const phoneInput = window.intlTelInput(document.querySelector("#phone"), {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    separateDialCode: true,
    initialCountry: "auto",
    geoIpLookup: function(callback) {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("in")); // Default to India if geolocation fails
    },
    preferredCountries: ["in",  "gb"]
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

// Add country-specific validation rules
const countryPhoneRules = {
    'af': { minLength: 9, maxLength: 9 },    // Afghanistan
    'al': { minLength: 8, maxLength: 8 },    // Albania
    'dz': { minLength: 9, maxLength: 9 },    // Algeria
    'ad': { minLength: 6, maxLength: 6 },    // Andorra
    'ao': { minLength: 9, maxLength: 9 },    // Angola
    'ar': { minLength: 10, maxLength: 10 },  // Argentina
    'am': { minLength: 8, maxLength: 8 },    // Armenia
    'au': { minLength: 9, maxLength: 9 },    // Australia
    'at': { minLength: 10, maxLength: 10 },  // Austria
    'az': { minLength: 9, maxLength: 9 },    // Azerbaijan
    'bh': { minLength: 8, maxLength: 8 },    // Bahrain
    'bd': { minLength: 10, maxLength: 10 },  // Bangladesh
    'by': { minLength: 9, maxLength: 9 },    // Belarus
    'be': { minLength: 9, maxLength: 9 },    // Belgium
    'br': { minLength: 10, maxLength: 10 },  // Brazil
    'bg': { minLength: 9, maxLength: 9 },    // Bulgaria
    'kh': { minLength: 9, maxLength: 9 },    // Cambodia
    'ca': { minLength: 10, maxLength: 10 },  // Canada
    'cl': { minLength: 9, maxLength: 9 },    // Chile
    'cn': { minLength: 11, maxLength: 11 },  // China
    'co': { minLength: 10, maxLength: 10 },  // Colombia
    'hr': { minLength: 9, maxLength: 9 },    // Croatia
    'cy': { minLength: 8, maxLength: 8 },    // Cyprus
    'cz': { minLength: 9, maxLength: 9 },    // Czech Republic
    'dk': { minLength: 8, maxLength: 8 },    // Denmark
    'eg': { minLength: 10, maxLength: 10 },  // Egypt
    'ee': { minLength: 7, maxLength: 7 },    // Estonia
    'fi': { minLength: 9, maxLength: 9 },   // Finland
    'fr': { minLength: 9, maxLength: 9 },    // France
    'ge': { minLength: 9, maxLength: 9 },    // Georgia
    'de': { minLength: 10, maxLength: 10 },  // Germany
    'gr': { minLength: 10, maxLength: 10 },  // Greece
    'hk': { minLength: 8, maxLength: 8 },    // Hong Kong
    'hu': { minLength: 9, maxLength: 9 },    // Hungary
    'is': { minLength: 7, maxLength: 7 },    // Iceland
    'in': { minLength: 10, maxLength: 10 },  // India
    'id': { minLength: 10, maxLength: 10 },  // Indonesia
    'ir': { minLength: 10, maxLength: 10 },  // Iran
    'iq': { minLength: 10, maxLength: 10 },  // Iraq
    'ie': { minLength: 9, maxLength: 9 },    // Ireland
    'il': { minLength: 9, maxLength: 9 },    // Israel
    'it': { minLength: 9, maxLength: 9 },   // Italy
    'jp': { minLength: 10, maxLength: 10 },  // Japan
    'jo': { minLength: 9, maxLength: 9 },    // Jordan
    'kz': { minLength: 10, maxLength: 10 },  // Kazakhstan
    'ke': { minLength: 9, maxLength: 9 },    // Kenya
    'kr': { minLength: 9, maxLength: 9 },   // South Korea
    'kw': { minLength: 8, maxLength: 8 },    // Kuwait
    'lv': { minLength: 8, maxLength: 8 },    // Latvia
    'lb': { minLength: 7, maxLength: 7 },    // Lebanon
    'ly': { minLength: 9, maxLength: 9 },    // Libya
    'lt': { minLength: 8, maxLength: 8 },    // Lithuania
    'lu': { minLength: 9, maxLength: 9 },    // Luxembourg
    'my': { minLength: 9, maxLength: 9 },   // Malaysia
    'mt': { minLength: 8, maxLength: 8 },    // Malta
    'mx': { minLength: 10, maxLength: 10 },  // Mexico
    'ma': { minLength: 9, maxLength: 9 },    // Morocco
    'nl': { minLength: 9, maxLength: 9 },    // Netherlands
    'nz': { minLength: 8, maxLength: 8 },   // New Zealand
    'ng': { minLength: 10, maxLength: 10 },  // Nigeria
    'no': { minLength: 8, maxLength: 8 },    // Norway
    'om': { minLength: 8, maxLength: 8 },    // Oman
    'pk': { minLength: 10, maxLength: 10 },  // Pakistan
    'pa': { minLength: 8, maxLength: 8 },    // Panama
    'pe': { minLength: 9, maxLength: 9 },    // Peru
    'ph': { minLength: 10, maxLength: 10 },  // Philippines
    'pl': { minLength: 9, maxLength: 9 },    // Poland
    'pt': { minLength: 9, maxLength: 9 },    // Portugal
    'qa': { minLength: 8, maxLength: 8 },    // Qatar
    'ro': { minLength: 9, maxLength: 9 },    // Romania
    'ru': { minLength: 10, maxLength: 10 },  // Russia
    'sa': { minLength: 9, maxLength: 9 },    // Saudi Arabia
    'sg': { minLength: 8, maxLength: 8 },    // Singapore
    'sk': { minLength: 9, maxLength: 9 },    // Slovakia
    'si': { minLength: 8, maxLength: 8 },    // Slovenia
    'za': { minLength: 9, maxLength: 9 },    // South Africa
    'es': { minLength: 9, maxLength: 9 },    // Spain
    'se': { minLength: 9, maxLength: 9 },    // Sweden
    'ch': { minLength: 9, maxLength: 9 },    // Switzerland
    'tw': { minLength: 9, maxLength: 9 },    // Taiwan
    'th': { minLength: 9, maxLength: 9 },    // Thailand
    'tn': { minLength: 8, maxLength: 8 },    // Tunisia
    'tr': { minLength: 10, maxLength: 10 },  // Turkey
    'ua': { minLength: 9, maxLength: 9 },    // Ukraine
    'ae': { minLength: 9, maxLength: 9 },    // United Arab Emirates
    'gb': { minLength: 10, maxLength: 10 },  // United Kingdom
    'us': { minLength: 10, maxLength: 10 },  // United States
    'uy': { minLength: 8, maxLength: 8 },    // Uruguay
    'uz': { minLength: 9, maxLength: 9 },    // Uzbekistan
    've': { minLength: 10, maxLength: 10 },  // Venezuela
    'vn': { minLength: 9, maxLength: 9 },   // Vietnam
    'ye': { minLength: 9, maxLength: 9 },    // Yemen
    'zw': { minLength: 9, maxLength: 9 },    // Zimbabwe
};

// Add this object at the top of your file with other constants
const countryStartDigits = {
    'af': ['7'], // Afghanistan
    'al': ['6'], // Albania
    'dz': ['5', '6', '7'], // Algeria
    'ar': ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // Argentina
    'au': ['4'], // Australia
    'at': ['6'], // Austria
    'be': ['4'], // Belgium
    'bi': ['7'], // Burundi
    'br': ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // Brazil
    'bg': ['8', '9'], // Bulgaria
    'ca': ['2', '3', '4', '5', '6', '7', '8', '9'], // Canada
    'cn': ['1', '3', '5', '6', '7', '8', '9'], // China
    'dk': ['2', '3', '4', '5', '6', '7', '8', '9'], // Denmark
    'eg': ['1', '2'], // Egypt
    'fr': ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // France
    'de': ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // Germany
    'gr': ['6', '7'], // Greece
    'hk': ['5', '6', '9'], // Hong Kong
    'in': ['6', '7', '8', '9'], // India
    'id': ['8'], // Indonesia
    'ie': ['8'], // Ireland
    'il': ['5'], // Israel
    'it': ['3'], // Italy
    'jp': ['7', '8', '9'], // Japan
    'my': ['1', '3', '4', '5', '6', '7', '8', '9'], // Malaysia
    'mx': ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // Mexico
    'nl': ['6'], // Netherlands
    'nz': ['2'], // New Zealand
    'no': ['4', '9'], // Norway
    'pk': ['3'], // Pakistan
    'ph': ['9'], // Philippines
    'pl': ['5', '6', '7', '8', '9'], // Poland
    'pt': ['9'], // Portugal
    'ru': ['9'], // Russia
    'sa': ['5'], // Saudi Arabia
    'sg': ['8', '9'], // Singapore
    'za': ['6', '7', '8'], // South Africa
    'kr': ['1'], // South Korea
    'es': ['6', '7'], // Spain
    'se': ['7'], // Sweden
    'ch': ['7', '8', '9'], // Switzerland
    'tw': ['9'], // Taiwan
    'th': ['6', '8', '9'], // Thailand
    'tr': ['5'], // Turkey
    'ae': ['5'], // UAE
    'gb': ['7'], // United Kingdom
    'us': ['2', '3', '4', '5', '6', '7', '8', '9'], // United States
    'vn': ['3', '5', '7', '8', '9'], // Vietnam
};

function validateField(input) {
    let isValid = true;
    let errorMessage = '';

    // Check for empty required fields first
    if (input.hasAttribute('required') || input.dataset.touched === 'true') {
        if (!input.value.trim() && input.type !== 'file') {  // Skip empty check for file inputs
            isValid = false;
            errorMessage = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
        }
    }

    // Only proceed with specific validation if the field is not empty
    if (input.value.trim() || input.type === 'file') {  // Modified condition to handle file inputs
        switch(input.name) {
            case 'firstName':
            case 'lastName':
                const nameRegex = /^[a-zA-Z]+$/;
                isValid = nameRegex.test(input.value.trim());
                errorMessage = 'Only characters allowed from a-z and A-Z';
                break;
            case 'email':
                const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const domainEndRegex = /^[^@]+@[^@]+\.(com|org|net|edu|co|in)$/i;
                const localPartLengthRegex = /^[^@]{1,30}@/;
                const domainPartLengthRegex = /@[^.]{1,10}\./;
                
                if (input.value.trim() === '') {
                    isValid = false;
                    errorMessage = 'Email address is required';
                } else if (!input.value.includes('@')) {
                    isValid = false;
                    errorMessage = 'Email must contain @ symbol';
                } else if (!input.value.includes('.')) {
                    isValid = false;
                    errorMessage = 'Email must contain a valid domain';
                } else if (!localPartLengthRegex.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = 'Email address cannot exceed 30 characters before @';
                } else if (!domainPartLengthRegex.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = 'Domain name cannot exceed 10 characters';
                } else if (!domainEndRegex.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = 'Invalid domain. Email must end with .com, .org, .net, .edu, .co, or .in';
                } else if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address (e.g., example@domain.com)';
                }
                break;
            case 'phone':
                const phoneNumber = input.value.replace(/\D/g, ''); // Remove non-digits
                const selectedCountry = phoneInput.getSelectedCountryData().iso2;
                const countryRules = countryPhoneRules[selectedCountry] || { minLength: 4, maxLength: 15 };
                const validStartDigits = countryStartDigits[selectedCountry];

                if (!input.value.trim()) {
                    isValid = false;
                    errorMessage = 'Phone number is required';
                } else if (!/^\d+$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = 'Only numbers (0-9) are allowed';
                } else if (validStartDigits) {
                    // Get the first digit of the actual phone number (excluding country code)
                    const numberWithoutCode = phoneNumber.slice(-countryRules.minLength);
                    const firstDigit = numberWithoutCode.charAt(0);
                    
                    if (!validStartDigits.includes(firstDigit)) {
                        isValid = false;
                        errorMessage = `Numbers for ${phoneInput.getSelectedCountryData().name} must start with ${validStartDigits.join(' or ')}`;
                    } else if (phoneNumber.length < countryRules.minLength || phoneNumber.length > countryRules.maxLength) {
                        isValid = false;
                        errorMessage = `Phone number must be ${countryRules.minLength} digits for ${phoneInput.getSelectedCountryData().name}`;
                        if (countryRules.minLength !== countryRules.maxLength) {
                            errorMessage = `Phone number must be between ${countryRules.minLength} and ${countryRules.maxLength} digits for ${phoneInput.getSelectedCountryData().name}`;
                        }
                    } else if (!phoneInput.isValidNumber()) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                } else if (phoneNumber.length < countryRules.minLength || phoneNumber.length > countryRules.maxLength) {
                    isValid = false;
                    errorMessage = `Phone number must be ${countryRules.minLength} digits for ${phoneInput.getSelectedCountryData().name}`;
                    if (countryRules.minLength !== countryRules.maxLength) {
                        errorMessage = `Phone number must be between ${countryRules.minLength} and ${countryRules.maxLength} digits for ${phoneInput.getSelectedCountryData().name}`;
                    }
                } else if (!phoneInput.isValidNumber()) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                
                // Update validation classes for phone input container
                const phoneContainer = input.closest('.iti');
                if (phoneContainer) {
                    phoneContainer.classList.toggle('valid', isValid && input.value.length > 0);
                    phoneContainer.classList.toggle('invalid', !isValid && input.value.length > 0);
                    
                    // Show error message
                    const errorElement = phoneContainer.nextElementSibling;
                    if (errorElement && errorElement.classList.contains('error-text')) {
                        errorElement.textContent = (!isValid && input.value.length > 0) ? errorMessage : '';
                    }
                }
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
                
                if (isValid) {
                    // Remove invalid class if valid
                    imageContainer.classList.remove('invalid');
                    imageContainer.classList.add('valid');
                } else {
                    // Only show invalid state if the field has been touched
                    if (input.dataset.touched === 'true') {
                        imageContainer.classList.remove('valid');
                        imageContainer.classList.add('invalid');
                    }
                }
                
                const imageError = imageContainer.nextElementSibling;
                if (imageError && imageError.classList.contains('error-text')) {
                    imageError.textContent = (input.dataset.touched === 'true' && !isValid) ? errorMessage : '';
                }
                return isValid;
        }
    }

    // Update visual feedback
    input.classList.toggle('valid', isValid && input.value.length > 0);
    input.classList.toggle('invalid', !isValid);
    
    // Show error message
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-text')) {
        errorElement.textContent = !isValid ? errorMessage : '';
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
document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate all fields first
    const fields = ['firstName', 'lastName', 'email', 'phone', 'gender', 'education', 'profileImage'];
    let isValid = true;

    // Mark all fields as touched before validation
    fields.forEach(field => {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            input.dataset.touched = 'true';
            if (!validateField(input)) {
                isValid = false;
            }
        }
    });

    if (!isValid) {
        return false;
    }

    try {
        // Create form data object with URL parameters
        const params = new URLSearchParams();
        
        // Add basic form fields
        params.append('firstName', this.firstName.value || '');
        params.append('lastName', this.lastName.value || '');
        params.append('email', this.email.value || '');
        params.append('phone', phoneInput.getNumber() || '');
        params.append('gender', document.querySelector('input[name="gender"]:checked')?.value || '');
        params.append('education', this.education.value || '');

        // Handle profile image
        const profileImageInput = this.profileImage;
        const existingImageInput = document.querySelector('input[name="existingProfileImage"]');

        if (profileImageInput.files.length > 0) {
            // New image selected
            const file = profileImageInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                params.append('profileImage', e.target.result);
                window.location.href = './preview/index.html?' + params.toString();
            };
            reader.readAsDataURL(file);
            return;
        } else if (existingImageInput?.value) {
            // Use existing image
            params.append('profileImage', existingImageInput.value);
        }

        // Redirect to preview page with parameters
        window.location.href = './preview/index.html?' + params.toString();
    } catch (error) {
        console.error('Error processing form:', error);
    }
});

// Modify the image preview functionality to handle validation
document.getElementById('profileImage').addEventListener('change', function(e) {
    const imagePreview = document.getElementById('imagePreview');
    const imageContainer = this.closest('.image-input-container');
    
    // Mark as touched when user interacts with the input
    this.dataset.touched = 'true';
    
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">`;
            // Add valid class and remove invalid class
            imageContainer.classList.remove('invalid');
            imageContainer.classList.add('valid');
            // Clear error message
            const errorElement = imageContainer.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-text')) {
                errorElement.textContent = '';
            }
        };
        reader.readAsDataURL(this.files[0]);
    } else {
        imagePreview.innerHTML = ''; // Clear preview if no file selected
        validateField(this); // Revalidate the field
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

    // Clear any existing validation states
    const form = document.getElementById('userForm');
    form.querySelectorAll('.valid, .invalid').forEach(el => {
        el.classList.remove('valid', 'invalid');
    });
    
    // Remove validation classes from containers
    document.querySelector('.iti')?.classList.remove('valid', 'invalid');
    document.querySelector('.gender-group')?.classList.remove('valid', 'invalid');
    document.querySelector('.image-input-container')?.classList.remove('valid', 'invalid');
    
    // Handle profile image
    const profileImg = card.querySelector('img:not([style*="display: none"])');
    const imagePreview = document.getElementById('imagePreview');
    const imageContainer = document.querySelector('.image-input-container');
    
    // Clear the image preview first
    imagePreview.innerHTML = '';
    
    // Reset image container styles
    if (imageContainer) {
        imageContainer.classList.remove('valid', 'invalid');
        imageContainer.style.border = '1px solid #ccc';
    }
    
    if (profileImg && !profileImg.style.display) {
        imagePreview.innerHTML = `<img src="${profileImg.src}" alt="Profile Preview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">`;
        
        let existingImageInput = document.querySelector('input[name="existingProfileImage"]');
        if (!existingImageInput) {
            existingImageInput = document.createElement('input');
            existingImageInput.type = 'hidden';
            existingImageInput.name = 'existingProfileImage';
            form.appendChild(existingImageInput);
        }
        existingImageInput.value = profileImg.src;
    } else {
        // Clear any existing image input value
        const existingImageInput = document.querySelector('input[name="existingProfileImage"]');
        if (existingImageInput) {
            existingImageInput.value = '';
        }
        // Clear the file input
        const fileInput = document.getElementById('profileImage');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    // Clear any error messages
    form.querySelectorAll('.error-text').forEach(error => {
        error.textContent = '';
    });
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

// Add reset handler for the form
document.getElementById('userForm').addEventListener('reset', function(e) {
    // Reset image preview
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = '';
    
    // Reset validation classes
    const imageContainer = document.querySelector('.image-input-container');
    imageContainer.classList.remove('valid', 'invalid');
    
    // Reset error message
    const imageError = imageContainer.nextElementSibling;
    if (imageError) {
        imageError.textContent = '';
    }
    
    // Clear localStorage
    localStorage.removeItem('profileImageData');
    localStorage.removeItem('profileImageName');

    // Reset phone field validation
    const phoneContainer = document.querySelector('.iti');
    if (phoneContainer) {
        phoneContainer.classList.remove('valid', 'invalid');
        const phoneError = phoneContainer.querySelector('.error-text') || phoneContainer.nextElementSibling;
        if (phoneError && phoneError.classList.contains('error-text')) {
            phoneError.textContent = '';
        }
    }
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

        const storedImage = localStorage.getItem('profileImageData');
        if (storedImage) {
            // Update the preview
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${storedImage}" alt="Profile Preview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">`;
            
            // Create a File object from the stored image
            fetch(storedImage)
                .then(res => res.blob())
                .then(blob => {
                    const fileName = 'profile-image' + (blob.type ? '.' + blob.type.split('/')[1] : '.jpg');
                    const file = new File([blob], fileName, { type: blob.type || 'image/jpeg' });
                    
                    // Create a DataTransfer object to set the file input
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    
                    // Set the file input's files
                    const fileInput = document.getElementById('profileImage');
                    fileInput.files = dataTransfer.files;
                });
            
            // Remove validation classes from image container
            const imageContainer = document.querySelector('.image-input-container');
            if (imageContainer) {
                imageContainer.classList.remove('valid', 'invalid');
            }
        }
    }
});

// Add input event listener to allow only numbers
document.querySelector("#phone").addEventListener("input", function(e) {
    let cursorPosition = this.selectionStart;
    this.value = this.value.replace(/[^\d]/g, ''); // Remove non-digits
    this.setSelectionRange(cursorPosition, cursorPosition);
    validateField(this);
});

// Add country change event listener
document.querySelector("#phone").addEventListener("countrychange", function() {
    this.value = ''; // Clear the input when country changes
    validateField(this);
});

// Add this after phoneInput initialization
// Check if we're in edit mode and set the phone number
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('isEditing') === 'true') {
    const phoneNumber = urlParams.get('phoneNumber');
    if (phoneNumber) {
        setTimeout(() => {
            phoneInput.setNumber(phoneNumber);
            // Remove validation classes
            const input = document.querySelector('#phone');
            if (input) {
                input.classList.remove('valid', 'invalid');
            }
            const container = document.querySelector('.iti');
            if (container) {
                container.classList.remove('valid', 'invalid');
            }
        }, 500);
    }
}
            