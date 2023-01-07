import React from 'react';
import { Link, useParams} from 'react-router-dom';
import { useState, useEffect} from 'react';

export default function StdDetail() {
  const{stdid}=useParams();
  
  const [stddata1, setStddata1] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/student/"+stdid).then((res)=>{
      return res.json();
   }).then((resp)=>{
      setStddata1(resp)
   }).catch((err)=>{
     console.log(err.message)
   })
}, []);
  return (
    <div>
    
    <div className="card my-4 w-50 p-3">
  <div className="card-body">
    <h5 className="card-title">Name: {stddata1.fname} {stddata1.lname}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Phone: {stddata1.mobil}</h6>
    <h6 className="card-subtitle mb-2 text-muted">Email: {stddata1.email}</h6>
    <h6 className="card-subtitle mb-2 text-muted">Add1: {stddata1.add1}</h6>
    <h6 className="card-subtitle mb-2 text-muted">Add2: {stddata1.add2}</h6>
    <h6 className="card-subtitle mb-2 text-muted">Country: {stddata1.selectedCountry}</h6>
    <h6 className="card-subtitle mb-2 text-muted">State: {stddata1.selectedState}</h6>
    <h6 className="card-subtitle mb-2 text-muted">City: {stddata1.selectedCity}</h6>
    <h6 className="card-subtitle mb-2 text-muted">Zip-Code: {stddata1.zip}</h6>
    <Link className='btn btn-danger' to="/">Back to List</Link>
    
  </div>
</div>

    </div>
  );
}
