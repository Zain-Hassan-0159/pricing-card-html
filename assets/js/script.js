jQuery(document).ready(function ($) {
    // Initialize a flag to track if the slider handle is being dragged
    let isDragging = false;
    // Select all elements with the class 'offer-card' (your sliders)
    const sliders = $('.offer-card');
  
    // Function to log current interval and value based on slider position
    function logCurrentData(slider, newPosition) {
      // Find relevant elements within the slider
      const handle1 = slider.find('.rangeslider__fill');
      const handle2 = slider.find('.rangeslider__handle');
      const handle3 = slider.find('.rangeslider--horizontal');
      // Find the intervals within the slider
      const intervals = slider.find('.interval');
      const intervalCount = intervals.length;
      // Get the minimum and maximum values from data attributes
      const min = parseInt(slider.attr('data-min')); // Minimum value
      const max = parseInt(slider.attr('data-max')); // Maximum value
      const range = max - min;
  
      // Calculate the current interval based on the slider position
      const currentInterval = Math.floor((newPosition / 100) * intervalCount);
      // Calculate the current value based on the slider position and round it to an integer
      const currentValue = Math.floor(min + (newPosition / 100) * range);
      // Log the current value to the console
      console.log(`Current Value: ${currentValue}`);
    }
  
    // Function to handle mouse down event on the slider handle
    function onMouseDown(event, slider) {
      event.preventDefault();
      isDragging = true;
      // Find relevant elements within the slider
      const handle1 = slider.find('.rangeslider__fill');
      const handle2 = slider.find('.rangeslider__handle');
      const handle3 = slider.find('.rangeslider--horizontal');
      const handleRect = handle2[0].getBoundingClientRect();
      const offsetX = event.clientX - handleRect.left;
  
      // Register a mousemove event listener on the entire document to track handle movement
      $(document).on('mousemove', function (e) {
        if (!isDragging) return;
  
        // Calculate the new position of the handle based on mouse movement
        let newPosition =
          (e.clientX - offsetX - handle3[0].getBoundingClientRect().left) /
          handle3.width() *
          100;
        newPosition = Math.min(Math.max(newPosition, 0), 100); // Ensure the handle stays within the track
        handle2.css('left', `${newPosition - 2}%`);
        handle1.css('width', `${newPosition}%`);
  
        // Call the common function to log data
        logCurrentData(slider, newPosition);
      });
  
      // Register a mouseup event listener to stop tracking when the mouse is released
      $(document).on('mouseup', function () {
        isDragging = false;
        $(document).off('mousemove'); // Remove the mousemove event listener
        $(document).off('mouseup'); // Remove the mouseup event listener
      });
    }
  
    // Function to handle click event on the slider track
    function onMouseClick(e, slider) {
      // Find relevant elements within the slider
      const handle1 = slider.find('.rangeslider__fill');
      const handle2 = slider.find('.rangeslider__handle');
      const handle3 = slider.find('.rangeslider--horizontal');
  
      // Calculate the new position based on the click event
      let newPosition =
        (e.clientX - handle3[0].getBoundingClientRect().left) /
        handle3.width() *
        100;
      newPosition = Math.min(Math.max(newPosition, 0), 100); // Ensure the handle stays within the track
      handle2.css('left', `${newPosition - 2}%`);
      handle1.css('width', `${newPosition}%`);
  
      // Call the common function to log data
      logCurrentData(slider, newPosition);
    }
  
    // Iterate over each slider element and attach event listeners
    sliders.each(function () {
      const slider = $(this);
      const handle2 = slider.find('.rangeslider__handle');
      const handle3 = slider.find('.rangeslider--horizontal');
  
      // Attach mousedown event listener to the handle
      handle2.on('mousedown', function (e) {
        onMouseDown(e, slider);
      });
  
      // Attach click event listener to the track
      handle3.on('click', function (e) {
        onMouseClick(e, slider);
      });
    });
  });
  