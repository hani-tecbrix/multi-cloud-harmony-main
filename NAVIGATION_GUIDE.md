# Partner Customers Page - Navigation Guide

## Quick Start

### 1. Start the Application
```bash
cd /Users/apple/Downloads/multi-cloud-harmony-main
npm run dev
```

The application will start on: **http://localhost:5173**

### 2. Login Credentials
- **Email:** `user@mindverse.com`
- **Password:** `user123`

### 3. Switch to Partner Role
After logging in:
1. Click on your profile/avatar in the top right corner
2. Select "Switch Role" → Choose **"Partner"**
3. You'll be redirected to the Dashboard with partner permissions

### 4. Navigate to Partner Customers Page

**Option 1: Via Navigation Sidebar**
- Click **"Customers"** in the left navigation sidebar (has a Users icon)

**Option 2: Direct URL**
- Navigate to: `http://localhost:5173/partner/customers`

### 5. Access the Help Guide

**From Partner Customers Page:**
- Click **"Help & Support"** in the left navigation sidebar
- In the Help page, find **"User Management"** category
- Click on **"Managing Partner Customers"** topic

**Direct Help URL:**
- `http://localhost:5173/partner/help`

## Full Navigation Path

```
1. Start Server
   └─> Terminal: npm run dev
   └─> Browser: http://localhost:5173

2. Login Page
   └─> Enter: user@mindverse.com / user123
   └─> Click: Sign In

3. Dashboard (Default Admin Role)
   └─> Top Right: Profile Menu
   └─> Select: Switch Role → Partner

4. Dashboard (Partner Role)
   └─> Left Sidebar: Click "Customers"
   └─> OR Direct URL: /partner/customers

5. Partner Customers Page
   └─> View customers table
   └─> Add new customers
   └─> View customer details

6. Help Guide
   └─> Left Sidebar: Click "Help & Support"
   └─> Category: "User Management"
   └─> Topic: "Managing Partner Customers"
```

## Screenshot Locations

All screenshots for the help guide are stored in:
```
public/help-screenshots/partner-customers/
```

## Key Features to Document

1. **Customer List View** - Main table with all customers
2. **Add Customer** - Side panel for onboarding
3. **Cloud Tenant Detection** - Automatic detection of existing cloud accounts
4. **Customer Details** - Comprehensive customer information view
5. **Search & Pagination** - Finding and navigating customers

## Testing the Flow

To test the complete customer onboarding flow:

1. Navigate to `/partner/customers`
2. Click "Add Customer" button
3. Select "New Customer"
4. Choose a cloud provider (AWS, Azure, or GCP)
5. Fill in customer information
6. Run tenant detection
7. Review detected tenants
8. Select additional services
9. Submit the form
10. View the new customer in the table
11. Click on a customer to view details

