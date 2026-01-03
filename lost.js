const searchInput = document.getElementById("searchInput")
function saveLostItem(item) {
  const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
  lostItems.push(item);
  localStorage.setItem("lostItems", JSON.stringify(lostItems));
}


function printItems(items = null) {
  const container = document.getElementById("lostItemsContainer");
  if (!container) return;

  container.innerHTML = "";                                    

  const lostItems = items || JSON.parse(localStorage.getItem("lostItems")) || [];

  lostItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "w-72 bg-white rounded-xl shadow-md overflow-hidden border hover:scale-105 transition";

    card.innerHTML = `
      <div class="h-36 bg-gray-200 flex items-center justify-center">
      
      </div>

      <div class="p-4 space-y-2">
        <h3 class="text-lg font-semibold text-gray-800">${item.itemName}</h3>
        <p class="text-sm text-gray-600"><span class="font-medium">Item ID:</span> ${item.id}</p>
        <p class="text-sm text-gray-600"><span class="font-medium">Lost at:</span> ${item.location}</p>
        <p class="text-sm text-gray-600"><span class="font-medium">Date:</span> ${item.datelost}</p>
        <p class="text-sm text-gray-700"><span class="font-medium">Description:</span> ${item.description}</p>
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


  const isAdmin = localStorage.getItem("isAdmin");
  adminButton = document.querySelectorAll(".admin_btn");
if (isAdmin == "true"){
  adminButton.forEach(btn => {
  btn.classList.remove("hidden");
  });
if (isAdmin == "false"){
  adminButton.forEach(btn => {
  btn.classList.add("hidden");
  });  
};
};
};


document.addEventListener("DOMContentLoaded", () => {
  printItems(); 

  const lostForm = document.querySelector('.lost_form');
  if (!lostForm) return;

  lostForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const lostFormElements = {
      id : Date.now(),
      itemName: document.querySelector('.lost_title').value,
      category: document.querySelector('.lost_category select').value,
      description: document.querySelector('.lost_description').value,
      datelost: document.querySelector('.lost_date').value,
      location: document.querySelector('#lostLocation').value,
      studentName: document.querySelector('#lostStudentName').value,
      studentId: document.querySelector('#lostStudentId').value,
      email: document.querySelector('#lostStudentEmail').value,
      phone: document.querySelector('#lostStudentPhone').value,
      image: '' 
    };

    saveLostItem(lostFormElements);
    alert('Lost item submitted successfully!');
    lostForm.reset();
  });
});


searchInput.addEventListener("input", function() { 
  const query = searchInput.value.toLowerCase()
  const items = JSON.parse(localStorage.getItem("lostItems")) || [];

  const filtered = items.filter(item => 
    item.itemName.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );
  printItems(filtered)
});


console.log(searchInput.value);



function del(id) {
  const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
  const updatedItems = lostItems.filter(item => item.id!== id);
  localStorage.setItem("lostItems", JSON.stringify(updatedItems))
  printItems();
};

function updateStatus(id, newStatus) {
    const items = JSON.parse(localStorage.getItem("lostItems")) || [];
    
    const updatedItems = items.map(item => {
        if(item.id === id) {
            item.status = newStatus;
        }
        return item;
    });

    localStorage.setItem("lostItems", JSON.stringify(updatedItems));
    printItems();
}


