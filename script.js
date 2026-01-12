// ===================================
// Configuration
// ===================================
const CONFIG = {
    googleSheetsUrl: 'https://script.google.com/macros/s/AKfycbw2wlwzYzH5vTsBdjkIYerA_xtZX5Kqq8ToTINuQNDMgZSKYp6uM4LKvAlzrJICdaoyUg/exec',
    // Google Review URL
    googleReviewUrl: 'https://g.page/r/CUI8yZVivh9MEBE/review',

    // Redirect delay (milliseconds)
    redirectDelay: 2000,

    // Mobile number validation (Indian format: 10 digits starting with 6-9)
    mobilePattern: /^[6-9][0-9]{9}$/
};

// ===================================
// DOM Elements
// ===================================
const form = document.getElementById('reviewForm');
const mobileInput = document.getElementById('mobile');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const mobileError = document.getElementById('mobileError');

// ===================================
// Event Listeners
// ===================================

// Mobile number input - only allow numbers
mobileInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    validateMobile();
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateMobile()) {
        return;
    }

    const formData = {
        mobile: mobileInput.value,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Submitting...';

    try {
        // Send data to email
        await sendToEmail(formData);

        // Store mobile number locally (optional backup)
        storeMobileNumber(formData);

        // Show success message
        showSuccess();

        // Redirect to Google Review after delay
        setTimeout(() => {
            window.location.href = CONFIG.googleReviewUrl;
        }, CONFIG.redirectDelay);

    } catch (error) {
        console.error('Error:', error);
        // Even if email fails, still redirect to Google Review
        alert('Thank you! Redirecting to Google Review...');
        setTimeout(() => {
            window.location.href = CONFIG.googleReviewUrl;
        }, 1000);
    }
});

// ===================================
// Validation Functions
// ===================================
function validateMobile() {
    const mobile = mobileInput.value;

    if (!mobile) {
        showError('Mobile number is required');
        return false;
    }

    if (!CONFIG.mobilePattern.test(mobile)) {
        showError('Please enter a valid 10-digit mobile number');
        return false;
    }

    clearError();
    return true;
}

function showError(message) {
    mobileInput.classList.add('error');
    mobileError.textContent = message;
    mobileError.style.display = 'block';
}

function clearError() {
    mobileInput.classList.remove('error');
    mobileError.textContent = '';
    mobileError.style.display = 'none';
}

// ===================================
// Google Sheets Submission
// ===================================
async function sendToEmail(data) {
    // Send data to Google Sheets via Apps Script Web App

    try {
        const response = await fetch(CONFIG.googleSheetsUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: data.mobile,
                timestamp: data.timestamp
            })
        });

        console.log('Data sent to Google Sheets');
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        // Continue anyway - data is stored locally as backup
    }
}

// ===================================
// Local Storage (Backup)
// ===================================
function storeMobileNumber(data) {
    try {
        // Get existing data
        let customers = JSON.parse(localStorage.getItem('nfm_customers') || '[]');

        // Add new entry
        customers.push(data);

        // Store back
        localStorage.setItem('nfm_customers', JSON.stringify(customers));

        console.log('Mobile number stored locally');
    } catch (error) {
        console.error('LocalStorage error:', error);
    }
}

// ===================================
// Success Display
// ===================================
function showSuccess() {
    form.style.display = 'none';
    successMessage.classList.add('show');
}

// ===================================
// Utility: Export stored data (for admin use)
// ===================================
// You can call this function from browser console to export all stored numbers
function exportCustomerData() {
    const data = localStorage.getItem('nfm_customers');
    if (!data) {
        console.log('No customer data found');
        return;
    }

    const customers = JSON.parse(data);
    console.log('Total customers:', customers.length);
    console.table(customers);

    // Download as JSON file
    const blob = new Blob([JSON.stringify(customers, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nfm - customers - ${Date.now()}.json`;
    a.click();
}

// Make export function available globally
window.exportCustomerData = exportCustomerData;

// ===================================
// Console Info
// ===================================
console.log('%c Nanak Food Mart - Review System ', 'background: #3d2817; color: #c9a961; padding: 8px; font-weight: bold;');
console.log('To export customer data, type: exportCustomerData()');
