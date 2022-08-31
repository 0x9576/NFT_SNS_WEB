import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Auth from '../../../hoc/auth';
import { ftmNode } from '../../../Config';

function MainPage() {
  const [feed, setFeed] = useState([])

  useEffect(() => {
    Axios.get('/api/feed/getAllFeeds')
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
      <div id='wrapper' key={feed._id}>
        <div id='header_feed'>
          <a href={'/profile/' + feed.writer}>{feed.writer.substring(0, 10)}... </a>
          <a id="explorer_icon" href={ftmNode + "/token/" + feed.contractAddress + "?a=" + feed.tokenNum + "#inventory"}
            className="explorer_icon"><span className="ir_pm">go to explorer</span></a>
        </div>
        <h4>{feed.locationInfo}</h4>
        <img style={{ width: '400px' }} src={`http://localhost:2400/${feed.filePath}`} alt="feed image" />
        <h4>{feed.description}</h4>
      </div>
    )
  })

  return (
    <div id='contents_feed'>
      {renderFeeds}
    </div>
  )
}

export default Auth(MainPage, null);