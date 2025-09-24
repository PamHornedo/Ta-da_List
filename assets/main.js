
//These are just placeholder lists i created to check the js function. 
const lists ={
    listOne:{
        name: 'List 1',
        items: ['item 1', 'item 2', 'item 3']
    },
    listTwo:{
        name: 'List 2', 
        items: ['list2 item1', 'list2 item2', 'list2 item3']
    },
    listThree:{
        name: 'List 3', 
        items: ['list3 item1', 'list3 item2', 'list3 item3']
    }
};

function openList(listKey) {
    document.querySelectorAll('.list-card').forEach(card => {
                card.classList.remove('active');
     });

    event.target.closest('.list-card').classList.add('active');

    const list = lists[listKey];

    const activeListDiv = document.getElementById('activeList');

    let itemsHtml = '';
            list.items.forEach(item => {
                itemsHtml += `<li class="list-group-item">${item}</li>`;
            });
            
            activeListDiv.innerHTML = `
                <h4>${list.name}</h4>
                <ul class="list-group">
                    ${itemsHtml}
                </ul>
            `;
}

