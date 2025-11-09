#!/bin/bash

# Screenshot Capture Script for Partner Customers Help Guide
# This script helps capture screenshots for the help guide

echo "=========================================="
echo "Partner Customers Help Guide Screenshots"
echo "=========================================="
echo ""
echo "This script will guide you through capturing screenshots."
echo "Make sure the dev server is running: npm run dev"
echo ""
echo "Press Enter when you're ready to start..."
read

BASE_URL="http://localhost:5173"
SCREENSHOT_DIR="public/help-screenshots/partner-customers"

# Create directory if it doesn't exist
mkdir -p "$SCREENSHOT_DIR"

echo ""
echo "=========================================="
echo "Step 1: Login Page"
echo "=========================================="
echo "1. Open browser to: $BASE_URL"
echo "2. Take screenshot of login page"
echo "3. Save as: $SCREENSHOT_DIR/login-page.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 2: Dashboard (Partner Role)"
echo "=========================================="
echo "1. Login with: user@mindverse.com / user123"
echo "2. Switch to Partner role (top right menu)"
echo "3. Take screenshot of dashboard"
echo "4. Save as: $SCREENSHOT_DIR/dashboard-partner.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 3: Navigation Sidebar"
echo "=========================================="
echo "1. Take cropped screenshot of left sidebar"
echo "2. Highlight the 'Customers' menu item"
echo "3. Save as: $SCREENSHOT_DIR/navigation-sidebar.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 4: Partner Customers Main Page"
echo "=========================================="
echo "1. Navigate to: $BASE_URL/partner/customers"
echo "2. Take full page screenshot"
echo "3. Save as: $SCREENSHOT_DIR/main-page.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 5: Add Customer Button"
echo "=========================================="
echo "1. Take cropped screenshot of header"
echo "2. Highlight 'Add Customer' button"
echo "3. Save as: $SCREENSHOT_DIR/add-customer-button.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 6: Customer Type Selection"
echo "=========================================="
echo "1. Click 'Add Customer' button"
echo "2. Take screenshot of the side panel"
echo "3. Show 'New Customer' vs 'Existing Customer' options"
echo "4. Save as: $SCREENSHOT_DIR/customer-type-selection.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 7: Cloud Provider Selection"
echo "=========================================="
echo "1. Select 'New Customer'"
echo "2. Take screenshot showing AWS, Azure, GCP cards"
echo "3. Save as: $SCREENSHOT_DIR/cloud-provider-selection.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 8: Customer Information Form"
echo "=========================================="
echo "1. Select a cloud provider (e.g., AWS)"
echo "2. Scroll down to form fields"
echo "3. Take screenshot of all form fields"
echo "4. Save as: $SCREENSHOT_DIR/customer-information-form.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 9: Tenant Detection (Before)"
echo "=========================================="
echo "1. Scroll to Cloud Tenant Detection section"
echo "2. Take screenshot before clicking 'Check for Existing Tenants'"
echo "3. Save as: $SCREENSHOT_DIR/tenant-detection-before.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 10: Tenant Detection (Loading)"
echo "=========================================="
echo "1. Click 'Check for Existing Tenants'"
echo "2. Take screenshot showing loading state"
echo "3. Save as: $SCREENSHOT_DIR/tenant-detection-loading.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 11: Tenant Detection Results"
echo "=========================================="
echo "1. Wait for detection to complete"
echo "2. Take screenshot showing detected tenants"
echo "3. Save as: $SCREENSHOT_DIR/tenant-detection-results.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 12: Service Selection"
echo "=========================================="
echo "1. Scroll to service selection section"
echo "2. Take screenshot of service checkboxes"
echo "3. Save as: $SCREENSHOT_DIR/service-selection.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 13: Customers Table"
echo "=========================================="
echo "1. Close the Add Customer panel (or cancel)"
echo "2. Take screenshot of customers table"
echo "3. Show all columns clearly"
echo "4. Save as: $SCREENSHOT_DIR/customers-table.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 14: Search Functionality"
echo "=========================================="
echo "1. Type a search term in the search bar"
echo "2. Take screenshot showing filtered results"
echo "3. Save as: $SCREENSHOT_DIR/search-functionality.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 15: Pagination Controls"
echo "=========================================="
echo "1. Scroll to bottom of table"
echo "2. Take screenshot of pagination controls"
echo "3. Save as: $SCREENSHOT_DIR/pagination-controls.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 16: Customer Detail View"
echo "=========================================="
echo "1. Click on any customer row"
echo "2. Take full screenshot of customer detail view"
echo "3. Save as: $SCREENSHOT_DIR/customer-detail-view.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 17: Billing Information"
echo "=========================================="
echo "1. Scroll to Billing Information card"
echo "2. Take screenshot of billing details"
echo "3. Save as: $SCREENSHOT_DIR/billing-information.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "Step 18: Subscription Details"
echo "=========================================="
echo "1. Scroll to Subscription Details table"
echo "2. Take screenshot of subscriptions"
echo "3. Save as: $SCREENSHOT_DIR/subscription-details.png"
echo "Press Enter when done..."
read

echo ""
echo "=========================================="
echo "All screenshots captured!"
echo "=========================================="
echo "Screenshots saved to: $SCREENSHOT_DIR"
echo ""
ls -la "$SCREENSHOT_DIR"/*.png 2>/dev/null || echo "No PNG files found. Please capture screenshots manually."

