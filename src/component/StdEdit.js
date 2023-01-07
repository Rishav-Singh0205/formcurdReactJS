import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';



export default function StdEdit() {
  const{stdid}=useParams();


  useEffect(() => {
  fetch("http://localhost:8000/student/"+stdid).then((res)=>{
       return res.json();
    }).then((resp)=>{
       setId(resp.id);
       setFname(resp.fname);
       setLname(resp.lname);
       setMobil(resp.mobil);
       setEmail(resp.email);
       setAdd1(resp.add1);
       setAdd2(resp.add2);
       setSelectedCountry(resp.selectedCountry);
       selectedState(resp.selectedState);
       selectedCity(resp.selectedCity);
       setZip(resp.zip);
    }).catch((err)=>{
      console.log(err.message)
    })
    
  }, []);


  const [id, setId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobil, setMobil] = useState("");
  const [email, setEmail] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [zip, setZip] = useState("");
  const[data,setData]=useState([])
  const[getCountry,setCountry1]=useState()
  const [getState, setState] = useState([]);
  const [selectState, setSelectState] = useState();
  const [cities, setCities] = useState([])
  const[selectedCountry,setSelectedCountry] =useState("");
  const[selectedState,setSelectedState]= useState("")
  const[selectedCity,setSelectedCity]= useState("")


  const history=useHistory()

  useEffect(() => {
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
    .then(res => setData(res.data))
    .catch(err => console.log(err) )
  }, []);

  const country= [...new Set(data.map(item=> item.country))];
  console.log(country)
  country.sort();

  const handleCountry = (e) => {
    setSelectedCountry(e.target.value)
    let states = data.filter(state => state.country === e.target.value);
    //console.log("target",e.target.value)
    states = [...new Set(states.map(item => item.subcountry))]
    states.sort();
    setState(states);

  }
  const hamdleState = (e) => {
    setSelectedState(e.target.value)
    //console.log("state",e.target.value)
    let cities = data.filter(city => city.subcountry === e.target.value);
    cities.sort();
    console.log(cities)
    setCities(cities);
  }
  const handleCity=(e)=>{
    setSelectedCity(e.target.value);
  }



  const handlesubmit=(e)=>{
    e.preventDefault();
    const stddata={id,fname,lname,mobil,email,add1,add2,selectedCountry,selectedState,selectedCity,zip};

    fetch("http://localhost:8000/student/"+id,{
    method:"PUT",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(stddata)
}).then((res)=>{
  alert("Saves Sucessfully")
  history.push('/')
    }).catch((err)=>{
      console.log(err.message)
    })
  }
  return (
    <div className=' card container mt-2 w-50  '>
      <h2 className='my-3'>Fill the form</h2>
      <form onSubmit={handlesubmit}>
        <div className="row g-3">
        <div className="col">
            <label htmlFor="Id" className="form-label">ID</label>
            <input value={id} disabled="disabled" className="form-control"  aria-label="id"/>
          </div>
          <div className="col">
            <label htmlFor="Fname" className="form-label">First Name</label>
            <input required value={fname} onChange={e=>setFname(e.target.value)} type="text" className="form-control" placeholder="First name" aria-label="First name" minLength={5} />
          </div>
          <div className="col">
            <label htmlFor="lname" className="form-label">Last Name</label>
            <input required value={lname} onChange={e=>setLname(e.target.value)} type="text" className="form-control" placeholder="Last name" aria-label="Last name" minLength={5} />
          </div>
        </div>
        <div className="row g-3 my-3">
          <div className=" col">
            <label htmlFor="mobile" className="form-label">Mobile No.</label>
            <input required value={mobil} onChange={e=>setMobil(e.target.value)} type="text" className="form-control" id="mobile" name="number" aria-describedby="emailHelp" />
          </div>
          <div className="col">
            <label htmlFor="email" className="form-label">Email address</label>
            <input required value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address1" className="form-label"> Address 1</label>
          <input required value={add1} onChange={e=>setAdd1(e.target.value)} type="text" className="form-control" name='address' />
        </div>
        <div className="mb-3">
          <label htmlFor="address2" className="form-label"> Address 2</label>
          <input required value={add2} onChange={e=>setAdd2(e.target.value)} type="text" className="form-control" name='address' />
        </div>
        <div className="row g-3">
          <div className="col">
            <label htmlFor="conntry" className="form-label">Country</label>
            <select onChange={(e)=> handleCountry(e)}  type="text" className="form-control" aria-label="country">
            <option selected>--Select Country--</option>
              {country.map(items=> <option key={items} value={getCountry}>{items}</option>)}
            </select>
            {console.log("getcountry",getCountry)}
          </div>
          <div className="col">
            <label htmlFor="city" className="form-label">State</label>
            <select onChange={(e) => hamdleState(e)} type="text" className="form-control" aria-label="city" >
              <option selected>--Select State--</option>
              {getState.map(items => <option key={items} value={selectState}>{items}</option>)}
            </select>
          </div>
          <div className="col">
            <label htmlFor="country" className="form-label">City</label>
            <select onChange={(e)=> handleCity(e)} type="text" className="form-control" placeholder="city" aria-label="city">
            <option selected>--Select City--</option>
             {cities.map(items => <option key={items.name}>{items.name}</option>)}
            </select>
          </div>
          <div className="col">
            <label htmlFor="zepcode" className="form-label">Zip Code</label>
            <input required value={zip} onChange={e=>setZip(e.target.value)} type="text" className="form-control" placeholder="zipcode" aria-label="zip code" />
          </div>
        </div>

        <div className='col-lg-12 my-2'>
                              <div className='form-group'>
                                <button className='btn btn-success' type='submit'>Save</button>
                                <Link to="/" className='btn btn-danger mx-2'>Back</Link>

                             </div>
                            </div>
      </form>
    </div>

 
  );
}
