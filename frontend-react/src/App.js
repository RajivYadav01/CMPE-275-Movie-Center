import React, { Component } from 'react';
import Navbar from './component/Navbar';
import Home from './component/Home';
import TopTen from './component/TopTen';
import AddMovie from './component/addMovie';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        topTen : [
          {
            "title": "deadpool-1",
            "genre": "action",
            "studio_name": "Universal Studios",
            "synopsis":"Marvel's action movie",
            "image_url": "ksdbckabcab",
            "youtube_url": "kbcisdbidbs",
            "actorsList": [
                    {"name":"Venkatesh"},
                  {"name":"Warner"}
                ],
            "actressList": [
                  {"name":"alexia"},
                  {"name":"julia"},
                  {"name": "sandra"}
                ],
            "director":"Rajiv",
            "country": "United States of America",
            "mpaa_rating": "G",
            "availability_type": "Free",
            "price": 10.00
            
          },
          {
            "title": "deadpool - 2",
            "genre": "action",
            "studio_name": "Universal Studios",
            "synopsis":"Marvel's action movie",
            "image_url": "ksdbckabcab",
            "youtube_url": "kbcisdbidbs",
            "actorsList": [
                    {"name":"Venkatesh"},
                  {"name":"Warner"}
                ],
            "actressList": [
                  {"name":"alexia"},
                  {"name":"julia"},
                  {"name": "sandra"}
                ],
            "director":"Rajiv",
            "country": "United States of America",
            "mpaa_rating": "G",
            "availability_type": "Free",
            "price": 10.00
            
          },
          {
            "title": "deadpool - 3",
            "genre": "action",
            "studio_name": "Universal Studios",
            "synopsis":"Marvel's action movie",
            "image_url": "ksdbckabcab",
            "youtube_url": "kbcisdbidbs",
            "actorsList": [
                    {"name":"Venkatesh"},
                  {"name":"Warner"}
                ],
            "actressList": [
                  {"name":"alexia"},
                  {"name":"julia"},
                  {"name": "sandra"}
                ],
            "director":"Rajiv",
            "country": "United States of America",
            "mpaa_rating": "G",
            "availability_type": "Free",
            "price": 10.00
            
          },
          {
            "title": "deadpool - 4",
            "genre": "action",
            "studio_name": "Universal Studios",
            "synopsis":"Marvel's action movie",
            "image_url": "ksdbckabcab",
            "youtube_url": "kbcisdbidbs",
            "actorsList": [
                    {"name":"Venkatesh"},
                  {"name":"Warner"}
                ],
            "actressList": [
                  {"name":"alexia"},
                  {"name":"julia"},
                  {"name": "sandra"}
                ],
            "director":"Rajiv",
            "country": "United States of America",
            "mpaa_rating": "G",
            "availability_type": "Free",
            "price": 10.00
            
          }
        ]
    }
  }
  render() {
    let top = this.state.topTen.map(movie => {
        console.log("Movie Title : ", movie.title);
        return(
          <TopTen title = {movie.title}/>
        )
    })
    return (
      <div className="App">
        {/* <Navbar/>
        <Home/>

        <br/><br/>
        <h1 style = {{color : "white"}}>Top Ten Movies of the Week</h1>
          {top} */}
          <AddMovie/>
      </div>
    );
  }
}

export default App;
