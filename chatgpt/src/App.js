
import './App.css';
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.jpeg'
import gptImgLogo from './assets/chatgptLogo.svg'
import { sendMsgToOpenAI } from './openai'
import {useEffect, useRef, useState} from 'react'

function App() {
  const msgEnd = useRef(null);
  const [input , setInput] = useState("");
  const [messages, setMessages] = useState([{
    text:"Hy , I am chatGPT a new language model",
    isBot:true,

  }]);//whose message is this, bot or user
   // useEffect notices ... what you are focussing on changes
   // for every effect these dependencies present in dependency array changes then the function gets triggered
   useEffect(()=>{
    msgEnd.current.scrollIntoView();
   },[messages])
  const handleSend = async() =>{
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res = await sendMsgToOpenAI(input);
    console.log(res);
    //...messages it's a spread operator 
    //this spreads all the available things in this messsage variable
    setMessages([...messages,{
      text,
      isBot:false
    },{
      text:res,
      isBot:true
    }
   ])
  }
  const handleEnter = async(e) =>{
    if(e.key === 'Enter') await handleSend();
  }
  
  const handleQuery = async(e) =>{
    const text = e.target.value;
    setInput('');
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res = await sendMsgToOpenAI(input);
    console.log(res);
    setMessages([...messages,{
      text,
      isBot:false
    },{
      text:res,
      isBot:true
    }
   ])
  }

  return (
    <div className="App">
        <div className="sidebar">
           <div className="upperSide">
              <div className="upperSideTop">
                <img src={gptLogo} alt ="" className="logo" /> <span className="brand"> ChatGPT</span>
              </div>
              <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt ="" className="addBtn" />New Chat</button>
              <div className='upperSideBottom'>
                 <button className='query' onClick={handleQuery} value={"What is programming ?"}>
                   <img src={msgIcon} alt ="" className="queryImg" />
                   What is programming ?
                 </button>
                 <button className='query' onClick={handleQuery}  value={"How to use an API?"}>
                   <img src={msgIcon} alt ="" className="queryImg"/>
                   How to use an API?
                 </button>
              </div>
           </div>
           <div className="lowerSide">
            <div className='listItems'><img src={home} alt ="" className="listItemsImg" />Home</div>
            <div className='listItems'><img src={saved} alt ="" className="listItemsImg" />Saved</div>
            <div className='listItems'><img src={rocket} alt ="" className="listItemsImg" />Upgrade to pro</div>
           </div>
        </div>
        <div className="main">
           <div className='chats'>
             {messages.map((message,i)=>
                <div key={i} className={message.isBot?"chat bot":"chat"}>
                 <img className="chatImg" src={message.isBot? gptImgLogo : userIcon} alt=''/><p  className='txt'>{message.text}</p>
                </div>
             )}
             <div ref = {msgEnd} />
           </div>
           <div className='chatFooter'>
             <div className='inp'>
              <input type='text' placeholder='what is the distance of sun from earth' value = {input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className='send' onClick={handleSend}><img src={sendBtn} alt=""/></button>
             </div>
             <p>ChatGPT may produce incorrect results</p>
           </div>
        </div>
    </div>
  );
}

export default App;
