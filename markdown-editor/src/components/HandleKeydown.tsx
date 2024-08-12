const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case 'b':
          // Apply bold format
          console.log('Bold format');
          break;
        case 'i':
          // Apply italic format
          console.log('Italic format');
          break;
        // Add more shortcuts
        default:
          break;
      }
    }
  };

export { handleKeyDown }