# Nanak Food Mart - Google Sheets Setup Guide

## 📋 Quick Setup (5 minutes)

### Step 1: Open Your Google Sheet
Your sheet is already created:
https://docs.google.com/spreadsheets/d/1B1KeLrzRFgPLNDmLnAblPzj5Q6wJ53q8ImndaVToteA/edit

Make sure it has these 3 columns:
- **Number** (Column A)
- **Date** (Column B)  
- **Time** (Column C)

### Step 2: Add Apps Script

1. In your Google Sheet, click **Extensions > Apps Script**
2. Delete any existing code
3. Copy ALL the code from `google-apps-script.js` file
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon)

### Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description:** Nanak Food Mart Review System
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
5. Click **Deploy**
6. You may see a warning - click **Advanced** then **Go to [project name]**
7. Click **Allow** to authorize

### Step 4: Copy Web App URL

After deployment, you'll get a URL like:
```
https://script.google.com/macros/s/AKfycbxxx.../exec
```

**COPY THIS URL!**

### Step 5: Update Website Configuration

1. Open the file: `/Users/iamrps/Desktop/NFM/script.js`
2. Find line 7:
   ```javascript
   googleSheetsUrl: 'YOUR_GOOGLE_SHEETS_WEB_APP_URL',
   ```
3. Replace `YOUR_GOOGLE_SHEETS_WEB_APP_URL` with your actual URL
4. Save the file

### Step 6: Test It!

In Apps Script editor:
1. Select function: **testSetup**
2. Click **Run** ▶️
3. Check your Google Sheet - you should see a test entry!

---

## ✅ What Gets Stored

When a customer submits the form, your Google Sheet will automatically save:

| Number | Date | Time |
|--------|------|------|
| 9876543210 | 12/01/2026 | 02:30:45 PM |

- **Number:** Customer's 10-digit mobile number
- **Date:** Date of submission (DD/MM/YYYY format)
- **Time:** Time of submission (12-hour format with AM/PM)

---

## 🔗 Google Review Link

The website already has your Google Review link configured:
```
https://g.page/r/CUI8yZVivh9MEBE/review
```

After customer enters their number, they'll be redirected here automatically.

---

## 🧪 Testing

### Test from Apps Script
```javascript
// In Apps Script, run: testSetup
// This adds: 9876543210 with current date/time
```

### Test from Website
1. Open `index.html` in browser
2. Enter a test number: 9876543210
3. Click "Continue to Google Review"
4. Check your Google Sheet for the new entry

---

## 🚨 Troubleshooting

### Data not appearing?
- ✅ Check Web App URL is correct in `script.js`
- ✅ Verify deployment settings: "Anyone" can access
- ✅ Run `testSetup` function to verify Apps Script works

### Permission errors?
- ✅ Make sure you clicked "Allow" during authorization
- ✅ Check you're logged into the correct Google account

### Wrong format?
- ✅ Verify your sheet columns are: Number, Date, Time
- ✅ Sheet name should be "Sheet1" (or update in script)

---

## 📊 Viewing Your Data

Your Google Sheet will automatically update in real-time as customers submit their numbers. You can:
- Sort by date/time
- Filter by specific dates
- Export to Excel/CSV
- Create charts and reports
- Share with team members

---

## 🎉 You're All Set!

Once you paste the Web App URL in `script.js`, your system is ready to go live!

**Next:** Deploy to Vercel (see main README.md)
