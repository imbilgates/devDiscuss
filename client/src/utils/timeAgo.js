export function timeAgo(value) {
    const currentTime = new Date();
    const inputTime = new Date(value);
    const timeDifference = currentTime - inputTime;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return `${inputTime.toLocaleDateString()} ${inputTime.toLocaleTimeString()}`;
    } else if (months > 0) {
      return months === 1 ? `${months} month ago` : `${months} months ago`;
    } else if (weeks > 0) {
      return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
    } else if (days > 0) {
      if (days === 1) {
        return 'Yesterday';
      } else if (days < 7) {
        return `${days} days ago`;
      } else {
        return `${weeks} weeks ago`;
      }
    } else if (hours > 0) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else if (seconds < 60) {
      return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
    } else {
      return 'Just now';
    }
  }

  