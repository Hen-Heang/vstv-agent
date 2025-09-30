# Unit Management System

## Overview
The Unit Management System is a comprehensive solution for managing real estate units, replacing the need for Google Sheets. It provides a modern, web-based interface for inputting, updating, deleting, and exporting unit data.

## Features

### 🏠 Unit Management
- **Add New Units**: Create units with all necessary details
- **Edit Units**: Update unit information anytime
- **Delete Units**: Remove units with confirmation
- **View Details**: Detailed view of each unit
- **Search & Filter**: Find units quickly with advanced search

### 📊 Data Export
- **PDF Export**: Professional PDF reports for clients and team
- **CSV Export**: Spreadsheet-compatible format
- **Custom Formatting**: Branded reports with company information

### 📱 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface
- **Real-time Updates**: Instant data synchronization
- **Status Management**: Track unit availability

## Data Structure

Each unit contains:
- **Unit Number**: Unique identifier (e.g., "ANATA/1212B")
- **Price**: Cost in USD
- **Room Type**: Studio, One bedroom, Two bedroom, etc.
- **Handle By**: Assigned agent or team member
- **Status**: Available, Sold, Rented, or Negotiate
- **Remarks**: Additional notes and information

## Getting Started

### 1. Database Setup
```bash
# Make sure your database is running
npx prisma db push
npx prisma generate
```

### 2. Seed Sample Data (Optional)
```bash
npm run db:seed
```

### 3. Start the Application
```bash
npm run dev
```

### 4. Access Unit Management
Navigate to: `http://localhost:3000/units`

## Usage Guide

### Adding a New Unit
1. Click "Add New Unit" button
2. Fill in all required fields:
   - Unit Number (e.g., "Morgan/3317")
   - Price in USD
   - Room Type
   - Handle By (agent name)
3. Add optional remarks
4. Select status
5. Click "Save Unit"

### Editing a Unit
1. Find the unit in the table
2. Click the edit (pencil) icon
3. Modify the information
4. Click "Update Unit"

### Deleting a Unit
1. Click the delete (trash) icon
2. Confirm deletion in the popup
3. Unit will be permanently removed

### Searching and Filtering
- **Search**: Use the search box to find units by:
  - Unit number
  - Room type
  - Agent name
  - Remarks
- **Filter**: Filter by status:
  - All Status
  - Available
  - Sold
  - Rented
  - Negotiate

### Exporting Data

#### PDF Export
1. Click "Export PDF" button
2. PDF will be generated with:
   - Company branding
   - Professional formatting
   - All unit data in table format
   - Summary statistics
   - Generation timestamp

#### CSV Export
1. Click "Export CSV" button
2. CSV file will be downloaded
3. Compatible with Excel, Google Sheets, etc.

## Status Management

### Available Units
- Units ready for rent or sale
- Green status indicator
- Primary focus for client presentations

### Sold Units
- Units that have been sold
- Red status indicator
- Historical record keeping

### Rented Units
- Units currently rented
- Blue status indicator
- Track rental agreements

### Negotiate Units
- Units under negotiation
- Yellow status indicator
- Track potential deals

## Dashboard Statistics

The system provides real-time statistics:
- **Total Units**: Complete unit count
- **Available**: Units ready for clients
- **Sold**: Completed sales
- **Negotiate**: Active negotiations

## Mobile Usage

The system is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## Data Security

- All data is stored in your database
- No external dependencies for data storage
- Full control over your information
- Regular backups recommended

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your DATABASE_URL in .env
   - Ensure PostgreSQL is running
   - Run `npx prisma db push`

2. **PDF Export Not Working**
   - Check browser permissions
   - Ensure JavaScript is enabled
   - Try a different browser

3. **Search Not Working**
   - Clear browser cache
   - Check for JavaScript errors
   - Refresh the page

### Support

For technical support:
1. Check the browser console for errors
2. Verify database connection
3. Ensure all dependencies are installed
4. Check the application logs

## Best Practices

### Data Entry
- Use consistent unit numbering
- Keep agent names standardized
- Add meaningful remarks
- Update status regularly

### Export Management
- Export data regularly for backups
- Use PDF for client presentations
- Use CSV for data analysis
- Keep exported files organized

### Team Collaboration
- Assign units to specific agents
- Use remarks for important notes
- Update status when deals progress
- Regular data cleanup

## Future Enhancements

Potential improvements:
- Bulk import from CSV
- Advanced reporting
- Email integration
- Mobile app
- API for external systems
- Automated backups
- User roles and permissions

---

*This system replaces Google Sheets with a modern, professional solution for unit management.*
