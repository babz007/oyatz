# EmailJS Setup Guide

To enable automatic email sending for booking requests, you need to set up EmailJS (free service that works with static sites).

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Templates

### Template 1: Booking Request (to you)

1. Go to **Email Templates** → **Create New Template**
2. Name it: `template_booking`
3. Set **To Email**: `ainababs0@gmail.com`
4. Set **Subject**: `New Booking Request - {{from_name}}`
5. Use this HTML template:

```html
<h2>New Booking Request - OYATZ Hair</h2>
<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <th style="background-color: #a47864; color: white; padding: 12px; border: 1px solid #ddd;">Field</th>
    <th style="background-color: #a47864; color: white; padding: 12px; border: 1px solid #ddd;">Value</th>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;"><strong>Name</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd;">{{from_name}}</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;"><strong>Email</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd;">{{from_email}}</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;"><strong>Phone</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd;">{{phone}}</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;"><strong>Preferred Day</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd;">{{day}}</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;"><strong>Preferred Time</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd;">{{time}}</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;"><strong>Services Requested</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd;">{{services}}</td>
  </tr>
  <tr>
    <td style="padding: 12px; border: 1px solid #ddd;"><strong>Additional Information</strong></td>
    <td style="padding: 12px; border: 1px solid #ddd;">{{extra_info}}</td>
  </tr>
</table>
```

6. Copy the **Template ID** (e.g., `template_xyz789`)

### Template 2: Confirmation (to customer)

1. Create another template: `template_confirmation`
2. Set **To Email**: `{{to_email}}`
3. Set **Subject**: `Booking Request Received - OYATZ Hair`
4. Use this HTML template:

```html
<h2>Booking Request Received - OYATZ Hair</h2>
<p>Thank you, <strong>{{customer_name}}</strong>!</p>
<p>We have received your booking request and will get back to you shortly to confirm your appointment.</p>
<h3>Your Booking Details:</h3>
<p><strong>Preferred Day:</strong> {{day}}</p>
<p><strong>Preferred Time:</strong> {{time}}</p>
<p><strong>Services Requested:</strong> {{services}}</p>
<p>We will contact you soon to confirm your appointment.</p>
<p>Best regards,<br>OYATZ Hair</p>
```

5. Copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abc123xyz`)

## Step 5: Update the Code

1. Open `app/layout.tsx`
2. Add EmailJS script in the `<head>`:

```tsx
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
></script>
<script
  type="text/javascript"
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        emailjs.init('YOUR_PUBLIC_KEY_HERE');
      })();
    `,
  }}
/>
```

3. Open `components/BookingModal.tsx`
4. Replace `'service_oyatz'` with your Service ID
5. Replace `'template_booking'` with your booking template ID
6. Replace `'template_confirmation'` with your confirmation template ID

## Alternative: Use Formspree (Easier Setup)

If EmailJS seems complicated, you can use Formspree instead:

1. Go to https://formspree.io/
2. Sign up and create a form
3. Get your form endpoint
4. Update the `handleSubmit` function to use Formspree's API

