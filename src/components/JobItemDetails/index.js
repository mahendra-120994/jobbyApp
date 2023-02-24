import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill} from 'react-icons/bs'

import Headers from '../Header'

import './index.css'

const viewStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    viewStatus: viewStatusConstant.initial,
    jobDetails: {},
    lifeAtCompany: {},
    skillsList: [],
    similarJobsList: [],
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    this.setState({viewStatus: viewStatusConstant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const jobData = data.job_details
      const jobDetails = {
        id: jobData.id,
        companyLogoUrl: jobData.company_logo_url,
        companyWebsiteUrl: jobData.company_website_url,
        employmentType: jobData.employment_type,
        jobDescription: jobData.job_description,
        packagePerAnnum: jobData.package_per_annum,
        rating: jobData.rating,
        location: jobData.location,
        title: jobData.title,
      }

      const lifeAtCompany = {
        description: jobData.life_at_company.description,
        imageUrl: jobData.life_at_company.image_url,
      }

      const skillsList = jobData.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))

      const similarJobsList = data.similar_jobs.map(eachItem => ({
        id: jobData.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        title: eachItem.title,
        rating: eachItem.rating,
        location: eachItem.location,
      }))

      this.setState({
        jobDetails,
        lifeAtCompany,
        skillsList,
        similarJobsList,
        viewStatus: viewStatusConstant.success,
      })
    } else {
      this.setState({
        viewStatus: viewStatusConstant.failure,
      })
    }
  }

  renderJobLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-msg">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.fetchJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobSuccessView = () => {
    const {jobDetails, lifeAtCompany, skillsList, similarJobsList} = this.state
    const {
      title,
      rating,
      location,
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <div className="container">
        <div className="job-details-card">
          <div className="job-details-card-header">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="title-rating">
              <h1 className="job-title">{title}</h1>
              <p className="job-rating">
                <BsStarFill color="#fbbf24" />
                {rating}
              </p>
            </div>
          </div>
          <div className="job-location-package">
            <div className="location-job-type">
              <p className="job-location">{location}</p>
              <p className="job-type">{employmentType}</p>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="ruler" />
          <div className="job-details-description">
            <div className="job-details-description-header">
              <h1 className="job-card-headings">Description</h1>
              <a href={companyWebsiteUrl}>
                <p className="visit" color="#6366f1">
                  Visit
                </p>
              </a>
            </div>

            <p className="job-description">{jobDescription}</p>
          </div>
          <div>
            <h1 className="job-card-headings">Skills</h1>
            <ul className="skill-list">
              {skillsList.map(skill => (
                <li className="skill-item" key={skill.name}>
                  <img
                    src={skill.imageUrl}
                    className="skill-img"
                    alt={skill.name}
                  />
                  <p className="skill">
                    {skill.name} {skill.id}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company">
            <h1 className="job-card-headings">Life at Company</h1>
            <div className="company-life">
              <p className="company-life-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                className="company-life-img"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-job-headings">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobsList.map(jobDetail => (
            <li className="similar-job-item" key={jobDetail.id}>
              <div className="job-details-card-header">
                <img
                  src={jobDetail.companyLogoUrl}
                  className="company-logo"
                  alt="similar job company logo"
                />
                <div className="title-rating">
                  <h1 className="job-title">{jobDetail.title}</h1>
                  <p className="job-rating">
                    <BsStarFill color="#fbbf24" />
                    {jobDetail.rating}
                  </p>
                </div>
              </div>
              <div className="job-details-description">
                <h1 className="job-card-headings">Description</h1>
                <p className="job-description">{jobDetail.jobDescription}</p>
              </div>
              <div className="job-location-package">
                <div className="location-job-type">
                  <p className="job-location">{jobDetail.location}</p>
                  <p className="job-type">{jobDetail.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {viewStatus} = this.state
    let renderingView

    switch (viewStatus) {
      case viewStatusConstant.loading:
        renderingView = this.renderJobLoadingView()
        break
      case viewStatusConstant.success:
        renderingView = this.renderJobSuccessView()
        break
      case viewStatusConstant.failure:
        renderingView = this.renderJobFailureView()
        break
      default:
        renderingView = null
        break
    }
    return (
      <>
        <Headers />
        <div className="job-detail-bg">{renderingView}</div>
      </>
    )
  }
}
export default JobItemDetails
