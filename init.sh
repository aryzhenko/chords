python3 -m venv venv
source venv/bin/activate
pip3 install requests
python3 download_chords.py

ln -s ./chords/Ab ./chords/Gsharp
ln -s ./chords/Bb ./chords/Asharp
ln -s ./chords/Csharp ./chords/Db
ln -s ./chords/Eb ./chords/Dsharp
ln -s ./chords/Fsharp ./chords/Gb