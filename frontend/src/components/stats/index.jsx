import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const Stats = (props) => {

    const { stats } = props;

    return (
        <>
            <Row gutter={16} style={{ marginTop: 30 }}>
                {
                    stats.map(item => {
                        return (
                            <Col key={item.id} span={8}>
                                <Card bordered={true} style={{ borderRadius: 15, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                                    <Statistic
                                        title={item.text}
                                        value={item.metric}
                                        formatter={value => value.toLocaleString()}
                                        precision={2}
                                        valueStyle={{
                                            color: item.color,
                                        }}
                                        /* prefix={item.icon} */
                                        suffix={item.suffix}
                                    />
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        </>
    );

};

export default Stats;