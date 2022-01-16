import * as React from 'react';
import { Component } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import MyPostBoard from './MyPostBoard';

import { grey } from '@mui/material/colors';
import { white } from 'jest-matcher-utils/node_modules/chalk';
import MyPageComments from './MyPageComments';
import MyPageBookmark from './MyPageBookmark';
import MyPostBoard_SOS from './MyPostBoard_SOS';
const EditBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: white[500],
    
    width: '70px',
    color: grey[700],
    padding: '8px 0px',
    margin: '0px',
    '&:hover': {
      borderColor: grey[700],
      backgroundColor: grey[200],
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: grey[700],
    },
    '&:focus': {
        borderBottom: '2px solid',
        borderColor: grey[700]
    },
   
    borderRadius: '0px',
    
  }));

const EditBtnGroup = styled(ButtonGroup)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: white[500],
    borderRight: 'none',
    //color: grey[700],
    borderRadius: '0px',
    borderColor: grey[500],
    width: '310',
    padding: '0px'
  }));


export default class MyPageButtonGroup extends Component{
    constructor(props){
        super(props);

        this.state = {
            now_user: props.user,
            btn_clicked: 0,
            current_next_post_page:props.current_next_post_page,
        }
    }
    
    componentDidUpdate(prevProps){
        let {now_user, current_next_post_page} = this.state;
        if(now_user!=this.props.user){
            this.setState({
                now_user: this.props.user
            })
        }
        if(current_next_post_page!=this.props.current_next_post_page){
          this.setState({
            current_next_post_page: this.props.current_next_post_page
          })
      }
    }

    set_btn = (i) => {
        this.setState({
            btn_clicked: i
        })
    }
    /*
    componentDidMount(){
      window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount(){
      window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
      console.log(this.state.current_next_post_page);
      console.log("핸들 스크롤");
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("나와바");
        alert("핸들 스크롤");
        // 페이지 끝에 도달하면 추가 데이터를 받아온다
        this.setState({
        current_next_post_page: this.state.current_next_post_page+1
        })
      }
    }*/

    render(){
        console.log(this.state.now_user);

        let {now_user, btn_clicked, current_next_post_page} = this.state;

        return (
            <div>
            <Box
              sx={{
                borderBottom: 1, borderColor: 'divider', margin:'auto', width: '270px', height:'50px', color:'black',
                padding: '0px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} >
              <EditBtn 
                onClick={()=>this.set_btn(1)} 
                sx={
                  btn_clicked==0 || btn_clicked==1?{
                    borderBottom:'2px solid', borderColor: 'grey'
                  }:{}
                }>
                  게시판
              </EditBtn>    
                
                
                <EditBtn onClick={()=>this.set_btn(2)}>SOS</EditBtn>
                <EditBtn onClick={()=>this.set_btn(3)}>댓글</EditBtn>
                <EditBtn onClick={()=>this.set_btn(4)}>북마크</EditBtn>
              </Stack>

            </Box>
            {btn_clicked==0 || btn_clicked==1? <MyPostBoard user={now_user} board={20} current_next_post_page={current_next_post_page}/> : 
                btn_clicked==2? <MyPostBoard_SOS user={now_user} board={1} current_next_post_page={current_next_post_page}/> :
                btn_clicked==3? <MyPageComments user={now_user}/> :
                btn_clicked==4? <MyPageBookmark user={now_user}/> :
                <MyPostBoard user={now_user} board={20}/>
            }
            
            </div>

            
          );
    }
    
  }
  