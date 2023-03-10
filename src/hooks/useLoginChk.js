import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
//--------------------------------------------------------//
import { loadUserData } from '../stores/_reducerBundle'

export function useLoginChk() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const loginState = useSelector(state => { return state.loginUser.login })

  const loginChk = () => {
    console.log('로그인체크 실행')
    axios({
      url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/accesstoken',
      method: 'GET',
      withCredentials: true
    })
      .then((res) => {
        console.log('로그인체크 완료')
        axios({
          url: 'https://port-0-portfolio-server-private-4y6tt2blds7g9x0.sel3.cloudtype.app/api/refreshtoken',
          method: 'GET',
          withCredentials: true
        })
          .then(() => {
            !loginState && dispatch(loadUserData({ login: true, ...res?.data }))
            console.log('로그인 연장')
          })
      })
      .catch(() => {
        console.log('로그인체크 실패')
        dispatch(loadUserData({ login: false }))
      })
  }

  useEffect(() => {
    if (loginState && pathname !== '/') loginChk()
  }, [pathname])

  return loginChk
}