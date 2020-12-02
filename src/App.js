import React,{Component} from 'react';
import Axios from "axios";
import "./App.css";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    
  
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    marginLRight: theme.spacing.unit,
  }
 });
function TabContainer(props) {
  return (
    <Typography component="div" tyle={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class App extends Component {
  constructor(){
    super()

          this.state = {
            persons:[],
            name:'',
            inquiry:'',
            key:'',
            tagger:'',
            open:false,
            values:0
          }
        this.onChange =  this.onChange.bind(this)
        this.formsubmit = this.formsubmit.bind(this)
        this.textHandle =  this.textHandle.bind(this)
        this.qusSubmit =  this.qusSubmit.bind(this)
        this.keyHandle =  this.keyHandle.bind(this)
        this.getApi = this.getApi.bind(this)
        this.postTagger = this.postTagger.bind(this)
  }
  onChange(ev){
        this.setState({
          
            name: ev.target.value
        })
        console.log(ev.target.value)
    }
  textHandle(e){
    this.setState({
      inquiry:e.target.value
    })
    console.log(e.target.value)
  }
  keyHandle(e){
    this.setState({
      key:e.target.value
    })
  }
  postTagger(e){
    this.setState({
      tagger:e.target.value
    })
  }
  
  formsubmit(event){
    event.preventDefault();
   const data = this.state.name
   console.log("data",data)
   const people = []
    Axios.post('https://easydata.fostersoftwares.com/database_config/',data).then(res=>{
      console.log("response",res);
       people.push(
        res.data
      )
      console.log("key",people)
      this.setState({
        persons:people
      });
      this.setState({
        open:true
      })
    
    })
  }
  getApi(e){
    const api_key = this.state.key
    const postTagger = this.state.tagger
    
    fetch('http://easydata.fostersoftwares.com/tagger_config/', {
			method:"Post",
			headers:{
        "api-key":api_key,
				'content-type':'application/json'
			},
			body:postTagger
		}).then((result) =>{
			result.json().then((resp) =>{
				alert("Your request is successfull")
        console.log(resp.data)
			})
		})

    
  }
 
handleChange = (event, values) => {
    this.setState({ values });
  };
     handleClose = () => {
    this.setState({ open: false });
  }; 

 qusSubmit(e){
   const api_key = this.state.key
   const regis = {
     "inquiry":this.state.inquiry
   }
  // fetch('https://easydata.fostersoftwares.com/inquiry/', {
	// 		method:"Post",
	// 		headers:{
  //       "api-key":api_key,
	// 			'content-type':'application/json'
	// 		},
	// 		body:JSON.stringify(regis)
	// 	}).then((result) =>{
	// 		result.json().then((resp) =>{
	// 			alert("Your request is successfull")
  //       console.log(resp.data)
	// 		})
	// 	})//key-2e8d547e-716a-40ff-84ec-1a71ede7a303
const options = {
  headers: {'api-key': api_key}
};
   Axios.post('https://easydata.fostersoftwares.com/inquiry/',regis,options).then(res =>{
       console.log("Inquiry Response",res
       );

   })
  
  } 
   
 
  
  
  render(){
      const { classes } = this.props;
      const {values} = this.state;
  return (
    
    <div className="App">
    
    <AppBar position="static">
          <Tabs value={values} onChange={this.handleChange}>
            <Tab label="post" />
            <Tab label="Inquiry" />
            <Tab label="Post tagger" />
          </Tabs>
        </AppBar>
        {values === 0 && <TabContainer>
        <textarea className="texteArea" name="name" cols="50" rows="20" onChange={this.onChange} />
  <div className="button">	
    <Button variant="contained" color="primary" className={classes.button} onClick={this.formsubmit}>
        Upload
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
      <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        > 
         <DialogTitle id="max-width-dialog-title">Data Saved</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your data has been successfully saved to the server
          {
      this.state.persons.map(person =>
      <p key={person.key}> key:  {person.key} </p>
      )
          }

            </DialogContentText>
             </DialogContent>

             <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    
        
        
        </TabContainer>}
        {values === 1 && <TabContainer>
          <TextField
          id="filled-simple-start-adornment"
          onChange={this.textHandle}
          variant="filled"
          label="Any Queries?"
          
        />
        <TextField
          onChange={this.keyHandle}
          variant="filled"
          label="paste your key here"
          
        />
        <div>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.qusSubmit}>
        Send
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
    
        </div>
        
        </TabContainer>}
        {values === 2 && <TabContainer>
        <TextField
          onChange={this.keyHandle}
          variant="filled"
          label="paste your key here"
          
        />
        
        <TextField
          id="filled-simple-start-adornment"
          onChange={this.postTagger}
          variant="filled"
          label="paste your data here"
          
        />

          <Button variant="contained" color="primary" className={classes.button} onClick={this.getApi}>
          Send
          <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        
        </TabContainer>}

   

		
    
    </div>
    
  );
  
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default  withStyles(styles) (App);
