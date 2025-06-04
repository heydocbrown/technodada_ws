#!/bin/bash

# Technodada React Poems Deployment Script
# Builds the React app and updates poems.html with correct hashes

set -e  # Exit on any error

echo "🎭 TECHNODADA REACT DEPLOYMENT"
echo "=================================="

# Check if we're in the right directory
if [ ! -d "react-poems" ]; then
    echo "❌ Error: react-poems directory not found. Run this from the project root."
    exit 1
fi

# Build the React app
echo "🔨 Building React app..."
cd react-poems
npm run build

# Extract the generated filenames
echo "📋 Extracting build filenames..."
JS_FILE=$(ls dist/assets/index-*.js | head -1 | xargs basename)
CSS_FILE=$(ls dist/assets/index-*.css | head -1 | xargs basename)

echo "   📄 JS:  $JS_FILE"
echo "   🎨 CSS: $CSS_FILE"

# Copy files to assets directory
echo "📦 Copying built files..."
mkdir -p ../assets/react-poems
cp -r dist/assets/* ../assets/react-poems/

# Update poems.html with the correct hashes
echo "✏️  Updating poems.html..."
cd ..

# Use sed to replace the script and link tags
# First, find and replace the JS file
sed -i.bak "s|index-[A-Za-z0-9_-]*\.js|$JS_FILE|g" pages/poems.html

# Then, find and replace the CSS file
sed -i.bak2 "s|index-[A-Za-z0-9_-]*\.css|$CSS_FILE|g" pages/poems.html

# Clean up backup files
rm -f pages/poems.html.bak pages/poems.html.bak2

echo "✅ Deployment complete!"
echo ""
echo "📊 Summary:"
echo "   🔧 Built React app"
echo "   📂 Copied files to assets/react-poems/"
echo "   📝 Updated poems.html with:"
echo "      JS:  $JS_FILE"
echo "      CSS: $CSS_FILE"
echo ""
echo "🚀 Ready to test at your web server!"

# Return to original directory
cd ..