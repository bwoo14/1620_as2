const notes = [
  { 
    title: "first note", 
    noteBody: "this is an example note",
    id: 1 
  }
]

const plusButton = document.querySelector('.fa-circle-plus')
const createNoteArea = document.querySelector('.create-note-area')
const note = `<textarea class='new-note' rows="35" cols="50"></textarea>`
const cancelButtonTemp =  `<button class='cancel'>Cancel</button>`
const saveButtonTemp = `<button class='save'>Save</button>`


function openNoteSpace(evt){ // Opens a blank textarea for note taking
  
  plusButton.removeEventListener('click', openNoteSpace) // Ensures that the plus button cannot be clicked again until note saved or cancelled

  createNoteArea.insertAdjacentHTML("afterend", cancelButtonTemp)
  createNoteArea.insertAdjacentHTML("afterend", saveButtonTemp)
  createNoteArea.insertAdjacentHTML("afterend", note)

  cancelButton = document.querySelector('.cancel')
  cancelButton.addEventListener('click', cancelNote)

  saveButton = document.querySelector('.save')
  saveButton.addEventListener('click', saveNote)
}

function cancelNote(evt) {
  const newNote = document.querySelector('.new-note')
  const save = document.querySelector('.save')
  const cancel = document.querySelector('.cancel')
  // Removing cancel button, save button, and the note
  newNote.remove()
  save.remove()
  cancel.remove()

  plusButton.addEventListener('click', openNoteSpace) // Allows for plus button to be clicked again

}

function saveNote(evt) {
  
  const newNote = document.querySelector('.new-note')
  const save = document.querySelector('.save')
  const cancel = document.querySelector('.cancel')

  var lines = newNote.value.split('\n')  // gives all lines
  var title = lines[0] // Isolates the title
  var body = lines.slice(1) // Body of the note excluding title  
  var note_id = notes.length + 1

  const savedNote = { //FIX 
    title: title,
    noteBody: body,
    id: note_id
  }

  notes.push(savedNote) // Save new note to notes list 
  

  newNote.remove()
  save.remove()
  cancel.remove()


  plusButton.addEventListener('click', openNoteSpace) // Allows for plus button to be clicked again
}

plusButton.addEventListener('click', openNoteSpace)
