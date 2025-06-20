import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Customer, Order, SalesReport } from '../types';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export class PDFGenerator {
  private static addCompanyHeader(doc: jsPDF, title: string) {
    // Company logo area (placeholder)
    doc.setFillColor(59, 130, 246);
    doc.rect(20, 15, 8, 8, 'F');
    
    // Company name
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);
    doc.text('TechCorp', 35, 22);
    
    // Document title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(title, 20, 35);
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 42);
    
    return 50; // Return Y position for content
  }

  static generateCustomerList(customers: Customer[]): void {
    const doc = new jsPDF();
    let yPos = this.addCompanyHeader(doc, 'Customer Directory');

    const tableData = customers.map(customer => [
      customer.name,
      customer.email,
      customer.company,
      customer.phone,
      `${customer.address.city}, ${customer.address.state}`,
      customer.status.charAt(0).toUpperCase() + customer.status.slice(1),
      `$${customer.totalSpent.toLocaleString()}`
    ]);

    doc.autoTable({
      head: [['Name', 'Email', 'Company', 'Phone', 'Location', 'Status', 'Total Spent']],
      body: tableData,
      startY: yPos + 5,
      theme: 'grid',
      headStyles: { 
        fillColor: [59, 130, 246],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { 
        fontSize: 9,
        cellPadding: 4
      },
      alternateRowStyles: { 
        fillColor: [248, 250, 252] 
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 35 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 25, halign: 'right' }
      }
    });

    // Add summary
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Summary:', 20, finalY);
    
    doc.setFontSize(10);
    doc.text(`Total Customers: ${customers.length}`, 20, finalY + 8);
    doc.text(`Active Customers: ${customers.filter(c => c.status === 'active').length}`, 20, finalY + 16);
    doc.text(`Total Revenue: $${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}`, 20, finalY + 24);

    doc.save('customer_directory.pdf');
  }

  static generateInvoice(order: Order): void {
    const doc = new jsPDF();
    let yPos = this.addCompanyHeader(doc, `Invoice #${order.id.toString().padStart(6, '0')}`);

    // Invoice details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Bill To:', 20, yPos + 15);
    
    doc.setFontSize(10);
    doc.text(order.customerName, 20, yPos + 25);
    doc.text(order.billingAddress.street, 20, yPos + 32);
    doc.text(`${order.billingAddress.city}, ${order.billingAddress.state} ${order.billingAddress.zipCode}`, 20, yPos + 39);
    doc.text(order.billingAddress.country, 20, yPos + 46);

    // Invoice info (right side)
    doc.setFontSize(10);
    doc.text('Invoice Date:', 140, yPos + 25);
    doc.text(order.orderDate, 170, yPos + 25);
    doc.text('Due Date:', 140, yPos + 32);
    doc.text(order.dueDate, 170, yPos + 32);
    doc.text('Status:', 140, yPos + 39);
    doc.text(order.status.charAt(0).toUpperCase() + order.status.slice(1), 170, yPos + 39);

    // Items table
    const itemsData = order.items.map(item => [
      item.productName,
      item.quantity.toString(),
      `$${item.unitPrice.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]);

    doc.autoTable({
      head: [['Item', 'Qty', 'Unit Price', 'Total']],
      body: itemsData,
      startY: yPos + 60,
      theme: 'grid',
      headStyles: { 
        fillColor: [59, 130, 246],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { 
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 40, halign: 'right' },
        3: { cellWidth: 40, halign: 'right' }
      }
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const totalsX = 130;
    
    doc.setFontSize(10);
    doc.text('Subtotal:', totalsX, finalY);
    doc.text(`$${order.subtotal.toFixed(2)}`, totalsX + 40, finalY);
    
    doc.text('Tax:', totalsX, finalY + 8);
    doc.text(`$${order.tax.toFixed(2)}`, totalsX + 40, finalY + 8);
    
    // Total with background
    doc.setFillColor(59, 130, 246);
    doc.rect(totalsX - 5, finalY + 15, 50, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('Total:', totalsX, finalY + 23);
    doc.text(`$${order.total.toFixed(2)}`, totalsX + 40, finalY + 23);

    // Footer
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(8);
    doc.text('Thank you for your business!', 20, 280);
    doc.text('For questions about this invoice, please contact us at support@techcorp.com', 20, 285);

    doc.save(`invoice_${order.id.toString().padStart(6, '0')}.pdf`);
  }

  static generateSalesReport(report: SalesReport): void {
    const doc = new jsPDF();
    let yPos = this.addCompanyHeader(doc, `Sales Report - ${report.period}`);

    // Key metrics
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Key Metrics', 20, yPos + 15);

    // Metrics cards background
    doc.setFillColor(248, 250, 252);
    doc.rect(20, yPos + 20, 50, 20, 'F');
    doc.rect(75, yPos + 20, 50, 20, 'F');
    doc.rect(130, yPos + 20, 50, 20, 'F');

    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Total Revenue', 25, yPos + 28);
    doc.text('Total Orders', 80, yPos + 28);
    doc.text('Avg Order Value', 135, yPos + 28);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`$${report.totalRevenue.toLocaleString()}`, 25, yPos + 35);
    doc.text(report.totalOrders.toString(), 80, yPos + 35);
    doc.text(`$${report.averageOrderValue.toFixed(2)}`, 135, yPos + 35);

    // Top products table
    yPos += 55;
    doc.setFontSize(12);
    doc.text('Top Products', 20, yPos);

    const productsData = report.topProducts.map(product => [
      product.name,
      product.quantity.toString(),
      `$${product.revenue.toLocaleString()}`
    ]);

    doc.autoTable({
      head: [['Product', 'Units Sold', 'Revenue']],
      body: productsData,
      startY: yPos + 5,
      theme: 'grid',
      headStyles: { 
        fillColor: [16, 185, 129],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { 
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 40, halign: 'center' },
        2: { cellWidth: 50, halign: 'right' }
      }
    });

    // Monthly performance
    const monthlyY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.text('Monthly Performance', 20, monthlyY);

    const monthlyData = report.monthlyData.map(month => [
      month.month,
      month.orders.toString(),
      `$${month.revenue.toLocaleString()}`
    ]);

    doc.autoTable({
      head: [['Month', 'Orders', 'Revenue']],
      body: monthlyData,
      startY: monthlyY + 5,
      theme: 'grid',
      headStyles: { 
        fillColor: [245, 158, 11],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { 
        fontSize: 10,
        cellPadding: 4
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 40, halign: 'center' },
        2: { cellWidth: 50, halign: 'right' }
      }
    });

    doc.save(`sales_report_${report.period.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  }
}