import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobBoard.css';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://remoteok.com/api', {
          headers: { 'Accept': 'application/json' }
        });
        const jobData = res.data.slice(1); // Skip metadata
        setJobs(jobData);
        setFilteredJobs(jobData);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (titleFilter) {
      filtered = filtered.filter((job) =>
        job.position.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        (job.location || 'Remote').toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [titleFilter, locationFilter, jobs]);

  const uniqueLocations = [...new Set(jobs.map(job => job.location || 'Remote'))];

  return (
    <div className="job-board">
      <h2>Job Board</h2>

      {/* Search and Filter */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by job title..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc, i) => (
            <option key={i} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="error">{error}</p>}

      <div className="job-list">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.position}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location || 'Remote'}</p>
            <p><strong>Type:</strong> {job.tags?.join(', ')}</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              View Job
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
