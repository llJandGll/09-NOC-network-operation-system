interface AlertEmailData {
  url: string;
  status: string;
  timestamp: Date;
}

export function alertEmailTemplate(data: AlertEmailData): string {
  const formattedDate = data.timestamp.toISOString();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background-color: #dc3545; color: #ffffff; padding: 20px 30px; }
          .header h1 { margin: 0; font-size: 22px; }
          .body { padding: 30px; }
          .status-badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 14px; background-color: #dc3545; color: #ffffff; }
          .detail { margin: 16px 0; padding: 12px 16px; background-color: #f8f9fa; border-left: 4px solid #dc3545; border-radius: 4px; }
          .detail p { margin: 4px 0; color: #333; }
          .label { font-weight: bold; color: #555; }
          .footer { padding: 16px 30px; background-color: #f8f9fa; text-align: center; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NOC Alert</h1>
          </div>
          <div class="body">
            <p>A monitored service has changed status:</p>
            <div class="detail">
              <p><span class="label">URL:</span> ${data.url}</p>
              <p><span class="label">Status:</span> <span class="status-badge">${data.status}</span></p>
              <p><span class="label">Detected at:</span> ${formattedDate}</p>
            </div>
            <p>Please investigate immediately.</p>
          </div>
          <div class="footer">
            <p>NOC - Network Operation Center</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
