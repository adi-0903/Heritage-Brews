import shutil
import glob
import os

source_pattern = r"C:\Users\HP\.gemini\antigravity\brain\f666601a-334c-479b-a1cf-2917e236bee4\*.png"
dest_folder = r"d:\Heritage Brews\public\images"

def main():
    if not os.path.exists(dest_folder):
        print(f"Error: Target folder {dest_folder} not found.")
        return
        
    files = glob.glob(source_pattern)
    if not files:
        print("No newly generated images found in the artifact path.")
        return
        
    for file_path in files:
        filename = os.path.basename(file_path)
        dest_path = os.path.join(dest_folder, filename)
        print(f"Copying {filename} to {dest_folder}...")
        try:
            shutil.copy2(file_path, dest_path)
        except Exception as e:
            print(f"Failed to copy {filename}: {e}")
            
    print("\n✅ Successfully copied all AI images! You can now refresh the browser.")

if __name__ == "__main__":
    main()
