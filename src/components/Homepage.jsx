import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News, Loader } from '.';

const { Title } = Typography;

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    if(isFetching) return <Loader />;

    return (
        <>
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            <Row style={{marginLeft: 'auto'}}>
                <Col span={12}>
                    <Statistic title={<p className="statistics-heading">Total Cryptocurrencies</p>} value={globalStats.total} />
                </Col>
                <Col span={12} className="statistic-col">
                    <Statistic className="statistic-item" title={<p className="statistics-heading">Total Exchanges</p>} value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title={<p className="statistics-heading">Total Market Cap</p>} value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12} className="statistic-col">
                    <Statistic className="statistic-item" title={<p className="statistics-heading">Total 24h Volume</p>} value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title={<p className="statistics-heading">Total Markets</p>} value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className="home-heading-container">
                <Title level={3} className="home-title">Top 10 Cryptocurrencies in the world</Title>
                <Title level={5} className="show-more"><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={3} className="home-title">Latest Crypto News</Title>
                <Title level={5} className="show-more"><Link to='/news'>Show More</Link></Title>
            </div>
            <News simplified />
        </>
    );
};

export default Homepage;
