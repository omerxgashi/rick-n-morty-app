import React from 'react';
import { useTranslation } from 'react-i18next';  

const Footer = () => {
  const { t, i18n } = useTranslation();  

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage); 
  };

  return (
    <footer className="footer">
      <div className="language-selector">
        <select onChange={handleLanguageChange} value={i18n.language}>
          <option value="en">{t('english')}</option>
          <option value="de">{t('german')}</option>
        </select>
      </div>
      
      
    </footer>
  );
};

export default Footer;
