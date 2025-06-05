#!/bin/bash

# Technodada React Poems Deployment Script
# Builds the React app and updates poems.html and poem2.html with correct hashes

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
MAIN_JS_FILE=$(ls dist/assets/main-*.js | head -1 | xargs basename)
MAIN_CSS_FILE=$(ls dist/assets/main-*.css | head -1 | xargs basename)
APP2_JS_FILE=$(ls dist/assets/app2-*.js | head -1 | xargs basename)
APP_CSS_FILE=$(ls dist/assets/App-*.css | head -1 | xargs basename)
APP_JS_FILE=$(ls dist/assets/App-*.js | head -1 | xargs basename)

echo "   📄 Main JS:  $MAIN_JS_FILE"
echo "   🎨 Main CSS: $MAIN_CSS_FILE"
echo "   📄 App2 JS:  $APP2_JS_FILE"
echo "   📄 App JS:   $APP_JS_FILE"
echo "   🎨 App CSS:  $APP_CSS_FILE"

# Copy files to assets directory
echo "📦 Copying built files..."
mkdir -p ../assets/react-poems
cp -r dist/assets/* ../assets/react-poems/

# Update poems.html and poem2.html with the correct hashes
echo "✏️  Updating HTML files..."
cd ..

# Update poems.html with main app files (keep existing pattern for backward compatibility)
sed -i.bak "s|index-[A-Za-z0-9_-]*\.js|$MAIN_JS_FILE|g" pages/poems.html
sed -i.bak2 "s|index-[A-Za-z0-9_-]*\.css|$MAIN_CSS_FILE|g" pages/poems.html

# Update poem2.html with app2 files
sed -i.bak "s|app2-[A-Za-z0-9_-]*\.js|$APP2_JS_FILE|g" pages/poem2.html
sed -i.bak2 "s|App-[A-Za-z0-9_-]*\.css|$APP_CSS_FILE|g" pages/poem2.html

# Clean up backup files
rm -f pages/poems.html.bak pages/poems.html.bak2
rm -f pages/poem2.html.bak pages/poem2.html.bak2

echo "✅ Deployment complete!"
echo ""
echo "📊 Summary:"
echo "   🔧 Built React apps"
echo "   📂 Copied files to assets/react-poems/"
echo "   📝 Updated poems.html with:"
echo "      JS:  $MAIN_JS_FILE"
echo "      CSS: $MAIN_CSS_FILE"
echo "   📝 Updated poem2.html with:"
echo "      JS:  $APP2_JS_FILE"
echo "      CSS: $APP_CSS_FILE"
echo ""
echo "🚀 Ready to test both viewers at your web server!"

# Return to original directory
cd ..