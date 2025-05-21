"use client"

import { Add as AddIcon, FilterList as FilterListIcon, Visibility as VisibilityIcon } from "@mui/icons-material"
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Customer } from '~/data/customers/Customer';
import { fetchCustomers } from '~/data/customers/Customers.slice';
import { useAppDispatch, useAppSelector } from '~/data/store/root-hooks';
import { useFormatDate } from '~/services/utils';

type Order = "asc" | "desc";
type OrderBy = "lastName" | "createdAt" | "status";

const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customers, loading } = useAppSelector((state) => state.customers)
  
  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<OrderBy>("lastName")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }
  
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value)
  }
  
  // Filter and sort customers
  const filteredCustomers: Customer[] = customers.filter((customer: Customer) => {
    const matchesSearch =
      customer.name.includes(searchQuery.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  const sortedCustomers = filteredCustomers.sort((a: Customer, b) => {
    let comparison = 0
    
    switch (orderBy) {
      case "lastName":
        comparison = a.name.localeCompare(b.name)
        break
      case "createdAt":
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
      default:
        comparison = 0
    }
    
    return order === "asc" ? comparison : -comparison
  })
  
  useEffect( () => {
    dispatch(fetchCustomers());
  }, [] );
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mr: 2, width: 250 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">All Customers</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/customers/new")}>
            New Customer
          </Button>
        </Toolbar>
        
        {loading ? (
          <LinearProgress />
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "lastName"}
                      direction={orderBy === "lastName" ? order : "asc"}
                      onClick={() => handleRequestSort("lastName")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "status"}
                      direction={orderBy === "status" ? order : "asc"}
                      onClick={() => handleRequestSort("status")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "createdAt"}
                      direction={orderBy === "createdAt" ? order : "asc"}
                      onClick={() => handleRequestSort("createdAt")}
                    >
                      Created Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCustomers.length > 0 ? (
                  sortedCustomers.map((customer) => (
                    <TableRow hover key={customer.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {customer.name} {customer.lastName}
                      </TableCell>
                      <TableCell>{customer.company || "-"}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={customer.status.toUpperCase()}
                          color={customer.status === "active" ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{useFormatDate(customer.createdAt)}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton onClick={() => navigate(`/customers/${customer.id}`)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No customers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  )
}

export default CustomersPage
