import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Navigationbar from './Nav';
import axios from '../axios'
import NoteCard from './NoteCard'
// import Pusher from 'pusher-js'
// import db from '../firebase'
import { set } from 'mongoose'
import { dividerClasses, Grid } from '@mui/material'
import ProjectCard from './projectCard';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Project = () => {
  const [projectData, setProjectData] = useState([])
  const [pageNumbers, setPageNumbers] = useState([])
  const [page, setPage] = React.useState(1);

  const itemsPerPage = 24
  const drawerWidth = 0

  const calculatePageNumber = (data) => {
    const pageTotalNum = Math.ceil(data.length / itemsPerPage)
    setPageNumbers(pageTotalNum)
}

  const handleChange = (event, value) => {
    setPage(value);
  };
  const syncProjects = () => {
    axios.get('/retrieve/projects')
      .then((res) => {
        console.log(res.data)
        setProjectData(res.data)
      })
  }
  useEffect(() => {
    syncProjects()
  }, [])

  useEffect(() => {
    calculatePageNumber(projectData)
}, [projectData])

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
        <Box sx={{ height: 50 }}>
          <Stack spacing={2}>
            <div className="pagination">
              <Typography>Page: {page}</Typography>
              <Pagination color="primary" count={pageNumbers} page={page} onChange={handleChange} />
            </div>
          </Stack>

        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 6, lg: 6, xl: 8, xxl: 8 }}>
          {projectData.slice((page-1) * itemsPerPage, (page-1) * itemsPerPage + itemsPerPage).map(entry => (
            <Grid item xs={2} sm={4} md={1} lg={1} xl={1} xxl={1}>
              <ProjectCard
                name={entry.name}
                image_url={entry.image_url}
                description={entry.description}
                discord_url={entry.discord_url}
                twitter_username={entry.twitter_username}
                instagram_username={entry.instagram_username}
                external_url={entry.external_url}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Project