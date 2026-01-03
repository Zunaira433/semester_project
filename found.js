const searchInput = document.getElementById("searchInput")
function saveFoundItem(item) {
  const foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
  foundItems.push(item);
  localStorage.setItem("foundItems", JSON.stringify(foundItems));
}


function printItems(items = null) {
  const container = document.getElementById("foundItemsContainer");
  if (!container) return;

  container.innerHTML = "";                                    

  const foundItems = items || JSON.parse(localStorage.getItem("foundItems")) || [];

  foundItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "w-72 bg-white rounded-xl shadow-md overflow-hidden border hover:scale-105 transition";

    card.innerHTML = `
      <div class="h-36 bg-gray-200 flex items-center justify-center">
        <img src="${item.image || 'images/placeholder.jpg'}" class="h-36 w-full object-cover">
      </div>

      <div class="p-4 space-y-2">
        <h3 class="text-lg font-semibold text-gray-800">${item.itemName}</h3>
        <p class="text-sm text-gray-600"><span class="font-medium">Item ID:</span> ${item.id}</p>
        <p class="text-sm text-gray-600"><span class="font-medium">Lost at:</span> ${item.location}</p>
        <p class="text-sm text-gray-600"><span class="font-medium">Date:</span> ${item.dateFound}</p>
        <p class="text-sm text-gray-600"><span class = "font-medium> Description: </span> ${item.description}</p>

          <h3 class="text-lg font-semibold text-gray-800 hidden admin_btn">Contact Information</h3>
          <p class="text-sm text-gray-600 hidden admin_btn"><span class="font-medium">Student Name:</span> ${item.studentName}</p>
          <p class="text-sm text-gray-600 hidden admin_btn"><span class="font-medium">Student ID:</span> ${item.studentId}</p>
          <p class="text-sm text-gray-600 hidden admin_btn"><span class="font-medium">Email:</span> ${item.email}</p>
          <p class="text-sm text-gray-600 hidden admin_btn"><span class="font-medium">Contact Number:</span> ${item.phone}</p>
         <span class="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          ${item.status || "Pending"}
        </span>
      </div>
      <div class= "flex flex-row gap-6 justify-center">
          <button  class = "hidden admin_btn delete_btn bg-black text-white py-2 px-3 rounded-lg hover:bg-amber-950"  data-id="${item.id}" >Delete Item</button>
          
          <button class = "hidden admin_btn update_btn bg-black text-white py-2 px-3 rounded-lg hover:bg-amber-950" data-id="${item.id}">Update Item</button>
          </div>
    `;
    container.appendChild(card);

    const delBtn = card.querySelector(".delete_btn");
    delBtn.addEventListener("click", ()=>{
      alert("item : " + delBtn.dataset.id + " will be deleted permanently");
      const itemId = Number (delBtn.dataset.id)
      del(itemId)
    });
    const updateBtn = card.querySelector(".update_btn");
    updateBtn.addEventListener("click", () => {
    const itemId = Number(updateBtn.dataset.id);
    const newStatus = prompt("Enter new status:");
    if(newStatus) {
        updateStatus(itemId, newStatus);
    }
});
  });

   const isAdmin = localStorage.getItem("isAdmin")
  adminButton = document.querySelectorAll(".admin_btn")
  adminButton.forEach(btn => {
    btn.classList.remove("hidden")
  });


  if (isAdmin == "true"){
    adminButton.forEach(btn => {
      btn.classList.remove("hidden");
      
    });
  }

  if (isAdmin == "false"){
    adminButton.forEach(btn => {
      btn.classList.add("hidden");
      
    })
  }

}



document.addEventListener("DOMContentLoaded", () => {
  printItems(); 

  const foundForm = document.querySelector('.found_form');
  if (!foundForm) return; // Stop if this is the display page

  foundForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const foundFormElements = {
      id : Date.now(),
      itemName: document.querySelector('.found_title').value,
      category: document.querySelector('.found_category select').value,
      description: document.querySelector('.found_description').value,
      dateFound: document.querySelector('.found_date').value,
      location: document.querySelector('#foundLocation').value,
      studentName: document.querySelector('#foundStudentName').value,
      studentId: document.querySelector('#foundStudentId').value,
      email: document.querySelector('#foundStudentEmail').value,
      phone: document.querySelector('#foundStudentPhone').value,
      image: '' 
    };

    saveFoundItem(foundFormElements);
    alert('Found item submitted successfully!');
    foundForm.reset();
  });
});


searchInput.addEventListener("input", function() { 
  const query = searchInput.value.toLowerCase()
  const items = JSON.parse(localStorage.getItem("foundItems")) || [];

  const filtered = items.filter(item => 
    item.itemName.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );
  printItems(filtered)
});



 


document.addEventListener("DOMContentLoaded", () => {
  printItems();

});


function del(id) {
  const foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
  const updatedItems = foundItems.filter(item => item.id!== id);
  localStorage.setItem("foundItems", JSON.stringify(updatedItems))
  printItems();
};

function updateStatus(id, newStatus) {
    const items = JSON.parse(localStorage.getItem("foundItems")) || [];
    
    const updatedItems = items.map(item => {
        if(item.id === id) {
            item.status = newStatus;
        }
        return item;
    });

    localStorage.setItem("foundItems", JSON.stringify(updatedItems));
    printItems();
}
