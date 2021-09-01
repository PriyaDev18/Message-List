import react,{Component} from 'react'
import axios from 'axios'
import React from 'react'
import './msgStyle.css'
import SwipeableViews from 'react-swipeable-views';
import SwipeCall from './SwipeCall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'

class MessageList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            messages:[],
            loadingData:[],
        }
        this.appendData = this.appendData.bind(this)
    }
   
   componentDidMount(){
        document.addEventListener('scroll', this.trackScrolling);
        //get data
        axios.get('http://message-list.appspot.com/messages')
        .then(response=>{
            console.log(response);
            this.setState({
            messages:response.data.messages,
            loadingData:response.data.messages.slice(0,5)
            })
        })
        .catch(error=>{console.log(error)})
      
    }
    componentWillUnmount(){
        document.removeEventListener('scroll', this.trackScrolling);
    }
    //lazy load data append
    appendData = ()=>{      
        this.setState(prevState =>({
            loadingData:prevState.loadingData.concat(prevState.messages.slice(prevState.loadingData.length,prevState.loadingData.length+5))
        }))
    }
    trackScrolling = () => {
        
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.appendData()
        }
      };
      //delete item 
      handleRemoveItem = (id) => {  
          console.log(id)
        const list=[...this.state.loadingData];
        let index = list.findIndex(function(item, i){
            return item.id === id
          });
        list.splice(index,1);
        this.setState({loadingData:list})
        
    };
    
    render(){
        const {messages,loadingData}=this.state
        const imgPath="http://message-list.appspot.com/";
        return(
            <div>
               <div className="header">
              <h3><span className="iconBlock"><FontAwesomeIcon icon={faBars} /></span>Messages</h3>
               </div>
               <ol className="msgUl">
                 <SwipeCall msgs={loadingData} handleRemoveItem={this.handleRemoveItem}></SwipeCall>
              </ol>
          </div>
        )
       }
}
export default MessageList;