import json
import os
import re
import sys
from glob import glob
import requests 
def is_valid_evm_address(address):
    return bool(re.match(r'^0x[a-fA-F0-9]{40}$', address))


def verify_file(file_path):
    file_name = os.path.basename(file_path)
    if not re.match(r'^[a-zA-Z0-9]+$', file_name.split('.')[0]):
        print(f"File name {file_name} does not meet the naming convention.")
        return False, None

    with open(file_path, 'r') as file:
        try:
            content = json.load(file)
            print(content)
        except json.JSONDecodeError:
            print(f"File {file_name} does not contain valid JSON.")
            return False, None

        if 'evmAddress' not in content or not is_valid_evm_address(content['evmAddress']):
            print(f"Invalid or missing EVM address in file {file_name}.")
            return False, None
        if 'githubHandle' not in content or not content['githubHandle'].strip():
            print(f"Missing or empty github handle in file {file_name}.")
            return False, None

    return True, content


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
    new_files = glob("Solvers' Waitlist/*")
    if len(new_files) == 0:
        print("No new files to verify.")
        sys.exit(0)  # No files to process, exit normally

    file_path = new_files[0]  # Assuming only one file is added per PR
    verification_passed, content = verify_file(file_path)
    if not verification_passed:
        sys.exit(1)  # Exit with error status to indicate verification failure

    # If verification passed, send the content to the backend
    notify_registry(content)

    print("Verification succeeded.")
    sys.exit(0)


if __name__ == "__main__":
    main()