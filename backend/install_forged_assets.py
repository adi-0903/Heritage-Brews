import os
import shutil
import glob

# The Sanctum Forge: Archival Asset Installer
# This script migrates the newly forged AI hallucinations from the brain directory to the public image archive.

BRAIN_DIR = r"C:\Users\HP\.gemini\antigravity\brain\f666601a-334c-479b-a1cf-2917e236bee4"
TARGET_DIR = r"d:\Heritage Brews\public\images"

ASSET_MAP = {
    "corporate_wellness_kit_ai": "corp_wellness_ai.png",
    "sommeliers_tasting_box_ai": "sommeliers_tasting_ai.png",
    "shahi_diwali_ai_final_hallmark": "shahi_diwali_ai.png",
    "royal_anniversary_ai_final_hallmark": "royal_anniversary_ai.png",
    "aged_parchment_background": "aged_parchment.png",
    "naya_parchment_texture": "naya_texture.png",
    "brass_baron_texture": "brass_texture.png",
    "heritage_keeper_leather": "keeper_texture.png",
    "maharaja_silk_brocade": "maharaja_texture.png"
}

def install_assets():
    print("--- Initializing Archival Asset Migration ---")
    if not os.path.exists(TARGET_DIR):
        os.makedirs(TARGET_DIR)
        print(f"Created target vault: {TARGET_DIR}")

    for prefix, target_name in ASSET_MAP.items():
        # Find the latest file matching the prefix
        search_pattern = os.path.join(BRAIN_DIR, f"{prefix}*.png")
        files = glob.glob(search_pattern)
        
        if files:
            # Sort by modification time to get the latest one
            latest_file = max(files, key=os.path.getmtime)
            target_path = os.path.join(TARGET_DIR, target_name)
            
            try:
                shutil.copy2(latest_file, target_path)
                print(f"Hallmark Restored: {prefix} -> {target_name}")
            except Exception as e:
                print(f"Error migrating {prefix}: {e}")
        else:
            print(f"Missing Hallmark: No file found for {prefix}")

    print("\n--- Migration Complete. The Curations Vault is now visually hallmarked. ---")

if __name__ == "__main__":
    install_assets()
