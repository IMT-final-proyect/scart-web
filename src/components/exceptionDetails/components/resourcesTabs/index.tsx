import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/rootReducer';
import { EntityDocuments } from '../entityDocuments';
import useStyles from './styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface Props {
    setImage: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ResourcesTabs({ setImage }: Props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const driverInvalidDocuments = useSelector((state: RootState) => state.exceptions.exceptionDocuments.driver.invalidDocuments);
  const driverMissingDocuments = useSelector((state: RootState) => state.exceptions.exceptionDocuments.driver.missingDocuments);
  const vehicleInvalidDocuments = useSelector((state: RootState) => state.exceptions.exceptionDocuments.vehicle.invalidDocuments);
  const vehicleMissingDocuments = useSelector((state: RootState) => state.exceptions.exceptionDocuments.vehicle.missingDocuments);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs 
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="simple tabs example"
        >
          <Tab label="Conductor" {...a11yProps(0)} />
          <Tab label="Vehiculo" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EntityDocuments 
            missing={driverMissingDocuments}
            invalid={driverInvalidDocuments}
            setImage={setImage}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EntityDocuments 
            missing={vehicleMissingDocuments}
            invalid={vehicleInvalidDocuments}
            setImage={setImage}
        />
      </TabPanel>
    </div>
  );
}
