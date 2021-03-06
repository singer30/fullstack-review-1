import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // When a user types a github username into the text field, use jQuery's ajax
    // method to send a POST request to /repos/import (you'll have to fix the bug
    // in the Search Component first).
      $.ajax({
        url: 'http://localhost:1128/repos/import',
        type: 'POST',
        data: JSON.stringify({"username": `${term}`}),
        contentType: 'application/json',
        success : function(data) {
          console.log("CLIENT-SERVER POST Success!")
          console.log(data)
        },
        error : function(request, error) {
          console.error("Request: " + JSON.stringify(request));
        }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
