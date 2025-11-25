import os
import requests

BASE_URL = "https://tombatossals.github.io/react-chords/media/guitar/chords/{key}/{suffix}/{n}.png"

KEYS = ["C", "Csharp", "D", "Eb", "E", "F", "Fsharp", "G", "Ab", "A", "Bb", "B"]
SUFFIXES = ["major","minor","dim","dim7","sus2","sus4","7sus4","alt","aug","6","69","7","7b5","7sg","aug7","9","9b5","aug9","7b9","7sharp9","11","9sharp11","13","maj7","maj7b5","maj7sharp5","maj9","maj11","maj13","m6","m7","m7b5","m9","m69","m11","mmaj7","mmaj7b5","mmaj9","mmaj11","add9","madd9","_E","_F","_G"]
NUMBERS = [1, 2, 3, 4, 5, 6]

output_dir = "chords"
os.makedirs(output_dir, exist_ok=True)

for key in KEYS:
    os.makedirs(f"{output_dir}/{key}", exist_ok=True)
    for suffix in SUFFIXES:
        for n in NUMBERS:
            url = BASE_URL.format(key=key, suffix=suffix, n=n)
            filename = f"{suffix}_{n}.jpg"
            filepath = os.path.join(f"{output_dir}/{key}", filename)

            try:
                print(f"Downloading {filename} ...")
                response = requests.get(url)
                if response.status_code == 200:
                    with open(filepath, "wb") as f:
                        f.write(response.content)
                else:
                    print(f"❌ Not found: {url}")
            except Exception as e:
                print(f"Error downloading {url}: {e}")

print("\nDone!")
