import './App.css';
import Dashboard from './pages/writer/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/auth/Login';
import {AuthProvider} from './context/AuthContext';
import Navbar from './components/Nav';
import Footer from './components/Footer';
import ArticleList from './pages/article/List';
import ArticleCreate from './pages/article/Create';
import ArticleEdit from './pages/article/Edit';
import Edited from './pages/editor/Edited';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar/>
                <Switch component={App}>
                    <Route path='/login' component={Login}/>
                    <Route path='/article/create' component={ArticleCreate}/>
                    <Route path='/article/:id' component={ArticleEdit}/>
                    <Route path='/article' component={ArticleList}/>
                    <Route path='/editor' component={Edited}/>
                    <Route path='/' component={Dashboard}/>
                </Switch>
                <Footer/>
            </AuthProvider>

        </Router>);
}

export default App;
