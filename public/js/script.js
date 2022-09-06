const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

Array.from(deleteBtn).forEach(element => element.addEventListener("click", deleteItem))
Array.from(item).forEach(element => element.addEventListener("click", markComplete))
Array.from(itemCompleted).forEach(element => element.addEventListener("click", markIncomplete))

async function deleteItem()
{
    const itemText = await this.parentNode.childNodes[1].innerText.trim()
    console.log(itemText)
    try
    {
        const response = await fetch('deleteTask', {
            method: "delete",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'removedTask': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err)
    {
        console.log(err)
    }
}

async function markComplete()
{
    const itemText = this.parentNode.childNodes[1].innerText.trim()
    try
    {
        const response = await fetch('completeTask', {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'task': itemText,
                'completed': true
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err)
    {
        console.log(err)
    }
}

async function markIncomplete()
{
    const itemText = this.parentNode.childNodes[1].innerText.trim()
    try
    {
        const response = await fetch('completeTask', {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'task': itemText,
                'completed': false
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err)
    {
        console.log(err)
    }
}