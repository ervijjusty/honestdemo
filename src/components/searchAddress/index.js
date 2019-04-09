import React, { Component } from 'react';
import {style} from './index.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios'; //for http request

class SearchAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {searchText:'',searchResponseText:'',errMsg:'' };

        this.handleChange = this.handleChange.bind(this);
        this.searchLocation = this.searchLocation.bind(this)
    }

    componentDidMount() {

    }

    //handled the value of input
    handleChange(e) {


        //set blank state if input was clear
        if(e.target.value.length === 0) {

            this.setState({errMsg:'',searchResponseText:''});

        }
        //dynamic set value of input into state for reuse the function and code
        this.setState({ [e.target.name] :e.target.value});

    
      }

      //function event when click on search button
      searchLocation = () => {

        if(this.state.searchText.trim().length > 0) {

            //send address data to geocose service and get the respose
            axios.get("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine="+this.state.searchText+"&maxLocations=1").then(response =>{

              var res = response.data;

              //check the length of data if found or not

                if(res.candidates.length > 0) {
                    //for now set the value of first address for demo if want to show suggation need to st full array in state
                    this.setState({errMsg:'',searchResponseText:res.candidates[0].address+": Location => \n "+res.candidates[0].location.x+", "+res.candidates[0].location.x });
               
                } else {
                    //set blank msg
                    this.setState({errMsg:'Not Found',searchResponseText:''})

                }


            })

        } else {

            //catch blank input when trigger the search button
            alert('Please enter address to Search');
            return false;
        }

      }
    render() {
        return (
            <div className={style}>

<Grid container spacing={24}>
        <Grid item xs>
        </Grid>
        <Grid item xs={6}>
        <form noValidate autoComplete="off">
        <TextField style={{width:"100%"}}
          id="standard-name"
          label="Name"
          name="searchText"
          value={this.state.searchText}
          onChange={this.handleChange}
          margin="normal"
        />
        
        </form>
        <p style={{color:'green'}}> {this.state.searchResponseText}</p>

        <p style={{color:'red'}}> {this.state.errMsg}</p>
               </Grid>
        <Grid item xs>
        <Button variant="contained" color="primary" style={{marginTop:25}} onClick={this.searchLocation}>
        Search
      </Button>
        </Grid>
      </Grid>
      
        
                    </div>
        );
    }
}

SearchAddress.propTypes = {

};

export default SearchAddress;
