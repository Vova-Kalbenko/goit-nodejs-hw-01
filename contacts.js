const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
// const colors = require("colors");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath, "utf-8");
		const contacts = JSON.parse(data);
		return contacts;
	} catch (error) {
		return error;
	}
}


async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf-8");

		const contact = JSON.parse(data).filter(
			contact => contact.id === contactId
		);
		return contact;
	} catch (error) {
		return error;
	}
}


async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf-8");
		const contacts = JSON.parse(data).filter(
			contact => contact.id !== contactId
		);
		fs.writeFile(contactsPath, JSON.stringify(contacts));
		console.log(`Contact with id ${contactId} removed successfully!`.red);
		return contacts;
	} catch (error) {
		return error;
	}
}


async function addContact({ name, email, phone }) {
	try {
		const data = await fs.readFile(contactsPath, "utf-8");
		const contacts = JSON.parse(data);
		const newContact = { id: uuidv4(), name, email, phone };
		contacts.push(newContact);
		fs.writeFile(contactsPath, JSON.stringify(contacts));
		console.log(
			`Contact ${JSON.stringify(newContact)} added successfully!`.green
		);
		return contacts;
	} catch (error) {
		return error;
	}
}

module.exports = { listContacts, getContactById, removeContact, addContact };