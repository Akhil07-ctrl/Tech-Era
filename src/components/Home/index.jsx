import React, {Component} from 'react'
import Header from '../Header'
import Course from '../Course'
import './index.css'

class Home extends Component {
  state = {isLoading: true, isFailed: false, isSuccess: false, coursesList: []}

  componentDidMount() {
    this.fetchApiDetails()
  }

  fetchApiDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      console.log(updatedData)
      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        coursesList: updatedData,
      })
    } else {
      this.setState({isLoading: false, isSuccess: false, isFailed: true})
    }
  }

  render() {
    const {isLoading, isSuccess, isFailed, coursesList} = this.state
    return (
      <div className='home-container'>
        <Header />
        <div>
          {isLoading && (
            <div className="spinner">
              <p>Loading...</p>
            </div>
          )}
          {isSuccess && (
            <div className='course-list-container'>
              <h1>Courses</h1>
              <ul className='course-list'>
                {coursesList.map(each => (
                  <Course key={each.id} details={each} />
                ))}
              </ul>
            </div>
          )}
          {isFailed && (
            <div className='error-container'>    
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <div>
                <button onClick={this.fetchApiDetails}>Retry</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home