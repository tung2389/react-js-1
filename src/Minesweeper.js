import React from 'react';
import Board from './ClassBoard';
import './App.css';
let dx = [0,1,0,-1,1,1,-1,-1];
let dy = [-1,0,1,0,-1,1,1,-1];
function createBoard(n,m,val)
{
  let array = Array(n);
  for(let i=0;i<n;i++)
  {
    let subarray = Array(m).fill(val);
    array[i]=subarray;
  }
  return array;
}
class Minesweeper extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      n : 9,
      m : 9,
      isEnding:false,
      presquares:createBoard(9,9,null),
      squares:createBoard(9,9,null),
      status:createBoard(9,9,"btn"),
      start:false,
      hard:6,
      bopen:0
    }
    this.random=this.random.bind(this);
    this.scan=this.scan.bind(this);
    this.preprocess=this.preprocess.bind(this);
    this.clickevent=this.clickevent.bind(this);
    this.start=this.start.bind(this);
    this.clearAllBomb=this.clearAllBomb.bind(this);
    this.restart=this.restart.bind(this);
    this.changeCol=this.changeCol.bind(this);
    this.changeRow=this.changeRow.bind(this);
    this.changeDifficult=this.changeDifficult.bind(this);
    this.dfs=this.dfs.bind(this);
    this.make_dfs=this.make_dfs.bind(this);
  }
  make_dfs(x,y)
  {
    let n = this.state.n;
    let m = this.state.m;
    let visited = createBoard(n,m,0);
    let cnt = this.state.bopen;
    var obj = {t:cnt};
    this.dfs(x,y,visited,obj);
    this.setState({bopen:obj.t});
  }
  dfs(x,y,visited,obj)
  {
    let n = this.state.n;
    let m = this.state.m;
    let presquares = this.state.presquares.slice();
    let squares = this.state.squares.slice();
    let status = this.state.status.slice();
    if(status[x][y]==="btn" && presquares[x][y]!==10)
    {
      obj.t = obj.t + 1;
    }
    visited[x][y]=1;
    if(presquares[x][y]!==10)
    {
      if(presquares[x][y]!==0)
      squares[x][y]=presquares[x][y];
      status[x][y]="num"+presquares[x][y];
      this.setState({status:status});
      this.setState({squares:squares});
    }
    if(presquares[x][y]!==0)
    return;
    for(let i=0;i<8;i++)
    {
      let nx = x+dx[i];
      let ny = y+dy[i];
      if(nx >= 0 && ny >= 0 && nx < n && ny < m && visited[nx][ny]===0)
      {
        this.dfs(nx,ny,visited,obj);
      }
    }
  }
  random()
  {
    let squares=this.state.presquares.slice();
    let n = this.state.n;
    let m = this.state.m;
    let hard = this.state.hard;
    for(let i=0;i<Math.floor(n*m/hard);i++)
    {
    let x = Math.floor((Math.random() * (n-1)) + 0);
    let y = Math.floor((Math.random() * (m-1)) + 0);
    while(squares[x][y]!=null)
    {
      x = Math.floor((Math.random() * (n-1)) + 0);
      y = Math.floor((Math.random() * (m-1)) + 0);
    }
    squares[x][y]=10;
    }
    this.setState({presquares:squares});
  }
  scan(x,y)
  {
    let ans=0;
    let squares=this.state.presquares.slice();
    let n=this.state.n;
    let m=this.state.m;
    for(let i=0;i<8;i++)
    {
      let nx=x+dx[i];
      let ny=y+dy[i];
      if(nx >=0 && ny>=0 && nx<n && ny<m)
      {
      if(squares[nx][ny]===10)
      ans++;
      }
    }
    return ans;
  }
  preprocess()
  {
    let squares = this.state.presquares.slice();
    let n = this.state.n;
    let m = this.state.m;
    for(let i=0;i<n;i++)
    {
      for(let j=0;j<m;j++)
      {
        if(squares[i][j]===null)
        squares[i][j]=this.scan(i,j);
      }
    }
    this.setState({presquares:squares});
  }
  clearAllBomb()
  {
    let presquares = this.state.presquares.slice();
    let status = this.state.status.slice();
    let n = this.state.n;
    let m = this.state.m;
    for(let i=0;i<n;i++)
    {
      for(let j=0;j<m;j++)
      {
        if(presquares[i][j]===10)
        {
          status[i][j]="num10";
        }
      }
    }
    this.setState({status:status});
  }
  clickevent(e,x,y)
  {
    let status=this.state.status.slice();
    let squares=this.state.squares.slice();
    let presquares=this.state.presquares.slice();
    if(e.button === 0)
    {

      if(presquares[x][y]===0)
      {
        this.make_dfs(x,y);
        status[x][y]="num"+presquares[x][y];
      }
      else if(presquares[x][y]===10)
      {
        alert("You lost");
        this.clearAllBomb();
        this.setState({isEnding:true});
        status[x][y]="critical";
      }
      else if(presquares[x][y]!==10 && presquares[x][y]!==0)
      {
      squares[x][y]=presquares[x][y];
      this.setState({bopen:this.state.bopen+1});
      status[x][y]="num"+presquares[x][y];
      }
    }
    else if(e.button === 2)
    {
      if(status[x][y]==="btn")
      {
        status[x][y]="flag";
      }
      else if(status[x][y]==="flag")
      {
        status[x][y]="btn";
      }
    }
    this.setState({status:status});
    this.setState({squares:squares});
  }
  componentDidUpdate()
  {
    let n = this.state.n;
    let m = this.state.m;
    let hard = this.state.hard;
    let bopen = this.state.bopen;
    let val = n*m - Math.floor(n*m/hard);
    if(bopen >= val && !this.state.isEnding)
    {
      alert("You won!");
      this.clearAllBomb();
      this.setState({isEnding:true});
    }
  }
  start()
  {
    if(this.state.start===false)
    {
    this.random();
    this.preprocess();
    this.setState({start:true});
    }
  }
  restart()
  {
    let n = this.state.n;
    let m = this.state.m;
    let hard = this.state.hard;
    this.setState({
      n : n,
      m : m,
      isEnding:false,
      presquares:createBoard(n,m,null),
      squares:createBoard(n,m,null),
      status:createBoard(n,m,"btn"),
      start:false,
      hard:hard,
      bopen:0
    });
  }
  changeRow(e)
  {
    let nn=parseInt(e.target.value);
    let m=this.state.m;
    this.setState({n:e.target.value,
      presquares:createBoard(nn,m,null),
      squares:createBoard(nn,m,null),
      status:createBoard(nn,m,"btn")});
  }
  changeCol(e)
  {
    let nm=parseInt(e.target.value);
    let n=this.state.n;
    this.setState({m:nm,
      presquares:createBoard(n,nm,null),
      squares:createBoard(n,nm,null),
      status:createBoard(n,nm,"btn")});
  }
  changeDifficult(e)
  {
    let hard = parseInt(e.target.value);
    this.setState({hard:hard});
  }
  render(){
    window.addEventListener('contextmenu', function(evt) { 
      evt.preventDefault();
    }, false);
    let squares=this.state.squares.slice();
    let status=this.state.status.slice();
    let n = this.state.n;
    let m = this.state.m;
    return(
      <div align = 'center'>
      <h6>Minesweeper - Created by <a href="https://www.facebook.com/profile.php?id=100006826129122">Lưu Khánh Tùng</a> from HSGS </h6>
        <button onClick={this.start}>Start</button>
        <button onClick={this.restart}>Restart</button>
        <h6>Change number of row, default value is 9</h6><input onChange={this.changeRow} type = "range" min = {1} max={100} step={1} disabled={this.state.start} defaultValue={9}/>
        <h6>Change number of column, default value is 9</h6><input onChange={this.changeCol} type = "range" min = {1} max={100} step={1} disabled={this.state.start} defaultValue={9}/>
        <h6>Change the density of bomb, default value is 6(lower the density is, harder the game is)</h6>
        <input onChange={this.changeDifficult} type = "range" min = {2} max={m*n} step={1} disabled={this.state.start} defaultValue={6}/>
        <Board n={n} m={m} onMouseDown = {(e,x,y) => this.clickevent(e,x,y)} squares={squares} status={status} isEnding={this.state.isEnding} start={this.state.start} /> 
      </div>
    );
  }
}
export default Minesweeper;