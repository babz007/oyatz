# Web3Forms Setup Guide - Automatic Email Sending

Web3Forms is a FREE service that sends emails automatically from your static website. No backend required!

## Quick Setup (2 minutes)

### Step 1: Get Your Access Key

1. Go to **https://web3forms.com/**
2. Enter your email: `ainababs0@gmail.com`
3. Click **Get Your Access Key**
4. Check your email for the access key (it will look like: `abc123-def456-ghi789`)

### Step 2: Add Access Key to Your Project

**Option A: For Local Development**

Create a file called `.env.local` in your project root:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

**Option B: For GitHub Pages (Production)**

1. Go to your GitHub repository: `https://github.com/babz007/oyatz`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
5. Value: Paste your access key
6. Click **Add secret**

Then update `.github/workflows/deploy.yml` to use the secret:

```yaml
- name: Build
  run: npm run build
  env:
    GITHUB_PAGES_BASE_PATH: /oyatz
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: ${{ secrets.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY }}
```

### Step 3: Test It!

1. Run `npm run dev`
2. Fill out the booking form
3. Submit it
4. Check your email (`ainababs0@gmail.com`) - you should receive the booking request
5. Check the customer's email - they should receive a confirmation

## How It Works

When someone submits the booking form:
1. ✅ **Automatically sends email to you** (`ainababs0@gmail.com`) with all booking details in a formatted table
2. ✅ **Automatically sends confirmation email to the customer** with their booking details
3. ✅ **No email client opens** - everything happens automatically in the background
4. ✅ **Free forever** - unlimited emails

## Email Format

**Email to you:**
- Subject: "New Booking Request from [Customer Name] - OYATZ Hair"
- Contains: Name, Email, Phone, Day, Time, Services, Additional Info
- Formatted as a beautiful HTML table

**Confirmation email to customer:**
- Subject: "Booking Request Received - OYATZ Hair"
- Contains: Thank you message + their booking details

## Troubleshooting

**Emails not sending?**
- Make sure your access key is correct
- Check that `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set in your environment
- Check the browser console for any errors

**For GitHub Pages:**
- Make sure you added the secret in GitHub repository settings
- Make sure you updated the workflow file to use the secret
- Re-run the GitHub Actions workflow after adding the secret

## Alternative: EmailJS

If you prefer EmailJS, see `lib/emailjs-setup.md` for instructions. However, Web3Forms is recommended because it's simpler and requires less setup.

