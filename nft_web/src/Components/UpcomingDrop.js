import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Navigationbar from './Nav';
import axios from '../axios'
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Avatar from '@mui/material/Avatar';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { loadCSS } from 'fg-loadcss';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

const colortheme = createTheme({
  palette: {
    primary: {
      main: '#0277bd'
    },
    secondary: {
      // light: 这将从 palette.primary.main 中进行计算，
      main: '#ef5350',
      light: "#f27573",
      dark: "#a73a38"
      // dark: 这将从 palette.primary.main 中进行计算，
      // contrastText: 这将计算与 palette.primary.main 的对比度
    },

  },
})
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#9e046f',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const columns = [
  { id: 'image', label: '', minWidth: 20 },
  { id: 'name', label: 'Project Name', minWidth: 100 },
  { id: 'description', label: 'Short Description', minWidth: 100 },
  {
    id: 'date',
    label: 'Drop Date',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'unitprice',
    label: 'Unit Price\u00a0(ETH)',
    minWidth: 50,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  { id: 'twmember', label: 'Twitter members', align: 'left', minWidth: 50 },
  { id: 'dismember', label: 'Discord members', align: 'left', minWidth: 50 },
  {
    id: 'url',
    label: 'Official Links',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },

];

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [swapToLocaltz, setSwapToLocaltz] = React.useState(false);
  const [tztext, setTztext] = React.useState("To Local TZ");
  const [open, setOpen] = React.useState(false);
  const [upcomingData, setUpcomingData] = useState([])
  const [rows, setRows] = useState([])
  const [rowId, setRowId] = useState()

  const syncUpcoming = () => {
    axios.get('https://rarity-look.herokuapp.com/retrieve/upcoming')
      .then((res) => {
        console.log(res.data)
        setUpcomingData(res.data)
      })
  }

  function createData(image, name, description, date, unitprice, twmember, dismember, twurl, igurl, disurl, weburl, fulldescription) {
    if (swapToLocaltz) {
      var date = convertUTCDateToLocalDate(new Date(date));
      date = date.toLocaleString();
    }
    return { image, name, description, date, unitprice, twmember, dismember, twurl, igurl, disurl, weburl, fulldescription};
  }

  const addRow = () =>{
    let row_list = []
    upcomingData.map(function(entry){
      const image = entry.imageurl
      const name = entry.name
      const description = entry.description
      const date = entry.date
      const unitprice = entry.unitprice
      const twmember = entry.twmember
      const dismember = entry.dismember
      const twurl = entry.twurl
      const igurl = entry.igurl
      const disurl = entry.disurl
      const weburl = entry.weburl
      const fulldescription = entry.fulldescription
      const row = createData(image, name, description, date, unitprice, twmember, dismember, twurl, igurl, disurl, weburl, fulldescription)
      row_list.push(row)
    })
    return row_list
  }


  useEffect(() => {
    syncUpcoming()
  }, [])

  useEffect(() => {
    const rows = addRow()
    setRows(rows)
  }, [upcomingData, swapToLocaltz])

  // const rows = [
  //   createData("https://lh3.googleusercontent.com/KbLqxFD_JsSdyMKtabR8Mf_qrinLu9EOkL4HWhQm5bsCdlf-Nh54wBxva7_gmEnoLNFxw6OZSAgVwDBnNoO97_im2VSSsqRkyr0gTQ=s120",
  //     'India', 'IN', '2011/6/29 4:52:48 PM UTC', 3287263, 1, 1, "https://twitter.com/", "https://www.instagram.com/", "https://discord.com/", "https://www.boredmummywakingup.com/"),
  //   createData("", 'China', 'CN', '6/29/2011 4:52:48 PM UTC', 9596961),
  //   createData("", 'Italy', 'IT', '6/29/2011 4:52:48 PM UTC', 301340),
  //   createData("", 'United States', 'US', '6/29/2011 4:52:48 PM UTC', 9833520),
  //   createData("", 'Canada', 'CA', '6/29/2011 4:52:48 PM UTC', 9984670),
  //   createData("", 'Australia', 'AU', '6/29/2011 4:52:48 PM UTC', 7692024),
  //   createData("", 'Germany', 'DE', '6/29/2011 4:52:48 PM UTC', 357578),
  // ];

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSwapTZ = (event) => {
    if (!swapToLocaltz) {
      setSwapToLocaltz(true)
      setTztext("To UTC")
    } else {
      setSwapToLocaltz(false)
      setTztext("To Local")
    }

  };

  const handleCollapse = (id) =>{
    console.log(id);
    setRowId(id)
    setOpen(!open)
  }

  return (
    <Box sx={{ p: 1, m: 1, display: 'flex', flexWrap: 'wrap' }}>
      <Box sx={{ p: 1, m: 1, marginBottom: '50px' }}>
        <Navigationbar />
      </Box>
      <Box component="main"
        sx={{
          flexGrow: 1, p: 1,
          m: 1, width: '100%'
        }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell />
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {column.label}
                        {column.id == "date" ? (
                          <Button variant="contained" size="small" sx={{ marginLeft: "10px", color: "white" }} onClick={handleSwapTZ}>{tztext}</Button>
                        ) : (<Button variant="text" sx={{ display: "none" }}>Text</Button>)}

                      </Box>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => {
                    return (
                      <React.Fragment>
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleCollapse(index)}
                            >
                              {(open&&index==rowId)? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          {columns.map((column) => {
                            const value = row[column.id];
                            {
                              if (column.id == "image") {
                                return (

                                  <TableCell key={column.id} align={column.align}>
                                    <Avatar alt="projectImage" src={value} />
                                  </TableCell>
                                )
                              }
                              else if (column.id == "url") {
                                const twurl = row['twurl'];
                                const igurl = row['igurl'];
                                const disurl = row['disurl'];
                                const weburl = row['weburl'];

                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    <Box disableSpacing sx={{ display: "flex", flexWrap: "wrap" }}>
                                      <IconButton href={twurl} target="_blank" aria-label="twitter" size="small" sx={{ color: "#1DA1F2 " }}>
                                        <TwitterIcon />
                                      </IconButton>
                                      <IconButton href={disurl} target="_blank" size="small">
                                        <Icon baseClassName="" className="fab fa-discord" sx={{ color: "#5865F2" }} />
                                      </IconButton>
                                      <IconButton href={igurl} target="_blank" aria-label="instagram" size="small" sx={{ color: "#E1306C " }}>
                                        <InstagramIcon />
                                      </IconButton>
                                      <IconButton href={weburl} target="_blank" aria-label="external_link" size="small" sx={{ color: "#808080 " }}>
                                        <LinkIcon />
                                      </IconButton>
                                    </Box>
                                  </TableCell>
                                )
                              }
                              else {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                )
                              }
                            }
                          })}
                        </TableRow >
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                            <Collapse in={open&&index==rowId} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1, color:colortheme.palette.primary.main }}>
                                  {row['fulldescription']}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>

  );
}