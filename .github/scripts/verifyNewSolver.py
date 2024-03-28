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

    return True


def get_latest_file(files):
    latest_file = max(files, key=os.path.getmtime)
    return latest_file


def main():
    new_files = glob("solvers_waitlist/*")
    if len(new_files) == 0:
        print("No new files to verify.")
        sys.exit(0)  # No files to process, exit normally

    file_path = get_latest_file(new_files)
    verification_passed = verify_file(file_path)
    if not verification_passed:
        sys.exit(1)  # Exit with error status to indicate verification failure


    print("Verification succeeded.")
    sys.exit(0)


if __name__ == "__main__":
    main()
