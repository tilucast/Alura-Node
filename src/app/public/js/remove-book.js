const bookTable = document.querySelector('#books')
bookTable.addEventListener('click', (e) =>{
    let clickedElement = e.target

    if(clickedElement.dataset.type == 'remove'){
        
        try{
            let bookId = clickedElement.dataset.ref
            fetch(`http://localhost:3001/livros/${bookId}`, {method: 'DELETE'})
            const tr = clickedElement.parentElement.parentElement
            tr.remove()
        }catch(err){
            console.log(err)
        }
        
    }
})