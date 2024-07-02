import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import ReactTable from 'react-table';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arr, setarr] = useState([])
  let nameRef = useRef()
    let priceRef = useRef()
    let quantityRef = useRef()
    let categoryRef = useRef()
  
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => response.data)
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, []);
  async function handleSubmit(event){
    event.preventDefault()
    console.log("hello")
    let name = nameRef.current.value;
    let price = priceRef.current.value;
    let quantity = quantityRef.current.value;
    let category = categoryRef.current.value;
    let obj={
        id:name,
        price,
        quantity,
        category
    }
    console.log(obj)

   if(obj.id && obj.price && obj.quantity && obj.category){
        setarr([...arr,obj])
    }
    let res =await fetch('http://localhost:5000/products',{
      method:"POST",
      headers:{
       'content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })
  
    let data=await res.json()
    console.log(data)
}
async function handleDelete(ans){
  let filteredArr = arr.filter((ele)=>ele.id!==ans.id)
    console.log(filteredArr)
    setarr(filteredArr)
     
  let res = await fetch(`http://localhost:5000/products/${products[0]._id}`)
  let data = await res.json()
  console.log(data)
  }
const [value,setValue]=useState(false)
const handleClose=(e)=>{
  setValue(!value)
}

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td>Loading...</td></tr>
          ) : (
            products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
              </tr>
              
            ))
          )}
          {arr.map((obj)=>{
        return <tr>
        <th scope="row">{obj.id}</th>
        <td>{obj.price}</td>
        <td>{obj.quantity}</td>
        <td>{obj.category}</td>
        <td><button onClick={ ()=>{handleDelete(obj)}}className='btn btn-danger'>Delete Products</button></td>
      </tr>
        
      })}
        </tbody>
      </table>
      {!value && <button className='btn btn-success' onClick={()=>{setValue(!value)}}>Add Item </button>}
      {value && <form   action="" style={{color:"white"}} className='d-flex gap-3 justify-content-center bg-dark col-md-10 m-auto p-3 rounded'>
        <input type="text" placeholder='Name' ref={nameRef} />
        <input type="number" placeholder='Price' ref={priceRef}/>
        <input type="number" placeholder='Quantity' ref={quantityRef}/>
        <input type="text" placeholder='Category' ref={categoryRef}/>
        <button onClick={handleSubmit} className='btn btn-success'> Add New Product</button>
        <button onClick={handleClose} className='btn btn-primary'>Close</button>
      </form>}
      {/* <button onClick={() => axios.post('http://localhost:5000/products')}>
        Add New Product
      </button> */}
      <button onClick={() => axios.get('http://localhost:5000/products')}>
        Refresh
      </button>
      {/* {products.length > 0 && (
        <button onClick={() => axios.delete(`http://localhost:5000/products/${products[0]._id}`)}>
          Delete Product
        </button> */}
      
    </div>
  );
};

export default Products;