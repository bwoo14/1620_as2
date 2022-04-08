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

function cancelNote(evt){
  const note = document.querySelector('.new-note')
  const save = document.querySelector('.save')
  const cancel = document.querySelector('.cancel')
  note.remove()
  save.remove()
  cancel.remove()

}

function openNoteSpace(evt){
  
  createNoteArea.insertAdjacentHTML("afterend", cancelButtonTemp)
  createNoteArea.insertAdjacentHTML("afterend", saveButtonTemp)
  createNoteArea.insertAdjacentHTML("afterend", note)

  cancelButton = document.querySelector('.cancel')
  cancelButton.addEventListener('click', cancelNote)
}

plusButton.addEventListener('click', openNoteSpace)
