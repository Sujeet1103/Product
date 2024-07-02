import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import ReactTable from 'react-table';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arr, setarr] = useState([])
  let nameRef = useRef();
  let emailRef = useRef();
  let phoneRef =useRef();
  let addressRef = useRef();

 useEffect(() => {
    axios.get('http://localhost:5000/customers')
      .then(response => response.data)
      .then(data => setCustomers(data))
      .finally(() => setLoading(false));
  }, []); 

  async function submitdata(event){
    event.preventDefault();
    let obj={
      name:nameRef.current.value,
      email:emailRef.current.value,
      phone:phoneRef.current.value,
      address:addressRef.current.value
    }
    
  let res =await fetch('http://localhost:5000/customers',{
    method:"POST",
    headers:{
     'content-type':'application/json'
    },
    body:JSON.stringify(obj)
  })

  let data=await res.json()
  console.log(data)
}
async function handleDelete (ans){
  let filteredArr = arr.filter((ele)=>ele.id!==ans.id)
    console.log(filteredArr)
    setarr(filteredArr)
  
  let res = await fetch(`http://localhost:5000/customers/${customers[0]._id}`)
  let data = await res.json()
  console.log(data)
  }
  return (
    <div>
      <h1>Customers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td>Loading...</td></tr>
          ) : (
            customers.map(customer => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                {arr.map((obj)=>{
        return <tr>
        <th scope="row">{obj.name}</th>
        <td>{obj.email}</td>
        <td>{obj.phone}</td>
        <td>{obj.address}</td>
        <td><button onClick={ ()=>{handleDelete(obj)}}className='btn btn-danger'> Delete Customer</button></td>
      </tr>
        
      })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className='authPage'>
      <form className='col-md-6 m-auto p-3'>
  <h3 className='text-center'>Customer</h3>
  <div className="mb-3">
    <label htmlFor="exampleInpuname" className="form-label">Name</label>
    <input ref={nameRef} type="text" className="form-control" id="name" aria-describedby="nameHelp" />
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">Phone No</label>
    <input ref={phoneRef} type="number" className="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" />
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input ref={addressRef} type="text" className="form-control" id="exampleInputAddress" />
  </div>

  <div className='text-center'>
  <button onClick={submitdata} className="btn btn-primary">Add New Customer</button>
  
  </div>
 
</form>
</div>

    
      {/* <button onClick={ () => axios.post('http://localhost:5000/customers')}>
        Add New Customer
      </button> */}
      <button onClick={() => axios.get('http://localhost:5000/customers')}>
        Refresh
      </button>
      {/* {customers.length > 0 && (
        <button onClick={() => axios.delete(`http://localhost:5000/customers/${customers[0]._id}`)}>
          Delete Customer
        </button>
      )} */}
    </div>
  );
};

export default Customers;