import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import MoodBadIcon from '@mui/icons-material/MoodBad';


import './CSS/TodayPostBoardTop5.css'

import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries.js';
import { ConsoleLogger } from '@aws-amplify/core';

/*
post_top_list : [
    {
        id: "",
        img: "",
        like_user_num: "",
        user : {
            name: "",
            profile_img: "",
        },
    },
]
*/

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'border',
    height: '20px',
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
}));
  

export default class TodayPostBoardTop5 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post_top_list : [],
            // board_type: props.board_type,
            board_type: 0,
        };
    }

    componentDidMount() {
        let today = new Date();

        let sort_function = (a, b) => {
            return b.like_urgent_user_list.length-a.like_urgent_user_list.length;
        }

        today.setDate(today.getDate());
        if(this.state.board_type == 0) {
            API.graphql({ 
                query: listPosts, 
                // variables: { filter: {board_type: {ne: 1}, createdAt: {ge: today}}}})
            }).then(res => console.log(res))
                // .then(res => this.setState({
                //     post_top_list: res.data.listPosts.items.sort(sort_function).slice(0, 5)
                // }))
                .catch(e => console.log(e));
            if(this.state.post_top_list.length < 5) {
                API.graphql({ 
                    query: listPosts,
                    variables: { filter: {board_type: {ne: 1}}}})
                    .then(res => this.setState({
                        post_top_list: res.data.listPosts.items.sort(sort_function).slice(0, 5)
                    }))
                    .catch(e => console.log(e));
            }
        }
        else {
            API.graphql({ 
                query: listPosts, 
                variables: { filter: {board_type: {eq: 1}, createdAt: {ge: today}}}})
                .then(res => this.setState({
                    post_top_list: res.data.listPosts.items.sort(sort_function).slice(0, 5)
                }))
                .catch(e => console.log(e));
            if(this.state.post_top_list.length < 5) {
                API.graphql({ 
                    query: listPosts, 
                    variables: { filter: {board_type: {eq: 1}}}})
                    .then(res => this.setState({
                        post_top_list: res.data.listPosts.items.sort(sort_function).slice(0, 5)
                    }))
                    .catch(e => console.log(e));
            }
        }
	}

   

    render() {
        let {post_top_list, board_type} = this.state;

		const settings = {
			className: "center",
			centerMode: true,
			infinite: true,
			slidesToShow: 5,
            beforeChange: this.handle_slider_index_before,
            centerPadding: "0px",
			speed: 700,
		};
        
		return (
            <div className="today_background_wrap">
                <article className="today_wear">
                    { board_type == 0 
                        ? <div><h1 className="title">오늘의 착장</h1><p className="title_tag">#오늘의 #베스트드레서는 #나야나</p></div>
                        : <div><h1 className="title">도움이 필요해</h1><p className="title_tag">#옷입는거 #어려워</p></div>
                    }  
                    <div className="container">
                        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                        <Slider {...settings}>
                    
                            {post_top_list.map((post,index) => (
                                    <div className= {"div_test"} key={post.id + "_1"}>
                                        <img style={{backgroundImage: `URL(${post.img})`,
                                        borderRadius:"30px", boxShadow: "0 8px 15px 0 gray "}}></img>
                            
                                        <a href={'/post/'+post.id}> 
                                            <span className='dimmed_layer'>	
                                                <span className='dimmed_info' >
                                                    <div>
                                                        <img src={post.user.items.profile_img} alt="프로필" className="profileImg"
                                                                style={{width:"30px",height:"30px",borderRadius:"50%px"}}/>
                                                        <p className="profileName">{post.user.items.name}</p>     
                                                     </div>   
                                                    <Box style={{width: '40px'}} className="box">
                                                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                                            <Grid item xs={4}>
                                                            <Item>
                                                                { board_type == 0
                                                                    ? <FavoriteIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/>
                                                                    : <MoodBadIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/>
                                                                }
                                                            </Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item>{post.like_urgent_user_list.items.length}</Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item><VisibilityIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item>{post.click_num}</Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item><CommentIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item>{post.comment_list.items.length}</Item>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </span>
                                            
                                            </span>
                                        </a>
                                 </div>
                            ))}
                            {post_top_list.map((post,index) => (
                                    <div className= {"div_test"} key={post.id + "_1"}>
                                        <img style={{backgroundImage: `URL(${post.img})`,
                                        borderRadius:"30px", boxShadow: "0 8px 15px 0 gray "}}></img>
                            
                                        <a href={'/post/'+post.id}> 
                                            <span className='dimmed_layer'>	
                                                <span className='dimmed_info' >
                                                    <div>
                                                        <img src={post.user.items.profile_img} alt="프로필" className="profileImg"
                                                                style={{width:"30px",height:"30px",borderRadius:"50%px"}}/>
                                                        <p className="profileName">{post.user.items.name}</p>     
                                                     </div>   
                                                    <Box style={{width: '40px'}} className="box">
                                                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                                                            <Grid item xs={4}>
                                                            <Item>
                                                                { board_type == "0"
                                                                    ? <FavoriteIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/>
                                                                    : <MoodBadIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/>
                                                                }
                                                            </Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item>{post.like_urgent_user_list.items.length}</Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item><VisibilityIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item>{post.click_num}</Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item><CommentIcon style={{color:'#ffffff'}} sx={{fontSize: '1.4rem'}}/></Item>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                            <Item>{post.comment_list.items.length}</Item>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </span>
                                            
                                            </span>
                                        </a>
                                 </div>
                            ))}
                        </Slider>
                    </div>
                </article>
            </div>
		);
	}
}
