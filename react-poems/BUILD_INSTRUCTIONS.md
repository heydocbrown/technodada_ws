# Build Instructions for Technodada React Poetry Viewer

## Development Setup

1. Navigate to the React app directory:

   ```bash
   cd react-poems
   ```

2. Install dependencies (if not already done):

   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Building for Production

1. Build the React app:

   ```bash
   npm run build
   ```

2. Copy the built files to the main site's assets:

   ```bash
   # Create the directory if it doesn't exist
   mkdir -p ../assets/react-poems

   # Copy all built assets
   cp -r dist/assets/* ../assets/react-poems/
   ```

3. Update poems.html with the correct file names:
   - After building, check the `dist/assets` directory for the actual filenames
   - The files will have hashes like `index-abc123.js` and `index-def456.css`
   - Update the script and link tags in `poems.html` to match:

   ```html
   <script
     type="module"
     crossorigin
     src="../assets/react-poems/index-[hash].js"
   ></script>
   <link rel="stylesheet" href="../assets/react-poems/index-[hash].css" />
   ```

## Deployment Process

1. **Build the React app**:

   ```bash
   cd react-poems
   npm run build
   ```

2. **Copy assets**:

   ```bash
   cp -r dist/assets/* ../assets/react-poems/
   ```

3. **Update poems.html** with the correct hashed filenames

4. **Test locally** to ensure everything works

5. **Deploy** the entire site (including the new files in `assets/react-poems/`)

## Important Notes

- The React app expects to find a `<div id="react-root">` in the host page
- The app fetches data from: `https://f005.backblazeb2.com/file/td-website/index.json`
- Make sure the Backblaze bucket is configured for public access
- The status bar elements (`artMode`, `gnosisLevel`) are updated by the React app

## Troubleshooting

- If the app doesn't render, check the browser console for errors
- Ensure all file paths are correct relative to where poems.html is served
- Verify that the Backblaze URL is accessible and returns valid JSON
- Check that fonts are loading correctly from Google Fonts
