// React
import { useState } from 'react';

// Tremor
import { Block, Flex, Metric } from '@tremor/react';
import { Callout, Title } from "@tremor/react";
import { Toggle, ToggleItem } from "@tremor/react";

// Ant Design
import { Button, Form, Input } from 'antd';
import { Card } from 'antd';
import { Table, Tooltip } from 'antd';
import { message, notification } from 'antd';

// Ant Design Icons 
import { SmileOutlined } from '@ant-design/icons';

// Heroicons
/* import {
    CheckIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid'; */

// MUI Icons
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BallotIcon from '@mui/icons-material/Ballot';
import DeleteIcon from '@mui/icons-material/Delete';

// Internal Components
import ScrapeFileUploader from '../FileUploader';

// Images
import sample_input from '../../assets/images/sample_input.JPG';


const WebScrapingAPI = () => {

    return (
        <>
            <Flex
                justifyContent='start'
                spaceX="space-x-2"
                truncate={false}
            >
                <img 
                    src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1.25,format=auto/https%3A%2F%2F451795160-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F9wbsYOleiAqS785aMtPp%252Ficon%252FSTxh9aZVEN9qsfxvPb2h%252Fsymbol-WS.png%3Falt%3Dmedia%26token%3D44492a64-4a8b-4232-851b-3408fc330efc" 
                    decoding='async'
                    width={50} 
                    height={50} 
                    style={{ marginTop: 5 }} 
                />
                <Metric>WebScrapingAPI</Metric>
            </Flex>
            <Card
                style={{ marginTop: 30 }}
                type="inner"
                title="API KEY"
            >
                <Input.Group compact>
                    <Input
                        id='apiKey'
                        placeholder='Enter your API KEY'
                    />
                </Input.Group>
            </Card>
            <Callout
                title="WebScrapingAPI is Required"
                text="This tool relies on a third-party API (https://www.webscrapingapi.com/) to scrape Amazon products without any restrictions. Create a free account
                and get your API key and paste it in the above input field."
                icon={undefined}
                color="red"
                height=""
                marginTop="mt-2"
            />
        </>
    );

}


const SignleScrapeForm = (props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [notifApi, notifContextHolder] = notification.useNotification();
    
    const data = [
        {
          ID: 1,
          ASIN: 'B0BCNKKZ91',
          Engine: 'amazon',
          Type: 'New York No. 1 Lake Park',
          key: 1,
        },
    ];

    const { form } = props;

    const [ products, setProducts ] = useState([]);

    const [ ASIN, setASIN ] = useState("");

    const handleDelete = (ASIN) => {
        const updated_array = products.slice().filter(item => item.ASIN !== ASIN);
        setProducts(updated_array);
    }

    const columns = [
        {
          title: 'ID',
          dataIndex: 'ID',
          key: 'id',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Product ASIN',
          dataIndex: 'ASIN',
          key: 'ASIN',
        },
        {
          title: 'Engine',
          dataIndex: 'Engine',
          key: 'Engine',
        },
        {
          title: 'Type',
          key: 'Type',
          dataIndex: 'Type',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Tooltip title="delete">
                <Button onClick={() => handleDelete(record.ASIN)} type="primary" shape="circle" icon={<DeleteIcon />} />
            </Tooltip>
          ),
        },
    ];

    const addProduct = () => {
        const objectExists = products.find(element => element.ASIN === ASIN);
        if(objectExists === undefined && ASIN !== ""){
            const pre_products = [...products, {
                ID: products.length + 1,
                ASIN: ASIN.toString(),
                Engine: 'amazon',
                Type: 'product',
                key: products.length + 1,
            }];
            setProducts(pre_products);
        } else if(ASIN === "") {
            messageApi.open({
                type: 'warning',
                content: "ASIN can't be empty",
            });
        } else {
            messageApi.open({
                type: 'warning',
                content: 'Product already exists',
            });
        }
    }

    const handleASIN = (value) => {
        setASIN(value);
    }

    const handleScrape = () => {
        notifApi.open({
            message: 'Note',
            description:
              'Backend implementation will be added soon.',
            icon: (
              <SmileOutlined
                style={{
                  color: '#108ee9',
                }}
              />
            ),
        });
    }

    return (
        <>
            {contextHolder}
            {notifContextHolder}
            <Form
                layout='vertical'
                form={form}
                initialValues={{
                    layout: 'vertical',
                }}
                style={{
                    marginTop: 30
                }}
            >
                <Form.Item label="Product ASIN">
                    <Input value={ASIN} onChange={(e) => handleASIN(e.target.value)} placeholder="Enter the product's ASIN..." />
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => addProduct()} type="default">Add Product</Button>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={products} />
            <Flex /* justifyContent='justify-end' */>
                <Button onClick={() => handleScrape()} style={{ marginTop: 30 }} type="primary">Start Scraping</Button>
            </Flex>
        </>
    );

}

const BulkScrapeForm = (props) => {

    const { form } = props;

    const [notifApi, notifContextHolder] = notification.useNotification();

    const handleScrape = () => {
        notifApi.open({
            message: 'Note',
            description:
              'Backend implementation will be added soon.',
            icon: (
              <SmileOutlined
                style={{
                  color: '#108ee9',
                }}
              />
            ),
        });
    }

    return (
        <>
            {notifContextHolder}
            <Block marginTop='mt-6'>
                <ScrapeFileUploader />
                <img src={sample_input} width='100%' style={{ marginTop: 50 }} />
            </Block>
            
            <Form
                layout='vertical'
                form={form}
                initialValues={{
                    layout: 'vertical',
                }}
                style={{
                    marginTop: 30
                }}
            >
                <Form.Item>
                    <Button onClick={() => handleScrape()} type="primary">Start Scraping</Button>
                </Form.Item>
            </Form>
        </>
    );

}


const ScrapeForm = () => {
  const [form] = Form.useForm();

  const forms = [<SignleScrapeForm form={form} />, <BulkScrapeForm form={form} />]

  const [ScrapeForm, setScrapeForm] = useState(<SignleScrapeForm form={form} />);

  return (
    <>
        <Card style={{ marginTop: 30, marginBottom: 30, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
            <section>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <Title>Product Scraping Form</Title>
                        </div>
                        <div className='col text-sm-start text-md-end text-lg-end text-xl-end text-xxl-end'>
                            <Toggle defaultValue={0} onValueChange={(value) => setScrapeForm(forms[value])}>
                                <ToggleItem value={0} text="Manual Scraping" icon={PrecisionManufacturingIcon} />
                                <ToggleItem value={1} text="Bulk Scraping" icon={BallotIcon} />
                            </Toggle>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Flex justifyContent='justify-between'>
                <Title>Product Scraping Form</Title>
                <Toggle defaultValue={0} onValueChange={(value) => setScrapeForm(forms[value])}>
                    <ToggleItem value={0} text="Manual Scraping" icon={PrecisionManufacturingIcon} />
                    <ToggleItem value={1} text="Bulk Scraping" icon={BallotIcon} />
                </Toggle>
            </Flex> */}
            {ScrapeForm}
        </Card>
        <Card style={{ marginTop: 30, marginBottom: 30, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
            <WebScrapingAPI />
        </Card>
    </>
  );
};

export default ScrapeForm;