// app.js

// Dummy data for job listings (replace with actual data)
const jobListings = [
    {
      title: "Job Title 1",
      description: "Description of job listing 1",
      thumbnail: "https://via.placeholder.com/150",
      link: "https://example.com/job1"
    },
    {
      title: "Job Title 2",
      description: "Description of job listing 2",
      thumbnail: "https://via.placeholder.com/150",
      link: "https://example.com/job2"
    },
    // Add more job listings as needed
  ];
  
  // Function to render job listings
  function renderJobListings() {
    const jobListingsContainer = document.querySelector('.job-listings');
  
    jobListings.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.classList.add('job-card');
  
      const thumbnail = document.createElement('img');
      thumbnail.src = job.thumbnail;
      thumbnail.alt = job.title;
  
      const title = document.createElement('h3');
      title.textContent = job.title;
  
      const description = document.createElement('p');
      description.textContent = job.description;
  
      const applyButton = document.createElement('a');
      applyButton.href = job.link;
      applyButton.textContent = 'Apply Now';
      applyButton.classList.add('apply-button');
  
      jobCard.appendChild(thumbnail);
      jobCard.appendChild(title);
      jobCard.appendChild(description);
      jobCard.appendChild(applyButton);
  
      jobListingsContainer.appendChild(jobCard);
    });
  }
  
  // Call the function to render job listings
  renderJobListings();
  
  // Card slider functionality
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const jobListingsContainer = document.querySelector('.job-listings');
  
  let index = 0;
  
  prevBtn.addEventListener('click', () => {
    index = Math.max(index - 1, 0);
    updateSliderPosition();
  });
  
  nextBtn.addEventListener('click', () => {
    index = Math.min(index + 1, jobListings.length - 1);
    updateSliderPosition();
  });
  
  function updateSliderPosition() {
    const cardWidth = document.querySelector('.job-card').offsetWidth;
    jobListingsContainer.style.transform = `translateX(-${index * (cardWidth + 20)}px)`;
  }
  