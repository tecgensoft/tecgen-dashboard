export const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
  
    // Options for formatting the date
    const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  
    // Format the date and time
    const formattedDate = date.toLocaleDateString('en-US', dateOptions); // e.g., "06 Jan 2024"
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions); // e.g., "12:05 PM/AM"
  
    return `${formattedDate}, ${formattedTime}`;
  };
  

  