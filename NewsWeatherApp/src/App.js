import React,{useEffect,useState} from 'react';
import NewsROW from './newsRow';
import MyNewsROW from './mynewsRow';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";



const App = () => {

  return (

<Router>
<div>
  <nav class="navbart">
    <ul>
    <li className="title-name">
        <a>Malaysia News And Weather</a>
      </li>
      <li>
        <Link to="/">Malaysia News</Link>
      </li>
      <li>
        <Link to="/MyNews">My News</Link>
      </li>
      <li>
        <Link to="/Weather">Malaysia Weather Check</Link>
      </li>
     
    </ul>
  </nav>

  <Switch>
    <Route exact path="/MyNews">
      <MyNews />
    </Route>
    <Route exact path="/Weather">
      <Weather />
    </Route>
    <Route exact path='/EditNews/:id'>
      <EditNews />
    </Route>
    <Route path="/">
      <MalaysiaNews />
    </Route>
  </Switch>
</div>
</Router>


  );
};

function MalaysiaNews() {
  const[news,setNews] = useState([]);
  const[search,setSearch] = useState('');
  const[query, setQuery] = useState('');
  
  //run one request
  useEffect( () => {
   getNews();
  } , [query]);
  
  const getNews = async () => {
    const response = await fetch (`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=my&category=${query}&apiKey=c2769f6053e545e7a0b98aaeb72a38ab`);
    const data = await response.json();
    setNews(data.articles);
    console.log(data.articles);
  };
  
  const updateSearch = e =>{
    setSearch(e.target.value);
  }
  
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">

     <form onSubmit={getSearch} className="search-form">
      <select 
      className="search-selection" 
      type="text" 
      value={search} 
      onChange={updateSearch}>
      <option value="business">Business</option>
      <option value="entertainment">Entertainment</option>
      <option value="science">Science</option>
      <option value="health">Health</option>
      <option value="sports">Sports</option>
      <option value="technology">Technology</option>
      </select>
 
      <button className="search-button" type="submit">Search</button>

     </form>

    <div className="Enews">
    {news.map(news => (
      <NewsROW
      key = {news.title}
      title={news.title} 
      description={news.description}
      link={news.url}
      date={news.publishedAt}
      image={news.urlToImage}/>
    ))}
    </div>
    </div>
  );
}

function MyNews() {

  const[news,setNews] = useState([]);
  
  //run one request
  useEffect( () => {
   getNews();
  } , []);
  
  const getNews = async () => {
    const response = await fetch('/getData')
    const data = await response.json();
    setNews(data);
    console.log(data);
  };

  return (
    <div className="MyNews">
    {news.map(news => (
      <MyNewsROW
      key={news._id}
      id={news._id}
      title={news.title} 
      description={news.description}
      link={news.link}
      date={news.date}
      image={news.image}
      />
    ))
    }
    </div>
  );
}

function EditNews(){
  const[news,setNews] = useState([]);
  const[title,setTitle] = useState('');
  const[description,setDescription] = useState('');

  var url = window.location.pathname
  var last = url.split("/")
  //run one request

  useEffect( () => {
    getNews();
   } , []);

  const getNews = async () => {
    const response = await fetch('/getData/'+last[2] )
    const data = await response.json();
    setNews(data)
    setTitle(data.title)
    setDescription(data.description)
    console.log(data);

  };
  
  const updateTitle= e =>{
    setTitle(e.target.value);
  }
  const updateDescription= a =>{
    setDescription(a.target.value);
  }
  
  const getUpdate = e => {
    let databody = {
      "title": title,
      "description": description
    }

   try{
  fetch('/update/'+last[2], {
          method: 'PATCH',
          body: JSON.stringify(databody),
          headers: {
              'Content-Type': 'application/json'
          },
      })
      .then(res => res.json())
      .then(data => console.log(data));
      alert("Update Successful");
    }
    catch(e){
      alert("Update Unsuccessful");
    }
   
  }
  
  return (
    <div className="EditNews">
    <p>.</p>

    <form onSubmit={getUpdate} className="edit-form">

    <img  height="200" width="200" src={news.image} alt=""/>
    
      <label class="col-sm-12">Title :</label>
      
      <textarea rows = "5" cols = "60"  class="col-sm-12" type="text"
      className="text_box_title" 
      type="text" 
      value={title} 
      
      onChange={updateTitle}>
      </textarea>
     
      
      <label class="col-sm-12">Description :</label>
     
      <textarea rows = "5" cols = "60"  class="col-sm-12" type="text"
      className="text_box_des" 
      type="text" 
     
      value={description} 
      onChange={updateDescription}>
      </textarea>

      <br></br>
      
      <button class="col-sm-12" className="update-button" type="submit">Update</button>
     
     </form>
  
    </div>
  );

}

function Weather() {

  const[weather,setWeather] = useState([]);
  const[weather2,setWeather2] = useState([]);
  const[search,setSearch] = useState('');
  const[query, setQuery] = useState('Penang');

  //run one request
  useEffect( () => {
   getWeather();
  } , [query]);
  
    
  const updateSearch = e =>{
    setSearch(e.target.value);
  }
  
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }


  const getWeather = async () => {
    const response = await fetch(`https://openweathermap.org/data/2.5/weather?q=${query}&appid=b6907d289e10d714a6e88b30761fae22`)
    const data = await response.json();
    setWeather(data.main);
    setWeather2(data)
    console.log(data);
  };

  return (
    <div className="Weather">
      <form onSubmit={getSearch} className="search-form">
      <select 
      className="search-selection" 
      type="text" 
      value={search} 
      onChange={updateSearch}>
      <option value="Penang">Penang</option>
      <option value="Kuala%20Lumpur">Kuala Lumpur</option>
      <option value="Johor">Johor</option>
      <option value="Alor%20Setar">Alor Star</option>
      <option value="Kelantan">Kelantan</option>
      <option value="Seremban">Seremban</option>
      <option value="Kuantan">Kuantan</option>
      <option value="Ipoh">Ipoh</option>
      <option value="Perlis">Perlis</option>
      <option value="Sabah">Sabah</option>
      <option value="Sarawak">Sarawak</option>
      <option value="Selangor">Selangor</option>
      <option value="Terengganu">Terengganu</option>
      <option value="Putrajaya">Putrajaya</option>
      </select>
      <button className="search-button" type="submit">Search</button>
     </form>

     <div className="display-container">
    <div className="display-weather">
  <h2 class="weather-title">{weather2.name}</h2>
  <h2>------------------------------------</h2>
    <p>Current Temperature : {weather.temp} °C</p>
    <p>Maximum Temperature : {weather.temp_max} °C</p>
     <p>Minimum Temperature :{weather.temp_min} °C</p>
     <p>Humidity : {weather.humidity} %</p>
     </div>
     </div>
    </div>
  );
}

export default App;
