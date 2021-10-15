import React from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components';

import './App.css';

function App() {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route exact path='/'>
                                <Homepage />
                            </Route>
                            <Route path='/exchanges'>
                                <Exchanges />
                            </Route>
                            <Route path='/cryptocurrencies'>
                                <Cryptocurrencies />
                            </Route>
                            <Route path='/crypto/:coinId'>
                                <CryptoDetails />
                            </Route>
                            <Route path='/news'>
                                <News />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{ color: '#fff', textAlign: 'center' }}>
                        Cryptoverse <br />
                        Al rights reserved
                    </Typography.Title>
                    <Space>
                        <NavLink to='/home'>Home</NavLink>
                        <NavLink to='/exchanges'>Exchanges</NavLink>
                        <NavLink to='/news'>News</NavLink>
                    </Space>
                </div>
            </div>
        </div>

    );
}

export default App;
