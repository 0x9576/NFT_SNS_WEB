import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Auth from '../../../hoc/auth';
import { useNavigate } from 'react-router-dom';
import { ftmNode } from '../../../Config';

function MainPage() {
  let naviate = useNavigate();


  const [feed, setFeed] = useState([])

  useEffect(() => {
    Axios.get('/api/feed/getFeeds')
      .then(response => {
        if (response.data.success) {
          setFeed(response.data.feeds)
        }
        else {
          alert('피드 가져오기 실패');
        }
      })
  }, [])
  const renderFeeds = feed.map((feed, index) => {
    return (
      <div key={feed._id}>
        <h4>{feed.writer}</h4>
        <img style={{ width: '400px' }} src={`http://localhost:2400/${feed.filePath}`} alt="image" />
        <h4>{feed.description}</h4>
        <h4>{feed.locationInfo}</h4>
        <h4>token: {feed.tokenNum}</h4>
        <h4>contract: {feed.contractAddress}</h4>
        <a href={ftmNode + "/token/" + feed.contractAddress + "?a=" + feed.tokenNum + "#inventory"}>go to explorer</a>
      </div>
    )
  })

  return (
    <div>
      {renderFeeds}
    </div>
  )
}

export default Auth(MainPage, null);