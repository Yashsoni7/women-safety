import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Navbar} from 'react-bootstrap';
import SafetyCards from './components/safetyCards';
import './App.css';

function App() {
    let peoples = []
    // let items = []
    const [data,setData] = useState([]);


    useEffect(() => {
        const url = 'https://dceed598.ngrok.io/crime/show/'
        // axios.get('http://6c152c1e.ngrok.io/crime/show/')
        // .then((res) => console.log(res.json()))
        // .catch(err => console.log)
        fetch(url, {
            method : "GET",
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data) 
            setData(data)
        })       
        .catch((err) => console.log(err))

        
    },[]);


  
    
    // const peoples = [
    //     {id:1, name:'yash soni',number:'1234567890',lattitude:'1',longitude:'1'},
    //     {id:2, name:'nishant',number:'14123567890',lattitude:'121',longitude:'2'},
    //     {id:3, name:'nishant',number:'14123567890',lattitude:'121',longitude:'3'},
    //     {id:4, name:'nishant',number:'14123567890',lattitude:'121',longitude:'4'},

    // ]

   

    // const items= []
    

    // peoples.forEach((people) => (
    //     console.log(people.number),
    //     items.push(<SafetyCards id={people.id}  number={people.number} lattitude={people.lattitude} longitude={people.longitude} />)
        
    // ))

    return (
        
        <React.Fragment>
        <Navbar className='navBar' bg="dark" variant="dark">
            Beti Bachao     
        </Navbar>
        <div className='main'>

            <div className='mainTitle'>
                Real time updates
            </div>
        <div className='mainLeft'>

            {/* {items} */}
            {data.map(el => <SafetyCards id={el.id} name={el.name} number={el.number} address={el.address} lattitude={el.lattitude} longitude={el.longitude} time={el.time}  />)}
        </div>
        
        </div>
        </React.Fragment>
    );
}

export default App;
