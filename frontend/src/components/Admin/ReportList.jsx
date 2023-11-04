import AdminHeader from './AdminHeader';

import { useSelector, useDispatch } from 'react-redux'
import { adminLogin, adminLogout, setAdminId, setAdminName } from '../../redux/AdminSlice'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreateIcon from '@mui/icons-material/Create';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        label: 'ID',
    },
    {
        id: 'userId',
        numeric: false,
        label: 'User ID(Who report)',
    },
    {
        id: 'postId',
        numeric: false,
        label: 'Post ID',
    },
    {
        id: 'description',
        numeric: false,
        label: 'Description',
    },
    {
        id: 'state',
        numeric: false,
        label: 'State',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};




const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }, palette: {
        primary: {
            main: "#cddc39",
        },
        secondary: {
            main: "#c6ff00",
        },
    },
});


export default function ReportList() {
    const login = useSelector(state => state.admin.loginValue);
    const dispatch = useDispatch()

    const [reportList, setReportList] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [searchString, setSearchString] = useState([]);

    //dialog
    const [doneOpen, setDoneOpen] = React.useState(false);
    const [modifyOpen, setModifyOpen] = React.useState(false);
    



    useEffect(() => {

        fetch('http://localhost:8080/reportlist')
            .then(response => response.json())
            .then(data => setReportList(data['data']['reports']))

    }, [])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = reportList.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };


    const isSelected = (id) => selected.indexOf(id) !== -1;


    const EnhancedTableToolbar = (props) => {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >

                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Reports Information
                    </Typography>
                )}
                <TextField id="filled-basic" key="searchsquare" label="Search" variant="filled" size="small" autoFocus="autoFocus" onChange={(event) => {
                    setSearchString(event.target.value);

                    if (event.target.value === null) {
                        fetch('http://localhost:8080/reportlist')
                            .then(response => response.json())
                            .then(data => setReportList(data['data']['reports']))


                    } else {
                        fetch('http://localhost:8080/searchreport/string=' + event.target.value)
                            .then(response => response.json())
                            .then(data => setReportList(data['data']['reports']))


                    }


                }} value={searchString} />

                {numSelected > 0 ? (
                    <Tooltip title="Done">
                        <IconButton onClick={() => {
                            setDoneOpen(true);

                        }}>
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">
                        <IconButton disabled >
                                <CheckCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                )}

                <Dialog open={doneOpen} onClose={() => {
                    setDoneOpen(false);
                }}>
                    <DialogTitle>Done</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure those reports are solved?
                        </DialogContentText>
                        <Box component="form" onSubmit={(e) => {


                            const data = new FormData(e.currentTarget);
                            selected.map((id) => {

                             
                                fetch('http://localhost:8080/reportdone/id='+id, {
                                    method: "GET",
                                    
                                   
                                });

                            })

                            setDoneOpen(false);
                            setSelected([]);



                        }}>
                            <TextField
                                disabled
                                margin="dense"
                                key="ids"
                                defaultValue={selected.map((id) => (id))}
                                label="Comments Selected"
                                type="text"
                                name="ids"
                                fullWidth
                                variant="standard"
                            />
                           

                            <DialogActions>
                                <Button onClick={() => {
                                    setDoneOpen(false);
                                }}>Cancel</Button>
                                <Button
                                    type="submit"
                                >Confirm</Button>
                            </DialogActions>
                        </Box>
                    </DialogContent>

                </Dialog>

                {numSelected > 0 ? (
                    <Tooltip title="Change state">
                        <IconButton onClick={() => {
                            setModifyOpen(true);

                        }}>
                            <CreateIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">
                        <IconButton disabled >
                                <CreateIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <Dialog open={modifyOpen} onClose={() => {
                    setModifyOpen(false);
                }}>
                    <DialogTitle>Change State</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Those reports' state will be changed:
                        </DialogContentText>
                        <Box component="form" onSubmit={(e) => {

                            selected.map((id) => {



                                const data = new FormData(e.currentTarget);
                                selected.map((id) => {


                                    fetch('http://localhost:8080/reportstate', {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            "id": id,
                                            "userId": null,
                                            "postId": null,
                                            "description": null,
                                            "state": data.get('state'),

                                        })
                                    });

                                })

                            })

                            setModifyOpen(false);
                            setSelected([]);



                        }}>
                            <TextField
                                disabled
                                margin="dense"
                                key="deleteIDs"
                                label="Reports Selected"
                                type="text"
                                name="deleteIDs"
                                fullWidth
                                defaultValue={selected.map((id) => (id))}
                                variant="standard"
                            />
                           
                            <TextField

                                margin="dense"
                                key="state"
                                label="New State"
                                type="text"
                                name="state"
                                fullWidth
                                variant="standard"
                            />


                            <DialogActions>
                                <Button onClick={() => {
                                    setModifyOpen(false);
                                }}>Cancel</Button>
                                <Button
                                    type="submit"
                                >Confirm</Button>
                            </DialogActions>
                        </Box>
                    </DialogContent>

                </Dialog>
            </Toolbar>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };







    return (
        <>
            {login ? (< AdminHeader />) : (<div></div>)}
            {login ? (

                <Box sx={{ width: '100%' }}>
                    <ThemeProvider theme={theme}>
                        <Paper sx={{ width: '100%', mb: 2 }} >
                            <EnhancedTableToolbar numSelected={selected.length} />
                            <Divider />
                            <TableContainer>
                                <Table
                                    stickyHeader
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size='medium'
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={reportList.length}
                                    />
                                    <TableBody>
                                        {reportList.length === 0 ? (<TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="center">No result</TableCell>
                                        </TableRow>) : (null)}

                                        {reportList.slice().sort(getComparator(order, orderBy))
                                            .map((report, index) => {
                                                const isItemSelected = isSelected(report.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, report.id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={report.id}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="report"
                                                            padding="none"
                                                        >
                                                            {report.id}
                                                        </TableCell>
                                                        <TableCell align="center">{report.userId}</TableCell>
                                                        <TableCell align="center">{report.postId}</TableCell>
                                                        <TableCell align="center">{report.description}</TableCell>
                                                        <TableCell align="center">{report.state}</TableCell>
                                                        
                                                    </TableRow>
                                                );
                                            })}


                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </ThemeProvider >
                </Box>


            ) : (<Button component={Link} to="/adminentrance" color="inherit" size="large">You need to log in</Button>)}

        </>
    )
}