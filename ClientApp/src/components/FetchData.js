import React, { Component } from 'react';
import $ from 'jquery';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
      this.state = {
          forecasts: [],
          loading: true,
          cardCollapsed: false
      };
      this.cardCollpaseClick = this.cardCollpaseClick.bind(this);
  }

  componentDidMount() {
      this.populateWeatherData();
      //Ref: https://stackoverflow.com/questions/38518278/how-to-use-jquery-with-
      $('.select2-dd').select2({
          theme: "bootstrap-5",
          width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
          placeholder: $(this).data('placeholder'),
      });
    //  $(document).ready(function () {
    //  });
    }

    cardCollpaseClick(event) {
        event.preventDefault();
        this.setState({ cardCollapsed: !this.state.cardCollapsed });
        return false;
    }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
          : FetchData.renderForecastsTable(this.state.forecasts);
     
      return (
          <>
              <div className="container-fluid">
                  <h2>Weather forecast</h2>

                <div className="card">
                    <div className="card-header">
                          <h4 className="panel-title">
                            Search Criteria
                              <a className="float-end" href="#" onClick={this.cardCollpaseClick}><span className="fa fa-arrows-v"></span></a>
                        </h4>
                    </div>
                      <div id="criteriaItems" className={`card-body collapse ${this.state.cardCollapsed ? '' : 'show'}`} >
                        <form method="post">
                            <div className="row form-row">
                                <label htmlFor="cboSubscription" className="col-sm-2 col-form-label">Subscription</label>
                                <div className="col-sm-10">
                                        <select className="form-select form-control select2-dd" aria-label="Subscription" data-placeholder="Select Subscription">
                                            <option></option>
                                            <option value="Volvo">Volvo</option>
                                            <option value="Mahindra">Mahindra</option>
                                            <option value="Mercedes">Mercedes</option>
                                            <option value="Audi">Audi</option>
                                        </select>
                                </div>
                            </div>
                            <div className="row form-row">
                                <label htmlFor="txtPlaylist" className="col-sm-2 col-form-label">Playlist</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="txtPlaylist" />
                                </div>
                            </div>
                            <div className="row form-row">
                                <label htmlFor="txtChannel" className="col-sm-2 col-form-label">Channel</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="txtChannel" />
                                </div>
                            </div>
                            <div className="row form-row">
                                <label htmlFor="txtVideoName" className="col-sm-2 col-form-label">Video Name</label>
                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="txtVideoName" id="txtVideoName" />
                                        <div className="input-group-text">
                                                <a href="#"><i className="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-row">
                                <label className="col-sm-2 col-form-label">Comment Date</label>
                                <div className="col-sm-10">
                                    <div className="row">
                                        <label htmlFor="dtFromDate" className="col-sm-1 col-form-label">From</label>
                                        <div className="col-sm-5">
                                            <input type="date" className="form-control datepicker" name="dtFromDate" />
                                        </div>
                                        <label htmlFor="dtToDate" className="col-sm-1 col-form-label">To</label>
                                        <div className="col-sm-5">
                                            <input type="date" className="form-control datepicker" name="dtToDate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-row">
                                <label htmlFor="txtCommentText" className="col-sm-2 col-form-label">Comment Text</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="txtCommentText" />
                                </div>
                            </div>
                        </form>
                        
                      </div>
                      <div className="card-footer">
                          <div className="row form-row">
                              <div className="col-sm-12">
                                  <button type="submit" className="btn btn-primary float-end">Search Now</button>
                              </div>
                          </div>
                      </div>
                  </div>
                
                  <div className="card mt-3">
                      <div className="card-header" id="resultHeader">
                          <h4 className="panel-title">
                              Search Results
                          </h4>
                      </div>
                      <div id="resultItems" className="card-body">
                          {contents}
                      </div>
                  </div>
                  <div id="dlgContainer"></div>
              </div>
          </>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

    hitServerError() {
        fetch('countries/test')
        .then(res =>
                res.json())
        .then(data => {
            console.log('Server Error', data)
        })
        .catch(function (error) {
            console.error(error);
        });
    }
}
