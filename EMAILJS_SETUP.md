# EmailJS Setup Guide

## Step 1: Sign up for EmailJS
1. Go to [emailjs.com](https://emailjs.com)
2. Sign up for a free account
3. You get 200 emails/month free

## Step 2: Create an Email Service

### Option A: Gmail (Recommended)
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail**
4. Connect your Gmail account
5. Note your `service_id` (like `service_abc123`)

### Option B: SMTP (More control)
1. Choose **Custom SMTP**
2. Use your email provider's SMTP settings
3. For Gmail SMTP:
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Username: your email
   - Password: your app password (not regular password)

## Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up your template:

**Template Name**: `contact_form`
**Subject**: `New Contact Form Submission from {{name}}`
**Content**:
```
Name: {{name}}
Email: {{email}}
Organization: {{organization}}
Interest Area: {{interest}}
Message: {{message}}

---
Sent from Aletheia website contact form
```

4. Save and note your `template_id` (like `template_xyz789`)

## Step 4: Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (like `user_def456`)

## Step 5: Update Your Code

### Option A: Environment Variables (Recommended)
Create a `.env.local` file in your project root:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_def456
```

Replace the values with your actual IDs from EmailJS.

### Option B: Direct in Code
Replace the placeholder values in `app/contact/page.tsx`:

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID' // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // e.g., 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // e.g., 'user_def456'
```

## Step 6: Test Your Form
1. Deploy your site
2. Fill out the contact form
3. Check your email for the submission
4. Check EmailJS dashboard for delivery status

## Troubleshooting

### Gmail Setup Issues
- Make sure you're using an **App Password**, not your regular password
- Enable 2-factor authentication on your Gmail account
- Generate an app password: Google Account → Security → App passwords

### Template Variables
Make sure your template variables match the form field names:
- `{{name}}` - from name field
- `{{email}}` - from email field
- `{{organization}}` - from organization field
- `{{interest}}` - from interest field
- `{{message}}` - from message field

### Common Errors
- **400 Bad Request**: Check your service_id, template_id, and public_key
- **401 Unauthorized**: Check your public_key
- **Template not found**: Check your template_id

## Security Notes
- Your public key is safe to expose in frontend code
- EmailJS handles the email sending server-side
- No sensitive credentials are exposed to users

## Cost
- **Free tier**: 200 emails/month
- **Paid plans**: Start at $15/month for more emails
- Perfect for most small to medium websites 