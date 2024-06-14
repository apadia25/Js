const addBtn=document.querySelector("#addBtn")

const main=document.querySelector("#main");

addBtn.addEventListener(
    "click",
    function(){
        // alert()
        addNote();
    }
)


const saveNotes=()=>{
    //add to local storage
    const notes=document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    //console.log(data);
    
    if(data.length === 0){
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem("notes",JSON.stringify(data))
    }

    //localStorage.setItem("notes",JSON.stringify(data))
}


//<div class="note">
{/* <div class="tool">
   <i class="fas fa-save"></i>
   <i class="fas fa-trash"></i>
</div>
<textarea></textarea>
</div> */}

//replecate above with help of DOM
function addNote(text = ""){
    const note=document.createElement("div");
    note.classList.add("note");
    note.innerHTML=`
    <div class="tool">
       <i class="save fas fa-save"></i>
       <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    //delete
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove();
            saveNotes();
        }
    )
    
    //save
    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes();
        }
    )

    //auto save
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes();
        }
    )

    main.appendChild(note);
    saveNotes();
}


//self calling function
(
    function(){
        const lsNotes=JSON.parse(localStorage.getItem("notes"));
        //console.log(lsNotes);

        // if(lsNotes.length === 0){
        //     localStorage.removeItem("notes");
        // }else{
        //     addNote();
        // }

        if(lsNotes === null){
            addNote();
        }else{
            lsNotes.forEach (
                (lsNotes) => {
                    addNote(lsNotes);
                }
            )
        }
    }
)()