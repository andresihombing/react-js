import React from 'react';
import logo from './logo.svg';
import styles from './App.css';
import Resource from './component/network/resource'

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      confirmed : '',
      recovered : '',
      deaths : ''

    }
  }

  componentDidMount = async () => {
    this.getData();              
  }  

  getData = async () => {
    try{                    
        Resource.global()        
          .then((res) => {                                 
            console.log(res.recovered) 
            this.setState({
              confirmed : res.confirmed.value,
              recovered: res.recovered.value,
              deaths : res.deaths.value
            })
          })
          .catch((err) => {                                                                                          
              console.log(err)
          })        
    } catch (error) {            
        console.log(error)
        console.log('AsyncStorage error: ' + error.message);
    }
  }

  render(){
    return (
      <div className="App">      
        <header className="App-header">        
          <div class = "container">
            <form class = "example">        
              <input type="text" placeholder="Pencarian Berdasarkan Negara . . ." />
              <button type="submit"><i class="fa fa-search"></i></button>
            </form>
            <div class = "row">
              {/* <div class = "col-md-6"> */}
              <div class = 'pull-left'>
                <h2>Kasus Global</h2>
              </div>
              {/* </div> */}
            </div>          
          
            <div class = "col-md-4">
              <div class="panel panel-warning">
                <div class="panel-heading">
                  <h4>Terkonfirmasi</h4>
                </div>
                <div class="panel-heading">{this.state.confirmed}</div>
              </div>
            </div>
            <div class = "col-md-4">
              <div class="panel panel-success">
              < div class="panel-heading">
                  <h4>Sembuh</h4>
                </div>
                <div class="panel-heading">{this.state.recovered}</div>
              </div>
            </div>
            <div class = "col-md-4">
              <div class="panel panel-danger">
                <div class="panel-heading">
                  <h4>Meninggal</h4>
                </div>
                <div class="panel-heading">{this.state.deaths}</div>
              </div>
            </div>          
          </div>
        </header>
      </div>
    );
  }
}

export default App;
