// TimeSince Component
export default function TimeSince(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000); // Getting Seconds

  var interval = seconds / 31536000; // Getting Interval For Year

  if (interval > 1) {
    return Math.floor(interval) + " years"; // Return Years
  }

  interval = seconds / 2592000; // Getting Interval For Months

  if (interval > 1) {
    return Math.floor(interval) + " months"; // Return Months
  }

  interval = seconds / 86400; // Getting Interval For Days

  if (interval > 1) {
    return Math.floor(interval) + " days"; // Return Days
  }

  interval = seconds / 3600; // Getting Interval For Hours

  if (interval > 1) {
    return Math.floor(interval) + " hours"; // Return Hours
  }

  interval = seconds / 60; // Getting Interval For Minutes

  if (interval > 1) {
    return Math.floor(interval) + " minutes"; // Return Minutes
  }

  return Math.floor(seconds) + " seconds"; // Return Seconds
}
