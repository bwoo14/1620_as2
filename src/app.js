const notes = [
  { 
    title: "first note", 
    noteBody: "this is an example note",
    id: 1 
  }
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

  if (readNoteArea.contains(document.querySelector('.edit-note'))) {
    closeNote()
  }

  writeNoteArea.insertAdjacentHTML("afterbegin", cancelButtonTemp)
  writeNoteArea.insertAdjacentHTML("afterbegin", saveButtonTemp)
  writeNoteArea.insertAdjacentHTML("afterbegin", noteTemplate)

  cancelButton = document.querySelector('.cancel')
  cancelButton.addEventListener('click', cancelNote)

  saveButton = document.querySelector('.save')
  saveButton.addEventListener('click', saveNote)
}

function cancelNote(evt) { // Cancel note button
  removeNoteandButtons()
  enablePlusButton()
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

  removeNoteandButtons()

  addNoteToSavedList() // Saves note to sidebar
  addClickToSaveNote(note_id)
  enablePlusButton()
}

function addClickToSaveNote(note_id) {
  const sidebarNote = document.getElementById(note_id)
  sidebarNote.addEventListener('click', readNote)
}

function enablePlusButton() {
  plusButton.addEventListener('click', openNoteSpace) // Allows for plus button to be clicked again
}

function addNoteToSavedList() {
  const newestNote = notes[notes.length - 1]
  var savedNoteTemplate = `<li class='saved-note' id=${newestNote.id}>${newestNote.title}</li>`
  if (newestNote.title == ''){
    savedNoteTemplate = `<li class='saved-note' id=${newestNote.id}>Untitled Note</li>`
  }
  else if (newestNote.title.length >= 25) {
    savedNoteTemplate = `<li class='saved-note' id=${newestNote.id}>${newestNote.title.slice(0, 20)}...</li>`
  }
  notesList.insertAdjacentHTML("afterend", savedNoteTemplate)
}

function readNote(evt) {
  let noteToBeRead = writeToNoteObject(evt)
  
  const printedNote = `<textarea class='edit-note' rows="35" cols="50">${noteToBeRead.title}${noteToBeRead.noteBody}
  </textarea>`

  if (readNoteArea.contains(document.querySelector('.edit-note'))) {
    closeNote()
    insertNotes(printedNote) // Closes note if a note is already inside the read-notes-area
  }
  else {
    insertNotes(printedNote)
  }

  if (writeNoteArea.contains(document.querySelector('.new-note'))) {
    console.log('yes')
    removeNoteandButtons()
  }
  else {
    console.log('no')
  }

  const closeButton = document.querySelector('.close')
  closeButton.addEventListener('click', closeNote)
}

function insertNotes(note) {
  readNoteArea.insertAdjacentHTML("afterbegin", closeButtonTemplate)
  readNoteArea.insertAdjacentHTML("afterbegin", note)
}

function writeToNoteObject(clickedNote) {
  let noteToBeRead = {
    title: "",
    noteBody: "",
    id: 0 
  }

  for (var note of notes) {
    if (note.id == parseInt(clickedNote.target.id)) {
      noteToBeRead.title = note.title  // Saves all values from the note to a new object
      noteToBeRead.noteBody = formateNoteBody(note.noteBody)
      noteToBeRead.id = note.id
    }
  }
  return noteToBeRead
}

function formateNoteBody(noteBody) {
  var formattedNote = "\n"
  for (const item of noteBody) { // Places all of the items in the body list into a single string with line breaks
    formattedNote += `${item}\n ` 
  }
  return formattedNote
}

function closeNote() {
  const openNote = document.querySelector('.edit-note')
  const closeButton = document.querySelector('.close')

  openNote.remove()
  closeButton.remove()
}

function removeNoteandButtons() {
  const newNote = document.querySelector('.new-note')
  const save = document.querySelector('.save')
  const cancel = document.querySelector('.cancel')

  newNote.remove()
  save.remove()
  cancel.remove()
}



function dark_theme(){
  const dark_mode = document.querySelector('.light-theme')
  
  return dark_mode.classList.toggle("dark-theme")
}


const darkButton = document.querySelector(".theme-toggle")
darkButton.addEventListener('change', dark_theme)


enablePlusButton()

