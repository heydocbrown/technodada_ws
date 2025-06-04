"""
Debug script to test the art data fetching and filtering logic
without needing to rebuild the React app
"""

import requests
import json

# Same URL as in the React app
BACKBLAZE_URL = 'https://f005.backblazeb2.com/file/td-website/index.json'

def fetch_and_analyze_data():
    print("🔍 Fetching data from Backblaze...")
    
    try:
        response = requests.get(BACKBLAZE_URL)
        response.raise_for_status()
        data = response.json()
        
        print(f"✅ Successfully fetched data")
        print(f"📊 Data type: {type(data)}")
        print(f"📊 Data length/size: {len(data) if hasattr(data, '__len__') else 'N/A'}")
        
        # Check if data is a list or dict
        if isinstance(data, list):
            print("📋 Data is a list")
            if data:
                sample = data[0]
                print(f"\n📋 Sample item structure:")
                for key, value in sample.items():
                    print(f"  {key}: {type(value).__name__} = {str(value)[:100]}...")
        elif isinstance(data, dict):
            print("📋 Data is a dictionary")
            print(f"📋 Dictionary keys: {list(data.keys())}")
            # Maybe the actual items are in a nested key?
            for key, value in data.items():
                print(f"  {key}: {type(value).__name__} = {str(value)[:100]}...")
                if isinstance(value, list) and len(value) > 0:
                    print(f"    -> This might be the items list with {len(value)} items")
        else:
            print(f"❓ Unexpected data type: {type(data)}")
            print(f"📋 Data content: {str(data)[:200]}...")
        
        # Check artproject values
        artprojects = set(item.get('artproject', 'MISSING') for item in data)
        print(f"\n🎨 Available artproject values: {artprojects}")
        
        # Check on_website values
        on_website_values = set(item.get('on_website', 'MISSING') for item in data)
        print(f"🌐 Available on_website values: {on_website_values}")
        
        # Filter for dadacat
        dadacat_items = [item for item in data 
                        if item.get('artproject') == 'dadacat' 
                        and item.get('on_website') == 'yes']
        print(f"\n🐱 DadaCat items (on_website=yes): {len(dadacat_items)}")
        
        if dadacat_items:
            sample_dadacat = dadacat_items[0]
            print(f"  Sample DadaCat item:")
            print(f"    ID: {sample_dadacat.get('run_id', 'NO ID')}")
            print(f"    Prompt: {sample_dadacat.get('cleaned_prompt', 'NO PROMPT')[:50]}...")
            print(f"    Path: {sample_dadacat.get('backblaze_path', 'NO PATH')}")
            print(f"    Full URL: https://f005.backblazeb2.com/file/td-website/{sample_dadacat.get('backblaze_path', '')}")
        
        # Filter for truthterminal
        truthterminal_items = [item for item in data 
                              if item.get('artproject') == 'truthterminal' 
                              and item.get('on_website') == 'yes']
        print(f"\n🤖 TruthTerminal items (on_website=yes): {len(truthterminal_items)}")
        
        if truthterminal_items:
            sample_truth = truthterminal_items[0]
            print(f"  Sample TruthTerminal item:")
            print(f"    ID: {sample_truth.get('run_id', 'NO ID')}")
            print(f"    Prompt: {sample_truth.get('cleaned_prompt', 'NO PROMPT')[:50]}...")
            print(f"    Path: {sample_truth.get('backblaze_path', 'NO PATH')}")
            print(f"    Full URL: https://f005.backblazeb2.com/file/td-website/{sample_truth.get('backblaze_path', '')}")
        
        # Test image URL
        if dadacat_items:
            test_url = f"https://f005.backblazeb2.com/file/td-website/{dadacat_items[0].get('backblaze_path', '')}"
            print(f"\n🖼️  Testing image URL: {test_url}")
            try:
                img_response = requests.head(test_url)
                if img_response.status_code == 200:
                    print("✅ Image URL is accessible!")
                else:
                    print(f"❌ Image URL returned status: {img_response.status_code}")
            except Exception as e:
                print(f"❌ Error accessing image: {e}")
        
        return data
        
    except requests.RequestException as e:
        print(f"❌ Error fetching data: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing JSON: {e}")
        return None

if __name__ == "__main__":
    print("🎭 TECHNODADA ART DATA DEBUG SCRIPT")
    print("=" * 50)
    
    data = fetch_and_analyze_data()
    
    if data:
        print(f"\n🎉 Debug complete! Found {len(data)} total items.")
    else:
        print("\n💥 Debug failed - no data retrieved.")