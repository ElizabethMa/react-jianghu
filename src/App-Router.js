import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';




const NoMatch = ({match}) => (
    <div>
      <h2>{ JSON.stringify(match) }</h2>
    </div>
)

const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
      <h2>About</h2>
    </div>
)

const Components = ({match}) => (
    <div>
      <h2>Components - url: { JSON.stringify(match) }</h2>
      <h2>Components - url: { JSON.stringify(match.url) }</h2>
      <ul>
        <li>
          <Link to={ `${match.url}/link` }>Component-Link</Link>
        </li>
        <li>
          <Link to={ `${match.url}/switch` }>Component-Switch</Link>
        </li>
      </ul>
      <Route path={ `${match.url}/:componentId` } component={ Component } />
      <Route exact path={ match.url } render={ () => (
                                                   <h3>Please select a Component.</h3>
                                               ) } />
    </div>
)


const Component = ({match}) => (
    <div>
      <h2>Component - {match.params.componentId}</h2>
    </div>
)

const Topic = ({match}) => (
    <div>
      <h3>topicId : { match.params.topicId }</h3>
      <Route path={ `/topics/components` } component={Components}/>
    </div>
)

const Topics = ({match}) => (
    <div>
      <h2>Topics</h2>
        <hr/>
        <h2>url: { match.url }</h2>
      <ul>
        <li>
          <Link to={ `${match.url}/rendering` }>Rendering with React</Link>
        </li>
        <li>
          <Link to={ `${match.url}/components` }>Components</Link>
        </li>
        <li>
          <Link to={ `${match.url}/props-v-state` }>Props v. State</Link>
        </li>
      </ul>
      <Route path={ `${match.url}/:topicId` } component={ Topic } />
      <Route exact path={ match.url } render={ () => (
                                                   <h3>Please select a topic.</h3>
                                               ) } />
    </div>
)

const Head = () => (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/about" component={ About } />
        <Route path="/topics" component={ Topics } />
        <Route component={ NoMatch } />
      </Switch>
      <hr/>
      <h3>{ '注意上下的区别' }</h3>
      <h3>{ '<Switch> 只 精确匹配其中一个 <Route> ' }</h3>
      <h3>{ '<Route>s 匹配若干个 <Route> ' }</h3>
      <hr/>
    </div>
)

const ReactRouterExample = () => (
    <Router>
      <div>
        <h1>一级路由 Router 下只能有一个元素</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
        <hr/>
        <div >
            <Head></Head>
        </div>
        <div>
            <Route exact path="/" component={ Home } />
            <Route path="/about" component={ About } />
            <Route path="/topics" component={ Topics } />
        </div>
        
      </div>
    </Router>
)



export default ReactRouterExample;