import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/SearchMission.module.css";
import { AiOutlineSearch } from "react-icons/ai";
// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
import { API_ENDPOINT } from "../../api/connection/server";
//const API_ENDPOINT = "https://guildserver.aridgeleyportfolio.ca";

const SearchMission = ({ handleSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(false);

  const navigate = useNavigate();
  const goToMissionPage = (num) => navigate(`/missions/info/${num}`);

  const submitData = async (e) => {
    e.preventDefault();

    // Fetch mission data
    const res = await fetch(API_ENDPOINT + "/search/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchText: searchText }),
    });
    const data = await res.json();

    // Fetch report data
    const resReport = await fetch(API_ENDPOINT + "/search/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchText: searchText }),
    });
    const dataReport = await resReport.json();

    // Add both results into one object
    setSearchResults({ missionData: data, reportData: dataReport });
  };

  const onSelect = (num) => {
    handleSelect(num);
    goToMissionPage(num);
  };

  const displayMissionResults = () => {
    return (
      <table className="table table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Mission No.</th>
            <th scope="col">Mission Title</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Mission Description</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.missionData.map((mission) => {
            let date = new Date(mission.creation_date);
            return (
              <tr
                key={mission.mission_num}
                onClick={() => onSelect(mission.mission_num)}
                className={styles.dataRow}
              >
                <td>{mission.mission_num}</td>
                <td>
                  <strong>{mission.job_name}</strong>
                </td>
                <td>{date.toLocaleDateString()}</td>
                <td>{mission.job_description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const displayReportResults = () => {
    return (
      <table className="table table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Report ID</th>
            <th scope="col">Mission No.</th>
            <th scope="col">Report Details</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.reportData.map((report) => {
            return (
              <tr
                key={report.report_id}
                onClick={() => onSelect(report.mission_num)}
                className={styles.dataRow}
              >
                <td>{report.report_id}</td>
                <td>{report.mission_num}</td>
                <td>{report.report_details}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <h2 style={{ fontFamily: "NSimSun" }}>Search Mission Data</h2>
        <p>
          Here you can search all of our missions and mission reports for
          information on something you are looking for. Enter a keyword into the
          search bar and the system will display your results below. Happy
          searching!
        </p>
      </div>
      <form action="/missions/search" method="POST" onSubmit={submitData}>
        <div>
          <input
            id="search_term"
            type="text"
            name="searchText"
            className="form-control"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" value="Search" className="btn btn-primary">
            <AiOutlineSearch />
          </button>
        </div>
      </form>
      <div className={styles.searchResults}>
        {searchResults && (
          <>
            <hr />
            <h2 style={{ fontFamily: "NSimSun" }}>Search Results</h2>
            <h3>Mission Data</h3>
            {searchResults.missionData.length === 0 ? (
              <p>No mission results found.</p>
            ) : (
              <>{displayMissionResults()}</>
            )}
            <h3>Report Data</h3>
            {searchResults.reportData.length === 0 ? (
              <p>No relevant report data found.</p>
            ) : (
              <>{displayReportResults()}</>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchMission;
