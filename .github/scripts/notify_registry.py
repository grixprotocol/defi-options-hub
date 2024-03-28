import json
import os
import re
import sys
from glob import glob
import requests 

def is_valid_evm_address(address):
    return bool(re.match(r'^0x[a-fA-F0-9]{40}$', address))


def get_file_content(file_path):

    with open(file_path, 'r') as file:
        try:
            content = json.load(file)
            print(content)
        except json.JSONDecodeError:
            print(f"File {file_name} does not contain valid JSON.")
            return None

    return content


def get_latest_file(files):
    latest_file = max(files, key=os.path.getmtime)
    return latest_file



def notify_registry(content):
    registryUrl = os.getenv('REGISTRY_URL')
    print(f"Using registry URL: {registryUrl}")
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(registryUrl, headers=headers, json=content)

        if response.status_code != 200:
            print(
                f"Failed to send data to backend. Status code: {response.status_code}")
            sys.exit(1)
        else:
            print("Successfully sent data to backend.")

    except requests.exceptions.ConnectionError as e:
        print(f"Failed to connect to backend. Error: {e}")
        sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"Request failed. Error: {e}")
        sys.exit(1)


def main():
    if len(sys.argv) != 2:
        print("Usage: notify_registry.py <file_path>")
        sys.exit(1)
    file_path = sys.argv[1]
    content = get_file_content(file_path)
    if not content:
        sys.exit(1)  # Exit with error status to indicate verification failure

    notify_registry(content)
    print("Verification succeeded.")


if __name__ == "__main__":
    main()
