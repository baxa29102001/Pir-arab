import React ,{useEffect,useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import axios from 'axios'
import '../../src/App.css'

function Pirarab() {
    const [manzils,setManzils] = useState({
        adress:[]
    })
    const [come,setCome] = useState(false)

    const [modal, setModal] = useState(false)
    const [joy, setjoy] = useState('')
    
    const { database } = useContext(UserContext)
    const history = useHistory()


    let {token} = database
    useEffect(() => {
        if (token === undefined) {
            history.push('/')
        } 
    },[history,token])
    useEffect(() => {
        axios.get('/api/adress').then(res =>{
            setManzils({
                adress:res.data
            })
            setCome(true)
        })

        return () => {
            setCome(false)
        }
       
    },[come])

    const sendData = (e) => {
        e.preventDefault()
        const adress = joy
        axios.post("/api/manzil", {adress}).then(res => {
            setManzils(
                {
                    adress:res.data
                }
            )
        })
         
        
        setModal(!modal)
    }

    
       
    return (
        <div>
            
                
            <div className="container">
                <div className='row'>
                    {
                        token ? <div className='col-12'><button type='button'
                        className='btn btn-danger'
                        >Logout</button></div> :
                        <div></div>
                    }
                    
                </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Maznzillar</h2>
                                </div>
                                <div className="card-body">
                                    {
                                        manzils.adress.map(item=>
                                         <div className="d-flex" key={item._id}>
                                             <h4>{item.adress} <Link  to={`/manzil/${item._id}`}>
                                                 Kirish
                                             </Link></h4>
                                             
                                         </div>
                                        )
                                    }
                            </div>
                            <div className="card-footer">
                                <button onClick={()=>setModal(!modal)} className="btn btn-success">Manzil Yaratish</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>  
            

            <section className={modal?"display":'d-none'}>
                <form onSubmit={sendData}>
                    <input value={joy} onChange={(e) => setjoy(e.target.value)} />
                    <button type="submit">add</button>
                </form>
            </section>
                
            
        </div>
    )
}

export default Pirarab
