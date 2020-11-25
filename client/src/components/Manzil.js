import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'


function Manzil() {

    const [maznil, setManzil] = useState({
        adress:{}
    }) 
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [number,setNumber] = useState('')
    const { id } = useParams()
       
    useEffect(()=>{

        async function fetchData(){
            await axios.get(`/api/adress/${id}`).then(res=>{
                setManzil({
                    adress:res.data
                })
             })
             
        }
        fetchData()
            
    },[id,maznil])
    
    const sendData = (e) => {
        e.preventDefault()
        
        const mah = {
            productName: name,
            productSumNum:number,
            productNum: number,
            manzil:id
        }      

        axios.post(`/api/${id}/mahsulot`, mah).then(res => {
            console.log(res.data)
            setManzil({
                adress:res.data
            })
        })
        
        
   }
   
    return (
        <div>
           
            <div className="container">
                    <div className="row">
                        <div className="col-6 offset-3">
                            <div className="card">
                            <div className="card-header">
                                <Link to="/pirarab">Qaytish</Link>
                                <h2>{maznil.adress.adress}</h2>
                                </div>
                                <div className="card-body">
                                {
                                    maznil.adress.qurilshProduct ? <>{maznil.adress.qurilshProduct.map(item =>
                                        <div key={item._id} className="d-flex">
                                            <p >{item.productName}</p>
                                            <p >{item.productNum}</p>
                                        </div>)}</>:"Ozgina sabr qiling"
                                }
                            </div>
                            <div className="card-footer">
                                <button onClick={()=>setModal(!modal)} className="btn btn-success">Add</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </div> 
            
            <section className={modal?"display":'d-none'}>
                <form  onSubmit={sendData}>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="number" value={number} onChange={(e)=>setNumber(e.target.value)} />
                    <button type="submit">add</button>
                </form>
            </section>
        </div>
       )
   
    
}

export default Manzil
