import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

let buttonStyle = {
background: 'lightblue',
  border: 'none',
  padding: '10px 20px',
  color:'white'
}

const News = ({title,description,link,date,image}) => {

    const handleSave= (title,description,link,date,image) => {
        console.log(title+description+link+date+image)

            
             let databody = {
                 "title": title,
                 "description": description,
                 "link": link,
                 "image": image,
                 "date": date
             }
         
             try{
             fetch('/postData', {
                     method: 'POST',
                     body: JSON.stringify(databody),
                     headers: {
                         'Content-Type': 'application/json'
                     },
                 })
                 .then(res => res.json())
                 .then(data => console.log(data));
                 alert("Saved Successful");
                }
                catch(e){
                 alert("Saved Unsuccessful");
                }
    }


    return(

        <div class="row m-5">
        <div class="col-sm-1.5 "> 
        <img height="200" width="200" src={image} alt=""/>
        </div>
         <div class="col-sm-9"> 
         <h4>{title}</h4>
         <p>{description}</p>
         <a href={link} class="link" role="button" >{link}</a>
         <p>{date}</p>
         <button style={buttonStyle} className="save-button" onClick={() => handleSave(title,description,link,date,image)} type="submit">Save</button>
         </div>
         </div>
        
    );

}



export default News;