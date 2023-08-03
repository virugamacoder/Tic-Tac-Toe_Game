import React, { useState } from "react";
import Icon from "./components/Icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Toadstofy Add

import { Card, Button, CardBody, Container, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// Bppstrap Add

const itemArray = new Array(9).fill("empty");
// Empty Box Create
// value all item is empty

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMsg, setWinMsg] = useState("");
  const [draw, setDraw] = useState(false);
  const [winLine,setWinLine] = useState([]);


  const reloadGame = () => {
      setIsCross(false);
      setDraw(false);
      setWinMsg("");
      setWinLine([]);
      itemArray.fill("empty",0,9);
  };

  const checkIsWinner = () => {
     if(itemArray[0] === itemArray[1] &&
       itemArray[0]===itemArray[2] && 
       itemArray[0]!=="empty"){
      setWinMsg(`${itemArray[0]}  Wins`);
      setWinLine([0,1,2]);

     }

     if(itemArray[3] === itemArray[4] &&
      itemArray[4]===itemArray[5] && 
      itemArray[3]!=="empty"){
        setWinMsg(`${itemArray[3]}  Wins`);
        setWinLine([3,4,5]);
      }

    
    if(itemArray[6] === itemArray[7] &&
      itemArray[6]===itemArray[8] && 
      itemArray[6]!=="empty"){
        setWinMsg(`${itemArray[6]}  Wins`);
        setWinLine([6,7,8]);
    }

    
    if(itemArray[0] === itemArray[3] &&
      itemArray[0]===itemArray[6] && 
      itemArray[0]!=="empty"){
        setWinMsg(`${itemArray[0]}  Wins`);
        setWinLine([0,3,6]);
    }

    
    if(itemArray[1] === itemArray[4] &&
      itemArray[1]===itemArray[7] && 
      itemArray[1]!=="empty"){
        setWinMsg(`${itemArray[1]}  Wins`);
        setWinLine([1,4,7]);
    }

    
    if(itemArray[2] === itemArray[5] &&
      itemArray[2]===itemArray[8] && 
      itemArray[2]!=="empty"){
        setWinMsg(`${itemArray[2]}  Wins`);
        setWinLine([2,5,8]);
    }

    
    if(itemArray[0] === itemArray[4] &&
      itemArray[0]===itemArray[8] && 
      itemArray[0]!=="empty"){
        setWinMsg(`${itemArray[0]}  Wins`);
        setWinLine([0,4,8]);
    }

    
    if(itemArray[2] === itemArray[4] &&
      itemArray[2]===itemArray[6] && 
      itemArray[2]!=="empty"){
        setWinMsg(`${itemArray[2]}  Wins`);
        setWinLine([2,4,6]);
    }
  };

  const drawGame = () =>{
    setDraw(itemArray.indexOf("empty")===-1);
  }
  const changeItem = itemNumber => {
      if(winMsg){
          return toast(winMsg,{type:"success"});
      }

      if(itemArray[itemNumber]==="empty"){
          itemArray[itemNumber] = isCross ? "cross":"circle";
          setIsCross(!isCross);
      }else{
        return toast("Already Filled",{type:"error"});
      }

      checkIsWinner();
      drawGame();
    }

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
           {

            draw ?
            (
              <div className="mb-2 mt-2">
                <h1 className="text-primary text-uppercase text-center">
                  Draw A Game
                </h1>
                <Button color="success" 
                block
                onClick={reloadGame}
                >Reset The Game</Button>
              </div>
            
            ):
            (
            winMsg ? (
              <div className="mb-2 mt-2">
                <h1 className="text-primary text-uppercase text-center">
                  {winMsg}
                </h1>
                <Button color="success" 
                block
                onClick={reloadGame}
                >Reset The Game</Button>
              </div>
            ) : 
            (
              <h1 className="text-warning text-center">
                  {isCross ? "Cross" : "Circle"} Turns
              </h1>
            )
            )
           }

          <div className="grid">
            {itemArray.map((item, index) => (

            
              <Card   color={
                  winLine.includes(index) ? "danger" : "warning"
                }  onClick={ () => changeItem(index) }  >
                
              <CardBody  className="box" >

                  <Icon name={item} /> 
                  
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
