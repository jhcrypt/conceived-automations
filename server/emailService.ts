import { notifyOwner } from "./_core/notification";

interface MagicLinkEmailData {
  email: string;
  token: string;
  workflowId: number;
}

/**
 * Send magic link email to user
 * For now, we'll use the notification system to send emails
 * In production, you'd integrate with SendGrid, AWS SES, or similar
 */
export async function sendMagicLinkEmail(data: MagicLinkEmailData) {
  const magicLinkUrl = `${process.env.VITE_APP_URL || 'https://conceived-automations.manus.space'}/workflow-preview?token=${data.token}`;
  
  // For MVP, we'll notify the owner who can manually forward the link
  // In production, integrate with a proper email service
  await notifyOwner({
    title: `Magic Link for Workflow Preview #${data.workflowId}`,
    content: `Send this magic link to ${data.email}:

${magicLinkUrl}

This link expires in 48 hours.

---
Email Template:
---
Subject: Your Custom Workflow Preview is Ready! 🚀

Hi there,

Your personalized automation workflow preview is ready to view!

Click here to see your custom workflow:
${magicLinkUrl}

What you'll see:
✨ A visual representation of your automated workflow
📊 Estimated time savings and efficiency gains
🎯 How we'll solve your specific automation challenges

This preview is designed to protect our intellectual property while giving you a clear understanding of the solution we'll build for you.

The link expires in 48 hours, so don't wait!

Questions? Simply reply to this email or schedule a discovery call directly from the preview page.

Best regards,
The Conceived Automations Team

---
Note: This is a secure one-time link. Do not share it with others.
`,
  });

  // TODO: In production, replace with actual email service
  // Example with SendGrid:
  // await sendEmail({
  //   to: data.email,
  //   subject: 'Your Custom Workflow Preview is Ready! 🚀',
  //   html: generateEmailTemplate(magicLinkUrl),
  // });

  return { success: true, magicLinkUrl };
}

/**
 * Generate HTML email template for magic link
 */
function generateEmailTemplate(magicLinkUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Workflow Preview is Ready</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #8b5cf6;
    }
    h1 {
      color: #1f2937;
      font-size: 28px;
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 30px 0;
    }
    .features {
      background-color: #f9fafb;
      border-left: 4px solid #8b5cf6;
      padding: 20px;
      margin: 30px 0;
    }
    .feature-item {
      margin: 10px 0;
      padding-left: 25px;
      position: relative;
    }
    .feature-item:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #8b5cf6;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .warning {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">⚡ Conceived Automations</div>
    </div>
    
    <h1>Your Custom Workflow Preview is Ready! 🚀</h1>
    
    <p>Hi there,</p>
    
    <p>Great news! Your personalized automation workflow preview has been generated and is ready to view.</p>
    
    <div style="text-align: center;">
      <a href="${magicLinkUrl}" class="cta-button">View Your Workflow Preview →</a>
    </div>
    
    <div class="features">
      <strong>What you'll see:</strong>
      <div class="feature-item">A visual representation of your automated workflow</div>
      <div class="feature-item">Estimated time savings and efficiency gains</div>
      <div class="feature-item">How we'll solve your specific automation challenges</div>
      <div class="feature-item">Clear next steps to get started</div>
    </div>
    
    <p>This preview is designed to protect our intellectual property while giving you a clear understanding of the solution we'll build for your business.</p>
    
    <div class="warning">
      <strong>⏰ Important:</strong> This secure link expires in 48 hours. View it soon!
    </div>
    
    <p>Have questions? Simply reply to this email or schedule a discovery call directly from the preview page.</p>
    
    <p>We're excited to help you automate your business processes!</p>
    
    <p>Best regards,<br>
    <strong>The Conceived Automations Team</strong></p>
    
    <div class="footer">
      <p>🔒 This is a secure one-time access link. Please do not share it with others.</p>
      <p>If you didn't request this workflow preview, you can safely ignore this email.</p>
    </div>
  </div>
</body>
</html>
  `;
}
