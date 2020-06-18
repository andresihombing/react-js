import React from 'react'
import Resource from './component/network/resource'
import './App.css';
class Negara extends React.Component {
  constructor() {
    super();
    this.state = { 
      confirmed : '',
      recovered : '',
      deaths : '',
      lastUpdate : '',
      negara : '',
      data : []

    }
  }

  componentDidMount = async () => {            
    this.getData()
    this.getDataIndo()
  }  

  getData = async () => {     
    var data = this.props.location.state.detail    
    try{                    
        Resource.countries(data)        
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
              this.props.history.push('/')
              alert('Data pencarian tidak di temukan')
          })        
    } catch (error) {            
        console.log(error)
        console.log('AsyncStorage error: ' + error.message);
    }
  }

  getDataIndo = async () => {
    try{                    
        Resource.provinsi()        
          .then((res) => {                                 
            console.log(res.data)
            this.setState({
              data : res.data
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

  render() {    
    return(
      <div className="App">      
        <header className="Header-negara">        
          <div class = "container">            
            <div class = "row">
              {/* <div class = "col-md-6"> */}
              <div class = 'pull-left'>
                <h2>Kasus {this.props.location.state.detail}</h2>
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
        <div class = "container">
          <table class="table">
              <thead>
                <tr class = "active">
                  <td><b>Provinsi</b></td>
                  <td><b>Terkonfirmasi</b></td>
                  <td><b>Sembuh</b></td>
                  <td><b>Meninggal</b></td>
                </tr>
              </thead>
              <tbody>                     
                  {
                    this.props.location.state.detail == 'indonesia' ?
                    this.state.data.map(data => {
                        return (
                          <tr>
                              <td  class="info">{data.provinsi}</td>
                              <td class="warning"><span className="badge badge-primary">{data.kasusPosi}</span></td>
                              <td class="success"><span className="badge badge-danger">{data.kasusMeni}</span></td> 
                              <td class="danger"><span className="badge badge-success">{data.kasusSemb}</span></td>
                          </tr>
                        )
                    }) :
                    <tr>
                      <td colspan="4">
                        Tidak mendapatkan data
                      </td>
                    </tr>
                  } 
              </tbody>
            </table>
          </div>
      </div>
    )
  }
}
export default Negara