import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  Type as ListType,
  getYr,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const SwipeCall=(props)=>{
    const leadingActions = (id) => (
    <LeadingActions>
    <SwipeAction  >
     <div className='iconBlock'>
    <span >
     <FontAwesomeIcon icon={faEdit} />
     </span>
     </div>
     <div className="iconBlock" onClick={() =>{props.handleRemoveItem(id)}} >
   
     <span >
     <FontAwesomeIcon icon={faTrash} />
     </span>
     </div>
    </SwipeAction>
  </LeadingActions>
);
//yr calculation
const getYr=(updated)=>{
    var user_date = new Date(updated);
    var today_date = new Date();
    var diff_date =  today_date -user_date ;
    var num_years = diff_date/31536000000;
    return  Math.floor(num_years) }

const imgPath="http://message-list.appspot.com/";
console.log("SwipeCall"+ props.msgs);
return(
<SwipeableList fullSwipe={true}
        type={ListType.IOS}>
    {props.msgs.map((msg)=>{return(<SwipeableListItem key={msg.id} leadingActions={leadingActions(msg.id)} >

    <div  className="showLi" >
    <div className="img-block"><img src={imgPath+msg.author.photoUrl}></img></div>
    <div className="author-block"><h4>{msg.author.name}</h4><p>{getYr(msg.updated)} years ago</p>
    </div>
    <div className="msgblock"><p>{msg.content}</p></div></div>
    </SwipeableListItem>
    )})
    }
  </SwipeableList>)
}
export default SwipeCall;