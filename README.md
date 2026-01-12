# Nanak Food Mart - QR Review System

A premium single-page website for collecting customer mobile numbers and feedback, then redirecting to Google Review.

## 🎯 Features

- ✅ Clean, professional design matching brand aesthetic
- ✅ Mobile number collection with validation
- ✅ Optional feedback textarea
- ✅ Automatic data storage in Google Sheets
- ✅ Auto-redirect to Google Review page
- ✅ Local storage backup
- ✅ Mobile responsive
- ✅ Ready for Vercel deployment

## 📋 Setup Instructions

### Step 1: Google Sheets Setup

1. **Create a new Google Sheet** or open an existing one
2. Go to **Extensions > Apps Script**
3. Delete any existing code
4. Copy the entire content from `google-apps-script.js` and paste it
5. Click **Save** (💾 icon)
6. Click **Deploy > New deployment**
7. Click the gear icon ⚙️ next to "Select type"
8. Choose **Web app**
9. Configure:
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
10. Click **Deploy**
11. **Authorize** the app (you may see a warning - click "Advanced" then "Go to [project name]")
12. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/...`)

### Step 2: Update Website Configuration

1. Open `script.js`
2. Find line 7: `googleSheetsUrl: 'YOUR_GOOGLE_SHEETS_WEB_APP_URL'`
3. Replace with your actual Web App URL from Step 1
4. Save the file

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Navigate to project folder
cd /Users/iamrps/Desktop/NFM

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **nanak-food-mart** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New > Project**
3. Import your Git repository OR drag & drop the NFM folder
4. Click **Deploy**

### Step 4: Generate QR Code

1. Once deployed, you'll get a URL like: `https://nanak-food-mart.vercel.app`
2. Go to [QR Code Generator](https://www.qr-code-generator.com/)
3. Enter your Vercel URL
4. Download the QR code
5. Print and display at your billing counter!

## 🧪 Testing

### Test Google Sheets Integration

1. Open your Google Sheet
2. Go to **Extensions > Apps Script**
3. Click **Run > testSetup**
4. Check your sheet - you should see a test entry

### Test Website Locally

1. Open `index.html` in your browser
2. Enter a test mobile number (e.g., 9876543210)
3. Add optional feedback
4. Click Submit
5. Check your Google Sheet for the new entry

## 📊 Viewing Customer Data

### From Google Sheets
- Open your Google Sheet
- All data is automatically saved with timestamp
- You can filter, sort, and export as needed

### From Browser (Backup)
- Open browser console (F12)
- Type: `exportCustomerData()`
- Downloads a JSON file with all locally stored data

## 🎨 Customization

### Change Colors
Edit `style.css` variables:
```css
--color-cream: #f5f1e8;
--color-dark-brown: #3d2817;
--color-gold: #c9a961;
```

### Change Redirect Delay
Edit `script.js`:
```javascript
redirectDelay: 2000, // milliseconds (2 seconds)
```

## 📱 Mobile Number Format

- Validates Indian mobile numbers
- Must be 10 digits
- Must start with 6, 7, 8, or 9

## 🔒 Privacy & Data

- Mobile numbers stored securely in your Google Sheet
- Local browser backup for redundancy
- No third-party data sharing
- HTTPS encryption via Vercel

## 🆘 Troubleshooting

### Data not appearing in Google Sheets?
1. Check if Web App URL is correct in `script.js`
2. Verify Apps Script deployment settings (Anyone can access)
3. Check browser console for errors (F12)

### QR code not working?
1. Verify Vercel deployment is live
2. Test URL in browser first
3. Regenerate QR code with correct URL

### Form not submitting?
1. Check browser console for errors
2. Verify mobile number is 10 digits
3. Check internet connection

## 📞 Support

For issues or questions, check:
- Browser console (F12) for error messages
- Google Sheets Apps Script logs
- Vercel deployment logs

## 🚀 Quick Start Checklist

- [ ] Set up Google Sheets with Apps Script
- [ ] Copy Web App URL to script.js
- [ ] Deploy to Vercel
- [ ] Generate QR code with Vercel URL
- [ ] Test the complete flow
- [ ] Print QR code for display

---

**Nanak Food Mart** | Bakery • Cafe • Restaurant Supplies | Kanpur
