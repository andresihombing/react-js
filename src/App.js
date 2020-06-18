import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Resource from './component/network/resource'

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      confirmed : '',
      recovered : '',
      deaths : '',
      lastUpdate : '',
      search : ''

    }
  }

  componentDidMount = async () => {    
    this.getData();                  
  }  

  getData = async () => {
    try{                    
        Resource.global()        
          .then((res) => {                                 
            var lUpdate = res.lastUpdate
            var date = new Date(lUpdate)            
            this.setState({
              confirmed : res.confirmed.value,
              recovered: res.recovered.value,
              deaths : res.deaths.value,
              lastUpdate: date.toLocaleString("en-US")
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
  
  
  handleInputChange = () => {
    this.setState({
      search: this.search.value
    })
  }

  onSubmit = () => {
    // this.props.history.push('/negara')
    this.props.history.push({
      pathname: '/negara',
      search: `?=${this.state.search}`,
      state: { detail: this.state.search }
    })
  }

  render(){    
    return (
      <div className="App">      
        <header className="App-header">        
          <div class = "container">            
            <form class = "example">        
              <input
                type = "text"
                placeholder="Pencarian berdasarkan negara..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
              />
              <button 
              type="submit"
              onClick={this.onSubmit}
              ><i class="fa fa-search"></i></button>
            </form>
            <div class = "row">
              {/* <div class = "col-md-6"> */}
              <div class = 'pull-left'>
                <h2>Kasus Global</h2>
              </div>
              <div class = 'pull-right'>
              <h5>Terakhir diupdate : {this.state.lastUpdate}</h5>
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
    )
  }
}

export default App;

