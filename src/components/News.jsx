import React, { useState } from 'react';
import { Select, Typography, Card, Row, Col, Avatar } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/crytoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Loader } from './';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    if(!cryptoNews?.value) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {
                !simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={(value)=>setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {data?.data?.coins.map(coin => <Option value={coin.name}>{coin.name}</Option>)}
                        </Select>
                    </Col>
                )
            }
            {
                cryptoNews?.value?.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <div className="bg-image" style={{background:`url(${news?.image?.thumbnail?.contentUrl || demoImage}) no-repeat center/cover`}}>
                                <div className="overlay"></div>
                            </div>
                            <a href={news.url} target="_blank" rel="noopener noreferrer" style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <div className="news-image-container">
                                    <Title className="news-title" level={5}>{
                                        // news.name.length > 50 ?
                                        // <>{news.name.substring(0, 50)}<span>(click for more)</span></>
                                        // :
                                        news.name
                                    }</Title>
                                </div>
                                <p className="news-desc">
                                    {
                                        news.description.length > 100 ?
                                            <>{news.description.substring(0, 100)}... <span>(Read More)</span></>
                                            :
                                            news.description
                                    }
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text className="time">{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
};

export default News;
