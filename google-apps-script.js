/**
 * Google Apps Script for Nanak Food Mart Review System
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open this Google Sheet: https://docs.google.com/spreadsheets/d/1B1KeLrzRFgPLNDmLnAblPzj5Q6wJ53q8ImndaVToteA/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL and paste it in script.js CONFIG.googleSheetsUrl
 */

// Name of the sheet where data will be stored
const SHEET_NAME = 'Sheet1'; // Change this if your sheet has a different name

/**
 * Handle POST requests from the website
 */
function doPost(e) {
    try {
        // Parse the incoming data
        const data = JSON.parse(e.postData.contents);

        // Get the active sheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse the timestamp to get date and time separately
        const now = new Date();
        const dateStr = Utilities.formatDate(now, 'Asia/Kolkata', 'dd/MM/yyyy');
        const timeStr = Utilities.formatDate(now, 'Asia/Kolkata', 'hh:mm:ss a');

        // Add the data to the sheet (Number, Date, Time)
        sheet.appendRow([
            data.mobile,  // Number
            dateStr,      // Date
            timeStr       // Time
        ]);

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService
            .createTextOutput(JSON.stringify({
                success: false,
                error: error.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Test function - run this to verify setup
 * This will add a test entry to your sheet
 */
function testSetup() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const now = new Date();
    const dateStr = Utilities.formatDate(now, 'Asia/Kolkata', 'dd/MM/yyyy');
    const timeStr = Utilities.formatDate(now, 'Asia/Kolkata', 'hh:mm:ss a');

    sheet.appendRow([
        '9876543210',  // Test mobile number
        dateStr,       // Current date
        timeStr        // Current time
    ]);

    Logger.log('Test data added successfully!');
    Logger.log('Number: 9876543210');
    Logger.log('Date: ' + dateStr);
    Logger.log('Time: ' + timeStr);
}
