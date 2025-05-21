"use client"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Grid from "@mui/material/Grid"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import classNames from 'classnames';
import * as React from 'react';
import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { NavLink } from 'react-router';
import { JobsTable } from '~/components/jobs/JobsTable';
import { fetchCustomers } from '~/data/customers/Customers.slice';
import { selectJobsWithCustomer } from '~/data/jobs/Jobs.selectors';
import { fetchJobs } from '~/data/jobs/Jobs.slice';
import { fetchMaterials } from '~/data/materials/Materials.slice';
import { useAppDispatch, useAppSelector } from '~/data/store/root-hooks';

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const [tabValue, setTabValue] = React.useState(0)
  
  const jobsWithCustomer = useAppSelector(selectJobsWithCustomer, shallowEqual);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  
  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(fetchJobs())
    dispatch(fetchMaterials(false))
    
    setTimeout(() => dispatch(fetchMaterials(false)), 1000);
  }, [dispatch])
  
  return (
    <Box component="main" className={classNames(
      'gutter-primary',
    )}>
      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
      </Paper>
      
      <Grid container spacing={2}>
        
        <Grid container columns={12} size={12}>
          {/* Summary Cards */}
          <Grid size={{xs: 12, sm: 6, md: 2.5}}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Active Jobs
                  </Typography>
                  <AssignmentIcon color="action" fontSize="small" />
                </Box>
                <Typography variant="h4" component="div">
                  12
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  +2 from last month
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowUpwardIcon fontSize="small" />}>
                  <NavLink to={'/jobs'}>
                    View All Jobs
                  </NavLink>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid size={{xs: 12, sm: 6, md: 2.5}}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Upcoming Appointments
                  </Typography>
                  <CalendarTodayIcon color="action" fontSize="small" />
                </Box>
                <Typography variant="h4" component="div">
                  8
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Next: Today at 2:00 PM
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowUpwardIcon fontSize="small" />}>
                  View schedule
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid size={{xs: 12, sm: 6, md: 2.5}}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Materials to Order
                  </Typography>
                  <InventoryIcon color="action" fontSize="small" />
                </Box>
                <Typography variant="h4" component="div">
                  5
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Low stock items
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowUpwardIcon fontSize="small" />}>
                  View inventory
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid container columns={3} size={12}>
            {/* Recent Jobs and Progress */}
            <Grid size={{xs: 3, sm: 2}}>
              <Card>
                <CardHeader title="Recent Jobs" subheader="Overview of your most recent projects" />
                <CardContent>
                  {jobsWithCustomer.length && (
                    <JobsTable jobs={jobsWithCustomer} />
                  )}
                </CardContent>
                <CardActions>
                  <Button variant="outlined" fullWidth>
                    <NavLink to={'/jobs'}>
                      View All Jobs
                    </NavLink>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid size={{xs: 3, sm: 1}}>
              <Card>
                <CardHeader title="Job Progress" subheader="Current status of active jobs" />
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2">Kitchen Renovation - Smith</Typography>
                        <Typography variant="body2" color="text.secondary">
                          75%
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={75} />
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2">Bathroom Remodel - Johnson</Typography>
                        <Typography variant="body2" color="text.secondary">
                          50%
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={50} />
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2">Deck Construction - Williams</Typography>
                        <Typography variant="body2" color="text.secondary">
                          90%
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={90} />
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2">Basement Finishing - Davis</Typography>
                        <Typography variant="body2" color="text.secondary">
                          25%
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={25} />
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2">Roof Repair - Miller</Typography>
                        <Typography variant="body2" color="text.secondary">
                          60%
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={60} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
          </Grid>
          
          </Grid>
        
      </Grid>
    </Box>
  )
}
