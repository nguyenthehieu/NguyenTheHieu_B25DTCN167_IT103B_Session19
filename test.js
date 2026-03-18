let contacts = [];
let contactForm = document.getElementById('contact-form');

getData();

contactForm.addEventListener('submit', createContact);

function createContact(event) {
    event.preventDefault();

    let name = document.getElementById('contact-name').value;
    let phone = document.getElementById('contact-phone').value;
    let email = document.getElementById('contact-email').value;

    let newContact = {
        id: Date.now(), 
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim()
    };

    contacts.push(newContact);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    renderData();
    contactForm.reset();

    alert('Thêm liên hệ thành công!');
}

function renderData() {
    let contactTbody = document.getElementById('contact-tbody');
    contactTbody.innerHTML = '';

    contacts.forEach((contact, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${contact.name}</strong></td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
                <button onclick="deleteContact(${contact.id})">Xóa</button>
                <button onclick="editContact(${contact.id})">Sửa</button>
            </td>
        `;

        contactTbody.appendChild(row);
    });
}

function getData() {
    let data = localStorage.getItem('contacts');
    if (data) {
        contacts = JSON.parse(data);
        renderData();
    }
}

function deleteContact(id) {
    let confirmDelete = confirm('Bạn có chắc chắn muốn xóa?');

    if (confirmDelete) {
        contacts = contacts.filter(contact => contact.id !== id);

        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderData();

        alert('Xóa thành công!');
    }
}

function editContact(id) {
    let contact = contacts.find(c => c.id === id);

    document.getElementById('contact-name').value = contact.name;
    document.getElementById('contact-phone').value = contact.phone;
    document.getElementById('contact-email').value = contact.email;

    editingId = id;
    submitBtn.textContent = 'Cập nhật';
}