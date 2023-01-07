import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import { Link } from 'react-router-dom';

export default function EmployListing() {
    const[stddata,stddatachange]=useState(null);
    const history=useHistory();
  const LoadView=(stdid)=>{
    history.push("/detail/"+stdid)
  }

  const LoadEdit=(stdid)=>{
    history.push("/edit/"+stdid)
  }

  const Deletefunction=(id)=>{
    if(window.confirm("Do you want to remove?")){
        fetch("http://localhost:8000/student/"+id,{
            method:"DELETE"
        }).then((res)=>{
          alert("Removed Sucessfully")
          window.location.reload();
            }).catch((err)=>{
              console.log(err.message)
            })
    }
  }



    useEffect(() => {
      fetch("http://localhost:8000/student").then((res)=>{
         return res.json();
      }).then((resp)=>{
         stddatachange(resp)
      }).catch((err)=>{
        console.log(err.message)
      })
      
    }, []);
    return (
        <div className='container my-3 '>
            <div className='card'>
                <div className='card-title mx-2 table-responsive-md'>
                    <h2>Student's List</h2>
                        <Link to="signup" className='btn btn-success mb-2'>Add New (+)</Link>
                </div>
                <div className='card-body'>
                    
                    <div className='table-responsive-md'>
                    <table className='table title-bordered'>
                        <thead className='bg-dark text-white'>

                            <tr>
                                <td>ID</td>
                                <td>F.Name</td>
                                <td>L.Name</td>
                                <td>Mo.</td>
                                <td>Email</td>
                                <td>Add1</td>
                                <td>Add2</td>
                                <td>Country</td>
                                <td>State</td>
                                <td>city</td>
                                <td>Zip</td>
                                <td>Active</td>
                            </tr>
                        </thead>
                        <tbody>
                              { stddata &&
                                stddata.map(item=>{
                                    return(<tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td>{item.mobil}</td>
                                        <td>{item.email}</td>
                                        <td>{item.add1}</td>
                                        <td>{item.add2}</td>
                                        <td>{item.selectedCountry}</td>
                                        <td>{item.selectedState}</td>
                                        <td>{item.selectedCity}</td>
                                        <td>{item.zip}</td>
                                        <td>
                                            <button onClick={()=>{LoadEdit(item.id)}} className='btn btn-success'>Edit</button>
                                        <button onClick={()=>{Deletefunction(item.id)}} className='btn btn-danger mx-1 my-1'>Delete</button>
                                        <button onClick={()=>{LoadView(item.id)}} className='btn btn-primary'>View</button>
                                        </td>
                                    </tr>)
                                })
                              }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>

        </div>
    );
}
