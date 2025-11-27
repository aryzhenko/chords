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

function getChordType(chord) {
    if (chord.endsWith('dim')) {
        return 'dim';
    } else if (chord.endsWith('m')) {
        return 'minor';
    } else {
        return 'major';
    }
}

function clearChordsTable() {
    const table = document.getElementById("chords-table");
    const headerRow = table.querySelector("thead tr");
    while (headerRow.children.length > 0) {
        headerRow.removeChild(headerRow.lastChild);
    }
    table.querySelectorAll("tbody tr").forEach(row => {
        while (row.children.length > 0) {
            row.removeChild(row.lastChild);
        }
    });
}   

function addChordColumn(chord, position, functionName) {
    const table = document.getElementById("chords-table");

    // 1. Add new <th>
    const headerRow = table.querySelector("thead tr");
    const newTh = document.createElement("th");
    newTh.textContent = chord;
    headerRow.appendChild(newTh);

    // 2. Add new <td> to each row
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row, index) => {
        const newTd = document.createElement("td");
        if (index === 0) {
            newTd.textContent = position;
        } else if (index === 1) {
            newTd.textContent = functionName;
        } else if (index === 2) {
            const chordType = getChordType(chord);
            const noteName = chord.replace('dim', '').replace('m', '');
            // First row: chord diagrams
            const img1 = document.createElement("img");
            img1.src = `./chords/${noteName.replace('#', 'sharp')}/${chordType}_1.jpg`;
            newTd.appendChild(img1);

            const img2 = document.createElement("img");
            img2.src = `./chords/${noteName.replace('#', 'sharp')}/${chordType}_2.jpg`;
            newTd.appendChild(img2);

            const img3 = document.createElement("img");
            img3.src = `./chords/${noteName.replace('#', 'sharp')}/${chordType}_3.jpg`;
            newTd.appendChild(img3);

            const img4 = document.createElement("img");
            img4.src = `./chords/${noteName.replace('#', 'sharp')}/${chordType}_4.jpg`;
            newTd.appendChild(img4);
        } else {
        }
            // Second row: position text
        
        row.appendChild(newTd);
    });
}


document.querySelectorAll('.circle-container .note').forEach(element => {
    element.addEventListener('click', function () {
        const clickedNote = this.attributes['data-chord']?.value;
        const progression = progressions[clickedNote];
        const positions_array = getChordType(clickedNote) === 'major' ? positions['major'] : positions['minor'];

        if (!progression) return;

        // Clear highlighted class from all notes   
        document.querySelectorAll('.circle-container .note').forEach(note => {
            note.classList.remove('highlighted');
            note.querySelectorAll('.badge').forEach(badge => badge.remove());
        });
        clearChordsTable();

        const circleContainer = this.closest('.circle-container');
        progression.forEach((chord, index) => {
            if (getChordType(chord) === 'dim') {
                chordToAdd = chord.slice(0, -3) + 'm'; // Remove 'dim' for matching
            } else {
                chordToAdd = chord;
            }
            noteItem = circleContainer.querySelector(`.note[data-chord="${chordToAdd}"], .note[data-enh-chord="${chordToAdd}"]`)
            if (!noteItem) return;

            noteItem.classList.add('highlighted');

            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = positions_array[index];
            noteItem.appendChild(badge);

            addChordColumn(chord, positions_array[index], position_functions[index]);
        });

    });
});
