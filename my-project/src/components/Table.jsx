import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import * as XLSX from 'xlsx';
import EmployeePage from './EmployeePage';
import predefinedData from './employee-list.json';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [isOverwritten, setIsOverwritten] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const [tableVisible, setTableVisible] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(true);

  useEffect(() => {
    if (!isOverwritten) {
      const formattedRows = predefinedData.map((data) => ({
        Name: data.employeeName,
        Location: data.employeeLocation,
        EmpID: data.id,
        Level: data.employeeLevel,
        Approved: data.approvedLeaves,
        Planned: data.plannedLeaves,
        Other_Absence: data.pendingLeaves,
      }));
      setRows(formattedRows);
      setFilteredRows(formattedRows);
    }
  }, [isOverwritten]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };





  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  
  //   reader.onload = (e) => {
  //     try {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
        
  //       // Adjust the range to match your header location
  //       const headerRange = 'A5:G5';
  //       const json = XLSX.utils.sheet_to_json(worksheet, { range: headerRange });
  
  //       console.log('JSON Data:', json); // Check if JSON data is parsed correctly
  
  //       const formattedRows = json.map((row) => ({
  //         Name: row['Name'],
  //         Location: row['Location'],
  //         EmpID: row['Enterprise ID'], // Adjust key according to your actual header
  //         Level: row['Level'],
  //         Approved: typeof row['Approved (A)'] === 'string' ? row['Approved (A)'].split(', ') : [],
  //         Planned: typeof row['Planned (P)'] === 'string' ? row['Planned (P)'].split(', ') : [],
  //         Other_Absence: typeof row['Others'] === 'string' ? row['Others'].split(', ') : [],
  //       }));
  
  //       console.log('Formatted Rows:', formattedRows); // Check if formattedRows is correctly populated
  
  //       setRows(formattedRows);
  //       setFilteredRows(formattedRows);
  //       setIsOverwritten(true);
  //       setUploadVisible(false);
  //     } catch (error) {
  //       console.error('Error reading file:', error);
  //       // Handle error state or display error message to the user
  //     }
  //   };
  
  //   reader.onerror = (e) => {
  //     console.error('File reading error:', e);
  //   };
  
  //   if (file) {
  //     reader.readAsArrayBuffer(file);
  //   }
  // };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        const formattedRows = json.map((row) => ({
          Name: row.Name,
          Location: row.Location,
          EmpID: row['Enterprise ID'],
          Level: row.Level,
          Approved: typeof row['Approved (A)'] === 'string' ? row['Approved (A)'].split(', ') : [],
          Planned: typeof row['Planned (P)'] === 'string' ? row['Planned (P)'].split(', ') : [],
          Other_Absence: typeof row.Others === 'string' ? row.Others.split(', ') : [],
        }));

        console.log('Formatted Rows:', formattedRows); // Check if data is formatted correctly

        setRows(formattedRows);
        setFilteredRows(formattedRows);
        setIsOverwritten(true);
        setUploadVisible(false);
      } catch (error) {
        console.error('Error reading file:', error);
        // Handle error state or display error message to the user
      }
    };

    reader.onerror = (e) => {
      console.error('File reading error:', e);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleNameClick = (row) => {
    setSelectedRow(row);
    setSearchBarVisible(false);
    setTableVisible(false);
    setUploadVisible(false);
  };

  const handleBack = () => {
    setSelectedRow(null);
    setSearchBarVisible(true);
    setTableVisible(true);
    setUploadVisible(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = rows.filter((row) =>
      row.Name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const countLeaves = (leaves) => {
    return leaves ? leaves.length : 0;
  };

  return (
    <div className="container mx-auto p-4">
      {searchBarVisible && (
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ float: 'right', margin: '0 20px 20px 0', width: '300px' }}
        />
      )}
      {uploadVisible && (
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4 p-2 bg-gray-200 rounded"
        />
      )}
      {selectedRow ? (
        <EmployeePage row={selectedRow} onBack={handleBack} />
      ) : (
        tableVisible && (
          <TableContainer component={Paper} className="bg-white shadow-md rounded-lg">
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={7} className="bg-purple-400 text-white text-center py-2">
                    <Box sx={{ padding: 2 }} className="text-white text-center text-2xl">Vacation Details</Box>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-200">
                  <TableCell className="font-bold">Name</TableCell>
                  <TableCell className="font-bold">Location</TableCell>
                  <TableCell className="font-bold">Employee ID</TableCell>
                  <TableCell className="font-bold">Level</TableCell>
                  <TableCell className="font-bold">Approved</TableCell>
                  <TableCell className="font-bold">Planned</TableCell>
                  <TableCell className="font-bold">Other</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredRows
                ).map((row) => (
                  <TableRow
                    key={row.EmpID}
                    hover
                    onClick={() => handleNameClick(row)}
                    className="cursor-pointer"
                  >
                    <TableCell>{row.Name}</TableCell>
                    <TableCell>{row.Location}</TableCell>
                    <TableCell>{row.EmpID}</TableCell>
                    <TableCell>{row.Level}</TableCell>
                    <TableCell>{countLeaves(row.Approved)}</TableCell>
                    <TableCell>{countLeaves(row.Planned)}</TableCell>
                    <TableCell>{countLeaves(row.Other_Absence)}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={7}
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )
      )}
    </div>
  );
}
