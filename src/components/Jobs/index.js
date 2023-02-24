import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'
import Profile from '../Profile'
import './Jobs.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const viewStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    viewStatus: viewStatusConstant.initial,
    jobsList: [],
    searchInput: '',
    activeJobTypeIds: [],
    activeSalaryId: '',
  }

  componentDidMount() {
    this.fetchJobsData()
  }

  fetchJobsData = async () => {
    this.setState({viewStatus: viewStatusConstant.loading})
    const {searchInput, activeJobTypeIds, activeSalaryId} = this.state

    const jobTypes = activeJobTypeIds.join(',')
    console.log(jobTypes)

    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobTypes}&PARTTIME&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        jobsList: formattedData,
        viewStatus: viewStatusConstant.success,
      })
    } else {
      this.setState({
        viewStatus: viewStatusConstant.failure,
      })
    }
  }

  searchJob = event => {
    this.setState({searchInput: event.target.value}, this.fetchJobsData)
  }

  changeSalary = id => {
    this.setState({activeSalaryId: id}, this.fetchJobsData)
  }

  changeJobType = event => {
    const {value, checked} = event.target
    console.log(value, checked)

    if (checked) {
      this.setState(
        prev => ({
          activeJobTypeIds: [...prev.activeJobTypeIds, value],
        }),
        this.fetchJobsData,
      )
    } else {
      this.setState(
        prev => ({
          activeJobTypeIds: prev.activeJobTypeIds.filter(e => e !== value),
        }),
        this.fetchJobsData,
      )
    }
  }

  renderJobSuccessView = () => {
    const {jobsList} = this.state

    return jobsList.length !== 0 ? (
      <ul className="jobs-list">
        {jobsList.map(jobDetails => (
          <JobCard key={jobDetails.id} jobDetails={jobDetails} />
        ))}
      </ul>
    ) : (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-img"
        />
        <h1 className="failure-msg">No Jobs Found</h1>
        <p className="failure-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
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
      <button className="retry-btn" type="button" onClick={this.fetchJobsData}>
        Retry
      </button>
    </div>
  )

  render() {
    const {viewStatus, activeJobId, activeSalaryId, searchInput} = this.state

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
        <Header />
        <div className="job-bg-container">
          <div className="profile-filter-container">
            <div className="user-profile-container">
              <Profile />
            </div>
            <hr className="ruler" />
            <div className="filter-container">
              <FilterGroup
                employmentTypesList={employmentTypesList}
                activeJobId={activeJobId}
                activeSalaryId={activeSalaryId}
                salaryRangesList={salaryRangesList}
                changeSalary={this.changeSalary}
                changeJobType={this.changeJobType}
              />
            </div>
            <hr className="ruler" />
          </div>
          <div className="all-jobs-container">
            <div className="search-box">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.searchJob}
                value={searchInput}
              />
              <button
                className="search-btn"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch color="#ffffff" />
              </button>
            </div>
            {renderingView}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
