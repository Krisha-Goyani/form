// Initialize preview page
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Get stored form data
        const storedData = sessionStorage.getItem('formData');
        const profileImage = sessionStorage.getItem('profileImage');
        
        if (!storedData) {
            showEmptyState();
            return;
        }

        const formData = JSON.parse(storedData);
        
        // Add profile image to form data if exists
        if (profileImage) {
            formData.profileImage = profileImage;
        }

        createPreviewCard(formData);
    } catch (error) {
        console.error('Error initializing preview:', error);
        showEmptyState();
    }
});

function createPreviewCard(formData) {
    const previewCard = document.createElement('div');
    previewCard.className = 'preview-card';
    previewCard.draggable = true;

    previewCard.innerHTML = `
        ${formData.profileImage ? 
            `<img src="${formData.profileImage}" alt="Profile" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">` :
            `<div class="avatar-placeholder">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="35" r="25" fill="#B2EBF2"/>
                    <path d="M50 65c-25 0-40 15-40 35h80c0-20-15-35-40-35z" fill="#B2EBF2"/>
                </svg>
            </div>`
        }
        <div class="preview-field">
            <strong>Name:</strong> ${formData.firstName || ''} ${formData.lastName || ''}
        </div>
        <div class="preview-field">
            <strong>Email:</strong> ${formData.email || ''}
        </div>
        <div class="preview-field">
            <strong>Phone Number:</strong> ${formData.phone || ''}
        </div>
        <div class="preview-field">
            <strong>Gender:</strong> ${formData.gender || ''}
        </div>
        <div class="preview-field">
            <strong>Educational Qualification:</strong> ${formData.education || ''}
        </div>
        <div class="button-group">
            <button class="edit-btn" onclick="toggleEdit(this)">Edit</button>
        </div>
    `;

    document.getElementById('previewArea').innerHTML = '';
    document.getElementById('previewArea').appendChild(previewCard);
}

function toggleEdit(btn) {
    try {
        // Get current form data
        const formData = JSON.parse(sessionStorage.getItem('formData'));
        const profileImage = sessionStorage.getItem('profileImage');

        // Add edit flag
        sessionStorage.setItem('isEditing', 'true');
        
        // Redirect to form page
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Error during edit:', error);
        window.location.href = '../index.html';
    }
}

// Clean up when leaving preview page
window.addEventListener('beforeunload', function() {
    if (!document.location.href.includes('preview')) {
        sessionStorage.removeItem('formData');
        sessionStorage.removeItem('profileImage');
        sessionStorage.removeItem('isEditing');
    }
});

function showEmptyState() {
    document.getElementById('previewArea').innerHTML = `
        <div class="empty-state">
            <svg viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#ccc" stroke-width="2"/>
                <line x1="20" y1="20" x2="80" y2="80" stroke="#ccc" stroke-width="2"/>
                <line x1="80" y1="20" x2="20" y2="80" stroke="#ccc" stroke-width="2"/>
            </svg>
            <p>No data available</p>
        </div>
    `;
}

// Create preview card
function createPreviewCard() {
    const previewCard = document.createElement('div');
    previewCard.className = 'preview-card';
    previewCard.draggable = true;
    updatePreviewCard(previewCard);
    document.getElementById('previewArea').innerHTML = '';
    document.getElementById('previewArea').appendChild(previewCard);
}

function updatePreviewCard(card) {
    card.innerHTML = `
        <img src="${formData.profileImage || ''}" alt="Profile" ${formData.profileImage ? '' : 'style="display:none;"'}>
        ${!formData.profileImage ? `
        <div class="avatar-placeholder">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="35" r="25" fill="#B2EBF2"/>
                <path d="M50 65c-25 0-40 15-40 35h80c0-20-15-35-40-35z" fill="#B2EBF2"/>
            </svg>
        </div>
        ` : ''}
        <div class="preview-field" data-field="name">
            <div class="field-row">
                <strong>Name:</strong> 
                <span class="field-value">${formData.firstName} ${formData.lastName}</span>
                <div class="edit-inline" style="display: none;">
                    <input type="text" class="firstName" placeholder="First Name" value="${formData.firstName || ''}">
                    <input type="text" class="lastName" placeholder="Last Name" value="${formData.lastName || ''}">
                </div>
            </div>
        </div>
        <div class="preview-field" data-field="email">
            <div class="field-row">
                <strong>Email:</strong> 
                <span class="field-value">${formData.email || ''}</span>
                <div class="edit-inline" style="display: none;">
                    <input type="email" placeholder="Email" value="${formData.email || ''}">
                </div>
            </div>
        </div>
        <div class="preview-field" data-field="phone">
            <div class="field-row">
                <strong>Phone Number:</strong> 
                <span class="field-value">${formData.phone || ''}</span>
                <div class="edit-inline" style="display: none;">
                    <input type="tel" placeholder="Phone" value="${formData.phone || ''}">
                </div>
            </div>
        </div>
        <div class="preview-field" data-field="gender">
            <div class="field-row">
                <strong>Gender:</strong> 
                <span class="field-value">${formData.gender || ''}</span>
                <div class="edit-inline" style="display: none;">
                    <select>
                        <option value="">Select Gender</option>
                        <option value="Male" ${formData.gender === 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${formData.gender === 'Female' ? 'selected' : ''}>Female</option>
                        <option value="Other" ${formData.gender === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="preview-field" data-field="education">
            <div class="field-row">
                <strong>Educational Qualification:</strong> 
                <span class="field-value">${formData.education || ''}</span>
                <div class="edit-inline" style="display: none;">
                    <select>
                        <option value="">Select Education</option>
                        <option value="12th" ${formData.education === '12th' ? 'selected' : ''}>12th</option>
                        <option value="Bachelor" ${formData.education === 'Bachelor' ? 'selected' : ''}>Bachelor</option>
                        <option value="Master" ${formData.education === 'Master' ? 'selected' : ''}>Master</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="button-group">
            <button class="edit-btn" onclick="toggleEdit(this)">Edit</button>
            <div class="save-cancel-btns" style="display: none;">
                <button class="save-btn" onclick="saveChanges(this)">Save</button>
                <button class="cancel-btn" onclick="cancelEdit(this)">Cancel</button>
            </div>
        </div>
    `;
}

function createDeleteItems() {
    const deleteArea = document.getElementById('deleteArea');
    deleteArea.innerHTML = `
        <div class="delete-items">
            <div class="delete-item">
                <input type="checkbox" id="imageDelete">
                <label><strong>Profile Image:</strong> <img src="${formData.profileImage}" alt="Profile" class="delete-preview-image" style="height: 60px; width: 100px;"></label>
            </div>
            <div class="delete-item">
                <input type="checkbox" id="nameDelete">
                <label><strong>Name: </strong>${formData.firstName} ${formData.lastName}</label>
            </div>
            <div class="delete-item">
                <input type="checkbox" id="emailDelete">
                <label><strong>Email:</strong> ${formData.email}</label>
            </div>
            <div class="delete-item">
                <input type="checkbox" id="phoneDelete">
                <label><strong>Phone Number: </strong>${formData.phone}</label>
            </div>
            <div class="delete-item">
                <input type="checkbox" id="genderDelete">
                <label><strong>Gender: </strong>${formData.gender}</label>
            </div>
            <div class="delete-item">
                <input type="checkbox" id="educationDelete">
                <label><strong>Educational Qualification: </strong>${formData.education}</label>
            </div>
        </div>
        <div class="delete-controls">
            <button id="selectAllBtn">Select All</button>
            <button id="deleteSelectedBtn">Delete</button>
        </div>
    `;
    
    attachDeleteEventListeners();
}

function attachDeleteEventListeners() {
    document.getElementById('selectAllBtn')?.addEventListener('click', function() {
        document.querySelectorAll('.delete-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    document.getElementById('deleteSelectedBtn')?.addEventListener('click', function() {
        const checkedItems = document.querySelectorAll('.delete-item input[type="checkbox"]:checked');
        checkedItems.forEach(checkbox => {
            const field = checkbox.id.replace('Delete', '');
            // Handle profile image deletion separately
            if (field === 'image') {
                formData.profileImage = '';
                // Update preview card image
                const previewCard = document.querySelector('.preview-card');
                const imgElement = previewCard.querySelector('img');
                if (imgElement) {
                    imgElement.style.display = 'none';
                }
                // Show avatar placeholder
                if (!previewCard.querySelector('.avatar-placeholder')) {
                    const avatarPlaceholder = document.createElement('div');
                    avatarPlaceholder.className = 'avatar-placeholder';
                    avatarPlaceholder.innerHTML = `
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="35" r="25" fill="#B2EBF2"/>
                            <path d="M50 65c-25 0-40 15-40 35h80c0-20-15-35-40-35z" fill="#B2EBF2"/>
                        </svg>
                    `;
                    previewCard.insertBefore(avatarPlaceholder, previewCard.firstChild);
                }
            } else {
                // Handle other field deletions
                if (field === 'name') {
                    formData.firstName = '';
                    formData.lastName = '';
                } else {
                    formData[field.toLowerCase()] = '';
                }
            }
            checkbox.parentElement.remove();
        });
        
        // Update preview card
        updatePreviewCard(document.querySelector('.preview-card'));
        
        // Show empty state only if all fields are deleted
        if (Object.values(formData).every(value => !value)) {
            showEmptyState();
        }
    });
}

// Drag and drop functionality
const previewArea = document.getElementById('previewArea');
const deleteArea = document.getElementById('deleteArea');

previewArea.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('preview-card')) {
        e.target.classList.add('dragging');
        deleteArea.classList.add('drag-over');
    }
});

deleteArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    deleteArea.classList.add('drag-over');
});

deleteArea.addEventListener('dragleave', () => {
    deleteArea.classList.remove('drag-over');
});

deleteArea.addEventListener('drop', (e) => {
    e.preventDefault();
    deleteArea.classList.remove('drag-over');
    document.querySelector('.preview-card')?.classList.remove('dragging');
    createDeleteItems();
}); 