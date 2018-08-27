import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {rand} from "./random";
const n=16;
const m=28;
let defx=rand(1,14);
let defy=rand(1,26);
let board = [],tankx = [],tanky = [],enemy = [],ebullet = [],isEbulletOnBoard = [];
let x1=rand(1,14),x2=rand(1,14),y1=rand(1,26),y2=rand(1,26),dir1=rand(1,4),dir2=rand(1,4);
while(x1===defx) x1=rand(1,14);while(x2===defx||x2===x1) x2=rand(1,14);
enemy.push({x:x1,y:y1,dir:dir1,health:3},{x:x2,y:y2,dir:dir2,health:3});
ebullet.push({x:99,y:99,dir:99},{x:999,y:999,dir:999});
tankx.push(defx);
tanky.push(defy);
let defbulx=9999;
let defbuly=9999;
for(let i=0;i<enemy.length;i++)
{
    isEbulletOnBoard[i]=false;
}
for(let i=0;i<n;i++)
{
  let subarray = [];
  for(let j=0;j<m;j++)
  {
      let ok=true;
      for(let k=0;k<enemy.length;k++)
      {
          if(i===enemy[k].x && j===enemy[k].y)
          {
              ok=false;
              subarray.push(<button className={"enemy" + enemy[k].dir} />);
          }
      }
  if(ok===true)
  {
  if(i===defx && j===defy)
  {
  subarray.push(<button className="tank1" />);
  }
  else
  {
  if(i===n-1||i===0)
  subarray.push(<button className="squareline3" />);
  else if(j===m-1||j===0)
  subarray.push(<button className="squareline2" />);
  else
  subarray.push(<button className="square22" />);
  }
  }
}
board.push(<div className="board-row">{subarray}</div>)
}
class App_tank extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            dir:1,
            boardtank:board,
            isBulletOnBoard:false,
            dirbullet:9,
            isEbulletOnBoard:false,
            health:3,
        };
        this.changedir=this.changedir.bind(this);
        this.shoot=this.shoot.bind(this);
        this.bulletfly=this.bulletfly.bind(this);
        this.isEnemy=this.isEnemy.bind(this);
        this.EnemyMove=this.EnemyMove.bind(this);
        this.update=this.update.bind(this);
        this.EnemyShoot=this.EnemyShoot.bind(this);
        this.EbulletFly=this.EbulletFly.bind(this);
        this.check=this.check.bind(this);
        this.isMe=this.isMe.bind(this);
        this.bulletOnTank=this.bulletOnTank.bind(this);
        this.shootEnemy=this.shootEnemy.bind(this);
        this.restart=this.restart.bind(this);
    }
    update()
    {
        let boardtank = [];
        for(let i=0;i<n;i++)
        {
            let subarray = [];
            for(let j=0;j<m;j++)
            {
            let ok1=true;
            let ok2=true;
            for(let k=0;k<ebullet.length;k++)
            {
                if(i===ebullet[k].x && j===ebullet[k].y)
                {
                    ok2=false;
                    subarray.push(<button className={"enemybullet" + ebullet[k].dir} />);
                }
            }
            if(ok2===true)
            {
                for(let k=0;k<enemy.length;k++)
                {
                if(i===enemy[k].x && j===enemy[k].y)
                {
                ok1=false;
                subarray.push(<button className={"enemy" + enemy[k].dir} />);
                }
                }
                if(ok1===true)
                {
                if(i===defbulx && j===defbuly)
                {
                    subarray.push(<button className={"bullet" + this.state.dirbullet} />);
                }
                else if(i===defx && j===defy)
                {
                   subarray.push(<button className={"tank" + this.state.dir} />);
                }
                else
                {
                    if(i===n-1||i===0)
                    subarray.push(<button className="squareline3" />);
                    else if(j===m-1||j===0)
                    subarray.push(<button className="squareline2" />);
                    else
                    subarray.push(<button className="square22" />);
                }
            }
        }
        } 
            boardtank.push(<div className="board-row">{subarray}</div>);
        }
        this.setState({boardtank:boardtank});
    }
    restart()
    {
        alert("the game has been restarted");
        defx=rand(1,14);
        defy=rand(1,26);
        board = [],tankx = [],tanky = [],enemy = [],ebullet = [],isEbulletOnBoard = [];
        x1=rand(1,14),x2=rand(1,14),y1=rand(1,26),y2=rand(1,26),dir1=rand(1,4),dir2=rand(1,4);
        while(x1===defx) x1=rand(1,14);while(x2===defx||x2===x1) x2=rand(1,14);
        enemy.push({x:x1,y:y1,dir:dir1,health:3},{x:x2,y:y2,dir:dir2,health:3});
        ebullet.push({x:99,y:99,dir:99},{x:999,y:999,dir:999});
        tankx.push(defx);
        tanky.push(defy);
        defbulx=9999;
        defbuly=9999;
        this.setState({health:3});
        for(let i=0;i<2;i++)
        {
            isEbulletOnBoard[i]=false;
        }
        clearInterval(this.interval);
        this.setState({isBulletOnBoard:false});
        clearInterval(this.fly1);
        clearInterval(this.fly2);
        clearInterval(this.enemymove);
        this.enemymove=setInterval(this.EnemyMove,1000);
        this.update();
    }
    shootEnemy()
    {
        for(let i=0;i<enemy.length;i++)
        {
            if(enemy[i].x===defbulx && enemy[i].y===defbuly)
            {
                if(enemy[i].health===1)
                {
                    if(enemy.length===1)
                    {
                    enemy.splice(i,1);
                    this.restart();
                    }
                    else
                    {
                    enemy.splice(i,1);
                    if(i===0)
                    {
                    ebullet[i].x=999;
                    ebullet[i].y=999;
                    clearInterval(this.fly1);
                    }
                    else
                    {
                    ebullet[i].x=999;
                    ebullet[i].y=999;
                    clearInterval(this.fly2);
                    }
                    defbulx=999;
                    defbuly=999;
                    this.update();
                    clearInterval(this.interval);
                    this.setState({isBulletOnBoard:false});
                }
                }
                else
                {
                    enemy[i].health=enemy[i].health-1;
                    defbulx=999;
                    defbuly=999;
                    this.update();
                    clearInterval(this.interval);
                    this.setState({isBulletOnBoard:false});
                }
            }
        }
    }
    bulletOnTank()
    {
        for(let i=0;i<2;i++)
        {
            if(ebullet[i].x===defx && ebullet[i].y===defy)
            {
                if(i===0)
                clearInterval(this.fly1);
                else
                clearInterval(this.fly2);
                isEbulletOnBoard[i]=false;
                ebullet[i].x=99;
                ebullet[i].y=99;
                let newhealth=this.state.health-1;
                if(newhealth===0)
                {
                    alert('YOU LOSE');
                    this.restart();
                }
                else
                this.setState({health:newhealth});
            }
        }
    }
    check()
    {
        for(let i=0;i<2;i++)
        {
            if(isEbulletOnBoard[i]===true)
            return false;
        }
        return true;
    }
    EbulletFly(i)
    {
            if(ebullet[i].dir===1)
            {
                if(ebullet[i].x<=1)
                {
                    ebullet[i].x=99;
                    isEbulletOnBoard[i]=false;
                    if(i===0)
                    clearInterval(this.fly1);
                    else
                    clearInterval(this.fly2);
                }
                else
                {
                    ebullet[i].x=ebullet[i].x-1;
                }
            }
            else if(ebullet[i].dir===2)
            {
                if(ebullet[i].y>=m-2)
                {
                    ebullet[i].y=99;
                    isEbulletOnBoard[i]=false;
                    if(i===0)
                    clearInterval(this.fly1);
                    else
                    clearInterval(this.fly2);
                }
                else
                {
                    ebullet[i].y=ebullet[i].y+1;
                }
            }
            else if(ebullet[i].dir===3)
            {
                if(ebullet[i].x>=n-2)
                {
                    ebullet[i].x=99;
                    isEbulletOnBoard[i]=false;
                    if(i===0)
                    clearInterval(this.fly1);
                    else
                    clearInterval(this.fly2);
                }
                else
                {
                    ebullet[i].x=ebullet[i].x+1;
                }
            }
            else if(ebullet[i].dir===4)
            {
                if(ebullet[i].y<=1)
                {
                    ebullet[i].y=99;
                    isEbulletOnBoard[i]=false;
                    if(i===0)
                    clearInterval(this.fly1);
                    else
                    clearInterval(this.fly2);
                }
                else
                {
                    ebullet[i].y=ebullet[i].y-1;
                }
            }
            this.bulletOnTank();
    this.update();
    }
    EnemyShoot()
    {
        let ok = [];
        for(let i=0;i<2;i++)
        {
            ok[i]=true;
        }
        if(this.check()===true)
        {
        for(let i=0;i<enemy.length;i++)
        {
            if(enemy[i].dir===1)
            {
                if(enemy[i].x>1)
                {
                    ebullet[i].x=enemy[i].x-1;
                    ebullet[i].y=enemy[i].y;
                    ebullet[i].dir=1;
                }
                else
                ok[i]=false;
            }
            else if(enemy[i].dir===2)
            {
                if(enemy[i].y<m-2)
                {
                    ebullet[i].x=enemy[i].x;
                    ebullet[i].y=enemy[i].y+1;
                    ebullet[i].dir=2;
                }
                else
                ok[i]=false;
            }
            else if(enemy[i].dir===3)
            {
                if(enemy[i].x<n-2)
                {
                    ebullet[i].x=enemy[i].x+1;
                    ebullet[i].y=enemy[i].y;
                    ebullet[i].dir=3;
                }
                else
                ok[i]=false;
            }
            else if(enemy[i].dir===4)
            {
                if(enemy[i].y>1)
                {
                    ebullet[i].x=enemy[i].x;
                    ebullet[i].y=enemy[i].y-1;
                    ebullet[i].dir=4;
                }
                else 
                ok[i]=false;
            }
            if(ok[i]===true)
            isEbulletOnBoard[i]=true;
        }
        this.update();
        if(ok[0]===true)
        this.fly1=setInterval( () => {this.EbulletFly(0);},300);
        if(ok[1]===true)
        this.fly2=setInterval( () => {this.EbulletFly(1);},300);
        }
    }
    isMe(x,y)
    {
        if(x===defx && y===defy)
        return true;
        return false;
    }
    EnemyMove()
    {
        let choose = rand(0,2);
        if(choose===0)
        {
            for(let i=0;i<enemy.length;i++)
            {
                if(enemy[i].dir===1)
                {
                    if(enemy[i].x>1)
                    {
                    enemy[i].x=enemy[i].x-1;
                    if(this.isMe(enemy[i].x,enemy[i].y))
                    enemy[i].x=enemy[i].x+1;
                    }
                }
                else if(enemy[i].dir===2)
                {
                    if(enemy[i].y<m-2)
                    {
                    enemy[i].y=enemy[i].y+1;
                    if(this.isMe(enemy[i].x,enemy[i].y))
                    enemy[i].y=enemy[i].y-1;
                    }
                }
                else if(enemy[i].dir===3)
                {
                    if(enemy[i].x<n-2)
                    {
                    enemy[i].x=enemy[i].x+1;
                    if(this.isMe(enemy[i].x,enemy[i].y))
                    enemy[i].x=enemy[i].x-1;
                    }
                }
                else if(enemy[i].dir===4)
                {
                    if(enemy[i].y>1)
                    {
                    enemy[i].y=enemy[i].y-1;
                    if(this.isMe(enemy[i].x,enemy[i].y))
                    enemy[i].y=enemy[i].y+1;
                    }
                }
            }
        }
        else
        {
            for(let i=0;i<enemy.length;i++)
            {
                let predir=enemy[i].dir;
                while(enemy[i].dir===predir)
                enemy[i].dir=rand(1,4);
            }
        }
    this.shootEnemy();
    this.update();
    this.EnemyShoot();
    }
    isEnemy()
    {
        for(let i=0;i<enemy.length;i++)
        {
            if(defx===enemy[i].x && defy===enemy[i].y)
            return true;
        }
        return false;
    }
    bulletfly()
    {
        if(this.state.dirbullet===1)
        {
            if(defbulx<=1)
            {
                defbulx=9999;
                clearInterval(this.interval);
                this.setState({isBulletOnBoard:false});
            }
            else 
            {
                defbulx=defbulx-1;
            }
        }
        else if(this.state.dirbullet===2)
        {
            if(defbuly>=m-2)
            {
                defbuly=9999;
                clearInterval(this.interval);
                this.setState({isBulletOnBoard:false});
            }
            else
            {
                defbuly=defbuly+1;
            }
        }
        else if(this.state.dirbullet===3)
        {
            if(defbulx>=n-2)
            {
                defbulx=9999;
                clearInterval(this.interval);
                this.setState({isBulletOnBoard:false});
            }
            else
            {
                defbulx=defbulx+1;
            }
        }
        else if(this.state.dirbullet===4)
        {
            if(defbuly<=1)
            {
                defbuly=9999;
                clearInterval(this.interval);
                this.setState({isBulletOnBoard:false});
            }
            else
            {
                defbuly=defbuly-1;
            }
        }
        this.shootEnemy();
        this.update();
    }
    shoot()
    {
        if(this.state.isBulletOnBoard===false)
        {
        if(this.state.dir===1)
        {
            if(defx>1)
            {
                defbulx=defx-1;
                defbuly=defy;
                let newdir=this.state.dir;
                this.setState({dirbullet:newdir});
            }
        }
        else if(this.state.dir===2)
        {
            if(defy<m-2)
            {
                defbulx=defx;
                defbuly=defy+1;
                let newdir=this.state.dir;
                this.setState({dirbullet:newdir});
            }
        }
        else if(this.state.dir===3)
        {
            if(defx<n-2)
            {
                defbulx=defx+1;
                defbuly=defy;
                let newdir=this.state.dir;
                this.setState({dirbullet:newdir});
            }
        }
        else if(this.state.dir===4)
        {
            if(defy>1)
            {
                defbulx=defx;
                defbuly=defy-1;
                let newdir=this.state.dir;
                this.setState({dirbullet:newdir});
            }
        }
        if(defbulx>0 && defbuly>0 && defbulx<n-1 && defbuly<m-1)
        {
        this.interval=setInterval(this.bulletfly,300);
        this.update();
        this.setState({isBulletOnBoard:true});
        this.shootEnemy();
        }
    }
    }
    changedir(event)
    {
        if(event.keyCode===32)
        {
            if(!this.state.isBulletOnBoard)
            this.shoot();
        }
        else
        {
        if(event.keyCode===119)
        {
            if(this.state.dir!==1)
            {
                this.setState({dir:1});
            }
            else
            {
                if(defx>1)
                {
                defx=defx-1;
                if(this.isEnemy()===true)
                defx=defx+1;
                }
            }
        }
        else if(event.keyCode===100)
        {
            if(this.state.dir!==2)
            {
                this.setState({dir:2});
            }
            else
            {
                if(defy<m-2)
                {
                defy=defy+1;
                if(this.isEnemy()===true)
                defy=defy-1;
                }
            }
        }
        else if(event.keyCode===115)
        {
            if(this.state.dir!==3)
            {
                this.setState({dir:3});
            }
            else
            {
                if(defx<n-2)
                {
                defx=defx+1;
                if(this.isEnemy()===true)
                defx=defx-1;
                }
            }
        }
        else if(event.keyCode===97)
        {
            if(this.state.dir!==4)
            {
                this.setState({dir:4});
            }
            else
            {
                if(defy>1)
                {
                defy=defy-1;
                if(this.isEnemy()===true)
                defy=defy+1;
                }
            }
        }
        this.bulletOnTank();
        this.update();
    }
    }
    componentDidMount()
    {
        this.enemymove=setInterval(this.EnemyMove,1000);
    }
    render()
    {
    window.addEventListener("keypress",this.changedir,false);
    return (
        <div>
            <h1 align='center'>Health:{this.state.health}</h1>
            {this.state.boardtank}
        </div>
    );
  }
}
export default App_tank;
