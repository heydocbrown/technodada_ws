#!/usr/bin/env python3

import os
import sys
import json
import boto3
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from datetime import datetime
import tempfile
import uuid

# Add parent directory to path to import prompt_to_image
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append('/Users/docbrown/code/git/dada_terminal')

from llm_tools.prompt_to_image import PromptToImage

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# AWS Lambda client
lambda_client = boto3.client(
    'lambda',
    region_name=os.getenv('AWS_REGION', 'us-east-2')
)

# S3 client for uploading images
s3_client = boto3.client(
    's3',
    region_name=os.getenv('AWS_REGION', 'us-east-2')
)

# Initialize image generator
image_generator = PromptToImage()

# Constants
DADACAT_LAMBDA_NAME = os.getenv('AWS_DADACAT_LAMBDA', 'dadacat-agent-x86')
S3_BUCKET = 'td-website'  # Based on the backblaze URLs in the code

@app.route('/api/dadacat', methods=['POST'])
def generate_dadacat_response():
    """Generate a DadaCat response and create an image from it."""
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({'error': 'No prompt provided'}), 400
        
        human_prompt = data['prompt']
        logger.info(f"Received prompt: {human_prompt}")
        
        # Step 1: Get DadaCat response from Lambda
        try:
            # Invoke the DadaCat Lambda
            lambda_payload = {
                'prompt': human_prompt
            }
            
            logger.info(f"Invoking Lambda: {DADACAT_LAMBDA_NAME}")
            response = lambda_client.invoke(
                FunctionName=DADACAT_LAMBDA_NAME,
                InvocationType='RequestResponse',
                Payload=json.dumps(lambda_payload)
            )
            
            # Parse the response
            response_payload = json.loads(response['Payload'].read())
            
            # Handle Lambda response
            if response.get('StatusCode') != 200:
                raise Exception(f"Lambda invocation failed with status {response.get('StatusCode')}")
            
            # Extract DadaCat's response
            if 'body' in response_payload:
                body = json.loads(response_payload['body']) if isinstance(response_payload['body'], str) else response_payload['body']
                dadacat_response = body.get('response', '')
            else:
                dadacat_response = response_payload.get('response', '')
            
            if not dadacat_response:
                raise Exception("No response from DadaCat Lambda")
                
            logger.info(f"DadaCat response: {dadacat_response}")
            
        except Exception as e:
            logger.error(f"Error invoking DadaCat Lambda: {str(e)}")
            # Fallback to a default DadaCat-style response
            dadacat_response = "meow, human! reality fragments scattered across quantum foam... your vision dissolves into cosmic static *purrs enigmatically*"
        
        # Step 2: Generate image from DadaCat's response
        try:
            logger.info("Generating image from DadaCat response")
            
            # Generate the image
            image_info = image_generator.generate_image(
                prompt=dadacat_response,
                model="dall-e-3",
                size="1024x1024",
                quality="standard",
                style="vivid",
                n=1,
                response_format="b64_json"
            )
            
            # Get the base64 image data
            if 'b64_json' in image_info and image_info['b64_json']:
                image_b64 = image_info['b64_json']
            else:
                raise Exception("No image data returned from generator")
            
            # Create a unique filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            unique_id = str(uuid.uuid4())[:8]
            filename = f"dadacat_interactive_{timestamp}_{unique_id}.png"
            
            # Upload to S3 (which maps to Backblaze B2)
            try:
                # Decode base64 to bytes
                image_bytes = base64.b64decode(image_b64)
                
                # Upload to S3
                s3_key = f"interactive/{filename}"
                s3_client.put_object(
                    Bucket=S3_BUCKET,
                    Key=s3_key,
                    Body=image_bytes,
                    ContentType='image/png',
                    ACL='public-read'
                )
                
                backblaze_path = s3_key
                logger.info(f"Image uploaded to S3: {s3_key}")
                
            except Exception as e:
                logger.error(f"Error uploading to S3: {str(e)}")
                # If S3 upload fails, we'll use the base64 data directly
                backblaze_path = None
            
            # Prepare response
            response_data = {
                'success': True,
                'human_prompt': human_prompt,
                'dadacat_response': dadacat_response,
                'image_url': f"data:image/png;base64,{image_b64}",
                'backblaze_path': backblaze_path,
                'timestamp': timestamp
            }
            
            return jsonify(response_data), 200
            
        except Exception as e:
            logger.error(f"Error generating image: {str(e)}")
            return jsonify({
                'error': 'Failed to generate image',
                'dadacat_response': dadacat_response,
                'details': str(e)
            }), 500
            
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'service': 'dadacat-api',
        'timestamp': datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)