import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'

import './index.css'

const viewStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    viewStatus: viewStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchProfile()
  }

  fetchProfile = async () => {
    this.setState({viewStatus: viewStatusConstants.loading})
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = data.profile_details
      const formattedProfileData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profileDetails: formattedProfileData,
        viewStatus: viewStatusConstants.success,
      })
    } else {
      this.setState({
        viewStatus: viewStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="username">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <button className="retry-btn" type="button" onClick={this.fetchProfile}>
        Retry
      </button>
    </div>
  )

  render() {
    const {viewStatus} = this.state

    switch (viewStatus) {
      case viewStatusConstants.loading:
        return this.renderLoadingView()
      case viewStatusConstants.success:
        return this.renderSuccessView()
      case viewStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default Profile
