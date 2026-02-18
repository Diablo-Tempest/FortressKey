import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const Manager = () => {
    const [form, setForm] = useState({ siteURL: '', username: '', password: '' })
    const [passArray, setPassArray] = useState([]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const getPasswords = async () => {
            let req = await fetch(import.meta.env.SERVER_URI);
            let passwords = await req.json();
            setPassArray(passwords);
        }
        getPasswords()
    }, [])


    const imgRef = useRef();
    const passRef = useRef();
    const handlePass = () => {
        if (form.password === '') {
            toast.warn("Password Field must not be empty!")
            return;
        }
        if (imgRef.current.src.includes('/visible.png')) {
            imgRef.current.src = '/notVisible.png';
            passRef.current.type = 'text';
            imgRef.current.title = 'Hide Password'
        }
        else {
            imgRef.current.src = '/visible.png';
            passRef.current.type = 'password';
            imgRef.current.title = 'Show Password'

        }
    }
    const handleSave = async () => {
        // notification for any/all fields are empty
        if (form.siteURL === '' || form.username === '' || form.password === '') {
            toast.error('All Fields are necessary!')
            return
        }

        // update an existing entry

        if(form.id){
            setPassArray([...passArray, {...form}])
            await fetch(import.meta.env.SERVER_URI, { method: 'PUT', body: JSON.stringify({ ...form }), headers: { 'Content-Type': 'application/json' } })
            toast.success("Entry Updated Successfully!")
            setForm({ siteURL: '', username: '', password: '' })
            return;
        }

        // Save a new entry
        setPassArray([...passArray, { ...form, id: uuidv4() }])
        await fetch(import.meta.env.SERVER_URI, { method: 'POST', body: JSON.stringify({ ...form }), headers: { 'Content-Type': 'application/json' } })
        toast.success("Entry is saved successfully!")
        setForm({ siteURL: '', username: '', password: '' })
    }

    // remove the entry from the table
    const editEntry = (id) => {
        setForm({ ...passArray.filter(item => item.id === id)[0] })
        setPassArray(passArray.filter(item => item.id !== id))
    }

    // delete the entry
    const deleteEntry = async (id) => {
        setPassArray(passArray.filter(item => item.id !== id))
        await fetch(import.meta.env.SERVER_URI, {method: 'DELETE', body: JSON.stringify({id}), headers: {"Content-Type": "application/json"}})
        toast.success("Entry Deleted Succesfully!")
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied To Clipboard!")
    }

    return (
        <>
            <ToastContainer stacked limit={5} autoClose={3000} draggable hideProgressBar={true} closeOnClick pauseOnFocusLoss={false} theme='dark' transition={Zoom} />
            <main className='mainSection'>
                <section className='inputSection'>
                    <input className='inputField' value={form.siteURL} name='siteURL' onChange={handleChange} type="text" placeholder='https://www.example.com' />
                    <section className='userpass'>
                        <input className='inputField' value={form.username} onChange={handleChange} name='username' type="text" placeholder='Username' />
                        <span id='passDesign' className='inputField'>
                            <input ref={passRef} value={form.password} id='passField' onChange={handleChange} name='password' type="password" placeholder='Password' />
                            <img title='Show Password' ref={imgRef} onClick={handlePass} className='visibleImg' src="/visible.png" height={0} width={0} alt="" />
                        </span>
                    </section>
                    <button onClick={handleSave} id='saveBtn'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ width: "30px", height: "30px" }}>
                    </lord-icon>Save</button>
                </section>
                <section id='passwordTable'>
                    {passArray.length === 0 && <div id='noPasswords'>No Passwords!</div>}
                    {passArray.length !== 0 && <div id='tableDiv'>
                        <table id='passTable'>
                            <thead>
                                <tr id='tableHeader'>
                                    <th className='py-2'>Site URL</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passArray.map((item, index) => {
                                    return <tr key={index} id='passRow'>
                                        <td className='select-copy' title={`Redirect to ${item.siteURL}`}><a id='linkDesign' href={item.siteURL} target='_blank'>{item.siteURL}</a></td>
                                        <td onClick={() => handleCopy(item.username)} className='select-copy'>{item.username}</td>
                                        <td onClick={() => handleCopy(item.password)} className='select-copy'>{"* ".repeat(item.password.length)}</td>
                                        <td>
                                            <div id='actionDesign'>
                                                <lord-icon
                                                    onClick={() => editEntry(item.id)}
                                                    title='Edit'
                                                    src="https://cdn.lordicon.com/nwfpiryp.json"
                                                    trigger="hover"
                                                    state="hover-line"
                                                    colors="primary:#ffffff"
                                                    style={{ "width": "30px", "height": "30px" }}>
                                                </lord-icon>
                                                <lord-icon
                                                    title='Delete'
                                                    onClick={() => deleteEntry(item.id)}
                                                    src="https://cdn.lordicon.com/egqwwrlq.json"
                                                    trigger="hover"
                                                    colors="primary:#545454,secondary:#c71f16,tertiary:#ebe6ef,quaternary:#3a3347"
                                                    style={{ "width": "30px", "height": "30px" }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    }
                </section>
            </main>
        </>
    )
}

export default Manager