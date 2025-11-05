// Utility functions for downloading invoices and reports

export const downloadInvoicePDF = (invoice: {
  id: string;
  client: string;
  amount: number;
  date: string;
  status: string;
  dueDate: string;
}) => {
  // Create a simple HTML invoice template
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${invoice.id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          color: #333;
        }
        .header {
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .invoice-title {
          font-size: 32px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .invoice-details {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .details-section {
          flex: 1;
        }
        .details-section h3 {
          margin-top: 0;
          color: #666;
          font-size: 14px;
          text-transform: uppercase;
        }
        .details-section p {
          margin: 5px 0;
          font-size: 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        th {
          background-color: #f3f4f6;
          padding: 12px;
          text-align: left;
          font-weight: bold;
          border-bottom: 2px solid #e5e7eb;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .total-row {
          font-weight: bold;
          font-size: 18px;
          background-color: #f9fafb;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-paid {
          background-color: #d1fae5;
          color: #065f46;
        }
        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }
        .status-overdue {
          background-color: #fee2e2;
          color: #991b1b;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="invoice-title">INVOICE</div>
        <div style="font-size: 18px; color: #666;">Invoice #${invoice.id}</div>
      </div>

      <div class="invoice-details">
        <div class="details-section">
          <h3>Bill To:</h3>
          <p><strong>${invoice.client}</strong></p>
        </div>
        <div class="details-section" style="text-align: right;">
          <h3>Invoice Details:</h3>
          <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Status:</strong> <span class="status-badge status-${invoice.status}">${invoice.status}</span></p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cloud Services Invoice</td>
            <td style="text-align: right;">$${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
          <tr class="total-row">
            <td>Total</td>
            <td style="text-align: right;">$${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Thank you for your business!</p>
        <p>This is an automatically generated invoice.</p>
      </div>
    </body>
    </html>
  `;

  // Create a blob and download
  const blob = new Blob([invoiceHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Invoice-${invoice.id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadReportCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      }).join(',')
    )
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadReportExcel = (data: any[], filename: string) => {
  // For Excel, we'll create a simple CSV that Excel can open
  // In a production app, you'd use a library like xlsx or exceljs
  downloadReportCSV(data, filename);
};

export const downloadReportPDF = (reportData: any, reportName: string) => {
  // Create HTML report
  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${reportName}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          color: #333;
        }
        .header {
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .report-title {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 30px 0;
        }
        .summary-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background-color: #f9fafb;
        }
        .summary-card h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
        }
        .summary-card .value {
          font-size: 24px;
          font-weight: bold;
          color: #111;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        th {
          background-color: #f3f4f6;
          padding: 12px;
          text-align: left;
          font-weight: bold;
          border-bottom: 2px solid #e5e7eb;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="report-title">${reportName}</div>
        <div style="font-size: 14px; color: #666;">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      ${reportData.summary ? `
        <div class="summary-cards">
          <div class="summary-card">
            <h3>Total</h3>
            <div class="value">$${reportData.summary.total?.toLocaleString() || '0'}</div>
          </div>
          <div class="summary-card">
            <h3>Period</h3>
            <div class="value">${reportData.summary.period || 'N/A'}</div>
          </div>
          <div class="summary-card">
            <h3>Change</h3>
            <div class="value">${reportData.summary.change > 0 ? '+' : ''}${reportData.summary.change || 0}%</div>
          </div>
        </div>
      ` : ''}

      ${reportData.tableData && reportData.tableData.length > 0 ? `
        <table>
          <thead>
            <tr>
              ${Object.keys(reportData.tableData[0]).map(key => `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${reportData.tableData.map((row: any) => `
              <tr>
                ${Object.values(row).map((value: any) => `<td>${value}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}

      <div class="footer">
        <p>This is an automatically generated report.</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([reportHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${reportName.replace(/\s+/g, '-')}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadConsumptionReport = (consumptionData: any[], filename: string, format: 'csv' | 'excel' | 'pdf' = 'csv') => {
  if (format === 'pdf') {
    const reportData = {
      summary: {
        total: consumptionData.reduce((sum, item) => sum + (item.cost || item.amount || 0), 0),
        period: 'Consumption Report',
        change: 0
      },
      tableData: consumptionData
    };
    downloadReportPDF(reportData, filename);
  } else if (format === 'excel' || format === 'csv') {
    downloadReportCSV(consumptionData, filename);
  }
};

