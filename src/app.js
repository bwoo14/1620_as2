const notes = [
  { 
    title: "first note", 
    noteBody: "this is an example note",
    id: 1 
  }
]

const plusButton = document.querySelector('.fa-circle-plus')
const createNoteArea = document.querySelector('.create-note-area')
const note = `<textarea></textarea>`
const cancelButton =  `<button>Cancel</button>`
const saveButton = `<button>Save</button>`

function openNoteSpace(evt){
  
  createNoteArea.insertAdjacentHTML("afterend", cancelButton)
  createNoteArea.insertAdjacentHTML("afterend", saveButton)
  createNoteArea.insertAdjacentHTML("afterend", note)
}


plusButton.addEventListener('click', openNoteSpace)