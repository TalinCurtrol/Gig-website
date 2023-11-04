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
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


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
        id: 'firstName',
        numeric: false,
        label: 'Firstname',
    },
    {
        id: 'lastName',
        numeric: false,
        label: 'Lastname',
    },
    {
        id: 'email',
        numeric: false,
        label: 'Email',
    },
    {
        id: 'birthday',
        numeric: false,
        label: 'Birthday(DD/MM/YYYY)',
    },
    {
        id: 'degree',
        numeric: false,
        label: 'Degree',
    },
    {
        id: 'mobileNumber',
        numeric: true,
        label: 'MobileNumber',
    },
    {
        id: 'State',
        numeric: false,
        label: 'state',
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


export default function UserList() {
    const login = useSelector(state => state.admin.loginValue);
    const dispatch = useDispatch()

    const [userList, setUserList] = useState([]);
    const [ blockedUsers, setBlockedUsers ] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [searchString, setSearchString] = useState([]);

    //dialog
    const [banOpen, setBanOpen] = React.useState(false);
    const [suspendOpen, setSuspendOpen] = React.useState(false);
    const [modifyOpen, setModifyOpen] = React.useState(false);

    

    useEffect(() => {
       
            fetch('http://localhost:8080/userlist')
                .then(response => response.json())
                .then(data => setUserList(data['data']['users']))

            fetch('http://localhost:8080/blockedusers')
                .then(response => response.json())
                .then(data => setBlockedUsers(data['data']['blockedusers']))
       
    }, [])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = userList.map((n) => n.id);
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
                        Users Information
                    </Typography>
                )}
                <TextField id="filled-basic" key="searchsquare" label="Search" variant="filled" size="small" autoFocus="autoFocus" onChange={(event) => {
                    setSearchString(event.target.value);

                    if (event.target.value === null) {
                        fetch('http://localhost:8080/userlist')
                            .then(response => response.json())
                            .then(data => setUserList(data['data']['users']))
                      

                    } else {
                        fetch('http://localhost:8080/searchuser/string=' + event.target.value)
                            .then(response => response.json())
                            .then(data => setUserList(data['data']['users']))
                        

                    }

                    fetch('http://localhost:8080/blockedusers')
                        .then(response => response.json())
                        .then(data => setBlockedUsers(data['data']['blockedusers']))



                }} value={searchString} />

                {numSelected > 0 ? (
                    <Tooltip title="Modify">
                        <IconButton onClick={() => {
                            setModifyOpen(true);

                        }}>
                            <ManageAccountsIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">
                        <IconButton disabled >
                                <ManageAccountsIcon />
                        </IconButton>
                    </Tooltip>
                )}

                <Dialog open={modifyOpen} onClose={() => {
                    setModifyOpen(false);
                }}>
                    <DialogTitle>Modify</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You are modifing a/many users' information:
                        </DialogContentText>
                        <Box component="form" onSubmit={(e) => {


                            const data = new FormData(e.currentTarget);
                            selected.map((id) => {
                              

                                fetch('http://localhost:8080/updateUser', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "id": id,
                                        "firstName": data.get('fname'),
                                        "lastName": data.get('lname'),
                                        "email": null,
                                        "password": null,
                                        "birthday": data.get('bthday'),
                                        "degree": data.get('degree'),
                                        "mobileNumber": data.get('mnumber')
                                    })
                                });

                            })

                            setModifyOpen(false);
                            setSelected([]);



                        }}>
                            <TextField
                                disabled
                                margin="dense"
                                key="ids"
                                defaultValue={selected.map((id)=>(id))}
                                label="User Selected"
                                type="text"
                                name="ids"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                
                                margin="dense"
                                key="fname"
                                label="New Firstname"
                                type="text"
                                name="fname"
                                fullWidth

                                variant="standard"
                            />
                            <TextField
                                
                                margin="dense"
                                key="lname"
                                label="New Lastname"
                                type="text"
                                name="lname"
                                fullWidth

                                variant="standard"
                            />
                            <TextField
                                
                                margin="dense"
                                key="bthday"
                                label="New Birthday"
                                type="text"
                                name="bthday"
                                fullWidth

                                variant="standard"
                            />

                            <TextField

                                margin="dense"
                                key="degree"
                                label="New Degree"
                                type="text"
                                name="degree"
                                fullWidth

                                variant="standard"
                            />

                            <TextField

                                margin="dense"
                                key="mnumber"
                                label="New mobile number"
                                type="text"
                                name="mnumber"
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


                {numSelected > 0 ? (
                    <Tooltip title="Release">
                        <IconButton onClick={() => {
                            selected.map((id) => { fetch('http://localhost:8080/releaseauser', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body:id
                            });
                            })
                                
                            setSelected([]);
                            
                        }}>
                            <PersonAddIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">
                        <IconButton disabled >
                            <PersonAddIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Suspend">
                        <IconButton onClick={() => {
                            setSuspendOpen(true);
                        }}>
                            <PersonRemoveIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">

                        <IconButton disabled >
                            <PersonRemoveIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <Dialog open={suspendOpen} onClose={() => {
                    setSuspendOpen(false);
                }}>
                    <DialogTitle>Suspend</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You are suspending a/many users, please leave some remarks(time/reason etc.)
                        </DialogContentText>
                        <Box component="form" onSubmit={(e) => {


                            const data = new FormData(e.currentTarget);
                            selected.map((id) => {
                               

                                fetch('http://localhost:8080/suspendauser', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "userid": id,
                                        "blockState": data.get('susNote')
                                    })
                                });

                            })
                           
                            setSuspendOpen(false);
                            setSelected([]);



                        }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            key="susDia"
                                label="Suspend Note"
                                type="text"
                                name="susNote"
                            fullWidth
                           
                            variant="standard"
                            />
                        
                        <DialogActions>
                        <Button onClick={() => {
                            setSuspendOpen(false);
                        }}>Cancel</Button>
                        <Button
                            type="submit"
                           >Confirm</Button>
                            </DialogActions>
                        </Box>
                    </DialogContent>
                    
                </Dialog>
             
                {numSelected > 0 ? (
                    <Tooltip title="Ban">
                        <IconButton onClick={() => {
                            setBanOpen(true);

                        }}>
                            <PersonOffIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">
                        <IconButton disabled >
                            <PersonOffIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <Dialog open={banOpen} onClose={() => {
                    setBanOpen(false);
                }}>
                    <DialogTitle>Ban</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You are banning a/many users, please leave some remarks(time/reason etc.)
                        </DialogContentText>
                        <Box component="form" onSubmit={(e) => {


                            const data = new FormData(e.currentTarget);
                            selected.map((id) => {
                             

                                fetch('http://localhost:8080/banauser', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "userid": id,
                                        "blockState": data.get('banNote')
                                    })
                                });

                            })

                            setBanOpen(false);
                            setSelected([]);



                        }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                key="banDia"
                                label="Ban Note"
                                type="text"
                                name="banNote"
                                fullWidth

                                variant="standard"
                            />

                            <DialogActions>
                                <Button onClick={() => {
                                    setBanOpen(false);
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
                                    rowCount={userList.length}
                                />
                                    <TableBody>
                                        {userList.length === 0 ? (<TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="center">No result</TableCell>
                                        </TableRow>) : (null)}
                                    
                                    {userList.slice().sort(getComparator(order, orderBy))
                                        .map((user, index) => {
                                            const isItemSelected = isSelected(user.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, user.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={user.id}
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
                                                        scope="user"
                                                        padding="none"
                                                    >
                                                        {user.id}
                                                    </TableCell>
                                                    <TableCell align="center">{user.firstName}</TableCell>
                                                    <TableCell align="center">{user.lastName}</TableCell>
                                                    <TableCell align="center">{user.email}</TableCell>
                                                    <TableCell align="center">{user.birthday}</TableCell>
                                                    <TableCell align="center">{user.degree}</TableCell>
                                                    <TableCell align="center">{user.mobileNumber}</TableCell>
                                              
                                                    {blockedUsers.map(({ userid, blockState }) => {
                                                        if (userid === user.id) {
                                                            return (
                                                                <TableCell align="center">{blockState}</TableCell>
                                                            );
                                                        } else {
                                                            return (
                                                                null);
                                                        }

                                                    }
                                                    )} 

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