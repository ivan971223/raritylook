import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Dialog } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import './projectCard.css'
import { fontSize, maxHeight } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import { loadCSS } from 'fg-loadcss';
import Icon from '@mui/material/Icon';
import { purple } from '@mui/material/colors';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import Collection from './Collection'
import ResponsiveDrawer from './ResponsiveDrawer';

const ProjectCard = ({ name, image_url, description, discord_url, twitter_username, instagram_username, external_url }) => {
    const [expanded, setExpanded] = useState(false);
    const [twDisabled, setTwDisabled] = useState(false);
    const [igDisabled, setIgDisabled] = useState(false);
    const [disDisabled, setDisDisabled] = useState(false);
    const [linkDisabled, setLinkDisabled] = useState(false);
    let match = useRouteMatch();
    let urlname = name.replace(/\s/g, "");
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    useEffect(() => {
        if (!twitter_username)
            setTwDisabled(true)
        if (!instagram_username)
            setIgDisabled(true)
        if (!discord_url)
            setDisDisabled(true)
        if (!external_url)
            setLinkDisabled(true)
    }, [])
    return (
        <div>
            <Box
                boxShadow={2}
            >
                <Card sx={{ maxWidth: 345 }}>

                    <CardActionArea  button component={Link} to={`/${urlname}`} sx={{ height: 200 }}>
                            <CardMedia sx={{paddingTop:"15px"}}>
                                <img className="images" src={image_url} alt="NFT" />
                            </CardMedia>
                            <CardContent className="card-content">
                                <div>{name}</div>
                            </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing sx={{ display: "flex", flexWrap: "wrap" }}>
                        <IconButton disabled={twDisabled} href={`http://www.twitter.com/${twitter_username}`} target="_blank" aria-label="twitter" size="small" sx={{ color: "#808080 " }}>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton disabled={igDisabled} href={`http://www.instagram.com/${instagram_username}`} target="_blank" aria-label="instagram" size="small" sx={{ color: "#808080 " }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton disabled={disDisabled} href={discord_url} target="_blank" size="small">
                            <Icon baseClassName="" className="fab fa-discord" sx={{ color: "#808080" }} />
                        </IconButton>
                        <IconButton disabled={linkDisabled} href={external_url} target="_blank" aria-label="external_link" size="small" sx={{ color: "#808080 " }}>
                            <LinkIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            sx={{ color: "#808080" }}
                        >
                            <ExpandMoreIcon size="small" />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <div className="description">{description}</div>
                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
            
        </div>
    )
}
export default ProjectCard