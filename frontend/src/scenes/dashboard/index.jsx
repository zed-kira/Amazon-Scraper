// React
import React from 'react';
import { useState } from 'react';

// Ant Design
import { Badge, Space } from 'antd';

// Ant Design Icons
import { ArrowDownOutlined } from '@ant-design/icons';

// Tremor
import {
    Card,
    Metric,
    Tab,
    Text,
    TabList,
    ColGrid,
    Block,
    Flex,
} from '@tremor/react';

// MUI Components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

// MUI Icons
import GitHubIcon from '@mui/icons-material/GitHub';

// Internal Components
import EnhancedTable from '../../components/table';
import Stats from '../../components/stats';
import ScrapeForm from '../../components/scrape';
import { ResultHeadCells } from '../../components/table';

// Images
import logo from '../../assets/images/logo.png';
import userAvatar from "../../assets/images/customer-4.png";
import user2Avatar from "../../assets/images/customer-5.png";
import user3Avatar from "../../assets/images/customer-6.png";

function createData(id, name, isbn, results, price) {
    return {
      id,
      name,
      isbn,
      results,
      price,
    };
}

const scrapeResultRows = [
    createData(1, 'Cupcake', 9781534648067, 0, 67),
    createData(2, 'Donut', 9782067197251, 1, 51),
    createData(3, 'Eclair', 9781534650251, 0, 24),
    createData(4, 'Frozen yoghurt', 9781566567183, 0, 24),
    createData(5, 'Gingerbread', 9781075395239, 1, 49),
    createData(6, 'Honeycomb', 9781075395239, 1, 87),
    createData(7, 'Ice cream sandwich', 9781892145031, 1, 37),
    createData(8, 'Jelly Bean', 9781641873048, 0, 94),
    createData(8, 'KitKat', 9781640220645, 1, 65),
    createData(10, 'Lollipop', 9781944877286, 1, 98),
    createData(11, 'Marshmallow', 9781075395253, 0, 81),
    createData(12, 'Nougat', 9781625450739, 1, 9),
    createData(13, 'Oreo', 9781640220607, 1, 63),
];

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    return (
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 0 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt="Avatar" src={userAvatar} />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar alt="Avatar" src={user2Avatar} /> Second User
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar alt="Avatar" src={user3Avatar} /> Third User
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
    );
  
}  

const Header = () => {

    return (
        <Flex>
            <Flex
                justifyContent='start'
                spaceX="space-x-2"
                truncate={false}
            >
                <img src={logo} width={50} height={50} style={{ marginTop: 5 }} />
                <Metric>Zedkira</Metric>
            </Flex>

            <Space size="middle">
                <a href="#" style={{ style: 'none' }}>
                    <GitHubIcon fontSize="large" />
                </a>
                <Badge count={5}>
                    <AccountMenu />
                </Badge>
            </Space>

        </Flex>
    );

}

const Overview = () => {

    const calc_percentage = () => {
        const notFound = scrapeResultRows.filter(item => item.results === 0).length;
        const products = scrapeResultRows.length;

        return ((notFound / products) * 100).toFixed(2)
    }

    const stats = [
        {
            id: 'agjh3t2',
            text: 'Total Scraped Prdoucts',
            metric: scrapeResultRows.length,
            suffix: undefined,
            icon: <ArrowDownOutlined />,
            color: "#3f8600",
        },
        {
            id: 'sje35',
            text: 'Total Not Found Products',
            metric: scrapeResultRows.filter(item => item.results === 0).length,
            suffix: undefined,
            icon: <ArrowDownOutlined />,
            color: "#cf1322",
        },
        {
            id: 'ys4535',
            text: 'Conversion Rate',
            metric: calc_percentage(),
            suffix: "%",
            icon: <ArrowDownOutlined />,
            color: "",
        },
    ]

    return (
        <>
            <Stats stats={stats} />
            
            <ColGrid numColsMd={ 2 } numColsLg={ 3 } gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
                {/* {
                    stats.map(item => {
                        return (
                            <Card key={item.id} decoration="left" decorationColor="indigo">
                                <Text>{item.text}</Text>
                                <Metric>{item.metric}</Metric>
                            </Card>
                        );
                    })
                } */}
            </ColGrid>

            <Block marginTop="mt-6">
                <EnhancedTable tableHeadCells={ResultHeadCells} rows={scrapeResultRows} />
            </Block>
        </>
    );

}

const Scrape = () => {

    return (
        <>
            <Block marginTop="mt-6">
                <ScrapeForm />
            </Block>
        </>
    );

}


export default function Dashboard() {
    
    const [selectedView, setSelectedView] = useState(1);

    return (
        <main>
            
            <Header />

            <TabList defaultValue={ 1 } onValueChange={ (value) => setSelectedView(value) } marginTop="mt-6">
                <Tab value={ 1 } text="Overview" />
                <Tab value={ 2 } text="Scrape Products" />
            </TabList>

            { selectedView === 1 ? (
                <>
                    <Overview />
                </>
            ) : (
                <>
                    <Scrape />
                </>
            ) }
        </main>
    );
}