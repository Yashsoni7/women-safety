import React, {useState,useEffect} from 'react';
import MapComp from '../components/MapComp';

import './safetyCard.css'
    
function SafetyCards(props) {

        //  const [lat, setlat] = useState(0)
        //  const [log, setlog] = useState(0)
        const [lat, setlat] = useState(props.lattitude)
        const [log, setlog] = useState(props.longitude)
        const [data,setData] = useState([])
        useEffect(() => {
            const url = 'https://dceed598.ngrok.io/crime/view/'
            // axios.get('http://6c152c1e.ngrok.io/crime/show/')
            // .then((res) => console.log(res.json()))
            // .catch(err => console.log)
            fetch(url, {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json'
                  },
            })
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                console.log(JSON.parse(data))                 
                setData(JSON.parse(data))    
            })       
            .catch((err) => console.log(err))
    
            
        },[]);
        

            const item = []
            data.forEach((img) => (
                console.log(img.image),
                item.push(<img className='imgtest' src={'https://dceed598.ngrok.io'+img.image}></img>)

            ))
        
        // const renderMap=(lati,logi)=>{
           
        //     setlat(lati);
        //     setlog(logi);
        //     console.log(lat,log);
        //     setshow('true')          
                    
        // };

        

        
    
    return ( 

        <React.Fragment>
            <div className='combinedDiv'>  
            <div className='safeCard'>
               {/* <div className='test'>
                <div className='title'>Name : </div><div className='val'>{props.name}</div>
                </div> */}
                <div  className='test'>                    
                <div className='title'>Name:  </div><div className='val'>{props.name}</div>
                </div>
                <div className='test'>
                <div className='title'>Number:  </div><div className='val'>{props.number}</div>
                </div>
                <div className='test'>                    
                <div className='title'>Address: </div><div className='val'>{props.address}</div>
                </div> 
                <div className='test'>                    
            <div className='title'>Time: </div><div className='val'>{props.time} </div>
                </div>               
                
            </div>
            <div className='mainRight'>
                <MapComp latitude={lat} longitude={log} />
            </div>  
                <div className='images'>
                   
                    {item}

                </div>
        
            </div>

            


        </React.Fragment>
     );
    
}

    
 
export default SafetyCards;