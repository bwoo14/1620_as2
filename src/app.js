const notes = [
  //{ 
  //  title: "first note", 
  //  noteBody: "this is an example note",
  //  id: 1 
  //}
]

const plusButton = document.querySelector('.fa-circle-plus')
const createNoteArea = document.querySelector('.create-note-area')
const writeNoteArea = document.querySelector('.write-note-area')
const readNoteArea = document.querySelector('.read-note-area')

const noteTemplate = `<textarea class='new-note' rows="35" cols="50"></textarea>`

const cancelButtonTemp =  `<button class='cancel'>Cancel</button>`
const saveButtonTemp = `<button class='save'>Save</button>`
const closeButtonTemplate = `<button class='close'>Close</button>`

const notesList = document.querySelector('.notes-list')


function openNoteSpace(evt){ // Opens a blank textarea for note taking
  
  plusButton.removeEventListener('click', openNoteSpace) // Ensures that the plus button cannot be clicked again until note saved or cancelled

  writeNoteArea.insertAdjacentHTML("afterend", cancelButtonTemp)
  writeNoteArea.insertAdjacentHTML("afterend", saveButtonTemp)
  writeNoteArea.insertAdjacentHTML("afterend", noteTemplate)

  cancelButton = document.querySelector('.cancel')
  cancelButton.addEventListener('click', cancelNote)

  saveButton = document.querySelector('.save')
  saveButton.addEventListener('click', saveNote)
}

function cancelNote(evt) { // Cancel note button
  const newNote = document.querySelector('.new-note')
  const save = document.querySelector('.save')
  const cancel = document.querySelector('.cancel')
  // Removing cancel button, save button, and the note

  newNote.remove()
  save.remove()
  cancel.remove()

  plusButton.addEventListener('click', openNoteSpace) // Allows for plus button to be clicked again

}

function saveNote(evt) { // Save note button
  
  const newNote = document.querySelector('.new-note')
  const save = document.querySelector('.save')
  const cancel = document.querySelector('.cancel')

  var lines = newNote.value.split('\n')  // gives all lines
  var title = lines[0] // Isolates the title
  var body = lines.slice(1) // Body of the note excluding title  
  var note_id = notes.length + 1

  const savedNote = {
    title: title,
    noteBody: body,
    id: note_id
  }

  notes.push(savedNote) // Save new note to notes list 

  newNote.remove()
  save.remove()
  cancel.remove()

  addNoteToSavedList() // Saves note to sidebar
  const sidebarNote = document.getElementById(note_id)
  sidebarNote.addEventListener('click', readNote)

  plusButton.addEventListener('click', openNoteSpace) // Allows for plus button to be clicked again
}

function addNoteToSavedList() {
  const newestNote = notes[notes.length - 1]
  const savedNoteTemplate = `<li id=${newestNote.id}>${newestNote.title}</li>`

  notesList.insertAdjacentHTML("afterend", savedNoteTemplate)
}

function readNote(evt) {
  let noteToBeRead = {
    title: "template",
    noteBody: "template",
    id: 0 
  }
  for (var note of notes) {
    console.log(note.id == parseInt(evt.target.id))
    if (note.id == parseInt(evt.target.id)) {
      noteToBeRead.title = note.title
      noteToBeRead.noteBody = note.noteBody
      noteToBeRead.id = note.id
    }
  }
  console.log(noteToBeRead)
  //const printedNote = `<textarea class='new-note' rows="35" cols="50">
  //${noteToBeRead.title}${noteToBeRead.body}
  //</textarea>`
  //readNoteArea.insertAdjacentHTML()
}

plusButton.addEventListener('click', openNoteSpace)

