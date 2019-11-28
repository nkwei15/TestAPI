import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

  let buttonEdit = {
    background: 'lightblue',
      border: 'none',
      padding: '10px 20px',
      color:'white'
    }

    let buttonDelete = {
        background: 'lightgreen',
          border: 'none',
          padding: '10px 20px',
          color:'white'
        }

const MyNews = ({id,title,description,link,date,image}) => {
    
  

    const handleEdit= (id) => {
        // console.log(id)
        
    }
    
    const handleDelete= (id,title,description,link,date,image) => {
        console.log(id,title+description+link+date+image)
       
            const requestOptions = {
              method: 'DELETE'
            };
            
            try{
            fetch("/delete/" + id, requestOptions).then((response) => {
              return response.json();
            }).then((result) => {
                window.location.reload();
              });

              alert("Deleted Successful");
            }
            catch(e){
                alert("Deleted Unsuccessful");
            }
    }

    

    return(
        <div>
      <p>.</p>
      <div class="row m-5">
      <div class="col-sm-1.5 "> 
      <img height="200" width="200" src={image} alt=""/>
      </div>
       <div class="col-sm-9"> 
       <h4>{title}</h4>
       <p>{description}</p>
       <a href={link} class="link" role="button" >{link}</a>
       <p>{date}</p>
       <button style={buttonEdit} onClick={() => handleEdit(id)} ><Link to={{ pathname: '/EditNews/'+id }}>Edit</Link></button>
       <button style={buttonDelete} className="delete-button" onClick={() => handleDelete(id,title,description,link,date,image)} type="submit">Delete</button>
       </div>
       </div>
       </div>
        
    );

}



export default MyNews;