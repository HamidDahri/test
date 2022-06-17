import React, { useContext, useState , useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';
export const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const {current, updateContact ,clearCurrent, addContact} = contactContext;

  
    console.log(current);

    const [contact , setcontact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal"
    })


    useEffect(() => {
        if(current !== null) {
            setcontact(current)
        } else {
            setcontact({
                name: "",
                email: "",
                phone: "",
                type: "personal"
            })
        }
     }, [contactContext , current])
    const {name , email , phone , type} = contact;

    const onchange = e => setcontact({ ...contact , [e.target.name]: e.target.value})
     
    const onsubmit = e => {
        e.preventDefault();
        
        if(current === null ){
            addContact(contact);
        } else {
            updateContact(contact)
        }
        clearAll();
    } 

    const clearAll = () => {
        clearCurrent();
    }

    return (
    <form onSubmit={onsubmit}>
    <h2 className='text-primary '>{current ? "Edit Contact" : 'Add Contact'}</h2>
    <input
    type="text" placeholder='Name' name='name' value={name} onChange={onchange}
    >
    </input>
    <input
    type="text" placeholder='Email' name='email' value={email} onChange={onchange}
    >
    </input>
    <input
    type="text" placeholder='Phone' name='phone' value={phone} onChange={onchange}
    >
    </input>
    <h5>Contact Type</h5>
     <input type="radio" name="type" value="personal" onChange={onchange} checked={type === "personal"}></input> Personal
     {'  '}
    <input type="radio" name="type" value="professional" onChange={onchange} checked={type === "professional"} ></input> Professional
    <div>
        <input type='submit' value={current ? "Update Contact" : 'Add Contact'} className="btn btn-primary btn-block"/>
    </div>
    {current && <div><button className="btn btn-light btn-block" onClick={clearAll}>Clear</button></div>}
    </form>
  )
}
