import { useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
//--------------------------------------------------------//
import { usePageNation } from '../hooks/_customHookBundle'
import { PageNation } from '../components/_ComponentBundle'
import { tabActiveChk } from '../utils/_utilsBunddle'

function Event(props) {

  const { id } = useParams()
  const eventData = useSelector(state => { return state.event })
  const [pageItem, pages, currentPage, setCurrentPage] = usePageNation(eventData[id], 9)

  useEffect(() => {
    setCurrentPage(1)
  }, [id])

  return (
    <div className={'event page-wrap ' + id}>

      <nav className="page-nav">
        <h1>이벤트</h1>
        <ul>
          <li className={tabActiveChk('ing', id)}>
            <Link to="/event/ing">진행이벤트</Link>
          </li>
          <li className={tabActiveChk('end', id)}>
            <Link to="/event/end">종료이벤트</Link>
          </li>
        </ul>
      </nav>

      <section className="page-contents-wrap">
        <ul className="page-list">
          {
            pageItem.map((el, idx) => {
              return (
                <li key={idx}>
                  <figure className="item-img">
                    <img src={require('../assets/img/' + el.imgURL + '.jpg')} alt="" />
                  </figure>
                  <h3 className="event-title">{el.title}</h3>
                  <p className="event-period"><img src={require('../assets/img/ic_calendar.png')} alt="" />~{el.date}</p>
                </li>
              )
            })
          }
        </ul>
      </section>

      <PageNation pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  )
}

export { Event }