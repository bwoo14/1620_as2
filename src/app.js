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

const noteTemplate = `<textarea class='new-note' rows="10" cols="75" placeholder = "1) Title \n2) Body"></textarea>`

const cancelButtonTemp =  `<button class='cancel'>Cancel</button>`
const saveButtonTemp = `<button class='save'>Save</button>`
const closeButtonTemplate = `<button class='close'>Close</button>`

const notesList = document.querySelector('.notes-list')

const createNoteDiv = `<div class='create-note-div'></div>`
const editNoteDiv = `<div class='edit-note-div'></div>`
const buttonDiv = `<div class='button-div'></div>`
const buttonDivClose = `<div class='button-div-close'></div>`

function openNoteSpace(evt){ // Opens a blank textarea for note taking
  
  plusButton.removeEventListener('click', openNoteSpace) // Ensures that the plus button cannot be clicked again until note saved or cancelled
  
  if (readNoteArea.contains(document.querySelector('.edit-note'))) { // Removes notes in read-note-area 
    closeNote(evt)
  }
  
  writeNoteArea.insertAdjacentHTML("afterbegin", createNoteDiv)
  currentCreateNoteDiv = document.querySelector(".create-note-div") // Creates a new note div
  currentCreateNoteDiv.insertAdjacentHTML("afterbegin", buttonDiv) //Creates a div for the save and cancel buttons
  currentButtonDiv = document.querySelector(".button-div")

  currentButtonDiv.insertAdjacentHTML("afterbegin", cancelButtonTemp)
  currentButtonDiv.insertAdjacentHTML("afterbegin", saveButtonTemp) // Inserts buttons and empty textarea
  currentCreateNoteDiv.insertAdjacentHTML("afterbegin", noteTemplate)

  cancelButton = document.querySelector('.cancel') // adds event listener to cancel button
  cancelButton.addEventListener('click', cancelNote)

  saveButton = document.querySelector('.save') // adds event listener to save button
  saveButton.addEventListener('click', saveNote)
}

function cancelNote(evt) { // Cancel note button
  removeNoteandButtons(evt) // Removes notes and buttons
  enablePlusButton() //Allows plus button to be clicked again
}
function saveNote(evt) { // Save note button
  
  const newNote = document.querySelector('.new-note')
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

  removeNoteandButtons(evt)
  addNoteToSavedList() // Saves note to sidebar
  addClickToSaveNote(note_id) // Allows the notes on side bar to be clicked
  enablePlusButton()
}

function removeNoteandButtons(evt) {
  currentWriteNoteArea = document.querySelector('.write-note-area')
  while (currentWriteNoteArea.firstChild) {
    currentWriteNoteArea.removeChild(currentWriteNoteArea.firstChild)
  }
}

function addClickToSaveNote(note_id) {
  const sidebarNote = document.getElementById(note_id)
  sidebarNote.addEventListener('click', readNote)
}

function readNote(evt) {
  let noteToBeRead = writeToNoteObject(evt) // Creates an object for reading from the event

  const printedNote = `<div class='edit-note'><h1 class='note-header'>${noteToBeRead.title}</h1><p class='note-text'>${noteToBeRead.noteBody}</p>`

  if (readNoteArea.contains(document.querySelector('.edit-note'))) {
    closeNote(evt)
    insertNotes(printedNote) // Closes note if a note is already inside the read-notes-area
  }
  else {
    insertNotes(printedNote)
  }
  clearNoteCreateArea(evt)
  addCloseButton()
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
  var formattedNote = ""
  for (const item of noteBody) { // Places all of the items in the body list into a single string with line breaks
    formattedNote += `${item}<br>`
  }
  return formattedNote
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
    savedNoteTemplate = `<li class='saved-note' id=${newestNote.id}>${newestNote.title.slice(0, 16)}...</li>`
  }
  notesList.insertAdjacentHTML("afterbegin", savedNoteTemplate)
}



function clearNoteCreateArea(evt) {
  if (writeNoteArea.contains(document.querySelector('.new-note'))) {
    removeNoteandButtons(evt)
    enablePlusButton()
  }
}

function addCloseButton() {
  const closeButton = document.querySelector('.close')
  closeButton.addEventListener('click', closeNote)
}

function insertNotes(note) {
  readNoteArea.insertAdjacentHTML("afterbegin", buttonDivClose)
  currentBtnDiv = document.querySelector(".button-div-close")
  readNoteArea.insertAdjacentHTML("afterbegin", editNoteDiv)
  currentEditNoteDiv = document.querySelector(".edit-note-div")
  
  currentBtnDiv.insertAdjacentHTML("afterbegin", closeButtonTemplate)
  currentEditNoteDiv.insertAdjacentHTML("afterbegin", note)
  
}

function closeNote(evt) {
  currentReadNoteArea = document.querySelector('.read-note-area')
  while (currentReadNoteArea.firstChild) {
    currentReadNoteArea.removeChild(currentReadNoteArea.firstChild)
  }
}

function darkTheme(){
  const darkMode = document.querySelector('.main-container')
  darkMode.classList.toggle("dark-theme")
}

var darkButton = document.querySelector(".theme-toggle")
darkButton.addEventListener('change', darkTheme)

enablePlusButton()

