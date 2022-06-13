async function loadData(){
    const res = await fetch(`/info`)
    const data = await res.json()
    console.log(data.length);
    document.querySelector('#phoneBookAmount').innerHTML = `Phonebook has info for ${data.length} people`
    document.querySelector('#dateAndTime').innerHTML = data.id
    
}

loadData();