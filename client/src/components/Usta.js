import React, { useState, useEffect,useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import axios from 'axios'



function Usta() {
    const [data,setData] = useState({
        product:{},
       
    })
    const [val, setVal] = useState('')
    const [err,setErr] = useState('')
    const { database } = useContext(UserContext)
    const history = useHistory()   

    let { token } = database
    // let store_token = localStorage.getItem('token')
    useEffect(() => {
        if (token === undefined ) {
            history.push('/')
        } 
    },[history,token])
   
    
    let { user } = database
    // let store_id = localStorage.getItem('user')
    useEffect(() => {
        // if (store_id) {
        //     axios.get(`/api/adress/${store_id}`).then(res => {
        //         setData({
        //            product:res.data
        //        })
        //    }) 
        // } else {
        if (!user.id) {
            history.push('/')
        }
            
            axios.get(`/api/adress/${user.id}`).then(res => {
               setData({
                  product:res.data
              })
          })
        // }
        
        
      
  }, [user.id,history,data])
   
    const submitData = (e) => {
       
       const useProduct = val
        if (useProduct === '') {
            
            setErr('Iltimos ishlatgan mahsulotiningizni sonini kiriting')
            return;
        } else {
            axios.post(`api/${e.target.id}/update`,{useProduct})
                .then(res => {
                console.log(res.data)
                setData({
                   product:res.data
               })
            })
     
            setVal('')      
       }
      
      
       
   }

   const change = (e) =>{
       setErr('')
       setVal(
          e.target.value
      )

   }
   


    return (
        <div className="container">
           <div className ="row">
                <div className='col-md-8 col-6 offset-2 my-3 bg-light'>
                    <h3 className='text-danger'>{ err }</h3>
               <table className="table ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Mahsulot</th>
      <th scope="col">MAHSULOT SONI</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
   
      {
                                data.product.qurilshProduct ? <> {
                                    data.product.qurilshProduct.map((item, index) =>
                                        <tr key={item._id}>
                                            <td>{index +1 }</td>
                                            <td>{item.productName}</td>
                                            <td>{ item.productSumNum }/{item.productNum}</td>
                                            <td><input onChange={change} type="number" /></td>
                                            <td><button className="btn btn-danger" id={item._id}  onClick={submitData}>-</button></td>
                                    </tr>
                                    )
                                }</> : "Ozgina sabr qiling"
      }
    
  </tbody>
</table>
               </div>
           </div>
        </div>
    )
}

export default Usta
