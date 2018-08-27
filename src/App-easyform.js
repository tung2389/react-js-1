import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App_easyform extends React.Component{
  constructor(props)
  {
      super(props);
      this.state = {
          username: '',
          password: '',
          Description: '',
          Gender:0,
          language:"en",
          checkStatus: false,
      };
      this.handleChange=this.handleChange.bind(this);
      this.handleChangeSubmit=this.handleChangeSubmit.bind(this);
  }
  handleChange(e)
  {
      var name=e.target.name;
      var value=e.target.type==='checkbox' ? e.target.checked : e.target.value;
      this.setState({
          [name]:value
      });
  }
  handleChangeSubmit(e)
  {
      e.preventDefault();
      console.log(this.state);
  }
  render()
  {
    return(
        <div className="container">
            
            <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    
                    <div className="panel panel-primary">
                          <div className="panel-heading">
                                <h3 className="panel-title">Form</h3>
                          </div>
                          <div className="panel-body">
                                <form action="/information" method="get">
                                    <div className="form-group">
                                        <label for="">Username</label>
                                        <input type="text" className="form-control" id="" name="username"
                                        onChange={ this.handleChange }
                                        //value={this.state.username}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label for="">Password</label>
                                        <input type="password" className="form-control" id="" name="password"
                                        onChange={ this.handleChange }
                                        //value={this.state.password}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label for="">Mô tả</label>
                                        
                                        <textarea name="" className="form-control" rows="3" name="Description"
                                        onChange={ this.handleChange } 
                                        //value={this.state.Description}
                                        ></textarea>
                                        
                                    </div>
                                    <label> Gender </label>
                                    <select name="Gender"  className="form-control" value={this.state.Gender} onChange={this.handleChange}>
                                        <option value={0}>Female</option>
                                        <option value={1}>Male</option>
                                    </select>
                                    <br/>
                                    <label> language </label>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="language" value="vi" onChange={this.handleChange} checked={this.state.language==="vi"}/>
                                            Vietnamese
                                        </label><br/>
                                        <label>
                                            <input type="radio" name="language" value="en" onChange={this.handleChange} checked={this.state.language==="en"}/>
                                            English
                                        </label>
                                    </div>
                                    
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" value={this.state.checkStatus} name="checkStatus"
                                             onChange={this.handleChange}
                                             checked={this.state.checkStatus===true}/>
                                            Checkbox
                                        </label>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-primary">submit</button>
                                    <button type="reset" className="btn btn-default"> reset </button>
                                </form>
                                
                          </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
        );
    }
  
}

export default App_easyform;
