import React, { useState, useEffect } from 'react';
import './ContactApp.css';

const ContactApp = () => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const { name, email, phone } = form;
    if (!name || !email || !phone) return alert("All fields are required!");

    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };
    setContacts([...contacts, newContact]);
    setForm({ name: '', email: '', phone: '' });
  };

  const handleDelete = (id) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
  };

  return (
    <div className="contact-container">
      <h2>Contact Management App</h2>

      <div className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Contact</button>
      </div>

      <div className="contact-list">
        {contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <div>
                <strong>{contact.name}</strong>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactApp;
