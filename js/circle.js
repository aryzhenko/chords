const progressions = {
  "C": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
  "G": ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
  "D": ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
  "A": ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
  "E": ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
  "B": ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
  "F#": ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#dim"],
  "C#": ["C#", "D#m", "E#m", "F#", "G#", "A#m", "B#dim"],
  "F": ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
  "Bb": ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Adim"],
  "Eb": ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"],
  "Ab": ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"],
  "Db": ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Cdim"],
  "Gb": ["Gb", "Abm", "Bbm", "Cb", "Db", "Ebm", "Fdim"],
  "Cb": ["Cb", "Dbm", "Ebm", "Fb", "Gb", "Abm", "Bbdim"],

  "Am": ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
  "Em": ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
  "Bm": ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
  "F#m": ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
  "C#m": ["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"],
  "G#m": ["G#m", "A#dim", "B", "C#m", "D#m", "E", "F#"],
  "D#m": ["D#m", "E#dim", "F#", "G#m", "A#m", "B", "C#"],
  "A#m": ["A#m", "B#dim", "C#", "D#m", "E#m", "F#", "G#"],
  "Dm": ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"],
  "Gm": ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"],
  "Cm": ["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"],
  "Fm": ["Fm", "Gdim", "Ab", "Bbm", "Cm", "Db", "Eb"],
  "Bbm": ["Bbm", "Cdim", "Db", "Ebm", "Fm", "Gb", "Ab"],
  "Ebm": ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
  "Abm": ["Abm", "Bbdim", "Cb", "Dbm", "Ebm", "Fb", "Gb"]
}

const positions = {
  "major": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
  "minor": ["i", "ii°", "III", "iv", "v", "VI", "VII"]
}
const position_functions = ["tonic", "supertonic", "mediant", "subdominant", "dominant", "submediant", "leading tone"] 

document.querySelectorAll('.circle-container .note').forEach(element => {
    element.addEventListener('click', function() {
        const clickedNote = this.attributes['data-chord']?.value;
        const progression = progressions[clickedNote];
        
        if (!progression) return;
        
        // Clear highlighted class from all notes   
        document.querySelectorAll('.circle-container .note').forEach(note => {
            note.classList.remove('highlighted');
            note.querySelectorAll('.badge').forEach(badge => badge.remove());
        });
        
        // Highlight notes in progression
        progression.forEach((chord, index) => {
            document.querySelectorAll('.circle-container .note').forEach(note => {
                if (note.attributes['data-chord']?.value === chord || note.attributes['data-enh-chord']?.value === chord) {
                    note.classList.add('highlighted');
                    
                    const isMajor = chord[0] === chord[0].toUpperCase() && !chord.includes('m');
                    const positions_array = isMajor ? positions['major'] : positions['minor'];
                    const badge = document.createElement('span');
                    badge.className = 'badge';
                    badge.textContent = positions_array[index];
                    note.appendChild(badge);
                }
            });
        });
    });
});
