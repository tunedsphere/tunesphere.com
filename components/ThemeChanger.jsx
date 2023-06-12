const ThemeChanger = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    let newTheme = '';

    switch (theme) {
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'blue';
        break;
      case 'blue':
        newTheme = 'green';
        break;
      case 'green':
        newTheme = 'light';
        break;
      default:
        newTheme = 'light';
        break;
    }

    setTheme(newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeChanger;