import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json')


export const getListContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

export const getContactById = async (id) => {
    const contacts = await getListContacts();
    const res = contacts.find(item => item.id === id)
    return res || null;
}

export const removeContact = async id => {
    const contacts = await getListContacts();
    const index = contacts.findIndex(item => item.id === id)
    if (index === -1) {
        return null
    }
    const [res] = contacts.splice(index, 1)
    return res;
}

export const addContact = async ({name, email, phone}) => {
     const contacts = await getListContacts();
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
    }
    contacts.push(newContact)
    return newContact;
}


