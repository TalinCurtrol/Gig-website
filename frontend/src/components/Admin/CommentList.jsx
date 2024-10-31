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
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import RateReviewIcon from '@mui/icons-material/RateReview';


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
        id: 'senderId',
        numeric: false,
        label: 'Sender ID',
    },
    {
        id: 'postId',
        numeric: false,
        label: 'Post ID',
    },
    {
        id: 'replyTo',
        numeric: false,
        label: 'Reply To',
    },
    {
        id: 'commentTime',
        numeric: false,
        label: 'Time',
    },
    {
        id: 'content',
        numeric: false,
        label: 'Content',
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


export default function CommentList() {
    const login = useSelector(state => state.admin.loginValue);
    const dispatch = useDispatch()

    const [commentList, setCommentList] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [searchString, setSearchString] = useState([]);

    //dialog
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [modifyOpen, setModifyOpen] = React.useState(false);



    useEffect(() => {

        fetch('http://localhost:8080/commentlist')
            .then(response => response.json())
            .then(data => setCommentList(data['data']['comments']))

    }, [])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = commentList.map((n) => n.id);
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
                        Comments Information
                    </Typography>
                )}
                <TextField id="filled-basic" key="searchsquare" label="Search" variant="filled" size="small" autoFocus="autoFocus" onChange={(event) => {
                    setSearchString(event.target.value);

                    if (event.target.value === null) {
                        fetch('http://localhost:8080/commentlist')
                            .then(response => response.json())
                            .then(data => setCommentList(data['data']['comments']))


                    } else {
                        fetch('http://localhost:8080/commentsearch/string=' + event.target.value)
                            .then(response => response.json())
                            .then(data => setCommentList(data['data']['comments']))


                    }
  

                }} value={searchString} />

                {numSelected > 0 ? (
                    <Tooltip title="Modify">
                        <IconButton onClick={() => {
                            setModifyOpen(true);

                        }}>
                            <RateReviewIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">
                        <IconButton disabled >
                                <RateReviewIcon />
                        </IconButton>
                    </Tooltip>
                )}

                <Dialog open={modifyOpen} onClose={() => {
                    setModifyOpen(false);
                }}>
                    <DialogTitle>Modify</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You are modifing a/many comments' information:
                        </DialogContentText>
                        <Box component="form" onSubmit={(e) => {


                            const data = new FormData(e.currentTarget);
                            selected.map((id) => {

                                console.log("id=" + id);
                                console.log("content=" + data.get('content'));
                                fetch('http://localhost:8080/updateComment', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "id": id,
                                        "userId": null,
                                        "requestId": data.get('requestId'),
                                        "commentUserId": null,
                                        "commentedTime": null,
                                        "content": data.get('content')
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
                                defaultValue={selected.map((id) => (id))}
                                label="Comments Selected"
                                type="text"
                                name="ids"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                margin="dense"
                                key="requestId"
                                label="New post ID"
                                type="text"
                                name="requestId"
                                fullWidth
                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="content"
                                label="New Content"
                                type="text"
                                name="content"
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
                    <Tooltip title="Delete">
                        <IconButton onClick={() => {
                            setDeleteOpen(true);

                        }}>
                            <CommentsDisabledIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Selection needed">
                        <IconButton disabled >
                                <CommentsDisabledIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <Dialog open={deleteOpen} onClose={() => {
                    setDeleteOpen(false);
                }}>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You are deleting a/many comments, are you sure?
                        </DialogContentText>
                        <Box component="form" onSubmit={(e) => {
        
                            selected.map((id) => {


                                fetch('http://localhost:8080/deleteComment/'+id, {
                                    method: "DELETE"
                                });

                            })

                            setDeleteOpen(false);
                            setSelected([]);



                        }}>
                            <TextField
                                disabled
                                margin="dense"
                                key="deleteIDs"
                                label="Comments Selected"
                                type="text"
                                name="deleteIDs"
                                fullWidth
                                defaultValue={selected.map((id) => (id))}
                                variant="standard"
                            />

                            <DialogActions>
                                <Button onClick={() => {
                                    setDeleteOpen(false);
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
                                        rowCount={commentList.length}
                                    />
                                    <TableBody>
                                        {commentList.length === 0 ? (<TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="center">No result</TableCell>
                                        </TableRow>) : (null)}

                                        {commentList.slice().sort(getComparator(order, orderBy))
                                            .map((comment, index) => {
                                                const isItemSelected = isSelected(comment.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, comment.id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={comment.id}
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
                                                            scope="comment"
                                                            padding="none"
                                                        >
                                                            {comment.id}
                                                        </TableCell>
                                                        <TableCell align="center">{comment.userId}</TableCell>
                                                        <TableCell align="center">{comment.requestId}</TableCell>
                                                        <TableCell align="center">{comment.commentUserId}</TableCell>
                                                        <TableCell align="center">{comment.commentedTime}</TableCell>
                                                        <TableCell align="center">{comment.content}</TableCell>
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