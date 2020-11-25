import React, { useState,useContext } from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios'

import { useHistory } from 'react-router-dom';


function Home() {
    const [form, setForm] = useState({
        userName: '',
        password: ''
    })

    let { setData }  = useContext(UserContext)
 
    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
            
        })
    }

    const history = useHistory()

    const submitData = (e) => {
        e.preventDefault()
        axios.post('/api/login', form).then(res => {
            let role = res.data.user.role

            setData({
                token: res.data.token,
                user:res.data.user
            })


            if (role === 1) {
                history.push('/pirarab')
            } else {
                history.push('/usta')
            }


            
           
        })
            .catch(err => {
                console.log(err.response.data.message)
        })


       
        setForm({
            userName: '',
            password:''
        })


    }
    
    
 
 
       let {userName,password} = form 
    return (
        <div>
            <div className="container-fluid ">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 text-center my-5">
                    <form onSubmit={submitData}>
                            <div className='form-group'>
                                <input type='text' className='form-control' placeholder='Username kiriting'
                                    value={userName}
                                    name='userName'
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className='form-group'>
                                <input type='text' className='form-control' placeholder='Parol kiriting'
                                    value={password}
                                    name="password"
                                    onChange={changeHandler}
                                />
                            </div>

                            <button type='submit' className='btn btn-primary'>Login</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
