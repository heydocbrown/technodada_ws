# API Server Pipeline Update Instructions

To switch from the old endpoint to the pipeline-based endpoint:

## 1. Update api/server.js

Replace the line:
```javascript
app.use(require('./dadacatEndpoint'));
```

With:
```javascript
app.use(require('./dadacatEndpointPipeline'));
```

## 2. Environment Variables

The following environment variables are NO LONGER NEEDED and can be removed from .env:
- AWS_REGION
- AWS_DADACAT_LAMBDA
- OPENAI_API_KEY
- B2_KEY_ID
- B2_APPLICATION_KEY

Keep only:
- NODE_ENV
- PORT (if using non-default)

## 3. Dependencies to Remove (Optional)

After confirming the pipeline works, you can remove these from package.json:
```json
"aws-sdk": "^x.x.x",
"openai": "^x.x.x",
"@aws-sdk/client-s3": "^x.x.x"
```

Run `npm uninstall aws-sdk openai @aws-sdk/client-s3` to remove them.

## 4. Testing

Test the new endpoint:
```bash
curl -X POST http://localhost:3001/api/dadacat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test vision"}'

curl http://localhost:3001/api/health

curl http://localhost:3001/api/pipeline-info
```